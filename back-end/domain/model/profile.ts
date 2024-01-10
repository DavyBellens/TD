import { Gender, Orientation, Profile as ProfilePrisma } from '@prisma/client';
import { Role } from '../../types';

export class Profile {
    readonly id: number;
    readonly createdAt: Date;
    readonly updatedAt: Date;
    readonly email: string;
    readonly username: string;
    readonly password: string;
    readonly role: Role;
    readonly orientation: Orientation;
    readonly age: number;
    readonly gender: Gender;
    readonly interests: string[];
    readonly pictures: string[];
    readonly bio?: string;

    constructor(profile: {
        id: number;
        createdAt: Date;
        updatedAt: Date;
        email: string;
        username: string;
        password: string;
        role: Role;
        orientation: Orientation;
        age: number;
        gender: Gender;
        interests: string[];
        pictures: string[];
        bio?: string;
    }) {
        Profile.validate(
            profile.email,
            profile.username,
            profile.password,
            profile.role,
            profile.orientation,
            profile.age,
            profile.gender,
            profile.interests,
            profile.pictures,
            profile.bio
        );
        this.id = profile.id;
        this.createdAt = profile.createdAt;
        this.updatedAt = profile.updatedAt;
        this.email = profile.email;
        this.username = profile.username;
        this.password = profile.password;
        this.role = profile.role;
        this.orientation = profile.orientation;
        this.age = profile.age;
        this.gender = profile.gender;
        this.interests = profile.interests;
        this.pictures = profile.pictures;
        this.bio = profile.bio;
    }

    equals(otherProfile: {
        email: string;
        username: string;
        password: string;
        role: Role;
        orientation: Orientation;
        age: number;
        gender: Gender;
        interests: string[];
        pictures: string[];
        bio?: string;
    }): boolean {
        return (
            this.email === otherProfile.email &&
            this.username === otherProfile.username &&
            this.password === otherProfile.password &&
            this.role === otherProfile.role &&
            this.age === otherProfile.age &&
            this.gender === otherProfile.gender &&
            this.interests === otherProfile.interests &&
            this.pictures === otherProfile.pictures &&
            this.bio === otherProfile.bio
        );
    }

    static validate(
        email: string,
        username: string,
        password: string,
        role: Role,
        orientation: Orientation,
        age: number,
        gender: Gender,
        interests: string[],
        pictures: string[],
        bio?: string
    ): void {
        Profile.validateEmail(email);
        Profile.validateUsername(username);
        Profile.validatePassword(password);
        Profile.validateRole(role);
        Profile.validateBio(bio);
    }

    static validateEmail = (email: string): void => {
        if (!email) throw new Error('Email is required');
        if (!email.includes('@')) throw new Error("Email must contain a '@'");
    };

    static validatePassword = (password: string): void => {
        if (!password?.trim()) throw new Error('Password is required');
        if (password.length < 8) throw new Error('Password must be at least 8 characters long');
        if (!password.match(/\d/)) throw new Error('Password must contain at least 1 number');
        if (!password.match(/[A-Z]/)) throw new Error('Password must contain at least 1 capital letter');
        if (!password.match(/[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/)) {
            throw new Error(`Password must contain at least 1 special character (!@#$%^&*()_+-=\[\]{};':"\\|,.<>\/?)`);
        }
    };

    static validateRole = (role: Role): void => {
        if (!['ADMIN', 'USER'].includes(role)) {
            throw new Error('Role must be one of "ADMIN", "USER"');
        }
    };

    static validateUsername = (username: string): void => {
        if (!username) throw new Error('Username is required');
        if (username.length > 30) throw new Error('Username cannot be longer than 30 characters');
    };

    static validateBio = (bio: string): void => {
        if (bio != null && bio.length > 200) throw new Error('Bio cannot be longer than 200 characters');
    };

    static from({
        id,
        createdAt,
        updatedAt,
        email,
        username,
        password,
        role,
        orientation,
        age,
        gender,
        interests,
        pictures,
        bio,
    }: ProfilePrisma): Profile {
        return new Profile({
            id,
            createdAt,
            updatedAt,
            email,
            username,
            password,
            role,
            orientation,
            age,
            gender,
            interests,
            pictures,
            bio,
        });
    }
}
