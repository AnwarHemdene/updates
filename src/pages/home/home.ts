import { Component } from '@angular/core';
import { Storage } from '@ionic/storage';
import { NavController } from 'ionic-angular';

import { TabsPage } from './../tabs/tabs';
import { SearchPage } from './../search/search';
import { LoginPage } from "../login/login";

import { AngularFireDatabase } from 'angularfire2/database';
import { AngularFireAuth } from 'angularfire2/auth';

import { User } from "../../models/user";
import { UsercrudProvider } from "../../providers/usercrud/usercrud";

import { Geolocation } from '@ionic-native/geolocation';


@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  currentUser = {} as User;

  friendList: any;

  myFriends : any;

  pos : any;


  constructor(public navCtrl: NavController,
    private storage: Storage,
    private afAuth: AngularFireAuth,
    private afDatabase :AngularFireDatabase,
    private userProvider: UsercrudProvider,
    private geolocation: Geolocation) {

      /*this.afAuth.auth.onAuthStateChanged(user => {
        if(user){
          this.user.id = user.uid;
          console.log(this.user.id);
        }else{
          console.log("Erreur de chargement");
        }
      });*/

      this.storage.get("currentUser").then(res => {
        this.currentUser = JSON.parse(res);
        console.log("home page current user : "+this.currentUser.displayName);
      });

      this.geolocation.getCurrentPosition().then((resp) => {
        console.log("access position given");
        console.log(resp);
        this.pos = resp;
       }).catch((error) => {
         this.navCtrl.pop();
         console.log('Error getting location', error);
                
       });

  }

  /*readUser(){
    console.log(this.user.id);
    this.userProvider.findUserbyId(this.user.id);
  }*/

  //go to search page
  rootSearch(){
    this.navCtrl.push(SearchPage);
  }

  signOut(){
    this.storage.clear().then(res => {
      this.afAuth.auth.signOut().then( () =>{
        console.log("sign out : "+res);
        this.navCtrl.setRoot(LoginPage);
      });      
    });
  }

  getFriendList(){
    console.log("getting friend list : ");
    this.afDatabase.list<any>("/friends/").valueChanges().subscribe(data => {
      this.myFriends = data;
      console.log("my friends : "+this.myFriends);
      this.friendList = [];
      this.myFriends.forEach(element => {
        console.log("element : "+element);
        console.log("element sender id : "+element.senderId);
        this.afDatabase.object("/users/"+element.senderId).valueChanges().subscribe(data=>{
          this.friendList.push(data);
        });
      });
    });

    this.showFriend();
  }

  showFriend(){
    this.friendList.forEach(element => {
      console.log("elemnt user nchallah : "+element);
      console.log("elemnt user name nchallah : "+element.displayName);
    });
  }

  updateReputation(){
    this.userProvider.updateReputation(this.currentUser.id,5);
  }

  getPosition(){
    console.log(this.pos);
  }

}
