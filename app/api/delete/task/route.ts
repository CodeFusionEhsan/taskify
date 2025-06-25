import { NextResponse } from "next/server";
import { PrismaClient } from '../../../generated/prisma'; // Adjust path as needed

const prisma = new PrismaClient();

export async function DELETE(req: Request) {
  try {
    // Extract task ID from request body
    const { id } = await req.json();
    
    if (!id) {
      return NextResponse.json({ 
        success: false, 
        message: "Task ID is required" 
      }, { status: 400 });
    }

    // Delete the task
    await prisma.task.delete({
      where: { id: Number(id) }
    });

    return NextResponse.json({
      success: true,
      message: "Task deleted successfully"
    });
    
  } catch (err) {
    return NextResponse.json({
      success: false,
      message: "Failed to delete task",
      error: `${err}`
    }, { status: 500 });
  }
}
