webpackJsonp([0],{

/***/ 161:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return LoginPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(15);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__signup_signup__ = __webpack_require__(327);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_angularfire2_auth__ = __webpack_require__(37);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_angularfire2_database__ = __webpack_require__(38);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__ionic_native_google_plus__ = __webpack_require__(314);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__ionic_native_facebook__ = __webpack_require__(315);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__ionic_storage__ = __webpack_require__(68);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8_firebase__ = __webpack_require__(88);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8_firebase___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_8_firebase__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9__providers_usercrud_usercrud__ = __webpack_require__(39);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};










var LoginPage = (function () {
    function LoginPage(navCtrl, navParams, afDatabase, storage, menu, googlePlus, afAuth, facebook, platform, userProvider) {
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.afDatabase = afDatabase;
        this.storage = storage;
        this.menu = menu;
        this.googlePlus = googlePlus;
        this.afAuth = afAuth;
        this.facebook = facebook;
        this.platform = platform;
        this.userProvider = userProvider;
        //for splash animations
        this.splash = true;
        this.user = {};
    }
    LoginPage.prototype.ionViewDidLoad = function () {
        var _this = this;
        setTimeout(function () {
            _this.splash = false;
        }, 4000);
        // 
    };
    LoginPage.prototype.signIn = function (email, password) {
        var _this = this;
        try {
            this.afAuth.auth.signInWithEmailAndPassword(this.email, this.password).then(function (result) {
                if (result) {
                    console.log("sign in succeed");
                    console.log(result);
                    _this.afDatabase.database.ref("/users/" + result.uid).on("value", function (snap) {
                        console.log(snap.val());
                        _this.user.id = snap.val().id;
                        _this.user.displayName = snap.val().displayName;
                        _this.user.imageUrl = snap.val().imageUrl;
                        _this.user.email = snap.val().email;
                        console.log(_this.user);
                        var currentUser = JSON.stringify(_this.user);
                        _this.storage.set("currentUser", currentUser);
                    });
                }
                else {
                    console.log("signin error");
                    console.log(result);
                }
            });
        }
        catch (error) {
            alert(error.message);
        }
    };
    LoginPage.prototype.ionViewDidEnter = function () {
        this.menu.swipeEnable(false);
    };
    LoginPage.prototype.ionViewWillLeave = function () {
        this.menu.swipeEnable(true);
    };
    LoginPage.prototype.googlePlusLogin = function () {
        this.googlePlus.login({
            'webClientId': '1063646526749-rsvbpaum0o6i1ol001h7gjcs36hqrces.apps.googleusercontent.com',
            'offline': true
        }).then(function (res) {
            console.log("resultat : ");
            console.log(res);
            __WEBPACK_IMPORTED_MODULE_8_firebase___default.a.auth().signInWithCredential(__WEBPACK_IMPORTED_MODULE_8_firebase___default.a.auth.GoogleAuthProvider.credential(res.idToken))
                .then(function (success) {
                console.log("google sign in sucess");
                console.log(success);
            }).catch(function (err) {
                console.log("google error");
                console.error(err);
            });
        });
    };
    LoginPage.prototype.facebookLogin = function () {
        var _this = this;
        if (this.platform.is("cordova")) {
            this.facebook.login(['email', 'public_profile']).then(function (result) {
                console.log("facebook login result : " + result);
                var facebook1credential = __WEBPACK_IMPORTED_MODULE_8_firebase___default.a.auth.FacebookAuthProvider.credential(result.authResponse.accessToken);
                __WEBPACK_IMPORTED_MODULE_8_firebase___default.a.auth().signInWithCredential(facebook1credential).then(function (res) {
                    console.log("sign in with credntials facebook : ");
                    console.log(res);
                    //initialize user
                    _this.user.email = res.email;
                    _this.user.id = res.uid;
                    _this.user.imageUrl = res.photoURL;
                    _this.user.displayName = res.displayName;
                    console.log(_this.user);
                    //adding to database
                    _this.userProvider.addUser(_this.user);
                    //adding to global storage to simplify access
                    var currentUser = JSON.stringify(_this.user);
                    _this.storage.set("currentUser", currentUser);
                });
            });
        }
        else {
            this.afAuth.auth.signInWithPopup(new __WEBPACK_IMPORTED_MODULE_8_firebase___default.a.auth.FacebookAuthProvider()).then(function (res) {
                console.log(res);
                //initialize user
                _this.user.email = res.user.email;
                _this.user.id = res.user.uid;
                _this.user.imageUrl = res.user.photoURL;
                _this.user.displayName = res.user.displayName;
                console.log(_this.user);
                //adding to database
                _this.userProvider.addUser(_this.user);
                //adding to global storage to simplify access
                var currentUser = JSON.stringify(_this.user);
                _this.storage.set("currentUser", currentUser);
            });
        }
    };
    LoginPage.prototype.createAcount = function () {
        this.navCtrl.push(__WEBPACK_IMPORTED_MODULE_2__signup_signup__["a" /* SignupPage */]);
    };
    LoginPage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["m" /* Component */])({
            selector: 'page-login',template:/*ion-inline-start:"/home/anwar/hanimo2/src/pages/login/login.html"*/'<!-- --Splash animations -- -->\n\n<div id="custom-overlay" [style.display]="splash ? \'flex\': \'none\'">\n  <div class="flb">\n    <div class="Aligner-item Aligner-item--top"></div>\n    <img src="assets/imgs/hanimo-logo.png">\n    <div class="Aligner-item Aligner-item--bottom"></div>\n  </div>\n</div>\n<!-- -- End Splash animations -- -->\n\n\n\n<ion-content class="background">\n  <ion-card>\n    <ion-grid>\n      <ion-row>\n        <ion-col >\n          <ion-item>\n            <ion-avatar class="center" >\n              <img src="assets/imgs/hanimo-logo1.jpg">\n            </ion-avatar>\n            <p class="connecter-vous-text"> Connectez Vous</p>\n          </ion-item>\n            </ion-col>\n      </ion-row>\n      <ion-row>\n        <ion-col>\n              <ion-item>\n                <ion-label floating>Adresse Email</ion-label>\n                <ion-input type="email" [(ngModel)]="email" flex ></ion-input>\n              </ion-item>\n              <ion-item>\n                <ion-label floating>Mot de passe</ion-label>\n                <ion-input type="password" [(ngModel)]="password" ></ion-input>\n              </ion-item>\n        </ion-col>\n      </ion-row>\n      <ion-row>\n        <ion-col>\n              <ion-item>\n                  <div class="reverse">\n                     <a>mot de passe oublié?</a></div>\n              \n              </ion-item>\n        </ion-col>\n      </ion-row>\n      <ion-row>\n        <ion-col class="connecter" >      \n              <button class="login-button" (click)="signIn(email,password)" ion-button color="orange-" round outline>Se Connecter</button>\n              <hr>  \n              <p >Ou connecter vous via</p>\n              \n        </ion-col>\n      </ion-row>   \n      <ion-row justify-content-star>\n        <ion-col > \n              <button class="facebook-button" (click)="facebookLogin()" ion-button color="Primary" outline icon-left color="facebook">\n                <ion-icon name="logo-facebook"></ion-icon>\n                <div>Facebook</div>\n              </button>\n        </ion-col>\n        <ion-col >\n              <button class="google-button" (click)="googlePlusLogin()" ion-button color="google" outline  icon-left>\n                <ion-icon name="logo-google"></ion-icon>\n                <div>Google+</div>\n              </button>\n        </ion-col>\n      </ion-row>\n      <ion-row>\n        <ion-col> \n              <!-- <b> Ou </b> -->\n              <button (click)="createAcount()" block ion-button color="secondary"  icon-left>\n               \n                <div>Creer votre compte</div>\n              </button> \n        </ion-col>\n      </ion-row>\n    </ion-grid>\n  </ion-card> \n</ion-content>\n'/*ion-inline-end:"/home/anwar/hanimo2/src/pages/login/login.html"*/,
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["h" /* NavController */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["i" /* NavParams */],
            __WEBPACK_IMPORTED_MODULE_4_angularfire2_database__["a" /* AngularFireDatabase */],
            __WEBPACK_IMPORTED_MODULE_7__ionic_storage__["b" /* Storage */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["f" /* MenuController */],
            __WEBPACK_IMPORTED_MODULE_5__ionic_native_google_plus__["a" /* GooglePlus */],
            __WEBPACK_IMPORTED_MODULE_3_angularfire2_auth__["a" /* AngularFireAuth */],
            __WEBPACK_IMPORTED_MODULE_6__ionic_native_facebook__["a" /* Facebook */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["j" /* Platform */],
            __WEBPACK_IMPORTED_MODULE_9__providers_usercrud_usercrud__["a" /* UsercrudProvider */]])
    ], LoginPage);
    return LoginPage;
}());

//# sourceMappingURL=login.js.map

/***/ }),

/***/ 162:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return MessagesPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(15);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};


var MessagesPage = (function () {
    function MessagesPage(navCtrl, navParams) {
        this.navCtrl = navCtrl;
        this.navParams = navParams;
    }
    MessagesPage.prototype.ionViewDidLoad = function () {
        console.log('ionViewDidLoad MessagesPage');
    };
    MessagesPage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["m" /* Component */])({
            selector: 'page-messages',template:/*ion-inline-start:"/home/anwar/hanimo2/src/pages/messages/messages.html"*/'<ion-header>\n  <ion-navbar  color="sandy-brown">\n      <button ion-button icon-only menuToggle  >\n          <ion-icon name="menu"></ion-icon>\n        </button>\n    <ion-title>Messages</ion-title>\n  </ion-navbar>\n</ion-header>\n\n<ion-content padding>\n    <ion-list>\n        <ion-list-header><h2>Messages</h2></ion-list-header>\n        <ion-item-sliding>\n            <!-- First User -->\n          <ion-item>\n                <ion-thumbnail item-start>\n              <ion-avatar item-start>\n                <img src="./../assets/imgs/avatar.jpg">\n              </ion-avatar>\n              </ion-thumbnail>\n              <h2>User1</h2>\n              <p>balalala</p>\n            </ion-item>\n            <ion-item-options side="right">\n                <button ion-button color="primary">\n                  <ion-icon name="text"></ion-icon>\n                  Text\n                </button>\n                <button ion-button color="secondary">\n                  <ion-icon name="call"></ion-icon>\n                  Call\n                </button>\n              </ion-item-options>\n              <ion-item-options side="left">\n                <button ion-button color="danger">\n                  <ion-icon name="mail"></ion-icon>\n                  Delete\n                </button>\n              </ion-item-options>\n            </ion-item-sliding>\n\n          <!-- Second User -->\n            <ion-item-sliding>\n            <ion-item>\n                <ion-thumbnail item-start>\n              <ion-avatar item-start>\n                <img src="./../assets/imgs/avatar.jpg">\n              </ion-avatar>\n              </ion-thumbnail>\n              <h2>User1</h2>\n              <p>balalala</p>\n            </ion-item>\n            <ion-item-options side="right">\n                <button ion-button color="primary">\n                  <ion-icon name="text"></ion-icon>\n                  Text\n                </button>\n                <button ion-button color="secondary">\n                  <ion-icon name="call"></ion-icon>\n                  Call\n                </button>\n              </ion-item-options>\n              <ion-item-options side="left">\n                <button ion-button color="danger">\n                  <ion-icon name="mail"></ion-icon>\n                  Delete\n                </button>\n              </ion-item-options>\n            </ion-item-sliding>\n            <!-- Third User -->\n          <ion-item-sliding>\n            <ion-item>\n                <ion-thumbnail item-start>\n              <ion-avatar item-start>\n                <img src="./../assets/imgs/avatar.jpg">\n              </ion-avatar>\n              </ion-thumbnail>\n              <h2>User1</h2>\n              <p>balalala</p>\n            </ion-item>\n            <ion-item-options side="right">\n                <button ion-button color="primary">\n                  <ion-icon name="text"></ion-icon>\n                  Text\n                </button>\n                <button ion-button color="secondary">\n                  <ion-icon name="call"></ion-icon>\n                  Call\n                </button>\n              </ion-item-options>\n              <ion-item-options side="left">\n                <button ion-button color="danger">\n                  <ion-icon name="mail"></ion-icon>\n                  Delete\n                </button>\n              </ion-item-options>\n            </ion-item-sliding>\n      </ion-list>\n</ion-content>'/*ion-inline-end:"/home/anwar/hanimo2/src/pages/messages/messages.html"*/,
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["h" /* NavController */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["i" /* NavParams */]])
    ], MessagesPage);
    return MessagesPage;
}());

