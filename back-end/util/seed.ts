import { PrismaClient } from '@prisma/client';
import { hashPassword } from './password';
import { Subject, Category } from '../types';
import database from './database';

const prisma = new PrismaClient();

async function main() {
    const dave = await database.profile.create({
        data: {
            email: 'davybellens@tdinder.com',
            username: 'dendave',
            password: await hashPassword('TD1nder69!!!'),
            role: 'ADMIN',
            orientation: 'STRAIGHT',
            bio: 'I have a girlfriend sorry',
            age: 20,
            gender: 'MAN',
            interests: ['Coding'],
        },
    });
    console.log(dave);
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
