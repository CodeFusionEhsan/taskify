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

        const projects = await prisma.project.findMany({
            orderBy: {
                deadline: "asc"
            },
            where: {
                members: {
                    some: {
                        user_id: id,
                    },
                },
            },
            include: {
                members: true,
                comments: true,
                tasks: true,
            },
        });

        console.log(projects)

        return NextResponse.json({
            success: true,
            results: projects
        })

    } else {
        return NextResponse.json({
            success: false,
            message: "No ID Received"
        })
    }
}
