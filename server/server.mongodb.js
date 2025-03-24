import { MongoClient, ObjectId } from "mongodb";

const URI = process.env.MONGO_URI;
const database = 'comercio'

export const db = {
    create: createItem,
    get: getItems,
    delete: deleteItem,
    update: updateItem,
    findById: findById,
    loginUser: loginUser,
    getFilter: getFilter
}

/**
 * Creates a new item in the 'collection' collection in the 'database' database.
 *
 * @param {object} item - The item to be created.
 * @param {string} collection - The collection of the item.
 * @returns {Promise<object>} The created article.
 */
async function createItem(item, collection) {
    const client = new MongoClient(URI);
    const comercioDB = client.db(database);
    const itemsCollection = comercioDB.collection(collection);
    const returnValue = await itemsCollection.insertOne(item);
    console.log('db createItem', returnValue, item._id)
    return item
  }

/**
 * Gets an array of items from the 'collection' collection in the 'database' database.
 * The items are filtered by the given filter.
 *
 * @param {object} [filter] - The filter to apply to the items.
 * @param {string} collection - The collection of the item
 * @returns {Promise<Array<object>>} - The array of items.
 */
async function getItems(filter, collection) {
    const client = new MongoClient(URI);
    const comercioDB = client.db(database);
    const itemsCollection = comercioDB.collection(collection);
    console.log('filter, ', filter)
    const response = await itemsCollection.find(filter).toArray()
    return response;
  }

/**
 * Deletes an item from the specified collection in the 'comercio' database.
 *
 * @param {string} id - The ID of the item to be deleted.
 * @param {string} collection - The name of the collection where the item resides.
 * @returns {Promise<string>} The ID of the deleted item.
 */
  async function deleteItem(id, collection) {
    const client = new MongoClient(URI);
    const comercioDB = client.db(database);
    const itemsCollection = comercioDB.collection(collection);
    const returnValue = await itemsCollection.deleteOne({ _id: new ObjectId(id) });
    console.log('db deleteItem', returnValue, id)
    return id
  }

/**
 * Updates an item in the specified collection of the 'comercio' database.
 *
 * @param {string} id - The ID of the item to be updated.
 * @param {object} updates - An object containing the fields and new values to update the item with.
 * @param {string} collection - The name of the collection where the item resides.
 * @returns {Promise<UpdateResult>} The result of the update operation.
 */
  async function updateItem(id, updates, collection) {
    const client = new MongoClient(URI);
    const comercioDB = client.db(database);
    const itemsCollection = comercioDB.collection(collection);
    const returnValue = await itemsCollection.updateOne({ _id: new ObjectId(id) }, { $set: updates });
    console.log('db updateItem', returnValue, updates)
    return returnValue
  }

/**
 * Finds a single item from the specified collection in the 'comercio' database
 * that matches the given filter.
 *
 * @param {object} filter - The filter to apply to find the item.
 * @param {string} collection - The collection to search the item in.
 * @returns {Promise<object | null>} The found item object, or null if no item matches the filter.
 */
  async function findById(filter, collection) {
    const client = new MongoClient(URI);
    const rugbyleagueDB = client.db(database);
    const itemsCollection = rugbyleagueDB.collection(collection);
    const response = await itemsCollection.findOne(filter)
    return response;
  }

/**
 * Finds a user in the 'usuarios' collection in the 'comercio' database given
 * an email and password.
 *
 * @param {{email: string, password: string}} data - The data to query the user.
 * @returns {Promise<object>} The user object if found, null otherwise.
 */
  async function loginUser({email, password}) {
    const client = new MongoClient(URI);
    const comercioDB = client.db(database);
    const usersCollection = comercioDB.collection('user');
    return await usersCollection.findOne({ email, password })
  }

/**
 * Finds all items in the specified collection in the 'comercio' database
 * that match the given filter.
 *
 * @param {object} filter - The filter to apply to find the items.
 * @param {string} collection - The collection to search the items in.
 * @returns {Promise<Array<object>>} The found items array, or empty array if no items match the filter.
 */
  async function getFilter(filter, collection) {
    const client = new MongoClient(URI);
    const comercioDB = client.db(database);
    const itemsCollection = comercioDB.collection(collection);
    const response = await itemsCollection.find(filter).toArray()
    return response;
  }