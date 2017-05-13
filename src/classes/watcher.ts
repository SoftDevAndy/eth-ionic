export class Watcher{
	
	DropAmount: number = 0;
	RiseAmount: number = 0;
	ShortHand: string = '';
	CheckPeriod: number = 1800;
	On: boolean = false;
	DeleteMe: boolean = false;

	constructor(ShortHand: string,
				DropAmount: number,
				RiseAmount: number,
				On: boolean){
		this.DropAmount = DropAmount;
		this.RiseAmount = RiseAmount;
		this.ShortHand = ShortHand;
		this.On = On;
		this.DeleteMe = false;
	}
}