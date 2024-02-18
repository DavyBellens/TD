import ProfileAddPictureComponent from "@/components/profiles/pictures/AddPictures";
import Apologize from "@/components/Apologize";
import AuthError from "@/components/authorization/AuthError";
import Footer from "@/components/Footer";
import ImageUpload from "@/components/profiles/pictures/ImageUpload";
import ProfileService from "@/services/ProfileService";
import { Profile } from "@/types";
import Head from "next/head";
import Image from "next/image";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import useSWR, { mutate } from "swr";
import useInterval from "use-interval";

const ProfileAddPicturePage: React.FC = () => {
  const router = useRouter();
  const id = router.query.profileId;
  const [images, setImages] = useState<any[]>([]);
  const [userId, setUserId] = useState<string | null>();

  const getProfile = async () => {
    if (id) {
      const result = await ProfileService.getProfileById(id as string);
      if (result) {
        if (result.profile) {
          const imgs = await Promise.all(
            result.profile.pictures.map(async (p: string) => await import("../../../../back-end/uploads/" + p))
          );
          setImages(imgs);
          return result.profile;
        }
      }
    }
  };

  const { data: profile, isLoading, error } = useSWR("profile", getProfile);

  useEffect(() => {
    const user = sessionStorage.getItem("loggedInUser");
    if (user) setUserId(JSON.parse(user).id);
    mutate("profile", getProfile());
  }, [id]);

  useInterval(() => {
    mutate("profile", getProfile());
  }, 5000);

  return (
    <>
      <Head>
        <title>Add pictures</title>
      </Head>
      {isLoading && <div>Loading...</div>}
      {error && <div>{error}</div>}
      {profile && id && images ? (
        id === userId ? (
          <ProfileAddPictureComponent profile={profile} id={id as string} images={images} />
        ) : (
          <Apologize what="add pictures for" />
        )
      ) : (
        <AuthError />
      )}
      <Footer />
    </>
  );
};
export default ProfileAddPicturePage;
