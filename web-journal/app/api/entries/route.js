import { NextResponse } from 'next/server';
import clientPromise from '@/app/lib/connectMongo';
import { Storage } from '@google-cloud/storage';

const storage = new Storage({
  projectId: process.env.GOOGLE_CLOUD_PROJECT_ID,
  credentials: JSON.parse(process.env.GOOGLE_CLOUD_CREDENTIALS),
});

const bucket = storage.bucket(process.env.GOOGLE_CLOUD_BUCKET_NAME);

export async function POST(request) {
  try {
    const formData = await request.formData();
    const title = formData.get('title');
    const content = formData.get('content');
    const spotifyUrl = formData.get('spotifyUrl');
    const photos = formData.getAll('photos');

    const photoUrls = await Promise.all(
      photos.map(async (photo) => {
        const buffer = await photo.arrayBuffer();
        const filename = `entries/${Date.now()}-${photo.name}`;
        const file = bucket.file(filename);

        await file.save(Buffer.from(buffer), {
          metadata: {
            contentType: photo.type,
          },
        });

        return {
          url: `https://storage.googleapis.com/${bucket.name}/${filename}`,
          filename: filename,
          contentType: photo.type,
        };
      })
    );

    const client = await clientPromise;
    const db = client.db("web_journal");
    const entry = {
      title,
      content,
      spotifyUrl,
      photos: photoUrls,
      createdAt: new Date(),
      updatedAt: new Date(),
    };

    const result = await db.collection('entries').insertOne(entry);

    return NextResponse.json({
      success: true,
      entry: {
        ...entry,
        _id: result.insertedId,
      },
    });
  } catch (error) {
    console.error('Error creating entry:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to create entry' },
      { status: 500 }
    );
  }
} 