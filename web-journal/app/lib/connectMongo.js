import { MongoClient } from 'mongodb';

const uri = process.env.MONGODB_URI;

let client;
let clientPromise;

if (process.env.NODE_ENV === 'development') {
  if (!global._mongoClientPromise) {
    client = new MongoClient(uri, {
        serverApi: {
          version: ServerApiVersion.v1,
          strict: true,
          deprecationErrors: true,
        },
        maxPoolSize: 10, //num ofo socket connections
      });
    global._mongoClientPromise = client.connect();
  }
  clientPromise = global._mongoClientPromise;
} 
// else {
//   // for production, it just creates new client
//   client =  new MongoClient(uri, {
//     serverApi: {
//       version: ServerApiVersion.v1,
//       strict: true,
//       deprecationErrors: true,
//     },
//     maxPoolSize: 10, //num ofo socket connections
//   });
//   clientPromise = client.connect();
// }

export default clientPromise;