//# sourceMappingURL=messages.js.map

/***/ }),

/***/ 163:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return AnnonceCrudProvider; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_common_http__ = __webpack_require__(140);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_angularfire2_database__ = __webpack_require__(38);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_firebase__ = __webpack_require__(88);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_firebase___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_3_firebase__);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = y[op[0] & 2 ? "return" : op[0] ? "throw" : "next"]) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [0, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};




var AnnonceCrudProvider = (function () {
    function AnnonceCrudProvider(http, afDatabase) {
        this.http = http;
        this.afDatabase = afDatabase;
        this.annonce = {};
        console.log('Hello AnnonceCrudProvider Provider');
    }
    AnnonceCrudProvider.prototype.addingAnnonce = function (annonce, captureData) {
        return __awaiter(this, void 0, void 0, function () {
            var _this = this;
            var ref;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.afDatabase.database.ref('/annonces/')];
                    case 1:
                        ref = _a.sent();
                        console.log("annonce from provider : ");
                        console.log(annonce);
                        ref.push(annonce).then(function (res) {
                            console.log(res.key);
                            var key = res.key;
                            annonce.idAnnonce = key;
                            _this.afDatabase.database.ref('/annonces/' + annonce.idAnnonce).update(annonce).then(function (res) {
                                console.log("finished adding annonce");
                                console.log(res);
                            }).then(function () {
                                var _loop_1 = function (index) {
                                    console.log("captureData[index] : ");
                                    console.log(captureData[index]);
                                    _this.uploadImage(captureData[index], annonce.idAnnonce, index).then(function () { index++; });
                                    out_index_1 = index;
                                };
                                var out_index_1;
                                for (var index = 0; index < captureData.length; index++) {
                                    _loop_1(index);
                                    index = out_index_1;
                                }
                                // captureData.length()
                                // captureData.forEach(captureDataUrl => {
                                //   this.uploadImage(captureDataUrl,annonce.idAnnonce,index).then(()=>{index++;});
                                // });
                            });
                        });
                        return [2 /*return*/];
                }
            });
        });
    };
    AnnonceCrudProvider.prototype.uploadImage = function (captureDataUrl, idAnnonce, i) {
        return __awaiter(this, void 0, void 0, function () {
            var storageRef, filename, imageRef;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        storageRef = __WEBPACK_IMPORTED_MODULE_3_firebase___default.a.storage().ref("annoncesimages/" + idAnnonce + "/");
                        filename = i + ".jpg";
                        imageRef = storageRef.child(filename);
                        return [4 /*yield*/, imageRef.putString(captureDataUrl, __WEBPACK_IMPORTED_MODULE_3_firebase___default.a.storage.StringFormat.DATA_URL).then(function (snap) {
                                console.log("image added : " + snap);
                                console.log(snap);
                            })];
                    case 1:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    AnnonceCrudProvider = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_1__angular_core__["A" /* Injectable */])(),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_0__angular_common_http__["a" /* HttpClient */],
            __WEBPACK_IMPORTED_MODULE_2_angularfire2_database__["a" /* AngularFireDatabase */]])
    ], AnnonceCrudProvider);
    return AnnonceCrudProvider;
}());

//# sourceMappingURL=annonce-crud.js.map

/***/ }),

/***/ 164:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return InvitationPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(15);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_angularfire2_database__ = __webpack_require__(38);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__ionic_storage__ = __webpack_require__(68);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__providers_usercrud_usercrud__ = __webpack_require__(39);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};





var InvitationPage = (function () {
    function InvitationPage(navCtrl, navParams, userProvider, storage, afDatabase) {
        var _this = this;
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.userProvider = userProvider;
        this.storage = storage;
        this.afDatabase = afDatabase;
        this.invitations = [];
        this.currentUser = {};
        this.invitationsRef = this.afDatabase.database.ref('/invitations/');
        //get cuurent user from storage
        this.storage.get("currentUser").then(function (res) {
            _this.currentUser = JSON.parse(res);
            console.log(_this.currentUser);
            console.log(_this.currentUser.email);
        }).then(function () {
            //initialize invitations array
            _this.initilizeInvitationsList();
        });
    }
    InvitationPage.prototype.ionViewDidLoad = function () {
        console.log('ionViewDidLoad InvitationPage');
    };
    InvitationPage.prototype.initilizeInvitationsList = function () {
        var _this = this;
        this.invitationsRef
            .orderByChild("receiverId").equalTo(this.currentUser.id).on("value", function (invitSnapshot) {
            console.log("usersnapshot : " + invitSnapshot.val());
            _this.invitations = [];
            invitSnapshot.forEach(function (invitNap) {
                console.log("usernap : " + invitNap.val());
                _this.afDatabase.database.ref("/users/" + invitNap.val().senderId).once("value", function (userSnap) {
                    console.log(userSnap.val().displayName);
                    _this.invitations.push(userSnap.val());
                });
                //this.invitations.push(invitNap.val());
                return false;
            });
        });
    };
    /*getCurrentUser(id){
      this.afDatabase.database.ref("/users/").once('value',snap => {
        console.log(snap.val());
      });
    }*/
    InvitationPage.prototype.acceptInvitation = function (invitation) {
        var friend = {};
        friend.senderId = invitation.id;
        friend.receiverId = this.currentUser.id;
        this.userProvider.acceptInvitation(friend).then(function (res) {
            console.log("friend accepted : " + res);
        });
    };
    InvitationPage.prototype.declineInvitation = function (invitation) {
        console.log(invitation);
    };
    InvitationPage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["m" /* Component */])({
            selector: 'page-invitation',template:/*ion-inline-start:"/home/anwar/hanimo2/src/pages/invitation/invitation.html"*/'<ion-header>\n  <ion-navbar  color="sandy-brown">\n      <button ion-button icon-only menuToggle  >\n          <ion-icon name="menu"></ion-icon>\n        </button>\n    <ion-title>\n      Invitations\n    </ion-title>\n  </ion-navbar>\n</ion-header>\n\n<ion-content>\n    <ion-list *ngFor="let invitation of invitations" >\n\n        <ion-item >\n          <ion-thumbnail item-start>\n            <img src="{{invitation.imageUrl}}">\n          </ion-thumbnail>\n          <h2>{{invitation.displayName}} </h2>\n          <p>id : {{invitation.id}}</p>\n          <button (click)="acceptInvitation(invitation)" ion-button clear item-end>Accept</button>\n          <button (click)="declineInvitation(invitation.id)" ion-button clear item-end>Decline</button>\n        </ion-item>\n    \n      </ion-list>\n</ion-content>  '/*ion-inline-end:"/home/anwar/hanimo2/src/pages/invitation/invitation.html"*/,
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["h" /* NavController */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["i" /* NavParams */],
            __WEBPACK_IMPORTED_MODULE_4__providers_usercrud_usercrud__["a" /* UsercrudProvider */],
            __WEBPACK_IMPORTED_MODULE_3__ionic_storage__["b" /* Storage */],
            __WEBPACK_IMPORTED_MODULE_2_angularfire2_database__["a" /* AngularFireDatabase */]])
    ], InvitationPage);
    return InvitationPage;
}());

//# sourceMappingURL=invitation.js.map

/***/ }),

/***/ 177:
/***/ (function(module, exports) {

function webpackEmptyAsyncContext(req) {
	// Here Promise.resolve().then() is used instead of new Promise() to prevent
	// uncatched exception popping up in devtools
	return Promise.resolve().then(function() {
		throw new Error("Cannot find module '" + req + "'.");
	});
}
webpackEmptyAsyncContext.keys = function() { return []; };
webpackEmptyAsyncContext.resolve = webpackEmptyAsyncContext;
module.exports = webpackEmptyAsyncContext;
webpackEmptyAsyncContext.id = 177;

/***/ }),

/***/ 219:
/***/ (function(module, exports) {

function webpackEmptyAsyncContext(req) {
	// Here Promise.resolve().then() is used instead of new Promise() to prevent
	// uncatched exception popping up in devtools
	return Promise.resolve().then(function() {
		throw new Error("Cannot find module '" + req + "'.");
	});
}
webpackEmptyAsyncContext.keys = function() { return []; };
webpackEmptyAsyncContext.resolve = webpackEmptyAsyncContext;
module.exports = webpackEmptyAsyncContext;
webpackEmptyAsyncContext.id = 219;

/***/ }),

/***/ 327:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return SignupPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(15);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_angularfire2_auth__ = __webpack_require__(37);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__providers_usercrud_usercrud__ = __webpack_require__(39);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__pages_first_connection_first_connection__ = __webpack_require__(328);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = y[op[0] & 2 ? "return" : op[0] ? "throw" : "next"]) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [0, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};





