import { Component } from '@angular/core';
import { NavParams, ViewController } from 'ionic-angular';
import { Toast } from '@ionic-native/toast';

import { StorageService } from '../../../services/StorageService';
import { Watcher } from '../../../classes/watcher';

@Component({
  selector: 'page-contact',
  templateUrl: 'reminder-delete.html'
})
export class DeleteReminderModal {

	/* Variables */

	allWatchers: Watcher[] = [];
	deleteCoin: string[] = [];

	/* Constructor */

	constructor(public params: NavParams,
				public viewCtrl: ViewController,
				private toast: Toast,
				public store: StorageService) {

		this.allWatchers = params.get('allWatchers');
	}	

	/* Methods */

	DeleteReminder(){

		if(this.allWatchers.length != 0){
			for(let i = 0; i < this.allWatchers.length; i++){
				if(this.allWatchers[i].DeleteMe){
					this.deleteCoin.push(this.allWatchers[i].ShortHand);
				}
			}

			for(let i = 0; i < this.allWatchers.length; i++){

				for(let j = 0; j < this.deleteCoin.length; j++){

					if(this.allWatchers[i].ShortHand == this.deleteCoin[j])
					{
						this.allWatchers.splice(i, 1);
					}
				}
			}

			this.toast.show('Deleted reminder.', '2000', 'center').subscribe(toast => {});

			this.store.DeleteWatcher(this.deleteCoin);
			
			this.Dismiss();
		}
		else{			
			this.toast.show('There is no reminders to delete', '2000', 'center').subscribe(toast => {});
		}
		
		this.viewCtrl.dismiss(this.allWatchers);
		return false;
	}	

	Dismiss(){
		this.viewCtrl.dismiss(this.allWatchers);
	}
}