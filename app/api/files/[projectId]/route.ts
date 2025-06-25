import { NextResponse } from 'next/server';
import { withAccelerate } from '@prisma/extension-accelerate'
import { PrismaClient } from '../../../generated/prisma'

const prisma = new PrismaClient().$extends(withAccelerate());

export async function GET(req: Request) {
  const url = new URL(req.url);
  const segments = url.pathname.split("/")
  const projectId = segments[segments.length - 1];

  const files = await prisma.file.findMany({
    where: { projectId: Number(projectId) },
    orderBy: { createdAt: 'desc' },
  });
  return NextResponse.json(files);
}
