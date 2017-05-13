import { NgModule, ErrorHandler } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { MyApp } from './app.component';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { HttpSender } from '../services/HttpSender';
import { HttpModule } from '@angular/http';
import { SQLite } from '@ionic-native/sqlite';
import { Toast } from '@ionic-native/toast';

import { WatcherService } from '../services/WatcherService';
import { StorageService } from '../services/StorageService';
import { MediaPlugin } from '@ionic-native/media';
import { BackgroundMode } from '@ionic-native/background-mode';

import { AboutPage } from '../pages/about/about';
import { Reminder } from '../pages/reminder/reminder';
import { CreateReminderModal } from '../pages/reminder/reminder-create/reminder-create';
import { DeleteReminderModal } from '../pages/reminder/reminder-delete/reminder-delete';
import { HomePage } from '../pages/home/home';
import { TabsPage } from '../pages/tabs/tabs';
import { AllCoins } from '../classes/allcoins';

@NgModule({
  declarations: [
    MyApp,
    AboutPage,
    Reminder,
    HomePage,
    TabsPage,
    CreateReminderModal,
    DeleteReminderModal
  ],
  imports: [
    BrowserModule,
    HttpModule,
    IonicModule.forRoot(MyApp)
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    AboutPage,
    Reminder,
    HomePage,
    TabsPage,
    Reminder,
    CreateReminderModal,
    DeleteReminderModal,
  ],
  providers: [
    SQLite,  
    Toast,
    StorageService,
    WatcherService,
    HttpSender,
    HttpModule,
    StatusBar,
    SplashScreen,
    AllCoins,  
    MediaPlugin,
    BackgroundMode,
    {provide: ErrorHandler, useClass: IonicErrorHandler}
  ]
})
export class AppModule {}
