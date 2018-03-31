import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams , AlertController , ToastController} from 'ionic-angular';
import { AnnonceA0Page } from "../annonce-a0/annonce-a0";

import { AnnonceA1Page } from "../annonce-a1/annonce-a1";
import { AnnonceA3Page } from "../annonce-a3/annonce-a3";
import { AnnonceA2Page } from "../annonce-a2/annonce-a2";
//delete later
import { Camera, CameraOptions } from '@ionic-native/camera';
import { AnnonceCrudProvider } from "../../providers/annonce-crud/annonce-crud";
import firebase from 'firebase';

@Component({
  selector: 'page-poster',
  templateUrl: 'poster.html',
})
export class PosterPage {

  captureDataUrl: any;

  constructor(public navCtrl: NavController , private alertCtrl: AlertController,
    private camera: Camera,
    private annonceCrudProvider: AnnonceCrudProvider) {

  }

  getImage(){
    let storageRef = firebase.storage().ref();
    storageRef.child('annoncesimages/aaaaa/1.jpg').getDownloadURL().then(res => {
      console.log(res);
    });
  }

  goToAide(){
this.navCtrl.push(AnnonceA3Page);
  }

goToFoyer(){
    this.navCtrl.push(AnnonceA2Page);
  }

goToBlessure(){
    this.navCtrl.push(AnnonceA1Page);
  }

  goToDanger(){
    this.navCtrl.push(AnnonceA0Page);
  }

  goToAutre(){
    
  }

  // presentPrompt() {

  //   this.navCtrl.push(AnnonceA0Page);


    // let alert = this.alertCtrl.create({
    //   title: 'Annonce',
    //   inputs: [
    //     {
    //       name: "Titre d'annonce",
    //       placeholder: 'Titre'
    //     },
    //     {
    //       name: "Description d'annonce",
    //       placeholder: 'Description',
    //       type: 'text'
    //     }
    //   ],
    //   buttons: [
    //     {
    //       text: 'Upload Image',
    //       role: 'send',
    //       handler: data => {
    //         console.log('image uploaded');
    //       }
    //     },{
    //       text: 'Position',
    //       role: 'send',
    //       handler: data => {
    //         console.log('position chosed');
    //       }
    //     },
    //     {
    //       text: 'Publish',
    //       handler: data => {
    //         console.log('announce published');
    //       }
    //     }
    //   ]
    // });
    // alert.present();
  // }

}