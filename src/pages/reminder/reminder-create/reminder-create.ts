import { Component , ViewChild, } from '@angular/core';
import { NgForm } from '@angular/forms';
import { NavParams, ViewController } from 'ionic-angular';
import { Toast } from '@ionic-native/toast'

import { AllCoins } from '../../../classes/allcoins';
import { StorageService } from '../../../services/StorageService';
import { Watcher } from '../../../classes/watcher';

@Component({
  selector: 'page-contact',
  templateUrl: 'reminder-create.html'
})

export class CreateReminderModal {

	/* Variables */

	allWatchers: Watcher[] = [];
	allcoins: AllCoins = new AllCoins();

	@ViewChild('form') watcherForm: NgForm;

	/* Constructor */

	constructor(public viewCtrl: ViewController,
				public store: StorageService,
				private toast: Toast,
				params: NavParams
				) {

		this.allWatchers = params.get('allWatchers');
	}	

	/* Methods */

	CreateWatcher(){

		let flag: boolean = false;

		for(let i = 0; i < this.allWatchers.length; i++){
			if(this.allWatchers[i].ShortHand == this.watcherForm.value.coinType)
			{
				flag = true;
			}
		}

		if(flag){
			this.toast.show("You already has a reminder for " + this.watcherForm.value.coinType, '3000', 'center').subscribe(toast => {});
		}else{
			this.store.SaveWatcher( this.watcherForm.value.coinType,
									this.watcherForm.value.minVal,
									this.watcherForm.value.maxVal, true)

				.then((result: string) => {
					this.toast.show(result, '3000', 'center').subscribe(toast => {});

	    	});			
		}

		this.viewCtrl.dismiss(this.allWatchers);
		return false;
	}

	Dismiss(){
		this.viewCtrl.dismiss(this.allWatchers);
		return false;
	}
}

