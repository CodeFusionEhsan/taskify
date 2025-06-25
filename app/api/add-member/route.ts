import { NextResponse } from 'next/server';
import { PrismaClient } from '../../generated/prisma'
import { withAccelerate } from '@prisma/extension-accelerate'

const prisma = new PrismaClient().$extends(withAccelerate());

interface AddMemberRequestBody {
  projectId: number;
  userId: string;
  userEmail: string;
  role?: string;
  invitationId?: number;  // Add invitationId to know which invitation to delete
}

export async function POST(request: Request) {
  try {
    const body: AddMemberRequestBody = await request.json();

    const { projectId, userId, userEmail, role = 'member', invitationId } = body;

    if (!projectId || !userId || !userEmail) {
      return NextResponse.json(
        { error: 'projectId, userId, and userEmail are required' },
        { status: 400 }
      );
    }

    // Check if project exists
    const project = await prisma.project.findUnique({
      where: { id: projectId },
    });

    if (!project) {
      return NextResponse.json({ error: 'Project not found' }, { status: 404 });
    }

    // Check if member already exists for this project and user
    const existingMember = await prisma.member.findFirst({
      where: {
        projectId,
        user_id: userId,
      },
    });

    if (existingMember) {
      // Optionally delete invitation anyway if invitationId provided
      if (invitationId) {
        await prisma.invitation.delete({
          where: { id: invitationId },
        });
      }
      return NextResponse.json(
        { message: 'User is already a member of this project' },
        { status: 200 }
      );
    }

    // Create new member
    const newMember = await prisma.member.create({
      data: {
        user_id: userId,
        user_email: userEmail,
        role,
        project: {
          connect: { id: projectId },
        },
      },
    });

    // Delete the invitation if invitationId provided
    if (invitationId) {
      await prisma.invitation.delete({
        where: { id: invitationId },
      });
    }

    return NextResponse.json({ message: 'Member added successfully', member: newMember }, { status: 201 });
  } catch (error) {
    console.error('Error adding member:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
