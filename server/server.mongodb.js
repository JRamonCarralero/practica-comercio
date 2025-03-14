import { MongoClient, ObjectId } from "mongodb";

const URI = process.env.MONGO_URI;
const database = 'comercio'

export const db = {
    create: createItem,
    get: getItems,
    delete: deleteItem,
    update: updateItem
}

async function createItem(item, collection) {
    const client = new MongoClient(URI);
    const rugbyleagueDB = client.db(database);
    const itemsCollection = rugbyleagueDB.collection(collection);
    const returnValue = await itemsCollection.insertOne(item);
    console.log('db createItem', returnValue, item._id)
    return item
  }

async function getItems(filter, collection) {
    const client = new MongoClient(URI);
    const rugbyleagueDB = client.db(database);
    const itemsCollection = rugbyleagueDB.collection(collection);
    console.log('filter, ', filter)
    const response = await itemsCollection.find(filter).toArray()
    return response;
  }

  async function deleteItem(id, collection) {
    const client = new MongoClient(URI);
    const rugbyleagueDB = client.db(database);
    const itemsCollection = rugbyleagueDB.collection(collection);
    const returnValue = await itemsCollection.deleteOne({ _id: new ObjectId(id) });
    console.log('db deleteItem', returnValue, id)
    return id
  }

  async function updateItem(id, updates, collection) {
    const client = new MongoClient(URI);
    const rugbyleagueDB = client.db(database);
    const itemsCollection = rugbyleagueDB.collection(collection);
    const returnValue = await itemsCollection.updateOne({ _id: new ObjectId(id) }, { $set: updates });
    console.log('db updateItem', returnValue, updates)
    return returnValue
  }