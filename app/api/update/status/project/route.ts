import { NextResponse } from "next/server";
import { PrismaClient } from '../../../../generated/prisma'; // Adjust path as needed

const prisma = new PrismaClient();

export async function POST(req: Request) {
  try {
    // Accept both JSON and FormData bodies for flexibility
    let projectId: string | null = null;

    const contentType = req.headers.get('content-type') || '';
    if (contentType.includes('application/json')) {
      const body = await req.json();
      projectId = body.id;
    } else if (contentType.includes('multipart/form-data')) {
      const formData = await req.formData();
      projectId = formData.get('id') as string;
    }

    if (!projectId) {
      return NextResponse.json({ success: false, message: "Project ID is required." }, { status: 400 });
    }

    const updatedProject = await prisma.project.update({
      where: { id: Number(projectId) },
      data: { status: "completed" }, // or "inactive" if that's your convention
    });

    return NextResponse.json({
      success: true,
      result: updatedProject,
      message: "Project status updated to completed."
    });
  } catch (err) {
    return NextResponse.json({
      success: false,
      message: "Failed to update project status.",
      error: `${err}`
    }, { status: 500 });
  }
}
