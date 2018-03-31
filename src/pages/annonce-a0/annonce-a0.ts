import { Component, ViewChild } from '@angular/core';
import { IonicPage, NavController, NavParams , AlertController , ToastController, Slides} from 'ionic-angular';

import { AngularFireAuth } from 'angularfire2/auth';
import firebase from 'firebase';

import { User } from "../../models/user";
import { Annonce } from "../../models/annonce";
import { AnnonceCrudProvider } from "../../providers/annonce-crud/annonce-crud";
import { UsercrudProvider } from "../../providers/usercrud/usercrud";

import { Camera, CameraOptions } from '@ionic-native/camera';
import { Geolocation } from '@ionic-native/geolocation';
import { ImagePicker , ImagePickerOptions } from '@ionic-native/image-picker';
import { TabsPage } from '../tabs/tabs';

@Component({
  selector: 'page-annonce-a0',
  templateUrl: 'annonce-a0.html',
})
export class AnnonceA0Page {

  @ViewChild(Slides) slides: Slides;

  
  imageNumber : number;

  captureDataUrl: any;

  currentLocation: any;

  annonce = {} as Annonce;
  user = {} as User;
  imgUrl: string = '';

  constructor(public navCtrl: NavController , private alertCtrl: AlertController,
    private toastCtrl: ToastController,
    private afAuth: AngularFireAuth,
    private annonceProvider: AnnonceCrudProvider,
    private usercrudProvider: UsercrudProvider,
    private camera: Camera,
    private geolocation: Geolocation,
    private imagePicker: ImagePicker) {


      this.imageNumber = 0;

      this.captureDataUrl = [];

      console.log("-------------------------------------------");
      this.geolocation.getCurrentPosition().then((resp) => {
            console.log("access position given");
            console.log(resp);
            this.currentLocation = resp.coords;
           }).catch((error) => {
             this.navCtrl.pop();
             console.log('Error getting location', error);
                    
           });

      this.afAuth.auth.onAuthStateChanged(user => {
        if(user){
          this.user.id = user.uid;
          console.log(this.user.id);
        }else{
          console.log("Erreur de chargement");
        }
      });

  }

  // ionViewWillEnter(){
  //   this.geolocation.getCurrentPosition().then((resp) => {
  //     console.log("access position given");
  //     console.log(resp);
  //     this.currentLocation = resp.coords;
  //    }).catch((error) => {
  //      this.navCtrl.pop();
  //      console.log('Error getting location', error);
              
  //    });
  // }
  

    // presentConfirm(typeAnnonce) {
    //   // let type = typeAnnonce as String
    //   if (<string>typeAnnonce  == "type0" || <string>typeAnnonce  == "type1"){
    //     let alert = this.alertCtrl.create({
    //         title: 'Confirm ?',
    //         message: 'Reputation level required ?',
    //         buttons: [
    //           {
    //             text: 'Approver',
    //             role: 'ok',
    //             handler: () => {
    //               console.log('Poste apprové');
    //             },
    //           },
    //           {
    //             text: 'Cancel',
    //             role: 'cancel',
    //             handler: () => {
    //               console.log('Poste annulé');
    //             },
    //           }]
    //         });
            
    //         alert.present();
    //   }
    //   console.log(typeAnnonce);

    // }

    async publierAnnonce(annonce: Annonce){
      console.log("current location : ");
      console.log(this.currentLocation);
      annonce.latitude = this.currentLocation.latitude;
      annonce.longitude = this.currentLocation.longitude;
      annonce.creatorAnnonceId = this.user.id;
      console.log(annonce);
      // await this.upload(annonce.titleAnnonce);
      // console.log("img url 1 : " +this.imgUrl)
      this.annonceProvider.addingAnnonce(annonce,this.captureDataUrl).then(()=>{
        this.usercrudProvider.updateReputation(this.user.id,2);
      }).then(()=>{
            let toast = this.toastCtrl.create({
              message: 'Votre annonce a ete publié',
              duration: 2000,
              position: 'middle'
            });
          
            toast.onDidDismiss(() => {
              this.navCtrl.setRoot(TabsPage);
            });
          
            toast.present();
          });
    }

    capture(){
      console.log("cameraaaaaaaa capture");
      const cameraOptions: CameraOptions = {
        quality: 50,
        destinationType: this.camera.DestinationType.DATA_URL,
        encodingType: this.camera.EncodingType.JPEG,
        mediaType: this.camera.MediaType.PICTURE
      };

      this.camera.getPicture(cameraOptions).then((imageData) => {

        console.log(imageData);
        let dataUrl = 'data:image/jpeg;base64,' + imageData;
        this.captureDataUrl.push(dataUrl);
        this.imageNumber++;
        console.log(this.captureDataUrl);

      },(err) => {
        console.log(err);
      });
    }

    pickImage(){
      const options: ImagePickerOptions = {
        maximumImagesCount:5 - this.imageNumber
      }
      this.imagePicker.getPictures(options).then((results) => {
        for (var i = 0; i < results.length; i++) {
            console.log('Image URI: ' + results[i]);
            let dataUrl = 'data:image/jpeg;base64,' + results[i];
            this.captureDataUrl.push(dataUrl);
            this.imageNumber++;
            console.log("this.imageNumber : "+this.imageNumber);
        }
      }, (err) => {console.log(err); })
    }

    // async upload(filename) {
    //   let storageRef = firebase.storage().ref();
    //   // Create a timestamp as filename
    //   //const filename = Math.floor(Date.now() / 1000);
  
    //   // Create a reference to 'images/todays-date.jpg'
    //   filename = filename+".jpg"
    //   console.log(filename);
    //   const imageRef = storageRef.child('annoncesimages/'+filename);
  
    //   await imageRef.putString(this.captureDataUrl, firebase.storage.StringFormat.DATA_URL).then((snapshot)=> {
    //     console.log("image ref : "+imageRef);
    //     console.log(snapshot);
    //     console.log(snapshot.downloadURL);
    //     this.imgUrl = snapshot.downloadURL;
    //    });
  
    // }
  
    //Slides :
    goToSlide() {
      this.slides.slideTo(2, 500);
    }

  }