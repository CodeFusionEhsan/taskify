import { NextResponse } from 'next/server';
import { auth } from '@clerk/nextjs/server';
import { withAccelerate } from '@prisma/extension-accelerate'
import { PrismaClient } from '../../../../generated/prisma'

const prisma = new PrismaClient().$extends(withAccelerate());

export async function PUT(req: Request) {
  const url = new URL(req.url);
  const segments = url.pathname.split("/")
  const listID = segments[segments.length - 1];
  const user = await auth();
  const userId = user.userId as string

  const data = await req.json();
  const updated = await prisma.prospect.updateMany({
    where: {
      id: Number(listID),
      uploaded_by: userId,
    },
    data,
  });
  return NextResponse.json(updated);
}

export async function DELETE(req: Request) {
  const url = new URL(req.url);
  const segments = url.pathname.split("/")
  const listID = segments[segments.length - 1];
  const user = await auth();
  const userId = user.userId as string

  const deleted = await prisma.prospect.deleteMany({
    where: {
      id: Number(listID),
      uploaded_by: userId,
    },
  });
  return NextResponse.json(deleted);
}
