import { NextResponse } from "next/server";
import { withAccelerate } from '@prisma/extension-accelerate'
import { PrismaClient } from '../../../generated/prisma'

const prisma = new PrismaClient().$extends(withAccelerate());

export async function POST(req: Request) {
    const addTask = async () => {
        const formData = await req.formData();

        const title = formData.get('title') as string;
        const description = formData.get('description') as string;
        const deadline = formData.get('deadline') as string;
        const projectId = formData.get('id') as string;

        if (title && description && deadline && projectId) {
            return await prisma.task.create({
                data: {
                    title: title,
                    description: description,
                    deadline: deadline,
                    status: "active",
                    project: {
                        connect: { id: Number(projectId) },
                    },
                },
            }).then((result) => {
                return {
                    success: true,
                    result: result
                }
            }).catch((err) => {
                return {
                    success: false,
                    message: err
                }
            });
        } else {
            return {
                success: false,
                message: "Please Fill All The Fields"
            }
        }
    }

    const add: any = await addTask();

    if (add?.success == false) {
        return NextResponse.json({
            success: false,
            message: add.message
        })
    }

    return NextResponse.json({
        success: true,
        result: add?.result
    })
}
