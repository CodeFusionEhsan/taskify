import { NextResponse } from "next/server";
import { PrismaClient } from '../../../generated/prisma'; // Adjust path as needed

const prisma = new PrismaClient();

export async function DELETE(req: Request) {
  try {
    // Extract project ID from request body
    const { id } = await req.json();
    
    if (!id) {
      return NextResponse.json({ 
        success: false, 
        message: "Project ID is required" 
      }, { status: 400 });
    }

    // Delete the project
    await prisma.project.delete({
      where: { id: Number(id) }
    });

    return NextResponse.json({
      success: true,
      message: "Project deleted successfully"
    });
    
  } catch (err) {
    return NextResponse.json({
      success: false,
      message: "Failed to delete project",
      error: `${err}`
    }, { status: 500 });
  }
}
