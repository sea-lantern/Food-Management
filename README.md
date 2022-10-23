
set up

sudo iptables -t nat -A PREROUTING -p tcp --dport 80 -j REDIRECT --to-ports 8000

db

CREATE DATABASE fm;
psql -d fm

create table users(id text, email text, pass text, token text, last timestamp);
create table user_info(id text, name text);

create table menu(id text, userid text, name text, time smallint, date date);
create table foods(userid text, name text, type smallint, amount smallint, term timestamp);
create table materials(menuid text, name text, amount smallint);

delete from users;
delete from user_info;
delete from menu;
delete from foods;
delete from materials;


run

http://localhost:8000
https://www.food-management.tk

.env
REACT_APP_SHOST=[server host]

cd app 
npm start
npm run build

cd server
PG_USER=** PG_HOST=localhost PG_DATABASE=fm PG_PASSWORD=** node server.js
../run.sh

nohup ../run.sh &
ps kill