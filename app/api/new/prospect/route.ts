// app/api/prospects/route.ts
import { NextResponse } from 'next/server';
import { auth } from '@clerk/nextjs/server';
import { withAccelerate } from '@prisma/extension-accelerate'
import { PrismaClient } from '../../../generated/prisma'

const prisma = new PrismaClient().$extends(withAccelerate());

export async function POST(request: Request) {
  const user = await auth();
  const userId = user.userId
  
  const data = await request.json();
  const prospect = await prisma.prospect.create({
    data: {
      ...data,
      uploaded_by: userId,
    },
  });
  return NextResponse.json(prospect);
}