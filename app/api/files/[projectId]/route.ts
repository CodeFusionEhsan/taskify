import { NextResponse } from 'next/server';
import { withAccelerate } from '@prisma/extension-accelerate'
import { PrismaClient } from '../../../generated/prisma'

const prisma = new PrismaClient().$extends(withAccelerate());

export async function GET(_: Request, { params }: { params: { projectId: string } }) {
  const files = await prisma.file.findMany({
    where: { projectId: Number(params.projectId) },
    orderBy: { createdAt: 'desc' },
  });
  return NextResponse.json(files);
}
