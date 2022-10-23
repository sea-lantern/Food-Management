const { Client } = require('pg')
const express = require('express')
const cors = require('cors')
const bodyParser = require('body-parser')
const path = require('path')
const { v4: uuidv4 } = require('uuid')

const app = express()

app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())
app.use(express.static(path.join(__dirname, '../app/build')))
app.use(cors())

const client = new Client({
    user: process.env.PG_USER,
    host: process.env.PG_HOST,
    database: process.env.PG_DATABASE,
    password: process.env.PG_PASSWORD,
    port: 5432
})
 
client.connect()

const authentication = async (req, res) => {
    const db = await client.query({
        text: 'SELECT last from users WHERE id=$1 AND token=$2',
        values: [req.query.id, req.query.token],
    })

    if(db.rows.length === 0) {
        res.status(403)
        res.send({message: '無効な操作です。'})
        return true
    }

    if(3600000 * 24 * 30 < new Date() - db.rows[0].last) {
        res.status(403)
        res.send({message: 'ログインセッションが切れました。'})
        return true
    }

    await client.query({
        text: 'UPDATE users SET last=$1 WHERE id=$2',
        values: [(new Date()).toLocaleString(), req.query.id],
    })

    return false
}

const validationError = async (res) => {
    res.send({validation: '入力が正しくありません。'})
}

/////////////
// account //
/////////////
app.get('/api/account', async (req, res) => {
    if(await authentication(req, res)) return

    const db = await client.query({
        text: 'SELECT name from user_info WHERE id=$1',
        values: [req.query.id],
    })

    res.send({name: db.rows[0].name})
})

app.post('/api/account', async (req, res) => {
    if(!req.body.email || !req.body.pass || !req.body.name) {
        await validationError(res)
        return
    }

    const db = await client.query({
        text: 'SELECT id from users WHERE email=$1',
        values: [req.body.email],
    })

    if(db.rows.length !== 0) {
        res.status(403)
        res.send({message: '既に登録されているメールアドレスです。'})
        return
    }

    const id = uuidv4()
    const token = uuidv4()

    await client.query({
        text: 'INSERT INTO users(id, email, pass, token, last) VALUES($1, $2, $3, $4, $5)',
        values: [id, req.body.email, req.body.pass, token, (new Date()).toLocaleString()],
    })

    await client.query({
        text: 'INSERT INTO user_info(id, name) VALUES($1, $2)',
        values: [id, req.body.name],
    })

    res.send({id: id, token: token})
})


///////////
// login //
///////////
app.post('/api/login', async (req, res) => {
    if(!req.body.email || !req.body.pass) {
        await validationError(res)
        return
    }

    const db = await client.query({
        text: 'SELECT id from users WHERE email=$1 AND pass=$2',
        values: [req.body.email, req.body.pass],
    })

    if(db.rows.length === 0) {
        res.status(403)
        res.send({message: 'ログインに失敗しました。'})
        return
    }

    const token = uuidv4()

    await client.query({
        text: 'UPDATE users SET token=$1, last=$2 WHERE id=$3',
        values: [token, (new Date()).toLocaleString(), db.rows[0].id],
    })

    res.send({id: db.rows[0].id, token: token})
})


//////////
// menu //
//////////
const returnMenuData = async (req, res) => {
    const y = Number(req.query.year)
    const m = Number(req.query.month)

    const from = new Date(y, m - 1)
    const to = new Date(y + Math.floor(m / 12), m % 12)
    
    const db = await client.query({
        text: 'SELECT * from menu WHERE userid=$1 AND $2<=date AND date<=$3',
        values: [req.query.id, from.toLocaleString(), to.toLocaleString()],
    })

    const menu = Array(31);
    for(let i = 0; i < 31; i++){
        menu[i] = [];
    }

    for(row of db.rows){
        menu[row.date.getDate() - 1].push({id: row.id, name: row.name, type: row.time})
    }

    res.send({menu: menu})
}

app.get('/api/menu', async (req, res) => {
    if(await authentication(req, res)) return

    if(!req.query.year || !req.query.month) {
        await validationError(res)
        return
    }

    returnMenuData(req, res)
})

app.post('/api/menu', async (req, res) => {
    if(await authentication(req, res)) return

    if(!req.query.year || !req.query.month || !req.body.name || !req.body.time || !req.body.date) {
        await validationError(res)
        return
    }

    const id = uuidv4()

    await client.query({
        text: 'INSERT INTO menu(id, userid, name, time, date) VALUES($1, $2, $3, $4, $5)',
        values: [id, req.query.id, req.body.name, req.body.time, req.body.date],
    })

    returnMenuData(req, res)
})

