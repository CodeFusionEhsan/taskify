import { NextResponse } from "next/server";
import { withAccelerate } from '@prisma/extension-accelerate'
import { PrismaClient } from '../../../../generated/prisma'

const prisma = new PrismaClient().$extends(withAccelerate());

export async function GET(req: Request) {
    const url = new URL(req.url);
    const segments = url.pathname.split("/")
    const id = segments[segments.length - 1];

    console.log(id)

    if (id) {

        const project = await prisma.project.findUnique({
            where: { id: Number(id) },
            include: {
                members: true,
                tasks: true,
                comments: true,
            },
        });

        console.log(project)

        return NextResponse.json({
            success: true,
            results: project
        })

    } else {
        return NextResponse.json({
            success: false,
            message: "No ID Received"
        })
    }
}
