import { Component, Output, EventEmitter } from '@angular/core';
import { HttpSender } from '../../services/HttpSender';
import { WatcherService } from '../../services/WatcherService';
import { CryptoCoin } from '../../classes/cryptocoin';
import { AllCoins } from '../../classes/allcoins';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})

export class HomePage {
	
	/* Variables */

	private interval  = null;
	private oneMinute : number = 60;

	timeUntil : number = 60;

	@Output() currentCoin: CryptoCoin = new CryptoCoin('ETH','Ethereum');
	@Output() timerEmitter = new EventEmitter<number>();
	@Output() dateEmitter = new EventEmitter<string>();
	@Output() coinEmitter = new EventEmitter<CryptoCoin>();
	@Output() checkWatchers = new EventEmitter();

	coins: CryptoCoin[] = [];
	allcoins: AllCoins = new AllCoins();
	lastTimeChecked: string = ''; 

	/* Consturctor */

	constructor(private http: HttpSender,private watcherService: WatcherService) {

		for(let i = 0; i < this.allcoins.coins.length; i++){
			this.coins.push(this.allcoins.coins[i]);
		}

		this.StartTimer();
		this.UpdateData();
	}

	/* Methods */

	SelectedCoinType(index: number){
		this.currentCoin = this.coins[index];
		this.coinEmitter.emit(this.currentCoin);
		this.UpdateData();	
	}

    UpdateData(){

    	this.http.GetSingleData(this.currentCoin).subscribe(
        (response) => {
        	
            const data = response.json(); 

            if(data != ''){
            	this.currentCoin.euroValue = data['EUR'];
	            this.currentCoin.usdValue = data['USD'];

	            this.lastTimeChecked = new Date().toISOString();
	        	this.dateEmitter.emit(this.lastTimeChecked);
	        	this.coinEmitter.emit(this.currentCoin);
				
				this.watcherService.CheckWatchers();	        	
        	}

            this.timeUntil = this.oneMinute;
        },
        (error) => {});
    }

	RefreshPage(){		
		this.UpdateData();
	}

	StartTimer(){
		this.timeUntil = this.oneMinute;

	    this.interval = setInterval(() => {
	        this.Timer();
	    },1000) ;   
	}

	Timer(){
		
		if(this.timeUntil == 0)
			this.UpdateData();
		else			
			this.timeUntil -= 1;

		this.timerEmitter.emit(this.timeUntil);
	}

}// HomePage