import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { AngularFireDatabase } from 'angularfire2/database';
import { Storage } from '@ionic/storage';

import { User } from "../../models/user";
import { Invitation } from "../../models/invitation";
import { Friend } from "../../models/friend";

import { UsercrudProvider } from "../../providers/usercrud/usercrud";

@Component({
  selector: 'page-invitation',
  templateUrl: 'invitation.html',
})
export class InvitationPage {

  public invitations: Array<User> = [];

  currentUser = {} as User;
  invitationsRef =  this.afDatabase.database.ref('/invitations/');

  constructor(public navCtrl: NavController, public navParams: NavParams,
  private userProvider: UsercrudProvider,
  private storage: Storage,
  private afDatabase: AngularFireDatabase) {
    //get cuurent user from storage
    this.storage.get("currentUser").then(res => {
      this.currentUser = JSON.parse(res);
      console.log(this.currentUser);
      console.log(this.currentUser.email);
    }).then(()=>{
      //initialize invitations array
      this.initilizeInvitationsList();
    });

  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad InvitationPage');
  }

   initilizeInvitationsList(){
     this.invitationsRef
      .orderByChild("receiverId").equalTo(this.currentUser.id).on("value",invitSnapshot => {
          console.log("usersnapshot : "+invitSnapshot.val());
          this.invitations=[];
          invitSnapshot.forEach( invitNap => {
            console.log("usernap : "+invitNap.val());
            this.afDatabase.database.ref("/users/"+invitNap.val().senderId).once("value",userSnap=>{
              console.log(userSnap.val().displayName);
              this.invitations.push(userSnap.val());
            });
            //this.invitations.push(invitNap.val());
            return false;
          });
        });
  }

  /*getCurrentUser(id){
    this.afDatabase.database.ref("/users/").once('value',snap => {
      console.log(snap.val());
    });
  }*/


  acceptInvitation(invitation: User){
    var friend = {} as Friend;
    friend.senderId = invitation.id;
    friend.receiverId = this.currentUser.id;
    this.userProvider.acceptInvitation(friend).then(res => {
      console.log("friend accepted : " +res);
    });
  }

  declineInvitation(invitation){
    console.log(invitation);
  }
}
