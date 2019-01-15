console.log("Version 2.0");

var Twit = require('twit');

var config = require('./config');
var T = new Twit(config);

var users = []; 

//welcome to callback hell, callback je narejen za vsakega uporabnika posebi

T.get('statuses/user_timeline', { screen_name: 'katyperry'}, gotDataTweets1);

// callback za Katy Perry
function gotDataTweets1(err, data, response) {
  	users.push({
  	id_user: data[0].user.id,
  	name: data[0].user.screen_name,
  	followers: data[0].user.followers_count,
	number_of_tweets: data[0].user.statuses_count
  });

  //shranjevanje posameznih podatkov tvita v tabelo in nato še v userja
  var tviti = [];

  for(var i = 0; i < data.length; i++) 
  	tviti.push({
  		id_tweet: data[i].id,
  		text: data[i].text,
  		likes: data[i].favorite_count,
  		retweets: data[i].retweet_count
  	});

  	users[0].tviti = tviti;

  	//callback za Demi Lovato

  	T.get('statuses/user_timeline', { screen_name: 'ddlovato'}, gotDataTweets2);

  	function gotDataTweets2(err, data, response) {
		users.push({
		  	id_user: data[0].user.id,
		  	name: data[0].user.screen_name,
		  	followers: data[0].user.followers_count,
			number_of_tweets: data[0].user.statuses_count
		  });

		var tviti = [];

		for(var i = 0; i < data.length; i++) 
			tviti.push({
				id_tweet: data[i].id,
				text: data[i].text,
				likes: data[i].favorite_count,
				retweets: data[i].retweet_count
			});

		users[1].tviti = tviti;

		//callback za Umeka

		T.get('statuses/user_timeline', { screen_name: 'UMEK_1605'}, gotDataTweets3);

	  	function gotDataTweets3(err, data, response) {
			users.push({
			  	id_user: data[0].user.id,
			  	name: data[0].user.screen_name,
			  	followers: data[0].user.followers_count,
				number_of_tweets: data[0].user.statuses_count
			  });

			var tviti = [];
			
			for(var i = 0; i < data.length; i++) 
				tviti.push({
					id_tweet: data[i].id,
					text: data[i].text,
					likes: data[i].favorite_count,
					retweets: data[i].retweet_count
				});

			users[2].tviti = tviti;



//-------------------------------------baza----------------------------------------

			//Povezovanje z bazo

			var mysql = require('mysql');
			var conn = mysql.createConnection({
			    host     : 'localhost',
			    database : 'twitter',
			    user     : 'root',
			    password : 'root',
			    charset : 'utf8mb4'
			});

			conn.connect(function(err) {
			    if (err) {
			        console.error('Error connecting: ' + err.stack);
			        return;
			    }

			    console.log('Connected as id ' + conn.threadId);

			    // vnašanje podatkov za uporabnike

			 	var sql = "INSERT INTO user VALUES "
			 	for(var i=0; i < users.length; i++)
			 		sql += '(' + users[i].id_user + ', "'+ users[i].name +'", '+ users[i].followers +', '+ users[i].number_of_tweets +'),';

			 	sql = sql.slice(0, -1); //brisanje zadnje vejice

			 	conn.query(sql, function (err, result) {
				    if (err) throw err;
				    console.log("1 record inserted");
				});

			 	//vnašanje tvitov uporabnikov

			 	var ins="";
			 	var ins_arr = []; //ker je toliko podatkov se morajo vnesti preko tabele

			 	for(var i=0; i < users.length; i++)
			 		for(var j=0; j < users[i].tviti.length; j++)
			 			ins_arr.push([
			 				users[i].tviti[j].id_tweet,
			 				users[i].tviti[j].text,
			 				users[i].tviti[j].retweets,
			 				users[i].tviti[j].likes,
			 				users[i].id_user
			 			]);

			 	

			 	ins = 'INSERT INTO tweet VALUES ?';
				
			 	conn.query(ins, [ins_arr], function (err, result) {
				    if (err) throw err;
				    console.log("1 record inserted");
				});

			conn.end();

			});


			//ustvarjanje json datoteke z user podatki, ki je bil namenjen za 2. nalogo

			var strusers = JSON.stringify(users);
			var fs = require('fs');
			fs.writeFile ("users.json", JSON.stringify(data), function(err) {
			    if (err) throw err;
			    console.log('complete');
			});	
		}
	}

	
  
 }