var SignupPage = (function () {
    function SignupPage(navCtrl, navParams, afAuth, userCrudProvider, menu) {
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.afAuth = afAuth;
        this.userCrudProvider = userCrudProvider;
        this.menu = menu;
        this.user = {};
    }
    SignupPage.prototype.register = function (user) {
        return __awaiter(this, void 0, void 0, function () {
            var result, userSign, error_1;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 4, , 5]);
                        return [4 /*yield*/, this.afAuth.auth.createUserWithEmailAndPassword(user.email, user.password)];
                    case 1:
                        result = _a.sent();
                        if (!result) return [3 /*break*/, 3];
                        return [4 /*yield*/, this.afAuth.auth.signInWithEmailAndPassword(this.user.email, this.user.password)];
                    case 2:
                        userSign = _a.sent();
                        console.log(userSign);
                        console.log("resultat : ");
                        console.log(result);
                        console.log("id :::::: ");
                        console.log(result.uid);
                        user.id = result.uid;
                        this.userCrudProvider.addUser(user);
                        this.navCtrl.setRoot(__WEBPACK_IMPORTED_MODULE_4__pages_first_connection_first_connection__["a" /* FirstConnectionPage */]);
                        _a.label = 3;
                    case 3: return [3 /*break*/, 5];
                    case 4:
                        error_1 = _a.sent();
                        console.log("erreur");
                        console.log(error_1.message);
                        alert(error_1.message);
                        return [3 /*break*/, 5];
                    case 5: return [2 /*return*/];
                }
            });
        });
    };
    SignupPage.prototype.ionViewDidLoad = function () {
        console.log('ionViewDidLoad SignupPage');
    };
    SignupPage.prototype.ionViewDidEnter = function () {
        this.menu.swipeEnable(false);
    };
    SignupPage.prototype.ionViewWillLeave = function () {
        this.menu.swipeEnable(true);
    };
    SignupPage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["m" /* Component */])({
            selector: 'page-signup',template:/*ion-inline-start:"/home/anwar/hanimo2/src/pages/signup/signup.html"*/'<ion-header>\n  <ion-navbar color="sandy-brown">\n    <ion-title>\n    Creer un compte\n  </ion-title>\n  </ion-navbar>\n</ion-header>\n\n<ion-content class="background">\n\n\n    <ion-card>\n        <ion-grid>\n          <ion-row>\n            <ion-col >\n              <ion-item>\n                <ion-avatar class="center" >\n                  <img src="assets/imgs/edit-profile.png">\n                </ion-avatar>\n              </ion-item>\n                </ion-col>\n          </ion-row>\n          <ion-row>\n            <ion-col>\n                <ion-item>\n                    <ion-label floating>Nom</ion-label>\n                    <ion-input type="text" [(ngModel)]="user.nom" ></ion-input>\n                </ion-item>\n        \n                <ion-item>\n                    <ion-label floating>Prénom</ion-label>\n                    <ion-input type="text" [(ngModel)]="user.prenom" ></ion-input>\n                </ion-item> \n                 <ion-item>\n                  <ion-label floating>Pseudo</ion-label>\n                  <ion-input type="text" [(ngModel)]="user.displayName" ></ion-input>\n                  </ion-item>\n                  <ion-item>\n                      <ion-label floating>Adresse E-mail</ion-label>\n                      <ion-input type="text" [(ngModel)]="user.email" ></ion-input>\n                  </ion-item>\n                  <ion-item>\n                      <ion-label floating>Mot de passe</ion-label>\n                      <ion-input type="password" [(ngModel)]="user.password" ></ion-input>\n                  </ion-item>\n      \n                <ion-item>\n                    <ion-label floating>confirmer le mot de passe</ion-label>\n                    <ion-input type="password" [(ngModel)]="verifPassword" ></ion-input>\n                </ion-item>\n        \n                \n            </ion-col>\n          </ion-row>\n          <ion-row>\n            <ion-col class="connecter" >      \n                  <button class="login-button" ion-button color="danger" round outline (click)="register(user)" >S\'inscrire</button>\n                  \n                  \n            </ion-col>\n          </ion-row>\n          </ion-grid>\n          </ion-card>\n\n\n\n\n<!-- \n  <h1>Hanimo</h1>\n  \n    <ion-card>\n  \n      <ion-card-header>\n        Creer votre compte\n      </ion-card-header>\n  \n      <ion-card-content>\n          <ion-list no-lines>\n  \n         \n         \n\n\n      <br>\n          <button ion-button color="primary" block (click)="register(user)" >S\'inscrire</button>      \n  \n          </ion-list>\n      </ion-card-content>\n    </ion-card> -->\n  \n  </ion-content>'/*ion-inline-end:"/home/anwar/hanimo2/src/pages/signup/signup.html"*/,
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["h" /* NavController */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["i" /* NavParams */],
            __WEBPACK_IMPORTED_MODULE_2_angularfire2_auth__["a" /* AngularFireAuth */],
            __WEBPACK_IMPORTED_MODULE_3__providers_usercrud_usercrud__["a" /* UsercrudProvider */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["f" /* MenuController */]])
    ], SignupPage);
    return SignupPage;
}());

//# sourceMappingURL=signup.js.map

/***/ }),

/***/ 328:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return FirstConnectionPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(15);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_angularfire2_auth__ = __webpack_require__(37);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__complete_profile_complete_profile__ = __webpack_require__(329);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__tabs_tabs__ = __webpack_require__(91);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5_angularfire2_database__ = __webpack_require__(38);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};






var FirstConnectionPage = (function () {
    function FirstConnectionPage(navCtrl, navParams, afAuth, afDatabase) {
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.afAuth = afAuth;
        this.afDatabase = afDatabase;
        this.user = {};
        this.afAuth.auth.onAuthStateChanged(function (user) {
            if (user) {
                console.log('auth state changed');
                console.log(user);
            }
            else {
                console.log("auth state changed erru");
            }
        });
        console.log(this.navParams.get("userId"));
        this.user.id = this.navParams.get("userId");
        console.log("user id : " + this.user.id);
    }
    FirstConnectionPage.prototype.ionViewDidLoad = function () {
        //console.log('ionViewDidLoad FirstConnectionPage');
    };
    FirstConnectionPage.prototype.goToCompleteProfile = function () {
        this.navCtrl.setRoot(__WEBPACK_IMPORTED_MODULE_3__complete_profile_complete_profile__["a" /* CompleteProfilePage */]);
    };
    FirstConnectionPage.prototype.skipToHome = function () {
        this.navCtrl.setRoot(__WEBPACK_IMPORTED_MODULE_4__tabs_tabs__["a" /* TabsPage */]);
    };
    FirstConnectionPage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["m" /* Component */])({
            selector: 'page-first-connection',template:/*ion-inline-start:"/home/anwar/hanimo2/src/pages/first-connection/first-connection.html"*/'<ion-content>\n  <ion-card class="card">\n      <img class="avatar" src="assets/imgs/defaultAvatar.png"/>\n      <ion-card-content class="card-content">\n          <ion-card-title>\n              Hamza Ben Romdhane \n          </ion-card-title>\n          <button (click)="goToCompleteProfile()" ion-button color="secondary" block icon-left>\n              Completer vos informations de profil\n          </button>\n          <button (click)="skipToHome()" ion-button color="light">Passer</button>\n      </ion-card-content>\n    </ion-card>\n</ion-content>'/*ion-inline-end:"/home/anwar/hanimo2/src/pages/first-connection/first-connection.html"*/,
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["h" /* NavController */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["i" /* NavParams */],
            __WEBPACK_IMPORTED_MODULE_2_angularfire2_auth__["a" /* AngularFireAuth */],
            __WEBPACK_IMPORTED_MODULE_5_angularfire2_database__["a" /* AngularFireDatabase */]])
    ], FirstConnectionPage);
    return FirstConnectionPage;
}());

//# sourceMappingURL=first-connection.js.map

/***/ }),

/***/ 329:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return CompleteProfilePage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(15);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_angularfire2_auth__ = __webpack_require__(37);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__providers_usercrud_usercrud__ = __webpack_require__(39);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};




var CompleteProfilePage = (function () {
    function CompleteProfilePage(navCtrl, navParams, afAuth, usercrudProvider) {
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.afAuth = afAuth;
        this.usercrudProvider = usercrudProvider;
        this.user = {};
    }
    CompleteProfilePage.prototype.ionViewDidLoad = function () {
        var _this = this;
        console.log('ionViewDidLoad CompleteProfilePage');
        this.afAuth.auth.onAuthStateChanged(function (res) {
            if (res) {
                console.log('auth state changed');
                console.log(res);
                _this.user.id = res.uid;
            }
            else {
                console.log("auth state changed erru");
            }
        });
    };
    CompleteProfilePage.prototype.completeProfile = function (user) {
        console.log("Complete Profile");
        console.log(user);
        console.log(this.user);
        this.usercrudProvider.completeProfile(user);
    };
    CompleteProfilePage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["m" /* Component */])({
            selector: 'page-complete-profile',template:/*ion-inline-start:"/home/anwar/hanimo2/src/pages/complete-profile/complete-profile.html"*/'<ion-content>\n  <ion-card class="card">\n\n      <h1 ion-text>Completer les informations de votre profil</h1>\n      <img class="avatar" src="assets/imgs/defaultAvatar.png" />\n      <ion-card-content class="card-content">\n          <ion-card-title>\n              Hamza Ben Romdhane \n          </ion-card-title>\n\n          <ion-list>\n\n              <ion-item>\n                  <ion-label stacked>Numero de telephone</ion-label>\n                  <ion-input type="tel" [(ngModel)]="user.numTel" ></ion-input>\n              </ion-item>\n              <ion-item>\n                  <ion-label stacked>ou habiter vous</ion-label>\n                  <ion-input type="text" [(ngModel)]="user.habiter" ></ion-input>\n              </ion-item>\n              <ion-item>\n                  <ion-label stacked>Date de naissance</ion-label>\n                  <ion-datetime displayFormat="MM/DD/YYYY" [(ngModel)]="user.naissanceDate"></ion-datetime>\n              </ion-item>\n\n              <ion-item>\n                  <ion-label stacked>Sexe</ion-label>\n                  <ion-input type="text" [(ngModel)]="user.sexe" ></ion-input>\n              </ion-item>\n\n              <ion-item>\n                  <button (click)="completeProfile(user)" ion-button block outline>Completer</button>\n              </ion-item>\n          </ion-list>\n\n      </ion-card-content>\n    </ion-card>\n\n\n  \n</ion-content>'/*ion-inline-end:"/home/anwar/hanimo2/src/pages/complete-profile/complete-profile.html"*/,
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["h" /* NavController */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["i" /* NavParams */],
            __WEBPACK_IMPORTED_MODULE_2_angularfire2_auth__["a" /* AngularFireAuth */],
            __WEBPACK_IMPORTED_MODULE_3__providers_usercrud_usercrud__["a" /* UsercrudProvider */]])
    ], CompleteProfilePage);
    return CompleteProfilePage;
}());

//# sourceMappingURL=complete-profile.js.map

/***/ }),

/***/ 330:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return HomePage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__ionic_storage__ = __webpack_require__(68);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_ionic_angular__ = __webpack_require__(15);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__search_search__ = __webpack_require__(331);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__login_login__ = __webpack_require__(161);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5_angularfire2_database__ = __webpack_require__(38);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6_angularfire2_auth__ = __webpack_require__(37);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__providers_usercrud_usercrud__ = __webpack_require__(39);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__ionic_native_geolocation__ = __webpack_require__(153);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};









