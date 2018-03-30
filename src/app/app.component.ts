import { Component ,ViewChild } from '@angular/core';
import { Platform , Nav ,LoadingController} from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

import { LoginPage } from "../pages/login/login";
import { AngularFireAuth } from 'angularfire2/auth';
import { HomePage } from '../pages/home/home';
import { TabsPage } from '../pages/tabs/tabs';
import { PosterPage } from "../pages/poster/poster";
import { InvitationPage } from "../pages/invitation/invitation";
import { MessagesPage } from "../pages/messages/messages";
import { FirstConnectionPage } from "../pages/first-connection/first-connection";
import { AnnoncesPage } from "../pages/annonces/annonces";

@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  @ViewChild(Nav) nav: Nav;

  rootPage:any;


  //for splash animations
  // splash=true;
  //end

  pages: Array<{title: string, component: any}>;

  constructor(platform: Platform, statusBar: StatusBar,
    loadCnt : LoadingController,
    splashScreen: SplashScreen,
    private afAuth: AngularFireAuth) {
    
      platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      statusBar.styleDefault();
      splashScreen.hide();
      
    });
    
    // let loader = loadCnt.create({
    //   content: "wait ...",duration : 1500 
    // });
    // loader.present();
    


    this.pages = [
      { title: 'Home', component: TabsPage },
      { title: 'Les annonces', component: AnnoncesPage },
      { title: 'Invitations', component: InvitationPage },
      { title: 'Messages', component: MessagesPage },
    ];
    // this.splash = false;

    

    this.afAuth.auth.onAuthStateChanged(user => {

      if(user){
        
        this.rootPage=TabsPage ;
        // this.splash= false;
        console.log('auth state changed');
        console.log(user)
      }else{
        console.log("auth state changed erru");
      
        this.rootPage=LoginPage;
        // this.splash= false;
      }
    });

  }

  openPage(page) {
    // Reset the content nav to have just this page
    // we wouldn't want the back button to show in this scenario
    // this.splash = false;
    this.nav.setRoot(page.component);
  }

  // ionViewDidLoad() {

   
  //     this.splash = false;
  
  
  // }

}

