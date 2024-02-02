import { Gender, Match, Preference } from '@prisma/client';

type Role = 'ADMIN' | 'USER';

type ProfileInput = {
    email?: string;
    username?: string;
    password?: string;
    role?: Role;
    age?: number;
    preference?: Preference;
    gender?: Gender;
    interests?: string[];
    socials?: string[];
    pictures?: string[];
    bio?: string;
    matches?: Match[];
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
    username: string;
    id: string;
    role: Role;
};

type AuthenticationResponse = {
    token: Token;
    profile: AuthenticatedProfile;
};

export { Role, ProfileInput, AuthenticatedToken, AuthenticationResponse };
