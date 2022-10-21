
set up

sudo iptables -t nat -A PREROUTING -p tcp --dport 80 -j REDIRECT --to-ports 8000

db

CREATE DATABASE fm;
psql -d fm
create table users(id text, email text, pass text, token text, last timestamp);
create table user_info(id text, name text);

run

cd app && npm run build
node server/server.js
cd ../server
PG_USER=** PG_HOST=localhost PG_DATABASE=fm PG_PASSWORD=** node server.js