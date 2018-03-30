
import { Component } from '@angular/core';
import { Storage } from '@ionic/storage';
import { NavController, NavParams } from 'ionic-angular';

import { UsercrudProvider } from "../../providers/usercrud/usercrud";
import { User } from "../../models/user";
import { Invitation } from "../../models/invitation";

import { AngularFireDatabase } from 'angularfire2/database';
import * as firebase from 'firebase/app';

@Component({
  selector: 'page-search',
  templateUrl: 'search.html',
})
export class SearchPage {

  currentUser = {} as User;
  invitation = {} as Invitation;

  public users: Array<User> = [];
  public usersRef: firebase.database.Reference = firebase.database().ref('/users');

  constructor(public navCtrl: NavController, public navParams: NavParams,

    private userCrud: UsercrudProvider,
    private storage: Storage) {
      
      this.storage.get("currentUser").then(res => {
        this.currentUser = JSON.parse(res);
        console.log("search page current user : "+this.currentUser);
      });
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad SearchPage');
  }

  initializeUsers(){
    this.usersRef.on('value', userSnapshot => {
      console.log("usersnapshot : "+userSnapshot.val());
      this.users = [];
      userSnapshot.forEach( userNap => {
        console.log("usernap : "+userNap.val());
        //this.afDatabase.database.ref
        this.users.push(userNap.val());
        return false;
      });
    });
  }

  getUsers(ev: any){
    // Reset items back to all of the items
    this.initializeUsers();

    // set val to the value of the searchbar
    let val = ev.target.value;

    // if the value is an empty string don't filter the items
    if (val && val.trim() != '') {
      this.users = this.users.filter((user) => {
        return (user.displayName.toLowerCase().indexOf(val.toLowerCase()) > -1);
      })
    }
  }

  sendMessage(id){
    console.log("send message to : "+id);
  }

  sendInvitation(idReceiver){
    this.invitation.senderId = this.currentUser.id;
    this.invitation.receiverId = idReceiver;
    this.invitation.state = 0;
    console.log("send invitation  : "+this.invitation);
    this.userCrud.sendInvitation(this.invitation).then(res => {
      console.log("invit : "+res);
    });
  }

}