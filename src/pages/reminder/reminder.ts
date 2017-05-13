import { Component,EventEmitter, Output  } from '@angular/core';
import { NavController, ModalController } from 'ionic-angular';
import { BackgroundMode } from '@ionic-native/background-mode';
import { MediaPlugin, MediaObject } from '@ionic-native/media';
import { Toast } from '@ionic-native/toast';

import { CreateReminderModal } from './reminder-create/reminder-create';
import { DeleteReminderModal } from './reminder-delete/reminder-delete';
import { StorageService } from '../../services/StorageService';
import { WatcherService } from '../../services/WatcherService';
import { HttpSender } from '../../services/HttpSender';
import { Watcher } from '../../classes/watcher';

@Component({
  selector: 'page-contact',
  templateUrl: 'reminder.html'
})
export class Reminder {

	/* Variables */

	subscription: any;
	allWatchers: Watcher[] = [];

	@Output() reminderEmitter = new EventEmitter<Watcher[]>();

	/* Consturctor */

	constructor(public navCtrl: NavController,
				public modalCtrl: ModalController,
				private media: MediaPlugin,
				public storeService: StorageService,
				private watcherService: WatcherService,
				private backgroundMode: BackgroundMode,
				private http: HttpSender,
				private toast: Toast) {

		this.LoadWatchers().then((data: Watcher[]) => {
			this.allWatchers = data;
			this.reminderEmitter.emit(this.allWatchers);
		});

		this.subscription = this.watcherService.watcherEmitter
		.subscribe((any) => this.CheckWatcher());

		this.backgroundMode.enable();
	}

	/* Methods */

	UpdateToggle(i, user: boolean){

		// If the reminder is toggled off or on ..
		// Update it locally and in the database

		if(user){
			this.storeService.UpdateWatcher(this.allWatchers[i].ShortHand,
											this.allWatchers[i].DropAmount,
											this.allWatchers[i].RiseAmount,
											this.allWatchers[i].On);			
		}
		else{
			this.storeService.UpdateWatcher(this.allWatchers[i].ShortHand,
								this.allWatchers[i].DropAmount,
								this.allWatchers[i].RiseAmount,
								false);	
		}

		this.allWatchers[i].On = false;	
	}

	/* CRUD Methods */

	CreateWatcher(){
		let reminderCreateModal = this.modalCtrl.create(CreateReminderModal, {allWatchers : this.allWatchers});

		reminderCreateModal.onDidDismiss(data => {

			this.LoadWatchers().then((data: Watcher[]) => {
				this.allWatchers = [];
				this.allWatchers = data;
				this.reminderEmitter.emit(this.allWatchers);
			});
		});	

  		reminderCreateModal.present();
	}	

	LoadWatchers(){
		return this.storeService.GetWatchers();
	}

	DeleteWatcher(){
		let reminderDeleteModal = this.modalCtrl.create(DeleteReminderModal, {allWatchers : this.allWatchers});
  		
		reminderDeleteModal.onDidDismiss(data => {
			this.allWatchers = [];
			this.allWatchers = data;
			this.reminderEmitter.emit(this.allWatchers);
		});		

  		reminderDeleteModal.present();
	}

	/* Reminder checking methods */

	CheckWatcher(){

		this.http.GetMultiCointData().subscribe(
        (response) => {

            const data = response.json(); 

            if(data != undefined && data != null){      

            	for (var key in data){

	            	for(let j = 0; j < this.allWatchers.length; j++){

	            		if(this.allWatchers[j].ShortHand == key){

	            			if(data[key].USD <= this.allWatchers[j].DropAmount){
	            				this.SoundAlert(j,this.allWatchers[j].ShortHand + " has dropped below $" + this.allWatchers[j].DropAmount);
	            			} 	 
	            			if(data[key].USD >= this.allWatchers[j].RiseAmount){
	            				this.SoundAlert(j,this.allWatchers[j].ShortHand + " has risen above $" + this.allWatchers[j].RiseAmount);
	            			}         		
	            		}//IF	            

	            	}//FOR            	

            	}//FOR

        	}//IF
        },(error) => {});
	}

	SoundAlert(i: number, message: string){

		const file: MediaObject = this.media.create('/android_asset/www/assets/sound/coinsound.mp3');

		this.toast.show(message, '10000', 'top').subscribe(
		  toast => {
		    file.play();
		    this.UpdateToggle(i, false);
		  }
		);
	}
}