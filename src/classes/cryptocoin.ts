export class CryptoCoin {

	name: string = '';
	shorthand: string = '';
	euroValue: number = 0;
	usdValue: number = 0;

	constructor(shorthand: string,name: string){
		this.name = name;
		this.shorthand = shorthand;
	}
}