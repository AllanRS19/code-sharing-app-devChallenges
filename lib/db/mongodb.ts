import { MongoClient, MongoClientOptions } from "mongodb";

declare global {
    var _mongoClientPromise: Promise<MongoClient> | undefined;
}

const uri = process.env.MONGODB_URI;
const options: MongoClientOptions = {};

if (!uri) {
    throw new Error("Please add your Mongo URI to .env.local");
}

let clientPromise: Promise<MongoClient>;

if (process.env.NODE_ENV === "development") {
    // In dev, use a global variable so the connection is preserved
    // across module reloads caused by HMR (Hot Module Replacement).
    if (!global._mongoClientPromise) {
        const client = new MongoClient(uri, options);
        global._mongoClientPromise = client.connect();
    }
    clientPromise = global._mongoClientPromise;
} else {
    // In production, it's fine to create a new client for each module instance.
    const client = new MongoClient(uri, options);
    clientPromise = client.connect();
}

export default clientPromise;