
set up

db

CREATE DATABASE fm;
psql -d fm
create table users(id text, email text, pass text, token text, last timestamp);
create table user_info(id text, name text);

run

node server/server.js