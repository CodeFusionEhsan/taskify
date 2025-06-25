import { NextResponse } from "next/server";
import { withAccelerate } from '@prisma/extension-accelerate'
import { PrismaClient } from '../../../generated/prisma'

const prisma = new PrismaClient().$extends(withAccelerate());

export async function POST(req: Request) {
    const addProject = async () => {

        const formData = await req.formData()

        const by = formData.get("by") as string
        const to = formData.get("to") as string
        const projectId = formData.get("id") as string

        if (by && to && projectId) {

            await prisma.invitation.create({
                data: {
                    by: by,
                    to: to,
                    projectId: Number(projectId)
                }
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

    const add:any = await addProject()

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