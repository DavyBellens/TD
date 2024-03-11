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
import FileService from "@/services/FileService";
import Link from "next/link";
import Back from "@/components/Back";

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
            result.profile.pictures.map(async (p: string) => {
              const imageObject = await FileService.getFile(p);
              if (imageObject) return URL.createObjectURL(imageObject);
            })
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

  const btnStyle = "bg-white bg-opacity-40 m-5 p-2 rounded-lg mb-0 font-bold text-center ";
  return (
    <div className="app items-center">
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
      <div className="flex justify-center mt-10">
        <Link className={btnStyle} href={"/options"}>
          Go Back
        </Link>
        {images.length > 0 && (
          <button className={btnStyle} onClick={() => router.push("/")}>
            Start swiping
          </button>
        )}
      </div>
      <Footer />
    </div>
  );
};
export default ProfileAddPicturePage;