app.put('/api/menu', async (req, res) => {
    if(await authentication(req, res)) return

    if(!req.query.year || !req.query.month || !req.query.menuid || !req.body.name || !req.body.time) {
        await validationError(res)
        return
    }

    await client.query({
        text: 'UPDATE menu set name=$1, time=$2 WHERE id=$3',
        values: [req.body.name, req.body.time, req.query.menuid],
    })

    returnMenuData(req, res)
})

app.delete('/api/menu', async (req, res) => {
    if(await authentication(req, res)) return

    if(!req.query.year || !req.query.month || !req.query.menuid) {
        await validationError(res)
        return
    }

    await client.query({
        text: 'DELETE from menu WHERE id=$1',
        values: [req.query.menuid],
    })

    returnMenuData(req, res)
})


///////////////
// materials //
///////////////
const returnMaterialData = async (req, res) => {
    const db = await client.query({
        text: 'SELECT name, amount from materials WHERE menuid=$1',
        values: [req.query.menuid],
    })

    res.send({materials: db.rows})
}

app.get('/api/materials', async (req, res) => {
    if(await authentication(req, res)) return

    if(!req.query.menuid) {
        await validationError(res)
        return
    }

    returnMaterialData(req, res)
})

app.post('/api/materials', async (req, res) => {
    if(await authentication(req, res)) return

    if(!req.query.menuid || !req.body.name || !req.body.amount) {
        await validationError(res)
        return
    }

    await client.query({
        text: 'INSERT INTO materials(menuid, name, amount) VALUES($1, $2, $3)',
        values: [req.query.menuid, req.body.name, req.body.amount],
    })

    returnMaterialData(req, res)
})

app.put('/api/materials', async (req, res) => {
    if(await authentication(req, res)) return

    if(!req.query.menuid || !req.query.name || !req.body.amount) {
        await validationError(res)
        return
    }

    await client.query({
        text: 'UPDATE materials set amount=$1 WHERE menuid=$2 AND name=$3',
        values: [req.body.amount, req.query.menuid, req.query.name],
    })

    returnMaterialData(req, res)
})

app.delete('/api/materials', async (req, res) => {
    if(await authentication(req, res)) return

    if(!req.query.menuid || !req.query.name) {
        await validationError(res)
        return
    }

    await client.query({
        text: 'DELETE from materials WHERE menuid=$1 AND name=$2',
        values: [req.query.menuid, req.query.name],
    })

    returnMaterialData(req, res)
})


///////////
// foods //
///////////
const returnFoodData = async (req, res) => {
    const db = await client.query({
        text: 'SELECT name, type, amount, term from foods WHERE userid=$1',
        values: [req.query.id],
    })

    const foods = {1: [], 2: []}

    for(row of db.rows){
        foods[row.type].push({name: row.name, amount: row.amount, term: row.term.toLocaleString()})
    }

    res.send({foods: foods})
}

app.get('/api/foods', async (req, res) => {
    if(await authentication(req, res)) return

    returnFoodData(req, res)
})

app.post('/api/foods', async (req, res) => {
    if(await authentication(req, res)) return

    if(!req.body.name || !req.body.type || !req.body.amount) {
        await validationError(res)
        return
    }

    if(req.body.type === 2 && !req.body.term){
        await validationError(res)
        return
    }

    await client.query({
        text: 'INSERT INTO foods(userid, name, type, amount, term) VALUES($1, $2, $3, $4, $5)',
        values: [req.query.id, req.body.name, req.body.type, req.body.amount, req.body.term],
    })

    returnFoodData(req, res)
})

app.put('/api/foods', async (req, res) => {
    if(await authentication(req, res)) return

    if(!req.query.name || !req.body.amount) {
        await validationError(res)
        return
    }

    await client.query({
        text: 'UPDATE foods set amount=$1 WHERE userid=$2 AND name=$3',
        values: [req.body.amount, req.query.id, req.query.name],
    })

    returnFoodData(req, res)
})

app.delete('/api/foods', async (req, res) => {
    if(await authentication(req, res)) return

    if(!req.query.name) {
        await validationError(res)
        return
    }

    await client.query({
        text: 'DELETE from foods WHERE userid=$1 AND name=$2',
        values: [req.query.id, req.query.name],
    })

    returnFoodData(req, res)
})

app.get('*', (req, res) => {res.sendFile(path.join(__dirname, '../app/build/index.html'))})

app.listen(8000)