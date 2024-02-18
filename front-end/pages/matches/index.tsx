import Footer from "@/components/Footer";
import Header from "@/components/header/Header";
import ProfilesOverviewTable from "@/components/profiles/ProfilesOverviewTable";
import MatchService from "@/services/MatchService";
import ProfileService from "@/services/ProfileService";
import { BackendProfile, Gender, Preference } from "@/types";
import Head from "next/head";
import { useEffect, useState } from "react";
import useSWR, { mutate } from "swr";
import useInterval from "use-interval";

const Profiles: React.FC = () => {
  const [profile, setProfile] = useState<BackendProfile | undefined>();
  const getMatches = async () => {
    if (profile) {
      const matches = await MatchService.getMatchesByProfile(profile.id);
      const matchObjects = await matches.json();
      if (matchObjects) {
        const profiles = await Promise.all(
          matchObjects.matches.map(async (e: any) => {
            const p = await ProfileService.getProfileById(e.profileId1 == profile.id ? e.profileId2 : e.profileId1);
            return p.profile;
          })
        );
        if (profiles) return profiles;
      }
    }
  };
  const { data, isLoading, error } = useSWR("matches", getMatches);
  useInterval(() => {
    mutate("matches", getMatches());
  }, 2000);
  useEffect(() => {
    const getProfile = async () => {
      const user = sessionStorage.getItem("loggedInUser");
      if (user) {
        const p = JSON.parse(user);
        const res = await ProfileService.getProfileById(p.id);
        if (res) {
          setProfile(res.profile);
          mutate("matches", getMatches());
        }
      }
    };
    getProfile();
  }, []);
  return (
    <div className="app">
      <Head>
        <title>Profiles</title>
      </Head>
      <Header isLoggedIn={!!profile} gender={profile && profile.gender} preference={profile && profile.preference} />
      {error && <div>{error}</div>}
      {isLoading && <div>Loading...</div>}
      {profile ? (
        data ? (
          <ProfilesOverviewTable profiles={data} />
        ) : (
          <div>Loading...</div>
        )
      ) : (
        <div className="flex flex-col items-center">
          <p className="p-5 text-center">Please login or create an account before continuing</p>
          <a href="/login" className="bg-white bg-opacity-50 mt-10 p-2 rounded-xl font-bold text-center">
            Sign in/up
          </a>
        </div>
      )}
      <Footer />
    </div>
  );
};
export default Profiles;
