import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { CryptoCoin } from '../classes/cryptocoin';
import { AllCoins } from '../classes/allcoins';

@Injectable()
export class HttpSender
{
    /* Variables */

	prequery = "https://min-api.cryptocompare.com/data/pricemulti?fsyms=";
	postquery = "&tsyms=USD,EUR";

    /* Constructor */

    constructor(private http: Http,
    			private allcoins: AllCoins){}

    /* Methods */
    
    GetSingleData(cointype: CryptoCoin){
    	
    	if(cointype != null)
			return this.http.get('https://min-api.cryptocompare.com/data/price?fsym=' + cointype.shorthand + '&tsyms=,USD,EUR');
		else
			return this.http.get('https://min-api.cryptocompare.com/data/price?fsym=ETH&tsyms=,USD,EUR');
    }

    GetMultiCointData(){

    	let coins: CryptoCoin[];

    	coins = this.allcoins.GetCoins();

    	let queryUrl = this.prequery;

    	for(let i = 0; i < coins.length; i++){
    		if(i != (coins.length - 1))
    			queryUrl = queryUrl + coins[i].shorthand + ",";
    		else
    			queryUrl = queryUrl + coins[i].shorthand;
    	}

    	queryUrl = queryUrl + this.postquery;

    	return this.http.get(queryUrl);
    }
}