var HomePage = (function () {
    function HomePage(navCtrl, storage, afAuth, afDatabase, userProvider, geolocation) {
        /*this.afAuth.auth.onAuthStateChanged(user => {
          if(user){
            this.user.id = user.uid;
            console.log(this.user.id);
          }else{
            console.log("Erreur de chargement");
          }
        });*/
        var _this = this;
        this.navCtrl = navCtrl;
        this.storage = storage;
        this.afAuth = afAuth;
        this.afDatabase = afDatabase;
        this.userProvider = userProvider;
        this.geolocation = geolocation;
        this.currentUser = {};
        this.storage.get("currentUser").then(function (res) {
            _this.currentUser = JSON.parse(res);
            console.log("home page current user : " + _this.currentUser.displayName);
        });
        this.geolocation.getCurrentPosition().then(function (resp) {
            console.log("access position given");
            console.log(resp);
            _this.pos = resp;
        }).catch(function (error) {
            _this.navCtrl.pop();
            console.log('Error getting location', error);
        });
    }
    /*readUser(){
      console.log(this.user.id);
      this.userProvider.findUserbyId(this.user.id);
    }*/
    //go to search page
    HomePage.prototype.rootSearch = function () {
        this.navCtrl.push(__WEBPACK_IMPORTED_MODULE_3__search_search__["a" /* SearchPage */]);
    };
    HomePage.prototype.signOut = function () {
        var _this = this;
        this.storage.clear().then(function (res) {
            _this.afAuth.auth.signOut().then(function () {
                console.log("sign out : " + res);
                _this.navCtrl.setRoot(__WEBPACK_IMPORTED_MODULE_4__login_login__["a" /* LoginPage */]);
            });
        });
    };
    HomePage.prototype.getFriendList = function () {
        var _this = this;
        console.log("getting friend list : ");
        this.afDatabase.list("/friends/").valueChanges().subscribe(function (data) {
            _this.myFriends = data;
            console.log("my friends : " + _this.myFriends);
            _this.friendList = [];
            _this.myFriends.forEach(function (element) {
                console.log("element : " + element);
                console.log("element sender id : " + element.senderId);
                _this.afDatabase.object("/users/" + element.senderId).valueChanges().subscribe(function (data) {
                    _this.friendList.push(data);
                });
            });
        });
        this.showFriend();
    };
    HomePage.prototype.showFriend = function () {
        this.friendList.forEach(function (element) {
            console.log("elemnt user nchallah : " + element);
            console.log("elemnt user name nchallah : " + element.displayName);
        });
    };
    HomePage.prototype.updateReputation = function () {
        this.userProvider.updateReputation(this.currentUser.id, 5);
    };
    HomePage.prototype.getPosition = function () {
        console.log(this.pos);
    };
    HomePage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["m" /* Component */])({
            selector: 'page-home',template:/*ion-inline-start:"/home/anwar/hanimo2/src/pages/home/home.html"*/'<ion-header color="sandy-brown"> \n  <ion-toolbar color="sandy-brown" >\n    <button ion-button menuToggle>\n      <ion-icon name="menu"></ion-icon>\n    </button>\n    <ion-title>Accueil</ion-title> \n    <ion-buttons end>\n      <button ion-button icon-only color="royal" (click)="rootSearch()"  >\n        <ion-icon name="search"></ion-icon>\n      </button>\n    </ion-buttons>\n  </ion-toolbar> \n</ion-header>\n\n\n<ion-content>\n<!-- BESOIN D"AIDE -->\n\n  <ion-card>\n       <div class="category aide">Aide</div>\n      <ion-item>\n      <ion-avatar item-start>\n        <img src="assets/imgs/avatar.jpg">\n      </ion-avatar>\n    <h2>Username</h2>\n    <p>System.date</p>\n  </ion-item>\n\n  <ion-item >\n      <ion-label >here text tatatatatatatatatata </ion-label>\n    </ion-item>\n  <ion-card-content>\n    <!-- <img src="assets/imgs/post-img.jpg" /> -->\n    <!-- <ion-item class="button-customize" class="item-custm"> -->\n      <ion-grid>\n        <ion-row class="bfont">\n          \n          <ion-col >\n            <button ion-button clear  color="maron" >\n              <ion-icon name=\'thumbs-up\'></ion-icon></button>\n          </ion-col>\n          <ion-col >\n            <button ion-button clear color="maron">\n              <ion-icon name=\'thumbs-down\'></ion-icon></button>\n          </ion-col>\n          <ion-col >\n            <button ion-button clear  color="maron" >\n              <ion-icon name=\'bookmarks\' ></ion-icon></button>\n          </ion-col>\n          <ion-col>\n            <button ion-button clear  color="maron"><ion-icon  name="logo-facebook" class="facebook-button"></ion-icon></button>\n          </ion-col>\n            <ion-col>\n            <button ion-button clear color="maron"><ion-icon name="logo-googleplus" class="google-button"></ion-icon></button>\n          \n          </ion-col>\n        </ion-row>\n        <ion-row>\n          <ion-col>\n                <ion-input type="text" placeholder="comment" item-start></ion-input>\n          </ion-col>\n        </ion-row>\n      </ion-grid>\n </ion-card-content>\n</ion-card>\n<!-- CHERCHANT FOYER  -->\n\n <ion-card>\n       <div class="category foyer">Foyer</div>\n      <ion-item>\n      <ion-avatar item-start>\n        <img src="assets/imgs/avatar.jpg">\n      </ion-avatar>\n    <h2>Username</h2>\n    <p>System.date</p>\n  </ion-item>\n\n  <ion-item >\n      <ion-label >here text tatatatatatatatatata </ion-label>\n    </ion-item>\n  <ion-card-content>\n    <!-- <img src="assets/imgs/post-img.jpg" /> -->\n    <!-- <ion-item class="button-customize" class="item-custm"> -->\n      <ion-grid>\n        <ion-row class="bfont">\n          \n          <ion-col >\n            <button ion-button clear  color="maron" >\n              <ion-icon name=\'thumbs-up\'></ion-icon></button>\n          </ion-col>\n          <ion-col >\n            <button ion-button clear color="maron">\n              <ion-icon name=\'thumbs-down\'></ion-icon></button>\n          </ion-col>\n          <ion-col >\n            <button ion-button clear  color="maron" >\n              <ion-icon name=\'bookmarks\' ></ion-icon></button>\n          </ion-col>\n          <ion-col>\n            <button ion-button clear  color="maron"><ion-icon  name="logo-facebook" class="facebook-button"></ion-icon></button>\n          </ion-col>\n            <ion-col>\n            <button ion-button clear color="maron"><ion-icon name="logo-googleplus" class="google-button"></ion-icon></button>\n          \n          </ion-col>\n        </ion-row>\n        <ion-row>\n          <ion-col>\n                <ion-input type="text" placeholder="comment" item-start></ion-input>\n          </ion-col>\n        </ion-row>\n      </ion-grid>     \n    </ion-card-content>\n  </ion-card>\n\n<!-- BLESSURE OU MALADIE -->\n\n <ion-card>\n       <div class="category blessure">Blessure</div>\n      <ion-item>\n      <ion-avatar item-start>\n        <img src="assets/imgs/avatar.jpg">\n      </ion-avatar>\n    <h2>Username</h2>\n    <p>System.date</p>\n  </ion-item>\n\n  <ion-item >\n      <ion-label >here text tatatatatatatatatata </ion-label>\n    </ion-item>\n  <ion-card-content>\n    <!-- <img src="assets/imgs/post-img.jpg" /> -->\n    <!-- <ion-item class="button-customize" class="item-custm"> -->\n      <ion-grid>\n        <ion-row class="bfont">\n          \n          <ion-col >\n            <button ion-button clear  color="maron" >\n              <ion-icon name=\'thumbs-up\'></ion-icon></button>\n          </ion-col>\n          <ion-col >\n            <button ion-button clear color="maron">\n              <ion-icon name=\'thumbs-down\'></ion-icon></button>\n          </ion-col>\n          <ion-col >\n            <button ion-button clear  color="maron" >\n              <ion-icon name=\'bookmarks\' ></ion-icon></button>\n          </ion-col>\n          <ion-col>\n            <button ion-button clear  color="maron"><ion-icon  name="logo-facebook" class="facebook-button"></ion-icon></button>\n          </ion-col>\n            <ion-col>\n            <button ion-button clear color="maron"><ion-icon name="logo-googleplus" class="google-button"></ion-icon></button>\n          \n          </ion-col>\n        </ion-row>\n        <ion-row>\n          <ion-col>\n                <ion-input type="text" placeholder="comment" item-start></ion-input>\n          </ion-col>\n        </ion-row>\n      </ion-grid>     \n    </ion-card-content>\n  </ion-card>\n\n<!-- DANGER -->\n\n <ion-card>\n       <div class="category sos">Danger</div>\n      <ion-item>\n      <ion-avatar item-start>\n        <img src="assets/imgs/avatar.jpg">\n      </ion-avatar>\n    <h2>Username</h2>\n    <p>System.date</p>\n  </ion-item>\n\n  <ion-item >\n      <ion-label >here text tatatatatatatatatata </ion-label>\n    </ion-item>\n  <ion-card-content>\n    <!-- <img src="assets/imgs/post-img.jpg" /> -->\n    <!-- <ion-item class="button-customize" class="item-custm"> -->\n      <ion-grid>\n        <ion-row class="bfont">\n          \n          <ion-col >\n            <button ion-button clear  color="maron" >\n              <ion-icon name=\'thumbs-up\'></ion-icon></button>\n          </ion-col>\n          <ion-col >\n            <button ion-button clear color="maron">\n              <ion-icon name=\'thumbs-down\'></ion-icon></button>\n          </ion-col>\n          <ion-col >\n            <button ion-button clear  color="maron" >\n              <ion-icon name=\'bookmarks\' ></ion-icon></button>\n          </ion-col>\n          <ion-col>\n            <button ion-button clear  color="maron"><ion-icon  name="logo-facebook" class="facebook-button"></ion-icon></button>\n          </ion-col>\n            <ion-col>\n            <button ion-button clear color="maron"><ion-icon name="logo-googleplus" class="google-button"></ion-icon></button>\n          \n          </ion-col>\n        </ion-row>\n        <ion-row>\n          <ion-col>\n                <ion-input type="text" placeholder="comment" item-start></ion-input>\n          </ion-col>\n        </ion-row>\n      </ion-grid>     \n    </ion-card-content>\n  </ion-card>\n\n<!-- AUTRE -->\n <ion-card>\n       <div class="category autre">Normal</div>\n      <ion-item>\n      <ion-avatar item-start>\n        <img src="assets/imgs/avatar.jpg">\n      </ion-avatar>\n    <h2>Username</h2>\n    <p>System.date</p>\n  </ion-item>\n\n  <ion-item >\n      <ion-label >here text tatatatatatatatatata </ion-label>\n    </ion-item>\n  <ion-card-content>\n    <!-- <img src="assets/imgs/post-img.jpg" /> -->\n    <!-- <ion-item class="button-customize" class="item-custm"> -->\n      <ion-grid>\n        <ion-row class="bfont">\n          \n          <ion-col >\n            <button ion-button clear  color="maron" >\n              <ion-icon name=\'thumbs-up\'></ion-icon></button>\n          </ion-col>\n          <ion-col >\n            <button ion-button clear color="maron">\n              <ion-icon name=\'thumbs-down\'></ion-icon></button>\n          </ion-col>\n          <ion-col >\n            <button ion-button clear  color="maron" >\n              <ion-icon name=\'bookmarks\' ></ion-icon></button>\n          </ion-col>\n          <ion-col>\n            <button ion-button clear  color="maron"><ion-icon  name="logo-facebook" class="facebook-button"></ion-icon></button>\n          </ion-col>\n            <ion-col>\n            <button ion-button clear color="maron"><ion-icon name="logo-googleplus" class="google-button"></ion-icon></button>\n          \n          </ion-col>\n        </ion-row>\n        <ion-row>\n          <ion-col>\n                <ion-input type="text" placeholder="comment" item-start></ion-input>\n          </ion-col>\n        </ion-row>\n      </ion-grid>     \n    </ion-card-content>\n  </ion-card>\n\n</ion-content> \n\n\n\n\n<!-- \n<ion-content class="cards-bg social-cards">\n\n<ion-card>\n\n  <ion-item>\n    <ion-avatar item-start>\n      <img src="https://www.pexels.com/photo/city-lights-old-urban-86933/">\n    </ion-avatar>\n    <h2>Username</h2>\n    <p>System.date</p>\n  </ion-item>\n\n  <img src="assets/imgs/defaultAvatar.png">\n\n  <ion-card-content>\n    <p>test test test test test bla bla bla bla .</p>\n  </ion-card-content>\n\n\n      <button ion-button clear  icon-start>\n        <ion-icon name=\'thumbs-up\'></ion-icon>\n        Like\n      </button>\n\n      <button ion-button clear  icon-start>\n        <ion-icon name=\'text\'></ion-icon>\n        Comment\n      </button>\n      \n        <button ion-button  clear icon-start >\n          <ion-icon name=\'bookmarks\'></ion-icon>\n          Bookmark\n        </button>\n        \n\n\n</ion-card>\n</ion-content>\n\n -->\n\n<!-- \n    <img src="assets/img/bjork-live.jpg"/>\n    <ion-card-content>\n      <ion-card-title>\n       UserName\n      </ion-card-title>\n      <p>\n        first came to prominence as one of the lead vocalists of the avant pop Icelandic sextet the Sugarcubes, but when...\n      </p>\n<br><br><br>\n  <ion-fab right bottom >\n      <button ion-fab><ion-icon name="arrow-dropleft" ></ion-icon></button>\n      <ion-fab-list side="left">\n        <button ion-fab><ion-icon name="ios-thumbs-up"></ion-icon></button>\n        <button ion-fab><ion-icon name="md-text"></ion-icon></button>\n        <button ion-fab><ion-icon name="md-share"></ion-icon></button>\n        <button ion-fab><ion-icon name="md-bookmark"></ion-icon></button>\n      </ion-fab-list>\n    </ion-fab>\n</ion-card-content>\n</ion-card> \n\n<button (click)="signOut()" ion-button block>Sign Out</button>\n<button (click)="getFriendList()" ion-button block>Friend List</button>\n<button (click)="showFriend()" ion-button block>show Friend List</button>\n<button (click)="updateReputation()" ion-button block>updateReputation</button>\n<button (click)="getPosition()" ion-button block>getPosition</button> --> \n\n<!-- </ion-content>  -->'/*ion-inline-end:"/home/anwar/hanimo2/src/pages/home/home.html"*/
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_2_ionic_angular__["h" /* NavController */],
            __WEBPACK_IMPORTED_MODULE_1__ionic_storage__["b" /* Storage */],
            __WEBPACK_IMPORTED_MODULE_6_angularfire2_auth__["a" /* AngularFireAuth */],
            __WEBPACK_IMPORTED_MODULE_5_angularfire2_database__["a" /* AngularFireDatabase */],
            __WEBPACK_IMPORTED_MODULE_7__providers_usercrud_usercrud__["a" /* UsercrudProvider */],
            __WEBPACK_IMPORTED_MODULE_8__ionic_native_geolocation__["a" /* Geolocation */]])
    ], HomePage);
    return HomePage;
}());

