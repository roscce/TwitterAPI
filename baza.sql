CREATE TABLE user (
	id_user int NOT NULL, 
	name varchar(30),
	followers int,
	number_of_tweets int,
	PRIMARY KEY(id_user)

);


CREATE TABLE tweet (
	id_tweet bigint NOT NULL,
	text varchar(200) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci,
	retweets int,
	likes int,
	id_user int,
	PRIMARY KEY(id_tweet),
	FOREIGN KEY(id_user) REFERENCES user(id_user)
);

ALTER DATABASE twitter CHARACTER SET = utf8mb4 COLLATE = utf8mb4_unicode_ci;
ALTER TABLE tweet CONVERT TO CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
ALTER TABLE user CONVERT TO CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;


