import Footer from "@/components/Footer";
import Header from "@/components/header/Header";
import ProfilesOverviewTable from "@/components/profiles/ProfilesOverviewTable";
import ProfileService from "@/services/ProfileService";
import { Gender, Preference } from "@/types";
import Head from "next/head";
import { useEffect, useState } from "react";
import useSWR, { mutate } from "swr";
import useInterval from "use-interval";

const Profiles: React.FC = () => {
  const [gender, setGender] = useState<Gender>();
  const [preference, setPreference] = useState<Preference>();
  const getProfiles = async () => {
    const token = sessionStorage.getItem("token");
    if (token) {
      const profiles = await ProfileService.getAllProfiles();
      return profiles.profiles;
    }
  };

  const { data, isLoading, error } = useSWR("profiles", getProfiles);
  useInterval(() => {
    mutate("profiles", getProfiles());
  }, 5000);

  useEffect(() => {
    mutate("profiles", getProfiles());
    const getGenderAndPreference = async () => {
      const user = sessionStorage.getItem("loggedInUser");
      if (user) {
        const p = JSON.parse(user);
        const res = await ProfileService.getProfileById(p.id);
        const profile = res.profile;
        setGender(profile.gender);
        setPreference(profile.preference);
      }
    };
    getGenderAndPreference();
  }, []);
  return (
    <div className="app">
      <Head>
        <title>Profiles</title>
      </Head>
      <Header isLoggedIn={!!data} gender={gender} preference={preference} />
      {error && <div>{error}</div>}
      {isLoading ? (
        <div>Loading...</div>
      ) : data ? (
        <ProfilesOverviewTable profiles={data} />
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
