import { NextResponse } from 'next/server';
import { auth } from '@clerk/nextjs/server';
import { withAccelerate } from '@prisma/extension-accelerate'
import { PrismaClient } from '../../../../generated/prisma'

const prisma = new PrismaClient().$extends(withAccelerate());

export async function PUT(request: Request, { params }: { params: { id: string } }) {
  const user = await auth();
  const userId = user.userId as string

  const data = await request.json();
  const updated = await prisma.prospect.updateMany({
    where: {
      id: Number(params.id),
      uploaded_by: userId,
    },
    data,
  });
  return NextResponse.json(updated);
}

export async function DELETE(_: Request, { params }: { params: { id: string } }) {
  const user = await auth();
  const userId = user.userId as string

  const deleted = await prisma.prospect.deleteMany({
    where: {
      id: Number(params.id),
      uploaded_by: userId,
    },
  });
  return NextResponse.json(deleted);
}