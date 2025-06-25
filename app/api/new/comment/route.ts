import { NextResponse } from "next/server";
import { withAccelerate } from '@prisma/extension-accelerate'
import { PrismaClient } from '../../../generated/prisma'

const prisma = new PrismaClient().$extends(withAccelerate());

export async function POST(req: Request) {
    const addComment = async () => {

        const formData = await req.formData()

        const user_email = formData.get('user_email') as string;
        const commentText = formData.get('comment') as string;
        const projectId = formData.get('id') as string;

        if (user_email && commentText && projectId) {

            await prisma.comment.create({
                data: {
                    by: user_email,
                    text: commentText,
                    at: new Date().toISOString(),
                    project: {
                        connect: { id: Number(projectId) },
                    },
                },
            }).then((result) => {
                console.log(result)

                return {
                    success: true,
                    result: result
                }
            }).catch((err) => {
                return {
                    success: false,
                    message: err
                }
            })
        } else {
            return {
                success: false,
                message: "Please Fill All The Fields"
            }
        }
    }

    const add:any = await addComment()

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


