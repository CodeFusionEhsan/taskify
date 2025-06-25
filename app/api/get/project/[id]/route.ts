import { NextResponse } from "next/server";
import { withAccelerate } from '@prisma/extension-accelerate'
import { PrismaClient } from '../../../../generated/prisma'

const prisma = new PrismaClient().$extends(withAccelerate());

export async function GET(req: Request, {params}:any) {
    const {id} = await params

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