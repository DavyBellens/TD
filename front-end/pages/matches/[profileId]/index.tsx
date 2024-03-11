import Back from "@/components/Back";
import Footer from "@/components/Footer";
import ProfileId from "@/components/profiles/ProfileId";
import FileService from "@/services/FileService";
import ProfileService from "@/services/ProfileService";
import { Profile } from "@/types";
import Head from "next/head";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import useSWR, { mutate } from "swr";
import useInterval from "use-interval";

const ProfileIdPage: React.FC = () => {
  const router = useRouter();
  const id = router.query.profileId;
  const [image, setImage] = useState<any>();

  const getImage = async (profile: Profile) => {
    if (profile) {
      const imageObject = await FileService.getFile(profile.pictures[0]);
      if (imageObject) {
        const image = URL.createObjectURL(imageObject);
        setImage(image);
      }
    }
  };

  const getProfile = async () => {
    if (id) {
      const result = await ProfileService.getProfileById(id as string);
      if (result) {
        await getImage(result.profile);
        return result.profile;
      }
    }
  };
  const { data: profile, isLoading, error } = useSWR("profile", getProfile);

  useEffect(() => {
    mutate("profile", getProfile());
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
      {profile && (
        <div className="app">
          <Back message="Go back" style="bg-white bg-opacity-50 m-5 p-2 rounded-xl font-bold text-center w-max" />
          <ProfileId profile={profile} image={image} />
          <Footer />
        </div>
      )}
    </>
  );
};
export default ProfileIdPage;
