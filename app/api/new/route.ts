import { NextResponse } from "next/server";
import { withAccelerate } from '@prisma/extension-accelerate'
import { PrismaClient } from '../../generated/prisma'

const prisma = new PrismaClient().$extends(withAccelerate());

export async function POST(req: Request) {
    const addProject = async () => {

        const formData = await req.formData()

        const title = formData.get("title") as string
        const deadline = formData.get("deadline") as string
        const category = formData.get("category") as string
        const client = formData.get("client") as string
        const revenue = formData.get("revenue") as string
        const description = formData.get("description") as string
        const user = formData.get("user") as string
        const user_email = formData.get("user_email") as string

        if (title && deadline && category && description && user && user_email && client && revenue) {

            await prisma.project.create({
                data: {
                    title: title,
                    description: description,
                    deadline: deadline,
                    revenue: revenue,
                    for: client,
                    category: category,
                    members: {
                        create: {
                            user_id: user,
                            user_email: user_email,
                            role: "admin"
                        }
                    }
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