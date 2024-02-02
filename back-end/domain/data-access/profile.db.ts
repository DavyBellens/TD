import { Gender, Preference } from '@prisma/client';
import { Role } from '../../types';
import database from '../../util/database';
import { Profile } from '../model/profile';

const createProfile = async (
    email: string,
    password: string,
    username: string,
    role: Role,
    preference: Preference,
    age: number,
    gender: Gender,
    interests: string[],
    socials: string[],
    pictures: string[],
    bio?: string
): Promise<Profile> => {
    try {
        const profilePrisma = await database.profile.create({
            data: {
                createdAt: new Date(),
                updatedAt: new Date(),
                email,
                username,
                password,
                role,
                preference,
                pictures,
                bio,
                age,
                gender,
                interests,
                socials,
            },
        });
        if (profilePrisma) return Profile.from(profilePrisma);
    } catch (error) {
        console.log(error);
        throw new Error('Database error when creating profile. See server log for details.');
    }
};

const getAllProfiles = async (): Promise<Profile[]> => {
    try {
        const profilesPrisma = await database.profile.findMany();
        if (profilesPrisma) return profilesPrisma.map((profilePrisma) => Profile.from(profilePrisma));
    } catch (error) {
        console.log(error);
        throw new Error('Database error when getting all profiles. See server log for details.');
    }
};

const getProfileById = async (id: number): Promise<Profile> => {
    try {
        const profilePrisma = await database.profile.findUnique({
            where: {
                id,
            },
        });
        if (profilePrisma) return Profile.from(profilePrisma);
    } catch (error) {
        console.log(error);
        throw new Error('Database error when getting profile by id. See server log for details.');
    }
};

const getProfileByUsername = async (username: string): Promise<Profile> => {
    try {
        const profilePrisma = await database.profile.findUnique({
            where: {
                username,
            },
        });
        if (profilePrisma) return Profile.from(profilePrisma);
    } catch (error) {
        console.log(error);
        throw new Error('Database error when getting profile by username. See server log for details.');
    }
};

const getProfileByEmail = async (email: string): Promise<Profile> => {
    try {
        const profilePrisma = await database.profile.findUnique({
            where: {
                email,
            },
        });
        if (profilePrisma) return Profile.from(profilePrisma);
    } catch (error) {
        console.log(error);
        throw new Error('Database error when getting profile by email. See server log for details.');
    }
};

const updateBio = async (id: number, newBio: string): Promise<Profile> => {
    try {
        const updatedProfile = await database.profile.update({
            where: { id },
            data: { bio: newBio },
        });
        return Profile.from(updatedProfile);
    } catch (error) {
        console.error(error);
        throw new Error('Database error when updating profile bio. See server log for details.');
    }
};

const updateEmail = async (id: number, newEmail: string): Promise<Profile> => {
    try {
        const updatedProfile = await database.profile.update({
            where: { id },
            data: { email: newEmail },
        });
        return Profile.from(updatedProfile);
    } catch (error) {
        console.error(error);
        throw new Error('Database error when updating profile email. See server log for details.');
    }
};

const updatePassword = async (id: number, newPassword: string): Promise<Profile> => {
    try {
        const updatedProfile = await database.profile.update({
            where: { id },
            data: { password: newPassword },
        });
        return Profile.from(updatedProfile);
    } catch (error) {
        console.error(error);
        throw new Error('Database error when updating profile password. See server log for details.');
    }
};

const updateUsername = async (id: number, newUsername: string): Promise<Profile> => {
    try {
        const updatedProfile = await database.profile.update({
            where: { id },
            data: { username: newUsername },
        });
        return Profile.from(updatedProfile);
    } catch (error) {
        console.error(error);
        throw new Error('Database error when updating profile username. See server log for details.');
    }
};

const updateRole = async (id: number, newRole: Role): Promise<Profile> => {
    try {
        const updatedProfile = await database.profile.update({
            where: { id },
            data: { role: newRole },
        });
        return Profile.from(updatedProfile);
    } catch (error) {
        console.error(error);
        throw new Error('Database error when updating profile role. See server log for details.');
    }
};

const updatePictures = async (id: number, newPictures: string[]): Promise<Profile> => {
    try {
        const updatedProfile = await database.profile.update({
            where: { id },
            data: { pictures: newPictures },
        });
        return Profile.from(updatedProfile);
    } catch (error) {
        console.error(error);
        throw new Error('Database error when updating profile role. See server log for details.');
    }
};

const updatePreference = async (id: number, newPreference: Preference) => {
    try {
        const updatedProfile = await database.profile.update({
            where: { id },
            data: { preference: newPreference },
        });
        return Profile.from(updatedProfile);
    } catch (error) {
        console.error(error);
        throw new Error('Database error when updating profile preference. See server log for details.');
    }
};

const updateAge = async (id: number, newAge: number) => {
    try {
        const updatedProfile = await database.profile.update({
            where: { id },
            data: { age: newAge },
        });
        return Profile.from(updatedProfile);
    } catch (error) {
        console.error(error);
        throw new Error('Database error when updating profile age. See server log for details.');
    }
};

const updateGender = async (id: number, newGender: Gender) => {
    try {
        const updatedProfile = await database.profile.update({
            where: { id },
            data: { gender: newGender },
        });
        return Profile.from(updatedProfile);
    } catch (error) {
        console.error(error);
        throw new Error('Database error when updating profile gender. See server log for details.');
    }
};

const updateInterests = async (id: number, newInterests: string[]) => {
    try {
        const updatedProfile = await database.profile.update({
            where: { id },
            data: { interests: newInterests },
        });
        return Profile.from(updatedProfile);
    } catch (error) {
        console.error(error);
        throw new Error('Database error when updating profile interests. See server log for details.');
    }
};

const updateSocials = async (id: number, newSocials: string[]) => {
    try {
        const updatedProfile = await database.profile.update({
            where: { id },
            data: { socials: newSocials },
        });
        return Profile.from(updatedProfile);
    } catch (error) {
        console.error(error);
        throw new Error('Database error when updating profile socials. See server log for details.');
    }
};

const deleteProfile = async (id: number): Promise<Profile> => {
    try {
        const deletedProfile = await database.profile.delete({
            where: { id },
        });
        return Profile.from(deletedProfile);
    } catch (error) {
        console.error(error);
        throw new Error('Database error when deleting profile. See server log for details.');
    }
};

export default {
    createProfile,
    getAllProfiles,
    getProfileById,
    getProfileByUsername,
    getProfileByEmail,
    updateBio,
    updateEmail,
    updatePassword,
    updateUsername,
    updateRole,
    updatePictures,
    updatePreference,
    updateAge,
    updateGender,
    updateInterests,
    updateSocials,
    deleteProfile,
};
