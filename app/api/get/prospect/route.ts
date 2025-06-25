// app/api/prospects/route.ts
import { NextResponse } from 'next/server';
import { auth } from '@clerk/nextjs/server';
import { withAccelerate } from '@prisma/extension-accelerate'
import { PrismaClient } from '../../../generated/prisma'

const prisma = new PrismaClient().$extends(withAccelerate());

export async function GET() {
  const user = await auth();
  const userId = user.userId as string

  const prospects = await prisma.prospect.findMany({
    where: { uploaded_by: userId },
  });
  return NextResponse.json(prospects);
}