//# sourceMappingURL=home.js.map

/***/ }),

/***/ 331:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return SearchPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__ionic_storage__ = __webpack_require__(68);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_ionic_angular__ = __webpack_require__(15);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__providers_usercrud_usercrud__ = __webpack_require__(39);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_firebase_app__ = __webpack_require__(141);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_firebase_app___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_4_firebase_app__);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};





var SearchPage = (function () {
    function SearchPage(navCtrl, navParams, userCrud, storage) {
        var _this = this;
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.userCrud = userCrud;
        this.storage = storage;
        this.currentUser = {};
        this.invitation = {};
        this.users = [];
        this.usersRef = __WEBPACK_IMPORTED_MODULE_4_firebase_app__["database"]().ref('/users');
        this.storage.get("currentUser").then(function (res) {
            _this.currentUser = JSON.parse(res);
            console.log("search page current user : " + _this.currentUser);
        });
    }
    SearchPage.prototype.ionViewDidLoad = function () {
        console.log('ionViewDidLoad SearchPage');
    };
    SearchPage.prototype.initializeUsers = function () {
        var _this = this;
        this.usersRef.on('value', function (userSnapshot) {
            console.log("usersnapshot : " + userSnapshot.val());
            _this.users = [];
            userSnapshot.forEach(function (userNap) {
                console.log("usernap : " + userNap.val());
                //this.afDatabase.database.ref
                _this.users.push(userNap.val());
                return false;
            });
        });
    };
    SearchPage.prototype.getUsers = function (ev) {
        // Reset items back to all of the items
        this.initializeUsers();
        // set val to the value of the searchbar
        var val = ev.target.value;
        // if the value is an empty string don't filter the items
        if (val && val.trim() != '') {
            this.users = this.users.filter(function (user) {
                return (user.displayName.toLowerCase().indexOf(val.toLowerCase()) > -1);
            });
        }
    };
    SearchPage.prototype.sendMessage = function (id) {
        console.log("send message to : " + id);
    };
    SearchPage.prototype.sendInvitation = function (idReceiver) {
        this.invitation.senderId = this.currentUser.id;
        this.invitation.receiverId = idReceiver;
        this.invitation.state = 0;
        console.log("send invitation  : " + this.invitation);
        this.userCrud.sendInvitation(this.invitation).then(function (res) {
            console.log("invit : " + res);
        });
    };
    SearchPage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["m" /* Component */])({
            selector: 'page-search',template:/*ion-inline-start:"/home/anwar/hanimo2/src/pages/search/search.html"*/'<ion-header>\n\n    <ion-toolbar color="sandy-brown" >\n        <ion-searchbar (ionInput)="getUsers($event)"></ion-searchbar>\n      </ion-toolbar> \n\n</ion-header>\n\n\n<ion-content padding>\n    \n  <ion-list>\n    <ion-item *ngFor="let user of users">\n      \n      <!--<span class="righttext">{{ room.name }}</span>\n      <span class="lefttext" >access : {{room.accesslevel}}</span>\n     <span> <button (click)="joinRoom(room.idRoom)" ion-button color="danger" outline>Join this room</button></span>\n      \n     <h2>{{ user.displayName }}</h2>\n     <p>{{ user.email }}</p>-->\n\n     <ion-avatar item-start>\n      <img src="{{user.imageUrl}}">\n    </ion-avatar>\n    <h2>{{user.displayName}}</h2>\n    <button ion-button (click)="sendMessage(user.id)" >Message</button>\n    <button ion-button (click)="sendInvitation(user.id)" item-end >add to contact</button>\n\n    </ion-item>\n  </ion-list>\n</ion-content>\n'/*ion-inline-end:"/home/anwar/hanimo2/src/pages/search/search.html"*/,
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_2_ionic_angular__["h" /* NavController */], __WEBPACK_IMPORTED_MODULE_2_ionic_angular__["i" /* NavParams */],
            __WEBPACK_IMPORTED_MODULE_3__providers_usercrud_usercrud__["a" /* UsercrudProvider */],
            __WEBPACK_IMPORTED_MODULE_1__ionic_storage__["b" /* Storage */]])
    ], SearchPage);
    return SearchPage;
}());

//# sourceMappingURL=search.js.map

/***/ }),

/***/ 332:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return PosterPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(15);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__annonce_a0_annonce_a0__ = __webpack_require__(333);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__ionic_native_camera__ = __webpack_require__(154);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__providers_annonce_crud_annonce_crud__ = __webpack_require__(163);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5_firebase__ = __webpack_require__(88);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5_firebase___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_5_firebase__);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};



//delete later



