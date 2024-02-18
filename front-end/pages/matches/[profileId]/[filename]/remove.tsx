import Footer from "@/components/Footer";
import FileService from "@/services/FileService";
import ProfileService from "@/services/ProfileService";
import Head from "next/head";
import Image from "next/image";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

const removePicture: React.FC = () => {
  const router = useRouter();
  const id = router.query.profileId as string;

  const filename = router.query.filename as string;
  const [image, setImage] = useState<any>();
  const [imageError, setImageError] = useState<string>("");
  const deletePicture = async () => {
    if (!id) return;
    const profileObject = await ProfileService.getProfileById(id);
    if (profileObject.profile) {
      const newPictures = profileObject.profile.pictures.filter((i: string) => i != filename);
      if (newPictures.length > 0) {
        try {
          await ProfileService.updateProfile(
            id,
            {
              email: profileObject.profile.email,
              password: profileObject.profile.password,
              role: profileObject.profile.role,
              name: profileObject.profile.name,
              age: profileObject.profile.age,
              interests: profileObject.profile.interests,
              bio: profileObject.profile.bio,
            },
            profileObject.profile.gender,
            profileObject.profile.preference,
            newPictures,
            profileObject.profile.socials
          );

          await FileService.deleteFile(filename);
          router.push("/matches/" + id + "/addPictures");
        } catch (error) {
          console.log(error);
        }
      } else {
        setImageError("You need to have at least 1 picture");
      }
    }
  };
  const getImage = async () => {
    if (filename) {
      try {
        const i = await import("../../../../../back-end/uploads/" + filename);
        setImage(i);
      } catch (error) {
        console.log(error);
        setImage(null);
      }
    }
  };
  useEffect(() => {
    getImage();
  }, [filename]);
  return (
    <div className="app">
      <Head>
        <title>Remove picture</title>
      </Head>
      {image ? (
        <>
          <h1 className="text-2xl font-bold text-center p-5 mt-5">Are you sure you want to delete this picture?</h1>
          <div className="flex justify-center">
            <Image src={image} alt={"A profile picture with the name " + filename} width={100} height={0} />
          </div>
          {imageError ? (
            <>
              <div className="p-5 m-5 font-bold mt-1 pt-1 text-center mb-0">{imageError}</div>
              <button
                className="bg-white opacity-90 font-bold text-black w-auto p-1 rounded-lg m-1"
                onClick={() => router.push(router.asPath + "/../../addPictures")}
              >
                Go back
              </button>
            </>
          ) : (
            <>
              <button
                className="bg-white opacity-90 font-bold text-red-700 w-auto p-1 rounded-lg m-5"
                onClick={deletePicture}
              >
                Yes
              </button>
              <button
                className="bg-white opacity-90 font-bold text-black w-auto p-1 rounded-lg m-5"
                onClick={() => router.push(router.asPath + "/../../addPictures")}
              >
                No
              </button>
            </>
          )}
        </>
      ) : (
        <div className="flex flex-col items-center m-10">
          <p>Something went wrong</p>
          <button
            className="bg-white bg-opacity-50 mt-10 p-2 rounded-xl font-bold text-center"
            onClick={() => router.back()}
          >
            Go back
          </button>
        </div>
      )}
      <Footer />
    </div>
  );
};
export default removePicture;
