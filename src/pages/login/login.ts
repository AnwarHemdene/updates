import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams , Platform , MenuController} from 'ionic-angular';

import { SignupPage } from '../signup/signup';
import { TabsPage } from './../tabs/tabs';
import { FirstConnectionPage } from "../first-connection/first-connection";

import { AngularFireAuth } from 'angularfire2/auth';
import { AngularFireDatabase } from 'angularfire2/database';
import { AngularFireModule } from 'angularfire2';
import { GooglePlus } from "@ionic-native/google-plus";
import { Facebook } from '@ionic-native/facebook';
import { Storage } from '@ionic/storage';

import firebase from 'firebase';

import { User } from "../../models/user";

import { UsercrudProvider } from "../../providers/usercrud/usercrud";

@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class LoginPage {

  //for splash animations
  splash=true;
  //end


  email: string;
  password: string;

  user = {} as User;

  constructor(public navCtrl: NavController, public navParams: NavParams,
  private afDatabase: AngularFireDatabase,
  private storage: Storage,
  private menu: MenuController,
  public googlePlus: GooglePlus,
  public afAuth: AngularFireAuth,
  private facebook: Facebook,
  private platform: Platform,
  private userProvider: UsercrudProvider) {
    
  }
  ionViewDidLoad() {
    setTimeout(() => {
      this.splash= false ;
    }, 4000);
    // 
  }

  signIn(email,password){

    try {
      this.afAuth.auth.signInWithEmailAndPassword(this.email,this.password).then(result => {
        if(result){
          console.log("sign in succeed");
          console.log(result);
          this.afDatabase.database.ref("/users/"+result.uid).on("value",snap => {
            console.log(snap.val());
            this.user.id = snap.val().id;
            this.user.displayName = snap.val().displayName;
            this.user.imageUrl = snap.val().imageUrl;
            this.user.email = snap.val().email;
            console.log(this.user);
            let currentUser = JSON.stringify(this.user);
            this.storage.set("currentUser", currentUser);
          });
        }else{
          console.log("signin error");
          console.log(result);
        }
      });
    } catch (error) {
      alert(error.message);
    }

  }

  ionViewDidEnter() {
    this.menu.swipeEnable(false);
  }

  ionViewWillLeave() {
    this.menu.swipeEnable(true);
   }

  googlePlusLogin(){
    this.googlePlus.login({
      'webClientId': '1063646526749-rsvbpaum0o6i1ol001h7gjcs36hqrces.apps.googleusercontent.com',
      'offline': true
    }).then(res => {
      console.log("resultat : ");
      console.log(res);
      firebase.auth().signInWithCredential(firebase.auth.GoogleAuthProvider.credential(res.idToken))
      .then(success => {
        console.log("google sign in sucess");
        console.log(success);
      }).catch(err => {
        console.log("google error");
        console.error(err);
      });

    });
  }

  facebookLogin(){

    if(this.platform.is("cordova")){
      this.facebook.login(['email', 'public_profile']).then(result => {
        console.log("facebook login result : " +result);
        const facebook1credential = firebase.auth.FacebookAuthProvider.credential(result.authResponse.accessToken);
        firebase.auth().signInWithCredential(facebook1credential).then(res => {
          console.log("sign in with credntials facebook : ");
          console.log(res);
          //initialize user
          this.user.email=res.email;
          this.user.id=res.uid;
          this.user.imageUrl=res.photoURL;
          this.user.displayName=res.displayName;
          console.log(this.user);
          //adding to database
          this.userProvider.addUser(this.user);
          //adding to global storage to simplify access
          let currentUser = JSON.stringify(this.user);
          this.storage.set("currentUser", currentUser);
        });
      });
    }else{
      this.afAuth.auth.signInWithPopup(new firebase.auth.FacebookAuthProvider()).then(res=>{
        console.log(res);
        //initialize user
        this.user.email=res.user.email;
        this.user.id=res.user.uid;
        this.user.imageUrl=res.user.photoURL;
        this.user.displayName=res.user.displayName;
        console.log(this.user);
        //adding to database
        this.userProvider.addUser(this.user);
        //adding to global storage to simplify access
        let currentUser = JSON.stringify(this.user);
        this.storage.set("currentUser", currentUser);
      });
    }

  }



  createAcount(){
    this.navCtrl.push(SignupPage);
  }

}