var PosterPage = (function () {
    function PosterPage(navCtrl, alertCtrl, camera, annonceCrudProvider) {
        this.navCtrl = navCtrl;
        this.alertCtrl = alertCtrl;
        this.camera = camera;
        this.annonceCrudProvider = annonceCrudProvider;
    }
    PosterPage.prototype.getImage = function () {
        var storageRef = __WEBPACK_IMPORTED_MODULE_5_firebase___default.a.storage().ref();
        storageRef.child('annoncesimages/aaaaa/1.jpg').getDownloadURL().then(function (res) {
            console.log(res);
        });
    };
    PosterPage.prototype.presentPrompt = function () {
        this.navCtrl.push(__WEBPACK_IMPORTED_MODULE_2__annonce_a0_annonce_a0__["a" /* AnnonceA0Page */]);
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
    };
    PosterPage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["m" /* Component */])({
            selector: 'page-poster',template:/*ion-inline-start:"/home/anwar/hanimo2/src/pages/poster/poster.html"*/'<ion-header>\n  <ion-navbar  color="orange-white">\n        <button ion-button icon-only menuToggle  >\n          <ion-icon name="menu"></ion-icon>\n        </button>\n        <ion-title> Poster une annonce</ion-title>\n  </ion-navbar> \n</ion-header>\n\n<ion-content>\n\n\n<!-- BESOIN D\'AIDE -->\n\n  <ion-card class="aide" (click)="presentPrompt()" color="#C3CCB2">\n    <ion-grid>\n      <ion-row>\n        <ion-col>\n          <button clear ion-button >\n            <img src="assets/icon/aide.png" >\n          </button>\n        </ion-col>\n        <ion-col >\n          <ion-label >Besoin d\'aide</ion-label>\n          </ion-col>\n      </ion-row>\n    </ion-grid>\n      \n  </ion-card>\n\n\n  <!-- BESOIN foyer -->\n  <ion-card class="foyer" (click)="presentPrompt()" color="#4D898F">\n      <ion-grid>\n        <ion-row>\n          <ion-col>\n            <button clear ion-button>\n                <img src="assets/icon/foyer.png" > \n              </button>\n          </ion-col>\n          <ion-col>\n            <ion-label>Cherchant un foyer</ion-label>\n            </ion-col>\n        </ion-row>\n      </ion-grid>\n        \n    </ion-card>\n  <!-- BLESSURE -->\n\n  <ion-card class="blessure" (click)="presentPrompt()" color="#BF983E">\n      <ion-grid>\n        <ion-row>\n          <ion-col>\n            <button clear ion-button>\n                <img src="assets/icon/blessure.png" > \n            </button>\n          </ion-col>\n          <ion-col>\n            <ion-label>Blessure ou Maladie</ion-label>\n            </ion-col>\n        </ion-row>\n      </ion-grid>\n        \n    </ion-card>\n\n  <!-- URGENT  DANGER-->\n\n  <ion-card class="danger" (click)="presentPrompt()" color="#9B5337">\n      <ion-grid>\n        <ion-row>\n          <ion-col>\n            <button clear ion-button>\n                    <ion-icon name="ios-nuclear"  isActive="false"></ion-icon>\n            </button>\n          </ion-col>\n          <ion-col>\n            <ion-label>En Danger</ion-label>\n            </ion-col>\n        </ion-row>\n      </ion-grid>\n        \n    </ion-card>\n\n  <!-- AUTRE -->\n  <ion-card class="autre" (click)="presentPrompt()" color="#333537">\n      <ion-grid>\n        <ion-row>\n          <ion-col>\n            <button clear ion-button>\n                    <ion-icon name="ios-alert"  isActive="false"></ion-icon>\n            </button>\n          </ion-col>\n          <ion-col>\n            <ion-label>Autre</ion-label>\n            </ion-col>\n        </ion-row>\n      </ion-grid>\n        \n    </ion-card>\n\n</ion-content>'/*ion-inline-end:"/home/anwar/hanimo2/src/pages/poster/poster.html"*/,
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["h" /* NavController */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["a" /* AlertController */],
            __WEBPACK_IMPORTED_MODULE_3__ionic_native_camera__["a" /* Camera */],
            __WEBPACK_IMPORTED_MODULE_4__providers_annonce_crud_annonce_crud__["a" /* AnnonceCrudProvider */]])
    ], PosterPage);
    return PosterPage;
}());

//# sourceMappingURL=poster.js.map

/***/ }),

/***/ 333:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return AnnonceA0Page; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(15);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_angularfire2_auth__ = __webpack_require__(37);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__providers_annonce_crud_annonce_crud__ = __webpack_require__(163);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__providers_usercrud_usercrud__ = __webpack_require__(39);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__ionic_native_camera__ = __webpack_require__(154);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__ionic_native_geolocation__ = __webpack_require__(153);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__ionic_native_image_picker__ = __webpack_require__(316);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__tabs_tabs__ = __webpack_require__(91);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = y[op[0] & 2 ? "return" : op[0] ? "throw" : "next"]) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [0, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};









var AnnonceA0Page = (function () {
    function AnnonceA0Page(navCtrl, alertCtrl, toastCtrl, afAuth, annonceProvider, usercrudProvider, camera, geolocation, imagePicker) {
        var _this = this;
        this.navCtrl = navCtrl;
        this.alertCtrl = alertCtrl;
        this.toastCtrl = toastCtrl;
        this.afAuth = afAuth;
        this.annonceProvider = annonceProvider;
        this.usercrudProvider = usercrudProvider;
        this.camera = camera;
        this.geolocation = geolocation;
        this.imagePicker = imagePicker;
        this.annonce = {};
        this.user = {};
        this.imgUrl = '';
        this.imageNumber = 0;
        this.captureDataUrl = [];
        console.log("-------------------------------------------");
        this.geolocation.getCurrentPosition().then(function (resp) {
            console.log("access position given");
            console.log(resp);
            _this.currentLocation = resp.coords;
        }).catch(function (error) {
            _this.navCtrl.pop();
            console.log('Error getting location', error);
        });
        this.afAuth.auth.onAuthStateChanged(function (user) {
            if (user) {
                _this.user.id = user.uid;
                console.log(_this.user.id);
            }
            else {
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
    AnnonceA0Page.prototype.publierAnnonce = function (annonce) {
        return __awaiter(this, void 0, void 0, function () {
            var _this = this;
            return __generator(this, function (_a) {
                console.log("current location : ");
                console.log(this.currentLocation);
                annonce.latitude = this.currentLocation.latitude;
                annonce.longitude = this.currentLocation.longitude;
                annonce.creatorAnnonceId = this.user.id;
                console.log(annonce);
                // await this.upload(annonce.titleAnnonce);
                // console.log("img url 1 : " +this.imgUrl)
                this.annonceProvider.addingAnnonce(annonce, this.captureDataUrl).then(function () {
                    _this.usercrudProvider.updateReputation(_this.user.id, 2);
                }).then(function () {
                    var toast = _this.toastCtrl.create({
                        message: 'Votre annonce a ete publié',
                        duration: 2000,
                        position: 'middle'
                    });
                    toast.onDidDismiss(function () {
                        _this.navCtrl.setRoot(__WEBPACK_IMPORTED_MODULE_8__tabs_tabs__["a" /* TabsPage */]);
                    });
                    toast.present();
                });
                return [2 /*return*/];
            });
        });
    };
    AnnonceA0Page.prototype.capture = function () {
        var _this = this;
        console.log("cameraaaaaaaa capture");
        var cameraOptions = {
            quality: 50,
            destinationType: this.camera.DestinationType.DATA_URL,
            encodingType: this.camera.EncodingType.JPEG,
            mediaType: this.camera.MediaType.PICTURE
        };
        this.camera.getPicture(cameraOptions).then(function (imageData) {
            console.log(imageData);
            var dataUrl = 'data:image/jpeg;base64,' + imageData;
            _this.captureDataUrl.push(dataUrl);
            _this.imageNumber++;
            console.log(_this.captureDataUrl);
        }, function (err) {
            console.log(err);
        });
    };
    AnnonceA0Page.prototype.pickImage = function () {
        var _this = this;
        var options = {
            maximumImagesCount: 5 - this.imageNumber
        };
        this.imagePicker.getPictures(options).then(function (results) {
            for (var i = 0; i < results.length; i++) {
                console.log('Image URI: ' + results[i]);
                var dataUrl = 'data:image/jpeg;base64,' + results[i];
                _this.captureDataUrl.push(dataUrl);
                _this.imageNumber++;
                console.log("this.imageNumber : " + _this.imageNumber);
            }
        }, function (err) { console.log(err); });
    };
    AnnonceA0Page = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["m" /* Component */])({
            selector: 'page-annonce-a0',template:/*ion-inline-start:"/home/anwar/hanimo2/src/pages/annonce-a0/annonce-a0.html"*/'<ion-header>\n\n  <ion-navbar color="sandy-brown">\n    <ion-title>annonceA0</ion-title>\n  </ion-navbar>\n\n</ion-header>\n\n\n<ion-content>\n  <ion-card>\n    <ion-card-content>\n        <ion-list no-lines>\n            <ion-list-header> Poster votre annonce </ion-list-header> \n            <ion-item>\n              <ion-label floating >Titre de l\'annonce</ion-label>\n              <ion-input [(ngModel)]="annonce.titleAnnonce" type="text"> </ion-input>\n            </ion-item> \n            <ion-item>\n              <ion-label floating >Votre description</ion-label>\n              <ion-textarea [(ngModel)]="annonce.descAnnonce" type="text"> </ion-textarea>\n            </ion-item>\n              \n            <ion-item>\n              <button ion-button (click)="capture()">Lets take a picture!</button>\n              <img [src]="captureDataUrl[0]" *ngIf="captureDataUrl[0]"/>\n\n              <button ion-button (click)="pickImage()">pickImage</button>\n          </ion-item>\n  \n            <ion-item>\n                <button (click)="publierAnnonce(annonce)" ion-button round>Publier</button>\n            </ion-item>\n          </ion-list>\n    </ion-card-content>\n  </ion-card>\n  </ion-content>\n'/*ion-inline-end:"/home/anwar/hanimo2/src/pages/annonce-a0/annonce-a0.html"*/,
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["h" /* NavController */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["a" /* AlertController */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["k" /* ToastController */],
            __WEBPACK_IMPORTED_MODULE_2_angularfire2_auth__["a" /* AngularFireAuth */],
            __WEBPACK_IMPORTED_MODULE_3__providers_annonce_crud_annonce_crud__["a" /* AnnonceCrudProvider */],
            __WEBPACK_IMPORTED_MODULE_4__providers_usercrud_usercrud__["a" /* UsercrudProvider */],
            __WEBPACK_IMPORTED_MODULE_5__ionic_native_camera__["a" /* Camera */],
            __WEBPACK_IMPORTED_MODULE_6__ionic_native_geolocation__["a" /* Geolocation */],
            __WEBPACK_IMPORTED_MODULE_7__ionic_native_image_picker__["a" /* ImagePicker */]])
    ], AnnonceA0Page);
    return AnnonceA0Page;
}());

//# sourceMappingURL=annonce-a0.js.map

/***/ }),

/***/ 334:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return AnnoncesPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(15);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};


var AnnoncesPage = (function () {
    function AnnoncesPage(navCtrl, navParams) {
        this.navCtrl = navCtrl;
        this.navParams = navParams;
    }
    AnnoncesPage.prototype.ionViewDidLoad = function () {
        console.log('ionViewDidLoad AnnoncesPage');
    };
    AnnoncesPage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["m" /* Component */])({
            selector: 'page-annonces',template:/*ion-inline-start:"/home/anwar/hanimo2/src/pages/annonces/annonces.html"*/'\n<ion-header>\n\n  <ion-navbar color="sandy-brown" >\n      <button ion-button icon-only menuToggle  >\n          <ion-icon name="menu"></ion-icon>\n        </button>\n    <ion-title>annonces</ion-title>\n  </ion-navbar>\n\n</ion-header>\n\n\n<ion-content padding>\n\n</ion-content>\n  '/*ion-inline-end:"/home/anwar/hanimo2/src/pages/annonces/annonces.html"*/,
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["h" /* NavController */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["i" /* NavParams */]])
    ], AnnoncesPage);
    return AnnoncesPage;
}());

//# sourceMappingURL=annonces.js.map

/***/ }),

/***/ 335:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_platform_browser_dynamic__ = __webpack_require__(336);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__app_module__ = __webpack_require__(355);


Object(__WEBPACK_IMPORTED_MODULE_0__angular_platform_browser_dynamic__["a" /* platformBrowserDynamic */])().bootstrapModule(__WEBPACK_IMPORTED_MODULE_1__app_module__["a" /* AppModule */]);
//# sourceMappingURL=main.js.map

/***/ }),

