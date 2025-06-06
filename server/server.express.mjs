import express from 'express'
import bodyParser from 'body-parser'
import { db } from "./server.mongodb.js"
import { ObjectId } from "mongodb"
import cors from 'cors';

const app = express();
const port = process.env.PORT;

app.use(express.static('src'))
// for parsing application/json
app.use(bodyParser.json())
// for parsing application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }))

app.use(cors())

// Users //

app.get('/read/users', async (req, res) => {
    res.json(await db.get({}, 'user'))
})

app.post('/create/user', async (req, res) => {
    res.json(await db.create(req.body, 'user'))
})

app.delete('/delete/user/:id', async (req, res) => {
    res.json(await db.delete(req.params.id, 'user'))
})

app.put('/update/user/:id', async (req, res) => {
    res.json(await db.update(req.params.id, req.body, 'user'))
})

app.put('/update/userpwd/:id', async (req, res) => {
    const user = await db.findById({ _id: new ObjectId(req.params.id) }, 'user')
    if (user) {
        if (user.password === req.body.oldPwd) {
            await db.update(req.params.id, { password: req.body.newPwd }, 'user')
            res.json('OK')
            return
        } else {
            res.json('WRONG PASSWORD')
        }
    } else {
        res.json('WRONG USER')
    }
})

// Products //

app.get('/read/products', async (req, res) => {
    res.json(await db.get({}, 'product'))
})

app.post('/create/product', async (req, res) => {
    res.json(await db.create(req.body, 'product'))
})

app.delete('/delete/product/:id', async (req, res) => {
    res.json(await db.delete(req.params.id, 'product'))
})

app.put('/update/product/:id', async (req, res) => {
    res.json(await db.update(req.params.id, req.body, 'product'))
})

// Tickets //

app.get('/read/tickets', async (req, res) => {
    res.json(await db.get({}, 'ticket'))
})

app.post('/create/ticket', async (req, res) => {
    res.json(await db.create(req.body, 'ticket'))
})

app.delete('/delete/ticket/:id', async (req, res) => {
    res.json(await db.delete(req.params.id, 'ticket'))
})

app.put('/update/ticket/:id', async (req, res) => {
    res.json(await db.update(req.params.id, req.body, 'ticket'))
})

app.post('/filter/ticket', async (req, res) => {
    const params = req.body
    const filter = {}
    if (params.userId) filter.userId = params.userId
    if (params.from === params.to) filter.date = params.from
    else filter.date = { $gte: params.from, $lte: params.to }
    res.json(await db.getFilter(filter, 'ticket'))
})


// Login //

app.post('/login', async (req, res) => {
    const user = await db.loginUser(req.body)
    if (user) {
        // TODO: use OAuth2
        // ...
        // Simulation of authentication (OAuth2)
        user.token = '123456'
        // Remove password
        delete user.password
    }
    res.json(user)
})


app.listen(port, () => {
    console.log(`Comercio is listening on port ${port}`)
})