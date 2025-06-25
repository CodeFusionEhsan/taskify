// app/api/projects/link-files/route.ts
import { NextResponse } from 'next/server';
import { auth } from '@clerk/nextjs/server';
import { withAccelerate } from '@prisma/extension-accelerate'
import { PrismaClient } from '../../../generated/prisma'

const prisma = new PrismaClient().$extends(withAccelerate());

export async function POST(req: Request) {
  const { userId } = await auth();
  if (!userId) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

  const { projectId, files } = await req.json();

  if (!projectId || !Array.isArray(files) || files.length === 0) {
    return NextResponse.json({ error: 'Missing projectId or files' }, { status: 400 });
  }

  try {
    await Promise.all(
      files.map((file: { key: string; url: string }) =>
        prisma.file.create({
          data: {
            key: file.key,
            url: file.url,
            projectId,
            uploaded_by: userId,
          },
        }),
      ),
    );

    return NextResponse.json({ success: true });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to save files' }, { status: 500 });
  }
}
