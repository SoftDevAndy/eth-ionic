import { CryptoCoin } from './cryptocoin';

export class AllCoins{

	coins: CryptoCoin[] = [];

	constructor(){
		this.coins.push(new CryptoCoin('ETH','Ethereum'));
		this.coins.push(new CryptoCoin('BTC','BitCoin'));
		this.coins.push(new CryptoCoin('LTC','Litecoin'));	
	}

	GetCoins(){
		return this.coins;
	}

}