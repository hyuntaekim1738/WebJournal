// this file is not an actual API route our website should be using. This is just showing what an API route should do for mongo
import clientPromise from '../../lib/connectMongo';

export async function GET() {
  try {
    const client = await clientPromise;
    const db = client.db("web_journal");
    
    const users = await db.collection("users").find({}).limit(10).toArray();
    
    return Response.json(users);
  } catch (e) {
    return Response.json({ error: e.message }, { status: 500 });
  }
}