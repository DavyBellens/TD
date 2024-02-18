import { Gender, Match, Preference } from '@prisma/client';

type Role = 'ADMIN' | 'USER';

type ProfileInput = {
    email?: string;
    name?: string;
    password?: string;
    role?: Role;
    age?: number;
    preference?: Preference;
    gender?: Gender;
    interests?: string[];
    socials?: string[];
    pictures?: string[];
    bio?: string;
    swipedRightEmails?: string[];
    matches?: Match[];
};

type ProfileReply = {
    personalInformation: {
        email: string;
        name: string;
        password: string;
        role: Role;
        age: number;
        interests?: string[];
        bio?: string;
    };
    preference: Preference;
    gender: Gender;
    socials: string[];
    pictures: string[];
};

type Token = {
    value: string;
};

type AuthenticatedToken = {
    email: string;
    id: string;
    role: Role;
};

type AuthenticatedProfile = {
    email: string;
    name: string;
    id: string;
    role: Role;
};

type AuthenticationResponse = {
    token: Token;
    profile: AuthenticatedProfile;
};

export { Role, ProfileInput, ProfileReply, AuthenticatedToken, AuthenticationResponse };
