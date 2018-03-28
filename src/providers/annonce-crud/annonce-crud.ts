import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AngularFireDatabase } from 'angularfire2/database';
import firebase from 'firebase';

import { Annonce } from "../../models/annonce";

@Injectable()
export class AnnonceCrudProvider {

  annonce = {} as Annonce;

  constructor(public http: HttpClient,
  public afDatabase: AngularFireDatabase) {
    console.log('Hello AnnonceCrudProvider Provider');
  }

  async addingAnnonce(annonce: Annonce,captureData: any){
  
    const ref = await this.afDatabase.database.ref('/annonces/');
    console.log("annonce from provider : ");
    console.log(annonce);
    ref.push(annonce).then(res => {
      console.log(res.key);
      const key = res.key;
      annonce.idAnnonce= key;
      this.afDatabase.database.ref('/annonces/'+annonce.idAnnonce).update(annonce).then(res=>{
        console.log("finished adding annonce");
        console.log(res);
      }).then(()=>{

        for (let index = 0; index < captureData.length; index++) {
          console.log("captureData[index] : ");
          console.log(captureData[index]);
          this.uploadImage(captureData[index],annonce.idAnnonce,index).then(()=>{index++;});    
        }
        // captureData.length()
        // captureData.forEach(captureDataUrl => {
        //   this.uploadImage(captureDataUrl,annonce.idAnnonce,index).then(()=>{index++;});
        // });
      });
    });
  
  }

  async uploadImage(captureDataUrl,idAnnonce,i){
    let storageRef = firebase.storage().ref("annoncesimages/"+idAnnonce+"/");

    const filename = i+".jpg";
    const imageRef = storageRef.child(filename);

    await imageRef.putString(captureDataUrl, firebase.storage.StringFormat.DATA_URL).then(snap=>{
      console.log("image added : "+snap);
      console.log(snap);
    });

  }

}
