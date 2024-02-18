import Footer from "@/components/Footer";
import AuthError from "@/components/authorization/AuthError";
import Header from "@/components/header/Header";
import OptionsComponent from "@/components/profiles/Options";
import ProfileInfo from "@/components/profiles/ProfileInfo";
import ProfileService from "@/services/ProfileService";
import { useRouter } from "next/router";
import { useEffect } from "react";
import useSWR, { mutate } from "swr";
import useInterval from "use-interval";

const OptionsPage: React.FC = () => {
  const getProfile = async () => {
    const user = sessionStorage.getItem("loggedInUser");
    if (user) {
      const res = await ProfileService.getProfileById(JSON.parse(user).id);

      return res.profile;
    }
  };
  const { data: profile, isLoading, error } = useSWR("profile", getProfile);
  const router = useRouter();
  useEffect(() => {
    mutate("profile", getProfile());
  }, []);
  useInterval(() => {
    mutate("profile", getProfile());
  }, 5000);
  return (
    <div className="app flex flex-col items-center w-screen">
      <Header isLoggedIn={!!profile} gender={profile && profile.gender} preference={profile && profile.preference} />
      {profile ? (
        <>
          <ProfileInfo profile={profile} />
          <OptionsComponent profile={profile} />
        </>
      ) : (
        <AuthError />
      )}
      <Footer />
    </div>
  );
};
export default OptionsPage;
