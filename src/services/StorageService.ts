import { Injectable } from '@angular/core';
import { SQLite, SQLiteObject } from '@ionic-native/sqlite';

import { Watcher } from '../classes/watcher';

@Injectable()
export class StorageService{

	/* Variables */

	allWatchers: Watcher[] = [];

	/* Constructor */

	constructor(private sqlite: SQLite) {}

	/* Methods */

	CreateDB(){

		this.sqlite.create({
		  name: 'data.db',
		  location: 'default'
		})
		.then((db: SQLiteObject) => {

		let createTable = 'CREATE TABLE IF NOT EXISTS watcher(shorthand VARCHAR(10) PRIMARY KEY, min FLOAT(12,6), max FLOAT(12,6), onoroff INT)';

		db.executeSql(createTable, {})
		  .then(() => {console.log('Created Table')})
		  .catch(e => {console.log('Error Creating Table')})
		  .catch(e => {console.log('Error Creating Table')})
		})
		.catch(e => console.log(e));
	}

	SaveWatcher(shorthand: string,min: number,max: number,onoroff: boolean){

		return new Promise((resolve, reject) => {

			let flag = 0;

			if(onoroff == true)
				flag = 1;
			else
				flag = 0;

			let insertQuery = "INSERT INTO watcher (shorthand,min,max,onoroff) VALUES ('"  + 
			shorthand + "'," + min + "," + max + "," + flag + ")";

			let createTable = 'CREATE TABLE IF NOT EXISTS watcher(shorthand VARCHAR(10) PRIMARY KEY, min FLOAT(12,6), max FLOAT(12,6), onoroff INT)';

			this.sqlite.create({
			  name: 'data.db',
			  location: 'default'
			})
			.catch(e => {resolve('Error: Couldnt create db.');})
			.then((db: SQLiteObject) => {
				
					db.executeSql(createTable, {}).catch(e => {resolve('Error: Couldnt insert.');}).then(() => {
				  
						db.executeSql(insertQuery, {}).catch(e => {resolve('Error: Couldnt insert.');}).then(() => {

							resolve('Saved Reminder');});
						});	
					});
			});
	}

	DeleteWatcher(shorthand: string[]){

		return new Promise((resolve, reject) => {

			let query = '';

			if(shorthand.length != 1){ 
				query = "DELETE FROM watcher WHERE shorthand='" + shorthand[0] + "'";
			}else{

				query = "DELETE FROM watcher WHERE shorthand=";

				for(let i = 0; i < shorthand.length; i++){

					if((shorthand.length -1) != i){
						query += "'" + shorthand[i] + "' AND shorthand=";
					}
					else
						query += "'" + shorthand[i] + "'";
				}
			}

			console.log("QUERY\n" + query);

			this.sqlite.create({
			  name: 'data.db',
			  location: 'default'
			})
			.then((db: SQLiteObject) => {

			db.executeSql(query, {})
			  .then(() => {console.log("Deleted Reminder"); resolve('Deleted Reminder')})
			  .catch(e => {console.log("Error deleting reminder");});
			}).catch(e => {console.log("Error deleting reminder");});	
		});	
	}	

	UpdateWatcher(shorthand: string,min: number,max: number,active: boolean){

		let flag = 0;

		if(active == true)
			flag = 1;
		else
			flag = 0;

		let query = "UPDATE watcher SET onoroff = " + flag + " WHERE shorthand = '" + shorthand + "'";
		
		this.sqlite.create({
		  name: 'data.db',
		  location: 'default'
		}).then((db: SQLiteObject) => {

		db.executeSql(query, {})
		  .then(() => {})
		  .catch(e => {console.log("Error updating reminder");});
		}).catch(e => {console.log("Error updating reminder");});
	}

	GetWatchers(){

		return new Promise((resolve, reject) => {

			let query = "SELECT * FROM watcher";
			
			this.sqlite.create({
			  name: 'data.db',
			  location: 'default'
			}).then((db: SQLiteObject) => {

			db.executeSql(query, {}).then(data => {

			  	for(let i = 0; i < data.rows.length; i++){

			  		let flag = false;

			  		if(data.rows.item(i).onoroff)
			  			flag = true;
			  		else
			  			flag = false;

			  		this.allWatchers.push(new Watcher(data.rows.item(i).shorthand,
			  										  data.rows.item(i).min,
			  										  data.rows.item(i).max,
			  	 								  flag));
			  	};

			  	resolve(this.allWatchers);

			  }).catch(e => {console.log("Error getting reminder");});
			}).catch(e => {console.log("Error getting reminder");});
		});	
	}

	/*

	// Was used for debugging

	ClearAllReminder(){

		return new Promise((resolve, reject) => {

			let query = "DROP TABLE watcher IF EXISTS";
			
			this.sqlite.create({
			  name: 'data.db',
			  location: 'default'
			})
			.then((db: SQLiteObject) => {

			db.executeSql(query, {})
			  .then(() => resolve('Cleared Table'))
			  .catch(e => {console.log("Error Clearing Table");});
			}).catch(e => {console.log("Error deleting reminder");});	
		});	
	}
	*/	
}