/***/ 355:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return AppModule; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_platform_browser__ = __webpack_require__(42);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_ionic_angular__ = __webpack_require__(15);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__ionic_native_splash_screen__ = __webpack_require__(259);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__ionic_native_status_bar__ = __webpack_require__(262);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__angular_http__ = __webpack_require__(403);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__angular_common_http__ = __webpack_require__(140);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7_angularfire2__ = __webpack_require__(51);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8_angularfire2_auth__ = __webpack_require__(37);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9_angularfire2_database__ = __webpack_require__(38);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_10__ionic_native_google_plus__ = __webpack_require__(314);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_11__ionic_native_geolocation__ = __webpack_require__(153);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_12__ionic_native_facebook__ = __webpack_require__(315);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_13__ionic_native_camera__ = __webpack_require__(154);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_14__ionic_storage__ = __webpack_require__(68);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_15__ionic_native_google_maps__ = __webpack_require__(500);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_16__ionic_native_image_picker__ = __webpack_require__(316);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_17_firebase__ = __webpack_require__(88);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_17_firebase___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_17_firebase__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_18__firebase_credentials__ = __webpack_require__(527);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_19__app_component__ = __webpack_require__(528);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_20__pages_home_home__ = __webpack_require__(330);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_21__pages_signup_signup__ = __webpack_require__(327);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_22__pages_login_login__ = __webpack_require__(161);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_23__pages_first_connection_first_connection__ = __webpack_require__(328);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_24__pages_complete_profile_complete_profile__ = __webpack_require__(329);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_25__pages_tabs_tabs__ = __webpack_require__(91);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_26__pages_messages_messages__ = __webpack_require__(162);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_27__pages_poster_poster__ = __webpack_require__(332);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_28__pages_invitation_invitation__ = __webpack_require__(164);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_29__pages_annonces_annonces__ = __webpack_require__(334);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_30__pages_search_search__ = __webpack_require__(331);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_31__pages_annonce_a0_annonce_a0__ = __webpack_require__(333);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_32__providers_usercrud_usercrud__ = __webpack_require__(39);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_33__providers_annonce_crud_annonce_crud__ = __webpack_require__(163);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};










//native plugins
























__WEBPACK_IMPORTED_MODULE_17_firebase___default.a.initializeApp(__WEBPACK_IMPORTED_MODULE_18__firebase_credentials__["a" /* FIREBASE_CREDENTIALS */]);
var AppModule = (function () {
    function AppModule() {
    }
    AppModule = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_1__angular_core__["I" /* NgModule */])({
            declarations: [
                __WEBPACK_IMPORTED_MODULE_19__app_component__["a" /* MyApp */],
                __WEBPACK_IMPORTED_MODULE_20__pages_home_home__["a" /* HomePage */],
                __WEBPACK_IMPORTED_MODULE_21__pages_signup_signup__["a" /* SignupPage */],
                __WEBPACK_IMPORTED_MODULE_22__pages_login_login__["a" /* LoginPage */],
                __WEBPACK_IMPORTED_MODULE_23__pages_first_connection_first_connection__["a" /* FirstConnectionPage */],
                __WEBPACK_IMPORTED_MODULE_24__pages_complete_profile_complete_profile__["a" /* CompleteProfilePage */],
                __WEBPACK_IMPORTED_MODULE_25__pages_tabs_tabs__["a" /* TabsPage */],
                __WEBPACK_IMPORTED_MODULE_26__pages_messages_messages__["a" /* MessagesPage */],
                __WEBPACK_IMPORTED_MODULE_27__pages_poster_poster__["a" /* PosterPage */],
                __WEBPACK_IMPORTED_MODULE_28__pages_invitation_invitation__["a" /* InvitationPage */],
                __WEBPACK_IMPORTED_MODULE_29__pages_annonces_annonces__["a" /* AnnoncesPage */],
                __WEBPACK_IMPORTED_MODULE_30__pages_search_search__["a" /* SearchPage */],
                __WEBPACK_IMPORTED_MODULE_31__pages_annonce_a0_annonce_a0__["a" /* AnnonceA0Page */]
            ],
            imports: [
                __WEBPACK_IMPORTED_MODULE_0__angular_platform_browser__["a" /* BrowserModule */],
                __WEBPACK_IMPORTED_MODULE_2_ionic_angular__["d" /* IonicModule */].forRoot(__WEBPACK_IMPORTED_MODULE_19__app_component__["a" /* MyApp */], {}, {
                    links: []
                }),
                __WEBPACK_IMPORTED_MODULE_14__ionic_storage__["a" /* IonicStorageModule */].forRoot(),
                __WEBPACK_IMPORTED_MODULE_7_angularfire2__["a" /* AngularFireModule */].initializeApp(__WEBPACK_IMPORTED_MODULE_18__firebase_credentials__["a" /* FIREBASE_CREDENTIALS */]),
                __WEBPACK_IMPORTED_MODULE_8_angularfire2_auth__["b" /* AngularFireAuthModule */],
                __WEBPACK_IMPORTED_MODULE_9_angularfire2_database__["b" /* AngularFireDatabaseModule */],
                __WEBPACK_IMPORTED_MODULE_5__angular_http__["a" /* HttpModule */],
                __WEBPACK_IMPORTED_MODULE_6__angular_common_http__["b" /* HttpClientModule */]
            ],
            bootstrap: [__WEBPACK_IMPORTED_MODULE_2_ionic_angular__["b" /* IonicApp */]],
            entryComponents: [
                __WEBPACK_IMPORTED_MODULE_19__app_component__["a" /* MyApp */],
                __WEBPACK_IMPORTED_MODULE_20__pages_home_home__["a" /* HomePage */],
                __WEBPACK_IMPORTED_MODULE_21__pages_signup_signup__["a" /* SignupPage */],
                __WEBPACK_IMPORTED_MODULE_22__pages_login_login__["a" /* LoginPage */],
                __WEBPACK_IMPORTED_MODULE_23__pages_first_connection_first_connection__["a" /* FirstConnectionPage */],
                __WEBPACK_IMPORTED_MODULE_24__pages_complete_profile_complete_profile__["a" /* CompleteProfilePage */],
                __WEBPACK_IMPORTED_MODULE_25__pages_tabs_tabs__["a" /* TabsPage */],
                __WEBPACK_IMPORTED_MODULE_26__pages_messages_messages__["a" /* MessagesPage */],
                __WEBPACK_IMPORTED_MODULE_27__pages_poster_poster__["a" /* PosterPage */],
                __WEBPACK_IMPORTED_MODULE_28__pages_invitation_invitation__["a" /* InvitationPage */],
                __WEBPACK_IMPORTED_MODULE_29__pages_annonces_annonces__["a" /* AnnoncesPage */],
                __WEBPACK_IMPORTED_MODULE_30__pages_search_search__["a" /* SearchPage */],
                __WEBPACK_IMPORTED_MODULE_31__pages_annonce_a0_annonce_a0__["a" /* AnnonceA0Page */]
            ],
            providers: [
                __WEBPACK_IMPORTED_MODULE_4__ionic_native_status_bar__["a" /* StatusBar */],
                __WEBPACK_IMPORTED_MODULE_3__ionic_native_splash_screen__["a" /* SplashScreen */],
                { provide: __WEBPACK_IMPORTED_MODULE_1__angular_core__["u" /* ErrorHandler */], useClass: __WEBPACK_IMPORTED_MODULE_2_ionic_angular__["c" /* IonicErrorHandler */] },
                __WEBPACK_IMPORTED_MODULE_32__providers_usercrud_usercrud__["a" /* UsercrudProvider */],
                __WEBPACK_IMPORTED_MODULE_10__ionic_native_google_plus__["a" /* GooglePlus */],
                __WEBPACK_IMPORTED_MODULE_12__ionic_native_facebook__["a" /* Facebook */],
                __WEBPACK_IMPORTED_MODULE_13__ionic_native_camera__["a" /* Camera */],
                __WEBPACK_IMPORTED_MODULE_11__ionic_native_geolocation__["a" /* Geolocation */],
                __WEBPACK_IMPORTED_MODULE_15__ionic_native_google_maps__["a" /* GoogleMaps */],
                __WEBPACK_IMPORTED_MODULE_33__providers_annonce_crud_annonce_crud__["a" /* AnnonceCrudProvider */],
                __WEBPACK_IMPORTED_MODULE_16__ionic_native_image_picker__["a" /* ImagePicker */]
            ]
        })
    ], AppModule);
    return AppModule;
}());

//# sourceMappingURL=app.module.js.map

/***/ }),

/***/ 39:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return UsercrudProvider; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_common_http__ = __webpack_require__(140);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_angularfire2_database__ = __webpack_require__(38);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = y[op[0] & 2 ? "return" : op[0] ? "throw" : "next"]) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [0, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};



var UsercrudProvider = (function () {
    function UsercrudProvider(http, afDatabase) {
        this.http = http;
        this.afDatabase = afDatabase;
        console.log('Hello UsercrudProvider Provider');
    }
    UsercrudProvider.prototype.addUser = function (user) {
        var _this = this;
        var usersRef = this.afDatabase.database.ref("/users/" + user.id);
        usersRef.once("value", function (snap) {
            console.log(snap.val());
            if (snap.val()) {
                console.log("user exists from provider");
            }
            else {
                console.log("user NOT exists from provider");
                user.reputation = 1;
                _this.afDatabase.list('/users/').set(user.id, user).then(function (res) {
                    console.log(res);
                });
            }
        });
    };
    UsercrudProvider.prototype.completeProfile = function (user) {
        /*this.afDatabase.list('/users/').set(user.id,user).then(res => {
          
        });*/
        this.afDatabase.database.ref('/users/' + user.id).update(user).then(function (res) {
            console.log("updating data");
            console.log(res);
        });
    };
    UsercrudProvider.prototype.findUserbyId = function (idUser) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.afDatabase.database.ref("/users/" + idUser).on("value", function (snap) {
                            console.log(snap.val());
                            /*console.log(snap.val());
                            return snap.val();*/
                        })];
                    case 1:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    UsercrudProvider.prototype.sendInvitation = function (invitation) {
        return __awaiter(this, void 0, void 0, function () {
            var _this = this;
            var ref;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.afDatabase.database.ref('/invitations/')];
                    case 1:
                        ref = _a.sent();
                        ref.push(invitation).then(function (res) {
                            console.log(res.key);
                            var key = res.key;
                            invitation.invitId = key;
                            _this.afDatabase.database.ref('/invitations/' + invitation.invitId).update(invitation).then(function (res) {
                                console.log("finished adding invtation");
                                console.log(res);
                            });
                        });
                        return [2 /*return*/];
                }
            });
        });
    };
    UsercrudProvider.prototype.acceptInvitation = function (friend) {
        return __awaiter(this, void 0, void 0, function () {
            var _this = this;
            var ref;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.afDatabase.database.ref('/friends/')];
                    case 1:
                        ref = _a.sent();
                        ref.push(friend).then(function (res) {
                            console.log(res.key);
                            var key = res.key;
                            friend.friendId = key;
                            _this.afDatabase.database.ref('/friends/' + friend.friendId).update(friend).then(function (res) {
                                console.log("finished adding friends");
                                console.log(res);
                                _this.afDatabase.database.ref("/invitations/").orderByChild("receiverId").equalTo(friend.receiverId)
                                    .on("value", function (invitSnapShot) {
                                    invitSnapShot.forEach(function (invitSnap) {
                                        console.log();
                                        if (invitSnap.val().senderId == friend.senderId) {
                                            _this.afDatabase.database.ref("/invitations/").child(invitSnap.val().invitId).remove().then(function (res) {
                                                console.log("invitation deleted : " + res);
                                            });
                                        }
                                        ;
                                        return false;
                                    });
                                });
                            });
                        });
                        return [2 /*return*/];
                }
            });
        });
    };
    UsercrudProvider.prototype.declineInvitation = function (friend) {
        var _this = this;
        this.afDatabase.database.ref("/invitations/").orderByChild("receiverId").equalTo(friend.receiverId)
            .on("value", function (invitSnapShot) {
            invitSnapShot.forEach(function (invitSnap) {
                console.log();
                if (invitSnap.val().senderId == friend.senderId) {
                    _this.afDatabase.database.ref("/invitations/").child(invitSnap.val().invitId).remove().then(function (res) {
                        console.log("invitation deleted : " + res);
                    });
                }
                ;
                return false;
            });
        });
    };
    UsercrudProvider.prototype.updateReputation = function (userId, value) {
        var _this = this;
        this.afDatabase.database.ref("/users/" + userId).once("value", function (snapShot) {
            value = value + snapShot.val().reputation;
            _this.afDatabase.database.ref("/users/" + userId).update({ reputation: value }).then(function (res) {
                console.log("updating reputation from provider " + res);
            });
        });
    };
    UsercrudProvider = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_1__angular_core__["A" /* Injectable */])(),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_0__angular_common_http__["a" /* HttpClient */],
            __WEBPACK_IMPORTED_MODULE_2_angularfire2_database__["a" /* AngularFireDatabase */]])
    ], UsercrudProvider);
    return UsercrudProvider;
}());

