import { MongoClient } from 'mongodb'

if (!process.env.MONGODB_HOST) {
    throw new Error('Invalid/Missing environment variable: "MONGODB_HOST"')
}


const db_user = process.env.MONGODB_USERNAME;
const db_pass = process.env.MONGODB_PASSWORD;
const db_name = process.env.MONGODB_DB;
const db_host = process.env.MONGODB_HOST;

const uri = `mongodb+srv://${db_user}:${db_pass}@${db_host}/${db_name}?retryWrites=true&w=majority`
const options = {}

let client = null;
let clientPromise = null;

if (process.env.NODE_ENV === 'development') {
    if (!global._mongoClientPromise) {
        client = new MongoClient(uri, options)
        global._mongoClientPromise = client.connect()
    }
    clientPromise = global._mongoClientPromise
} else {
    client = new MongoClient(uri, options)
    clientPromise = client.connect()
}

export default clientPromise