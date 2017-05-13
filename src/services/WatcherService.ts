import { Output, EventEmitter } from '@angular/core';

export class WatcherService{

	/* 
		Small service used as an inbetween for
		the auto/manual currency check on the home.ts
		and makes sure the reminders get checked
	*/ 
	
	@Output() watcherEmitter = new EventEmitter<any>();

	constructor(){}

	CheckWatchers(){
		this.watcherEmitter.emit(null);
	}

}