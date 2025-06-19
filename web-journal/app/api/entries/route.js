import { NextResponse } from 'next/server';
import clientPromise from '@/app/lib/connectMongo';
import { Storage } from '@google-cloud/storage';
import { getServerSession } from 'next-auth';
import { analyzeMood } from '@/app/lib/moodSetter';

const storage = new Storage({
  projectId: process.env.GOOGLE_CLOUD_PROJECT_ID,
  credentials: JSON.parse(process.env.GOOGLE_CLOUD_CREDENTIALS),
});

const bucket = storage.bucket(process.env.GOOGLE_CLOUD_BUCKET_NAME);

export async function POST(request) {
  try {
    const session = await getServerSession();

    if (!session) {
      return NextResponse.json(
        { success: false, error: 'Unauthorized' },
        { status: 401 }
      );
    }

    const user = session.user;

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
          filename,
          contentType: photo.type,
        };
      })
    );

    const entryMood = await analyzeMood(title + content);
    const client = await clientPromise;
    const db = client.db("web_journal");

    const entry = {
      title,
      content,
      spotifyUrl,
      photos: photoUrls,
      user: {email:user.email},
      createdAt: new Date(),
      updatedAt: new Date(),
      mood: entryMood.trim(),
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

async function generateSignedUrls(photoList) {
  return await Promise.all(photoList.map(async (photo) => {
    const file = storage.bucket(process.env.GOOGLE_CLOUD_BUCKET_NAME).file(photo.filename);
    const [url] = await file.getSignedUrl({
      action: 'read',
      expires: Date.now() + 15 * 60 * 1000,
    });

    return {
      ...photo,
      signedUrl: url,
    };
  }));
}

export async function GET(request) {
  try {
    const session = await getServerSession();

    if (!session || !session.user?.email) {
      return NextResponse.json(
        { success: false, error: 'Unauthorized' },
        { status: 401 }
      );
    }

  const client = await clientPromise;
  const db = client.db('web_journal');

  const { searchParams } = new URL(request.url);
  const startDate = searchParams.get('startDate');
  const endDate = searchParams.get('endDate');

  const query = { 'user.email': session.user.email };

  if (startDate || endDate) {
  query.createdAt = {};

  if (startDate) {
    query.createdAt.$gte = new Date(`${startDate}T00:00:00`);
  }

  if (endDate) {
    query.createdAt.$lte = new Date(`${endDate}T23:59:59.999`);
  }
}

    const entries = await db
      .collection('entries')
      .find(query)
      .sort({ createdAt: -1 })
      .toArray();

    for (const entry of entries) {
      entry.photos = await generateSignedUrls(entry.photos);
    }

    return NextResponse.json({
      success: true,
      entries,
    });
  } catch (error) {
    console.error('Error fetching user entries:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to fetch entries' },
      { status: 500 }
    );
  }
}
