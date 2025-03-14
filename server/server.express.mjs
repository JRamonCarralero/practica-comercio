import express from 'express'
import bodyParser from 'body-parser'
import { db } from "./server.mongodb.js"
//import { ObjectId } from "mongodb"
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



app.listen(port, () => {
    console.log(`Comercio is listening on port ${port}`)
})