//# sourceMappingURL=usercrud.js.map

/***/ }),

/***/ 527:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return FIREBASE_CREDENTIALS; });
var FIREBASE_CREDENTIALS = {
    apiKey: "AIzaSyCiNoZY4g5LoI8w3QzXEKES-sQMkLovxO8",
    authDomain: "hanimo-3b761.firebaseapp.com",
    databaseURL: "https://hanimo-3b761.firebaseio.com",
    projectId: "hanimo-3b761",
    storageBucket: "hanimo-3b761.appspot.com",
    messagingSenderId: "1063646526749"
};
//# sourceMappingURL=firebase.credentials.js.map

/***/ }),

/***/ 528:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return MyApp; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(15);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__ionic_native_status_bar__ = __webpack_require__(262);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__ionic_native_splash_screen__ = __webpack_require__(259);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__pages_login_login__ = __webpack_require__(161);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5_angularfire2_auth__ = __webpack_require__(37);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__pages_tabs_tabs__ = __webpack_require__(91);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__pages_invitation_invitation__ = __webpack_require__(164);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__pages_messages_messages__ = __webpack_require__(162);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9__pages_annonces_annonces__ = __webpack_require__(334);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};










var MyApp = (function () {
    function MyApp(platform, statusBar, loadCnt, splashScreen, afAuth) {
        var _this = this;
        this.afAuth = afAuth;
        platform.ready().then(function () {
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
            { title: 'Home', component: __WEBPACK_IMPORTED_MODULE_6__pages_tabs_tabs__["a" /* TabsPage */] },
            { title: 'Les annonces', component: __WEBPACK_IMPORTED_MODULE_9__pages_annonces_annonces__["a" /* AnnoncesPage */] },
            { title: 'Invitations', component: __WEBPACK_IMPORTED_MODULE_7__pages_invitation_invitation__["a" /* InvitationPage */] },
            { title: 'Messages', component: __WEBPACK_IMPORTED_MODULE_8__pages_messages_messages__["a" /* MessagesPage */] },
        ];
        // this.splash = false;
        this.afAuth.auth.onAuthStateChanged(function (user) {
            if (user) {
                _this.rootPage = __WEBPACK_IMPORTED_MODULE_6__pages_tabs_tabs__["a" /* TabsPage */];
                // this.splash= false;
                console.log('auth state changed');
                console.log(user);
            }
            else {
                console.log("auth state changed erru");
                _this.rootPage = __WEBPACK_IMPORTED_MODULE_4__pages_login_login__["a" /* LoginPage */];
                // this.splash= false;
            }
        });
    }
    MyApp.prototype.openPage = function (page) {
        // Reset the content nav to have just this page
        // we wouldn't want the back button to show in this scenario
        // this.splash = false;
        this.nav.setRoot(page.component);
    };
    __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["_8" /* ViewChild */])(__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["g" /* Nav */]),
        __metadata("design:type", __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["g" /* Nav */])
    ], MyApp.prototype, "nav", void 0);
    MyApp = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["m" /* Component */])({template:/*ion-inline-start:"/home/anwar/hanimo2/src/app/app.html"*/'<!-- --Splash animations -- -->\n\n<div id="custom-overlay" [style.display]="splash ? \'flex\': \'none\'">\n    <div class="flb">\n      <div class="Aligner-item Aligner-item--top"></div>\n      <img src="assets/imgs/hanimo-logo.png">\n      <div class="Aligner-item Aligner-item--bottom"></div>\n    </div>\n  </div>\n  <!-- -- End Splash animations -- -->\n\n<ion-menu [content]="content" >\n    <ion-header  >\n      <ion-toolbar  color="sandy-brown" >\n        <ion-title>Menu</ion-title>\n      </ion-toolbar>\n    </ion-header>\n  \n    <ion-content>\n      <ion-list>\n          \n          <ion-list no-lines>\n                  <ion-item>\n                    <ion-avatar item-start>\n                      <img src="./../assets/imgs/avatar.jpg">\n                    </ion-avatar><br>\n                    \n                  </ion-item>\n                  <ion-item>\n                      <h2> Username</h2>\n                  </ion-item>\n            </ion-list>\n        <button menuClose ion-item *ngFor="let p of pages" (click)="openPage(p)">\n          \n          {{p.title}}\n        </button>\n      </ion-list>\n    </ion-content>\n  \n  </ion-menu>\n\n  <ion-nav [root]="rootPage" #content swipeBackEnabled="false"></ion-nav>\n'/*ion-inline-end:"/home/anwar/hanimo2/src/app/app.html"*/
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["j" /* Platform */], __WEBPACK_IMPORTED_MODULE_2__ionic_native_status_bar__["a" /* StatusBar */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["e" /* LoadingController */],
            __WEBPACK_IMPORTED_MODULE_3__ionic_native_splash_screen__["a" /* SplashScreen */],
            __WEBPACK_IMPORTED_MODULE_5_angularfire2_auth__["a" /* AngularFireAuth */]])
    ], MyApp);
    return MyApp;
}());

//# sourceMappingURL=app.component.js.map

/***/ }),

/***/ 91:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return TabsPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(15);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__home_home__ = __webpack_require__(330);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__messages_messages__ = __webpack_require__(162);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__poster_poster__ = __webpack_require__(332);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__invitation_invitation__ = __webpack_require__(164);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6_angularfire2_database__ = __webpack_require__(38);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};







var TabsPage = (function () {
    function TabsPage(navCtrl, navParams, afDatabase) {
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.afDatabase = afDatabase;
        // splash= true;
        this.tab1Root = __WEBPACK_IMPORTED_MODULE_2__home_home__["a" /* HomePage */];
        this.tab2Root = __WEBPACK_IMPORTED_MODULE_3__messages_messages__["a" /* MessagesPage */];
        this.tab3Root = __WEBPACK_IMPORTED_MODULE_4__poster_poster__["a" /* PosterPage */];
        this.tab4Root = __WEBPACK_IMPORTED_MODULE_5__invitation_invitation__["a" /* InvitationPage */];
        this.pages = [
            { title: 'Home', component: __WEBPACK_IMPORTED_MODULE_2__home_home__["a" /* HomePage */] },
            { title: 'Messages', component: __WEBPACK_IMPORTED_MODULE_3__messages_messages__["a" /* MessagesPage */] },
            { title: 'Poster', component: __WEBPACK_IMPORTED_MODULE_4__poster_poster__["a" /* PosterPage */] },
            { title: 'Invitations', component: __WEBPACK_IMPORTED_MODULE_5__invitation_invitation__["a" /* InvitationPage */] }
        ];
    }
    TabsPage.prototype.ionViewDidLoad = function () {
        // this.splash= false ;
    };
    TabsPage.prototype.openPage = function (p) {
        this.navCtrl.setRoot(p);
    };
    TabsPage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["m" /* Component */])({
            selector: 'page-tabs',template:/*ion-inline-start:"/home/anwar/hanimo2/src/pages/tabs/tabs.html"*/'<!-- <ion-menu [content]="content" >\n  <ion-header  >\n    <ion-toolbar  color="primary" >\n      <ion-title>Menu</ion-title>\n    </ion-toolbar>\n  </ion-header>\n\n  <ion-content>\n    <ion-list>\n        \n        <ion-list no-lines>\n                <ion-item>\n                  <ion-avatar item-start>\n                    <img src="./../assets/imgs/avatar.jpg">\n                  </ion-avatar><br>\n                  \n                </ion-item>\n                <ion-item>\n                    <h2> Username</h2>\n                </ion-item>\n          </ion-list>\n       <button menuClose ion-item *ngFor="let p of pages" (click)="openPage(p.component)">\n        \n        {{p.title}} \n      </button> \n    </ion-list>\n  </ion-content>\n\n</ion-menu> -->\n\n<!-- Disable swipe-to-go-back because it\'s poor UX to combine STGB with side menus -->\n<ion-nav [root]="rootPage" #content swipeBackEnabled="false"></ion-nav>\n\n<ion-tabs color="sandy-brown">\n  <ion-tab [root]="tab1Root" tabTitle="Accueil" tabIcon="ios-home-outline"></ion-tab>\n  <ion-tab [root]="tab2Root" tabTitle="Messages" tabIcon="ios-chatboxes-outline"></ion-tab>\n  <ion-tab [root]="tab3Root" tabTitle="Poster" tabIcon="ios-create-outline"></ion-tab>\n  <ion-tab [root]="tab4Root" tabTitle="Invitation" tabIcon="ios-person-add-outline"></ion-tab>\n</ion-tabs>'/*ion-inline-end:"/home/anwar/hanimo2/src/pages/tabs/tabs.html"*/,
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["h" /* NavController */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["i" /* NavParams */],
            __WEBPACK_IMPORTED_MODULE_6_angularfire2_database__["a" /* AngularFireDatabase */]])
    ], TabsPage);
    return TabsPage;
}());

//# sourceMappingURL=tabs.js.map

/***/ })

},[335]);
//# sourceMappingURL=main.js.map