import { NextResponse } from "next/server";
import { PrismaClient } from '../../../../generated/prisma'; // Adjust path as needed

const prisma = new PrismaClient();

export async function POST(req: Request) {
  try {
    // Accept both JSON and FormData bodies
    let taskId: string | null = null;

    const contentType = req.headers.get('content-type') || '';
    if (contentType.includes('application/json')) {
      const body = await req.json();
      taskId = body.id;
    } else if (contentType.includes('multipart/form-data')) {
      const formData = await req.formData();
      taskId = formData.get('id') as string;
    }

    if (!taskId) {
      return NextResponse.json({ success: false, message: "Task ID is required." }, { status: 400 });
    }

    const updatedTask = await prisma.task.update({
      where: { id: Number(taskId) },
      data: { status: "completed" },
    });

    return NextResponse.json({
      success: true,
      result: updatedTask,
      message: "Task status updated to completed."
    });
  } catch (err) {
    return NextResponse.json({
      success: false,
      message: "Failed to update task status.",
      error: `${err}`
    }, { status: 500 });
  }
}
