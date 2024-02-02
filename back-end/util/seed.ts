import { PrismaClient } from '@prisma/client';
import { hashPassword } from './password';
import database from './database';

const prisma = new PrismaClient();

async function main() {
    const dave = await database.profile.create({
        data: {
            email: 'TDINDER_TEST_ADMIN@tdinder.com',
            username: 'TDINDER_TEST_ADMIN',
            password: await hashPassword('TD1nder69!!!'),
            role: 'ADMIN',
            preference: 'FEMALE',
            bio: 'I have a girlfriend sorry',
            age: 20,
            gender: 'MAN',
            interests: ['Coding', 'Stefanie'],
            socials: ['@davy.bellens', '', '@davy_bellens', '', ''],
        },
    });
    console.log(dave);
    const steffie = await database.profile.create({
        data: {
            email: 'TDINDER_TEST_USER@tdinder.com',
            username: 'TDINDER_TEST_USER',
            password: await hashPassword('TD1nder69!!!'),
            role: 'USER',
            preference: 'MALE',
            bio: "I'm the girlfriend",
            age: 20,
            gender: 'WOMAN',
            interests: ['Volleybal', 'Anime', 'Davy'],
            socials: ['@steffy', '', '@stef', '', ''],
        },
    });
    console.log(steffie);
}

main()
    .then(async () => {
        await prisma.$disconnect();
    })
    .catch(async (e) => {
        console.error(e);
        await prisma.$disconnect();
        process.exit(1);
    });
