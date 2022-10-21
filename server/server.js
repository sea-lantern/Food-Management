const { Client } = require('pg');
const express = require('express');
const bodyParser = require('body-parser');
const path = require('path')
const { v4: uuidv4 } = require('uuid')

const app = express()
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())
app.use(express.static(path.join(__dirname, '../app/build')))

const client = new Client({
    user: process.env.PG_USER,
    host: process.env.PG_HOST,
    database: process.env.PG_DATABASE,
    password: process.env.PG_PASSWORD,
    port: 5432
})
 
client.connect()

const authentication = async (req, res) => {
    var db = await client.query({
        text: 'SELECT last from users WHERE id=$1 AND token=$2',
        values: [req.query.id, req.query.token],
    })

    if(db.rows.length === 0) {
        res.status(401)
        res.send({message: '無効な操作です。'})
        return true
    }

    if(3600000 * 24 * 30 < new Date(Date.now()) - db.rows[0].last) {
        res.status(401)
        res.send({message: 'ログインセッションが切れました。'})
        return true
    }

    await client.query({
        text: 'UPDATE users SET last=$1 WHERE id=$2',
        values: [(new Date(Date.now() + 3600000 * 9)).toISOString(), req.query.id],
    })

    return false
}

app.get('/api/account', async (req, res) => {
    if(await authentication(req, res)) return

    var db = await client.query({
        text: 'SELECT name from user_info WHERE id=$1',
        values: [req.query.id],
    })

    res.send({name: db.rows[0].name})
})

app.post('/api/account', async (req, res) => {
    var db = await client.query({
        text: 'SELECT id from users WHERE email=$1',
        values: [req.body.email],
    })

    if(db.rows.length !== 0) {
        res.status(400)
        res.send({message: '既に登録されているメールアドレスです。'})
        return
    }

    var userid = uuidv4()
    var tokenid = uuidv4()

    await client.query({
        text: 'INSERT INTO users(id, email, pass, token, last) VALUES($1, $2, $3, $4, $5)',
        values: [userid, req.body.email, req.body.pass, tokenid, (new Date(Date.now() + 3600000 * 9)).toISOString()],
    })

    await client.query({
        text: 'INSERT INTO user_info(id, name) VALUES($1, $2)',
        values: [userid, req.body.name],
    })

    res.send({userid: userid, tokenid: tokenid})
})

app.post('/api/login', async (req, res) => {
    var db = await client.query({
        text: 'SELECT id from users WHERE email=$1 AND pass=$2',
        values: [req.body.email, req.body.pass],
    })

    if(db.rows.length === 0) {
        res.status(401)
        res.send({message: 'ログインに失敗しました。'})
        return
    }

    var tokenid = uuidv4()

    await client.query({
        text: 'UPDATE users SET token=$1, last=$2 WHERE id=$3',
        values: [tokenid, (new Date(Date.now() + 3600000 * 9)).toISOString(), db.rows[0].id],
    })

    res.send({userid: db.rows[0].id, tokenid: tokenid})
})

app.post('/api/test', (req, res) => {
    console.log(req.body)
    res.send(req.body)

    console.log('aaaa')

    const today = new Date(Date.now())

    console.log((new Date(Date.now())).toISOString());
})

app.get('*', (req, res) => {res.sendFile(path.join(__dirname, '../app/build/index.html'))})

app.listen(8000)