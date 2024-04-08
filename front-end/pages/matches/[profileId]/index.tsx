import Back from "@/components/Back";
import Footer from "@/components/Footer";
import AuthError from "@/components/authorization/AuthError";
import ProfileId from "@/components/profiles/ProfileId";
import FileService from "@/services/FileService";
import ProfileService from "@/services/ProfileService";
import { BackendProfile, Profile } from "@/types";
import Head from "next/head";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import useSWR, { mutate } from "swr";
import useInterval from "use-interval";

const ProfileIdPage: React.FC = () => {
  const router = useRouter();
  const id = router.query.profileId;
  const [images, setImages] = useState<any>();
  const [userProfile, setUserProfile] = useState<BackendProfile | undefined>();

  const getUserProfile = async () => {
    if (!userProfile) {
      const user = sessionStorage.getItem("loggedInUser");

      if (user) {
        const p = JSON.parse(user);
        if (p) {
          const response = await ProfileService.getProfileById(p.id);
          const profile = response.profile;
          if (profile) {
            setUserProfile(profile);
          }
        }
      }
    }
  };
  const getImage = async (profile: Profile) => {
    if (profile && profile.pictures && profile.pictures.length > 0) {
      let images: any[] = [];
      await Promise.all(
        profile.pictures.map(async (p) => {
          const imageObject = await FileService.getFile(p);
          if (imageObject) {
            const image = URL.createObjectURL(imageObject);
            images.push(image);
          }
        })
      );
      if (images.length < 2) images.push(images[0]);
      setImages(images);
    }
  };

  const getProfile = async () => {
    if (id) {
      const result = await ProfileService.getProfileById(id as string);
      if (result) {
        if (!images) await getImage(result.profile);
        return result.profile;
      }
    }
  };
  const { data: profile, isLoading, error } = useSWR("profile", getProfile);

  useEffect(() => {
    mutate("profile", getProfile());
    getUserProfile();
  }, [id]);

  useInterval(() => {
    mutate("profile", getProfile());
  }, 5000);
  return (
    <>
      <Head>
        <title>Profile info page </title>
      </Head>
      {isLoading && <div>Loading...</div>}
      {error && <div>{error}</div>}
      {userProfile ? (
        profile &&
        images && (
          <div className="app">
            <Back message="Go back" style="bg-white bg-opacity-50 m-5 p-2 rounded-xl font-bold text-center w-max" />
            <ProfileId profile={profile} images={images} />
            <Footer />
          </div>
        )
      ) : (
        <AuthError />
      )}
    </>
  );
};
export default ProfileIdPage;
