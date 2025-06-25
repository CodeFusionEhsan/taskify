import { NextResponse } from "next/server";
import { withAccelerate } from '@prisma/extension-accelerate'
import { PrismaClient } from '../../../../generated/prisma'

const prisma = new PrismaClient().$extends(withAccelerate());

export async function GET(req: Request, {params}:any) {
    const {id} = await params

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