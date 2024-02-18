import { Gender, Preference } from '@prisma/client';
import request from 'supertest';
import app from '../app';
import { comparePasswordWithHash } from '../util/password';

describe('test PROFILE endpoints', () => {
    const email = 'AppTest@tdinder.com';
    const name = 'AppTest';
    const password = 'TD1nder69!!!';
    const role = 'USER';
    const preference = 'FEMALE' as Preference;
    const age = 20;
    const gender = 'MAN' as Gender;
    const interests = ['Coding'];
    const socials = ['@davy.bellens', '', '@davy_bellens', '', ''];
    const picture = 'default-profilePicture.jpg';
    const bio = "Steffie's bf";

    const adminEmail = 'stefanie@tdinder.com';
    const adminName = 'beffie';
    const adminPassword = 'TD1nder69!!!';
    const adminRole = 'ADMIN';
    const adminPreference = 'MALE' as Preference;
    const adminAge = 20;
    const adminGender = 'WOMAN' as Gender;
    const adminInterests = ['Volleyball', 'Anime'];
    const adminSocials = ['@steffie', '', '@steffie', '', ''];
    const adminPicture = 'default-profilePicture.jpg';
    const adminBio = "Davy's gf";

    const thirdUserEmail = 'third@tdinder.com';
    const thirdName = 'randomchickie123';
    const thirdUserPassword = 'TD1nder69!!!';
    const thirdUserRole = 'USER';
    const thirdUserPreference = 'BOTH' as Preference;
    const thirdUserAge = 20;
    const thirdUserGender = 'WOMAN' as Gender;
    const thirdUserInterests = ['Stealing boyfriends'];
    const thirdSocials = ['', 'facebook.com/third', '', '@third', ''];
    const thirdUserPicture = 'default-profilePicture.jpg';
    const thirdUserBio = 'Random chickie';

    let id: number;
    let adminId: number;
    let thirdId: number;
    let token: string;
    let adminToken: string;

    const updatedEmail = 'updatedAppTest@tdinder.com';
    const updatedName = 'UpdatedAppTest';
    const updatedPassword = 'updatedTD1nder69!!!';
    const updatedRole = 'ADMIN';
    const updatedPreference = 'MALE' as Preference;
    const updatedAge = '21';
    const updatedGender = 'OTHER' as Gender;
    const updatedInterests = ['Men'];
    const updatedSocials = ['', 'facebook.com/dave', '', '@davy_bellens', ''];
    const updatedPicture = 'default-thumbnail1.jpg';
    const updatedBio = 'Updated Testing profile';

    const updatedAdminEmail = 'adminUpdatedAppTest@tdinder.com';
    const updatedAdminName = 'adminUpdatedAppTest';
    const updatedAdminPassword = 'adminUpdatedTD1nder69!!!';
    const updatedAdminRole = 'ADMIN';
    const updatedAdminPreference = 'FEMALE' as Preference;
    const updatedAdminAge = '22';
    const updatedAdminGender = 'OTHER' as Gender;
    const updatedAdminInterests = ['Davy'];
    const updatedAdminSocials = ['@steffie', 'facebook.com/steffie', '', '', ''];
    const updatedAdminPicture = 'default-thumbnail1.jpg';
    const updatedAdminBio = 'adminUpdated Testing profile';
    describe('CRUD Operations', () => {
        describe('- C:', () => {
            describe('Happy Cases', () => {
                test('Create USER profile', async () => {
                    // when
                    const res = await request(app)
                        .post('/signup')
                        .send({
                            email,
                            password,
                            name,
                            role,
                            preference,
                            age,
                            gender,
                            interests,
                            socials,
                            pictures: [picture],
                            bio,
                        });

                    // then
                    expect(res.status).toEqual(200);
                    expect(res.body.status).toEqual('success');
                    expect(res.body.message).toEqual('profile created');
                    expect(res.body.profile.email).toEqual(email);
                    expect(await comparePasswordWithHash(password, res.body.profile.password)).toEqual(true);
                    expect(res.body.profile.name).toEqual(name);
                    expect(res.body.profile.role).toEqual(role);
                    expect(res.body.profile.preference).toEqual(preference);
                    expect(res.body.profile.age).toEqual(age);
                    expect(res.body.profile.gender).toEqual(gender);
                    expect(res.body.profile.interests).toEqual(interests);
                    expect(res.body.profile.socials).toEqual(socials);
                    expect(res.body.profile.pictures).toEqual([picture]);
                    expect(res.body.profile.bio).toEqual(bio);
                    expect(res.body.profile.createdAt).toBeDefined();
                    expect(res.body.profile.updatedAt).toBeDefined();
                    expect(res.body.profile.id).toBeDefined();
                    id = res.body.profile.id;
                });
                test('Create another USER profile', async () => {
                    // when
                    const res = await request(app)
                        .post('/signup')
                        .send({
                            email: thirdUserEmail,
                            password: thirdUserPassword,
                            name: thirdName,
                            role: thirdUserRole,
                            preference: thirdUserPreference,
                            age: thirdUserAge,
                            gender: thirdUserGender,
                            interests: thirdUserInterests,
                            socials: thirdSocials,
                            pictures: [thirdUserPicture],
                            bio: thirdUserBio,
                        });

                    // then
                    expect(res.status).toEqual(200);
                    expect(res.body.status).toEqual('success');
                    expect(res.body.message).toEqual('profile created');
                    expect(res.body.profile.email).toEqual(thirdUserEmail);
                    expect(await comparePasswordWithHash(thirdUserPassword, res.body.profile.password)).toEqual(true);
                    expect(res.body.profile.name).toEqual(thirdName);
                    expect(res.body.profile.role).toEqual(thirdUserRole);
                    expect(res.body.profile.preference).toEqual(thirdUserPreference);
                    expect(res.body.profile.age).toEqual(thirdUserAge);
                    expect(res.body.profile.gender).toEqual(thirdUserGender);
                    expect(res.body.profile.interests).toEqual(thirdUserInterests);
                    expect(res.body.profile.socials).toEqual(thirdSocials);
                    expect(res.body.profile.pictures).toEqual([thirdUserPicture]);
                    expect(res.body.profile.bio).toEqual(thirdUserBio);
                    expect(res.body.profile.createdAt).toBeDefined();
                    expect(res.body.profile.updatedAt).toBeDefined();
                    expect(res.body.profile.id).toBeDefined();
                    thirdId = res.body.profile.id;
                });
                test('Create ADMIN profile', async () => {
                    // when
                    const res = await request(app)
                        .post('/signup')
                        .send({
                            email: adminEmail,
                            password: adminPassword,
                            name: adminName,
                            role: adminRole,
                            preference: adminPreference,
                            age: adminAge,
                            gender: adminGender,
                            interests: adminInterests,
                            socials: adminSocials,
                            pictures: [adminPicture],
                            bio: adminBio,
                        });

                    // then
                    expect(res.status).toEqual(200);
                    expect(res.body.status).toEqual('success');
                    expect(res.body.message).toEqual('profile created');
                    expect(res.body.profile.email).toEqual(adminEmail);
                    expect(await comparePasswordWithHash(adminPassword, res.body.profile.password)).toEqual(true);
                    expect(res.body.profile.name).toEqual(adminName);
                    expect(res.body.profile.role).toEqual(adminRole);
                    expect(res.body.profile.preference).toEqual(adminPreference);
                    expect(res.body.profile.age).toEqual(adminAge);
                    expect(res.body.profile.gender).toEqual(adminGender);
                    expect(res.body.profile.interests).toEqual(adminInterests);
                    expect(res.body.profile.socials).toEqual(adminSocials);
                    expect(res.body.profile.pictures).toEqual([adminPicture]);
                    expect(res.body.profile.bio).toEqual(adminBio);
                    expect(res.body.profile.createdAt).toBeDefined();
                    expect(res.body.profile.updatedAt).toBeDefined();
                    expect(res.body.profile.id).toBeDefined();
                    adminId = res.body.profile.id;
                });
            });
            describe('Unhappy Cases', () => {
                test('Create profile with existing email', async () => {
                    // given
                    const name = 'AppTest2';

                    // when
                    const res = await request(app)
                        .post('/signup')
                        .send({
                            email,
                            password,
                            name,
                            role,
                            preference,
                            age,
                            gender,
                            interests,
                            socials,
                            pictures: [picture],
                            bio,
                        });

                    // then
                    expect(res.status).toEqual(400);
                    expect(res.body.status).toEqual('application error');
                    expect(res.body.message).toEqual('Email already exists');
                });
            });
        });
    });
    describe('Authentication:', () => {
        test('Authenticate user', async () => {
            // when
            const res = await request(app).post('/signin').send({ email, password });

            // then
            expect(res.status).toEqual(200);
            expect(res.body.message).toEqual('authentication successful');
            expect(res.body.token).toBeDefined();

            token = res.body.token.value;
        });

        test('Authenticate admin', async () => {
            // when
            const res = await request(app).post('/signin').send({ email: adminEmail, password: adminPassword });

            // then
            expect(res.status).toEqual(200);
            expect(res.body.message).toEqual('authentication successful');
            expect(res.body.token).toBeDefined();

            adminToken = res.body.token.value;
        });
    });
    describe('CRUD Operations', () => {
        describe('- R:', () => {
            describe('Happy cases', () => {
                test('Get profile by id', async () => {
                    // when
                    const res = await request(app).get(`/profiles/${id}`).set('Authorization', `Bearer ${token}`);

                    // then
                    expect(res.status).toEqual(200);
                    expect(res.body.status).toEqual('success');
                    expect(res.body.message).toEqual('profile found');
                    expect(res.body.profile.id).toEqual(id);
                    expect(res.body.profile.email).toEqual(email);
                    expect(await comparePasswordWithHash(password, res.body.profile.password)).toEqual(true);
                    expect(res.body.profile.name).toEqual(name);
                    expect(res.body.profile.role).toEqual(role);
                    expect(res.body.profile.bio).toEqual(bio);
                    expect(res.body.profile.pictures).toEqual([picture]);
                    expect(res.body.profile.createdAt).toBeDefined();
                    expect(res.body.profile.updatedAt).toBeDefined();
                });
            });
            describe('Unhappy cases', () => {
                test('Get profile by id with invalid token', async () => {
                    // when
                    const res = await request(app)
                        .get(`/profiles/${id}`)
                        .set('Authorization', `Bearer ${token}invalid`);

                    // then
                    expect(res.status).toEqual(401);
                    expect(res.body.status).toEqual('unauthorized');
                });

                test('Get profile by id with no token', async () => {
                    // when
                    const res = await request(app).get(`/profiles/${id}`);

                    // then
                    expect(res.status).toEqual(401);
                    expect(res.body.status).toEqual('unauthorized');
                    expect(res.body.message).toEqual('No authorization token was found');
                });
            });
        });
    });
    describe('CRUD Operations', () => {
        describe('- U:', () => {
            describe('Happy Cases', () => {
                test('Update profile', async () => {
                    // when
                    const res = await request(app)
                        .put('/profiles/' + id)
                        .set('Authorization', `Bearer ${token}`)
                        .send({
                            email: updatedEmail,
                            password: updatedPassword,
                            name: updatedName,
                            role: updatedRole,
                            preference: updatedPreference,
                            age: updatedAge,
                            gender: updatedGender,
                            interests: updatedInterests,
                            socials: updatedSocials,
                            pictures: [updatedPicture],
                            bio: updatedBio,
                        });

                    //then
                    expect(res.status).toEqual(200);
                    expect(res.body.status).toEqual('success');
                    expect(res.body.message).toEqual('profile updated');
                    expect(res.body.updatedProfile.bio).toEqual(updatedBio);
                    expect(res.body.updatedProfile.pictures).toEqual([updatedPicture]);
                    expect(res.body.updatedProfile.email).toEqual(updatedEmail);
                    expect(await comparePasswordWithHash(updatedPassword, res.body.updatedProfile.password)).toEqual(
                        true
                    );
                    expect(res.body.updatedProfile.role).toEqual(updatedRole);
                    expect(res.body.updatedProfile.name).toEqual(updatedName);
                    expect(res.body.updatedProfile.id).toEqual(id);
                });
                test('Update admin profile', async () => {
                    // when
                    const res = await request(app)
                        .put('/profiles/' + adminId)
                        .set('Authorization', `Bearer ${adminToken}`)
                        .send({
                            email: updatedAdminEmail,
                            password: updatedAdminPassword,
                            name: updatedAdminName,
                            role: updatedAdminRole,
                            preference: updatedAdminPreference,
                            age: updatedAdminAge,
                            gender: updatedAdminGender,
                            interests: updatedAdminInterests,
                            socials: updatedAdminSocials,
                            pictures: [updatedAdminPicture],
                            bio: updatedAdminBio,
                        });

                    // then
                    expect(res.status).toEqual(200);
                    expect(res.body.status).toEqual('success');
                    expect(res.body.message).toEqual('profile updated');
                    expect(res.body.updatedProfile.bio).toEqual(updatedAdminBio);
                    expect(res.body.updatedProfile.pictures).toEqual([updatedAdminPicture]);
                    expect(res.body.updatedProfile.email).toEqual(updatedAdminEmail);
                    expect(
                        await comparePasswordWithHash(updatedAdminPassword, res.body.updatedProfile.password)
                    ).toEqual(true);
                    expect(res.body.updatedProfile.role).toEqual(updatedAdminRole);
                    expect(res.body.updatedProfile.name).toEqual(updatedAdminName);
                    expect(res.body.updatedProfile.id).toEqual(adminId);
                });
            });
            describe('Unhappy Cases', () => {
                test('Updating profile with invalid email throws error', async () => {
                    const invalidEmail = 'invalidemail';
                    const res = await request(app)
                        .put('/profiles/' + id)
                        .set('Authorization', `Bearer ${token}`)
                        .send({
                            email: invalidEmail,
                        });
                    expect(res.status).toEqual(400);
                    expect(res.body.status).toEqual('application error');
                    expect(res.body.message).toContain("Email must contain a '@'");
                });

                test('Updating profile with too short password throws error', async () => {
                    const invalidPassword = 'short';
                    const res = await request(app)
                        .put('/profiles/' + id)
                        .set('Authorization', `Bearer ${token}`)
                        .send({
                            password: invalidPassword,
                        });

                    expect(res.status).toEqual(400);
                    expect(res.body.status).toEqual('application error');
                    expect(res.body.message).toContain('Password must be at least 8 characters long');
                });

                test('Updating profile with password no number throws error', async () => {
                    const invalidPassword = 'nonumber';
                    const res = await request(app)
                        .put('/profiles/' + id)
                        .set('Authorization', `Bearer ${token}`)
                        .send({
                            password: invalidPassword,
                        });
                    expect(res.status).toEqual(400);
                    expect(res.body.status).toEqual('application error');
                    expect(res.body.message).toContain('Password must contain at least 1 number');
                });

                test('Updating profile with no capital letter throws error', async () => {
                    const invalidPassword = 'n0capital';
                    const res = await request(app)
                        .put('/profiles/' + id)
                        .set('Authorization', `Bearer ${token}`)
                        .send({
                            password: invalidPassword,
                        });
                    expect(res.status).toEqual(400);
                    expect(res.body.status).toEqual('application error');
                    expect(res.body.message).toContain('Password must contain at least 1 capital letter');
                });

                test('Updating profile picture without picture throws error', async () => {
                    const invalidPictures = [picture, ''];
                    const res = await request(app)
                        .put('/profiles/' + id)
                        .set('Authorization', `Bearer ${token}`)
                        .send({
                            pictures: invalidPictures,
                        });
                    expect(res.status).toEqual(400);
                    expect(res.body.status).toEqual('application error');
                    expect(res.body.message).toContain("Picture can't be empty");
                });

                test('Updating profile with invalid role throws error', async () => {
                    const invalidRole = 'INVALID_ROLE';
                    const res = await request(app)
                        .put('/profiles/' + id)
                        .set('Authorization', `Bearer ${token}`)
                        .send({
                            role: invalidRole,
                        });

                    expect(res.status).toEqual(400);
                    expect(res.body.status).toEqual('application error');
                    expect(res.body.message).toContain('Role must be one of "ADMIN", "USER"');
                });

                test('Updating profile with invalid preference throws error', async () => {
                    const invalidPreference = 'INVALID_PREFERENCE';
                    const res = await request(app)
                        .put('/profiles/' + id)
                        .set('Authorization', `Bearer ${token}`)
                        .send({
                            preference: invalidPreference,
                        });
                    expect(res.status).toEqual(400);
                    expect(res.body.status).toEqual('application error');
                    expect(res.body.message).toContain('You must prefer either Male, Female, Both or Other.');
                });
                test('Updating profile with invalid gender throws error', async () => {
                    const invalidGender = 'INVALID_GENDER';
                    const res = await request(app)
                        .put('/profiles/' + id)
                        .set('Authorization', `Bearer ${token}`)
                        .send({
                            gender: invalidGender,
                        });
                    expect(res.status).toEqual(400);
                    expect(res.body.status).toEqual('application error');
                    expect(res.body.message).toContain('Unsupported gender');
                });
                test('Updating profile with invalid age throws error', async () => {
                    const invalidAge = -20;
                    const res = await request(app)
                        .put('/profiles/' + id)
                        .set('Authorization', `Bearer ${token}`)
                        .send({
                            age: invalidAge,
                        });
                    expect(res.status).toEqual(400);
                    expect(res.body.status).toEqual('application error');
                    expect(res.body.message).toContain("Age can't be negative");
                });
                test('Updating profile with invalid interests throws error', async () => {
                    const invalidInterests = ['valid_interest', ''];
                    const res = await request(app)
                        .put('/profiles/' + id)
                        .set('Authorization', `Bearer ${token}`)
                        .send({
                            interests: invalidInterests,
                        });
                    expect(res.status).toEqual(400);
                    expect(res.body.status).toEqual('application error');
                    expect(res.body.message).toContain("Interest can't be empty");
                });
                test('Updating profile with socials too short throws error', async () => {
                    const invalidSocials = ['', '', '', ''];
                    const res = await request(app)
                        .put('/profiles/' + id)
                        .set('Authorization', `Bearer ${token}`)
                        .send({
                            socials: invalidSocials,
                        });
                    expect(res.status).toEqual(400);
                    expect(res.body.status).toEqual('application error');
                    expect(res.body.message).toContain('List of socials must be 5 long');
                });
                test('Updating profile with invalid socials throws error', async () => {
                    const invalidSocials = ['', '', '', '', ''];
                    const res = await request(app)
                        .put('/profiles/' + id)
                        .set('Authorization', `Bearer ${token}`)
                        .send({
                            socials: invalidSocials,
                        });
                    expect(res.status).toEqual(400);
                    expect(res.body.status).toEqual('application error');
                    expect(res.body.message).toContain('At least one social is required');
                });
            });
        });
        describe('- D:', () => {
            describe('Happy cases', () => {
                test('Delete your own profile', async () => {
                    // when
                    const res = await request(app)
                        .delete('/profiles/' + id)
                        .set('Authorization', `Bearer ${token}`);

                    // then
                    expect(res.status).toEqual(200);
                    expect(res.body.status).toEqual('success');
                    expect(res.body.message).toEqual('profile deleted');
                    expect(res.body.deletedProfile.bio).toEqual(updatedBio);
                    expect(res.body.deletedProfile.pictures).toEqual([updatedPicture]);
                    expect(res.body.deletedProfile.email).toEqual(updatedEmail);
                    expect(await comparePasswordWithHash(updatedPassword, res.body.deletedProfile.password)).toEqual(
                        true
                    );
                    expect(res.body.deletedProfile.role).toEqual(updatedRole);
                    expect(res.body.deletedProfile.name).toEqual(updatedName);
                    expect(res.body.deletedProfile.id).toEqual(id);
                });

                test('Delete another profile as ADMIN', async () => {
                    // when
                    const res = await request(app)
                        .delete('/profiles/' + thirdId)
                        .set('Authorization', `Bearer ${adminToken}`);
                    // then
                    expect(res.status).toEqual(200);
                    expect(res.body.status).toEqual('success');
                    expect(res.body.message).toEqual('profile deleted');
                    expect(res.body.deletedProfile.bio).toEqual(thirdUserBio);
                    expect(res.body.deletedProfile.pictures).toEqual([thirdUserPicture]);
                    expect(res.body.deletedProfile.email).toEqual(thirdUserEmail);
                    expect(await comparePasswordWithHash(thirdUserPassword, res.body.deletedProfile.password)).toEqual(
                        true
                    );
                    expect(res.body.deletedProfile.role).toEqual(thirdUserRole);
                    expect(res.body.deletedProfile.name).toEqual(thirdName);
                    expect(res.body.deletedProfile.id).toEqual(thirdId);
                });
                test('Delete admin profile', async () => {
                    // when
                    const res = await request(app)
                        .delete('/profiles/' + adminId)
                        .set('Authorization', `Bearer ${adminToken}`);
                    // then
                    expect(res.status).toEqual(200);
                    expect(res.body.status).toEqual('success');
                    expect(res.body.message).toEqual('profile deleted');
                    expect(res.body.deletedProfile.bio).toEqual(updatedAdminBio);
                    expect(res.body.deletedProfile.pictures).toEqual([updatedAdminPicture]);
                    expect(res.body.deletedProfile.email).toEqual(updatedAdminEmail);
                    expect(
                        await comparePasswordWithHash(updatedAdminPassword, res.body.deletedProfile.password)
                    ).toEqual(true);
                    expect(res.body.deletedProfile.role).toEqual(updatedAdminRole);
                    expect(res.body.deletedProfile.name).toEqual(updatedAdminName);
                    expect(res.body.deletedProfile.id).toEqual(adminId);
                });
            });
            describe('Unhappy Cases', () => {
                test('Delete another profile as a user', async () => {
                    // when
                    const res = await request(app)
                        .delete('/profiles/' + adminId)
                        .set('Authorization', `Bearer ${token}`);
                    // then
                    expect(res.status).toEqual(400);
                    expect(res.body.status).toEqual('application error');
                    expect(res.body.message).toEqual('Wtf are you trying to do? No present from santa this year!!!');
                });
            });
        });
    });
});
