import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

async function main() {
    await prisma.$connect()


    await prisma.user.create({
        data: {
            name: 'luoming',
            email: 'luoming@lm.space',
            posts: {
                create: {
                  title: 'My first post',
                  body: 'Lots of really interesting stuff',
                  slug: 'my-first-post',
                },
              },
        }
    })

    const userList = await prisma.user.findMany({
        include: {
            posts: true
        }
    })
    console.log(userList)

    const postList = await prisma.post.findMany({
        include: {
            author: true,
            comments: true,
        }
    })

    console.log(postList)
}

main().then(async () => {
    await prisma.$disconnect()
}).catch(async (e) => {
    console.error(e)

    await prisma.$disconnect()
    process.exit(1)
})