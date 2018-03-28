import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams  ,MenuController} from 'ionic-angular';
import { User } from "../../models/user";
import { AngularFireAuth } from 'angularfire2/auth';

import { UsercrudProvider } from './../../providers/usercrud/usercrud';
import { FirstConnectionPage } from "../../pages/first-connection/first-connection";

@Component({
  selector: 'page-signup',
  templateUrl: 'signup.html',
})
export class SignupPage {

  user = {} as User;

  constructor(public navCtrl: NavController,
    public navParams: NavParams,
    private afAuth : AngularFireAuth,
    private userCrudProvider: UsercrudProvider,
    private menu: MenuController) {
  }

  async register(user: User){
    try {
      const result = await this.afAuth.auth.createUserWithEmailAndPassword(
        user.email,user.password
      );

      if(result){
        const userSign = await this.afAuth.auth.signInWithEmailAndPassword(this.user.email,this.user.password);
        console.log(userSign);
        console.log("resultat : ")
        console.log(result);
        console.log("id :::::: ")
        console.log(result.uid);
        user.id = result.uid;
        this.userCrudProvider.addUser(user);        
        this.navCtrl.setRoot(FirstConnectionPage);
      }


    } catch (error) {
      console.log("erreur");
      console.log(error.message);
      alert(error.message);
    }
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad SignupPage');
  }

  ionViewDidEnter() {
    this.menu.swipeEnable(false);
  }

  ionViewWillLeave() {
    this.menu.swipeEnable(true);
   }

}
