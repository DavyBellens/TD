import request from 'supertest';
import app from '../app';

describe('test MATCH endpoints', () => {
    const profileAdminEmail = 'TDINDER_TEST_ADMIN@tdinder.com';
    const profileUserEmail = 'TDINDER_TEST_USER@tdinder.com';
    const profilePassword = 'TD1nder69!!!';
    let id: number;
    let adminId: number;
    let token: string;
    let adminToken: string;
    let matchId: number;

    test('authenticate USER', async () => {
        const res = await request(app).post('/signin').send({ email: profileUserEmail, password: profilePassword });
        id = res.body.profile.id;
        token = res.body.token.value;
    });

    test('authenticate ADMIN', async () => {
        const res = await request(app).post('/signin').send({ email: profileAdminEmail, password: profilePassword });
        adminId = res.body.profile.id;
        adminToken = res.body.token.value;
    });

    describe('Happy Cases', () => {
        test('Match with another profile', async () => {
            const res = await request(app)
                .post(`/matches/match?profileId1=${id}&profileId2=${adminId}`)
                .set('Authorization', `Bearer ${token}`);
            expect(res.status).toEqual(200);
            expect(res.body.status).toEqual('success');
            expect(res.body.message).toEqual(`successfully matched profiles ${id} and ${adminId}`);
            matchId = res.body.match.id;
        });

        test('Request all your matches', async () => {
            const res = await request(app)
                .get('/matches/profile?profileId=' + id)
                .set('Authorization', `Bearer ${token}`);

            expect(res.status).toEqual(200);
            expect(res.body.status).toEqual('success');
            expect(res.body.message).toEqual(`All the matches for profile with id ${id}`);
            expect(res.body.matches).toHaveLength(1);
        });
        test('Request all made matches as admin', async () => {
            const res = await request(app).get('/matches').set('Authorization', `Bearer ${adminToken}`);

            expect(res.status).toEqual(200);
            expect(res.body.status).toEqual('success');
            expect(res.body.message).toEqual(`all the matches`);
            expect(res.body.matches).toHaveLength(1);
        });
        test('Get one of your matches by its ID', async () => {
            const res = await request(app)
                .get('/matches/match?matchId=' + matchId)
                .set('Authorization', `Bearer ${token}`);

            expect(res.status).toEqual(200);
            expect(res.body.status).toEqual('success');
            expect(res.body.message).toEqual(`match with id ${matchId}`);
        });
        test('Get a match by its ID as admin', async () => {
            const res = await request(app)
                .get(`/matches/match?matchId=${matchId}`)
                .set('Authorization', `Bearer ${adminToken}`);

            expect(res.status).toEqual(200);
            expect(res.body.status).toEqual('success');
            expect(res.body.message).toEqual(`match with id ${matchId}`);
        });
        test('Unmatch one of your matches', async () => {
            const res = await request(app)
                .delete(`/matches/unmatch?profileId1=${id}&profileId2=${adminId}`)
                .set('Authorization', `Bearer ${token}`);

            expect(res.status).toEqual(200);
            expect(res.body.status).toEqual('success');
            expect(res.body.message).toEqual(`successfully unmatched profiles ${id} and ${adminId}`);
        });
        // ADMINS CAN PLAY CUPID THO
        test('Match 2 profiles', async () => {
            const res = await request(app)
                .post(`/matches/match?profileId1=${id}&profileId2=${adminId}`)
                .set('Authorization', `Bearer ${adminToken}`);
            expect(res.status).toEqual(200);
            expect(res.body.status).toEqual('success');
            expect(res.body.message).toEqual(`successfully matched profiles ${id} and ${adminId}`);
        });
        test('Unmatch one of your matches again (cleanup for above)', async () => {
            const res = await request(app)
                .delete(`/matches/unmatch?profileId1=${id}&profileId2=${adminId}`)
                .set('Authorization', `Bearer ${token}`);

            expect(res.status).toEqual(200);
            expect(res.body.status).toEqual('success');
            expect(res.body.message).toEqual(`successfully unmatched profiles ${id} and ${adminId}`);
        });
    });
    describe('Unhappy Cases', () => {
        test('Match with yourself', async () => {
            const res = await request(app)
                .post(`/matches/match?profileId1=${id}&profileId2=${id}`)
                .set('Authorization', `Bearer ${token}`);

            expect(res.status).toEqual(400);
            expect(res.body.status).toEqual('application error');
            expect(res.body.message).toEqual('Did you really just try to match yourself?');
        });
        test('Unmatch yourself', async () => {
            const res = await request(app)
                .delete(`/matches/unmatch?profileId1=${id}&profileId2=${id}`)
                .set('Authorization', `Bearer ${token}`);

            expect(res.status).toEqual(400);
            expect(res.body.status).toEqual('application error');
            expect(res.body.message).toEqual('Did you really just try to unmatch yourself?');
        });
        test('Match 2 profiles', async () => {
            const res = await request(app)
                .post(`/matches/match?profileId1=${adminId}&profileId2=${id}`)
                .set('Authorization', `Bearer ${token}`);
            expect(res.status).toEqual(400);
            expect(res.body.status).toEqual('application error');
            expect(res.body.message).toEqual('Fuck you tryna be cupid or sumthin?');
        });
        test('Request all made matches as user', async () => {
            const res = await request(app).get('/matches').set('Authorization', `Bearer ${token}`);

            expect(res.status).toEqual(400);
            expect(res.body.status).toEqual('application error');
            expect(res.body.message).toEqual(`You can't view other people's matches`);
        });
        test('Unmatch two different profiles', async () => {
            const res = await request(app)
                .delete(`/matches/unmatch?profileId1=${adminId}&profileId2=${id}`)
                .set('Authorization', `Bearer ${token}`);

            expect(res.status).toEqual(400);
            expect(res.body.status).toEqual('application error');
            expect(res.body.message).toEqual(`Why the fuck you tryna interfere with love?`);
        });

        // EVEN ADMINS SHOULDN'T HAVE THAT ABILITY
        test('Unmatch two different profiles', async () => {
            const res = await request(app)
                .delete(`/matches/unmatch?profileId1=${id}&profileId2=${adminId}`)
                .set('Authorization', `Bearer ${adminToken}`);

            expect(res.status).toEqual(400);
            expect(res.body.status).toEqual('application error');
            expect(res.body.message).toEqual(`Why the fuck you tryna interfere with love?`);
        });
    });
});
