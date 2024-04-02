import FileService from "@/services/FileService";
import { BackendProfile, Profile } from "@/types";
import Image from "next/image";
import { useEffect, useState } from "react";

type Props = {
  profile: BackendProfile;
};

const MatchProfile: React.FC<Props> = ({ profile }: Props) => {
  const [index, setIndex] = useState<number>(0);
  const [images, setImages] = useState<any[]>([]);
  const [selectedImage, setSelectedImage] = useState<any>();

  const getImages = async () => {
    if (profile) {
      if (profile.pictures.length > 0) {
        try {
          const pictures = await Promise.all(
            profile.pictures.map(async (p) => {
              const i = await FileService.getFile(p);
              if (i) return URL.createObjectURL(i);
            })
          );
          if (pictures) {
            setImages(pictures);
            setSelectedImage(pictures[0]);
          }
        } catch (error) {
          console.log(error);
          try {
          } catch (error) {
            const pictures = profile.pictures.map(
              async (_p) => await import("/public/images/default-profilePicture.jpg")
            );
            setImages(pictures);
            setSelectedImage(pictures[0]);
          }
        }
      }
    }
  };
  const changeImage = (value: number) => {
    if (index + value === images.length) {
      setIndex(0);
      setSelectedImage(images[0]);
    } else if (index + value === -1) {
      setIndex(images.length - 1);
      setSelectedImage(images[images.length - 1]);
    } else {
      setIndex(index + value);
      setSelectedImage(images[index + value]);
    }
  };

  useEffect(() => {
    getImages();
  }, [profile]);

  return profile ? (
    <div className="flex items-center flex-col w-10/12 justify-center">
      {selectedImage && (
        <div>
          <div className="flex justify-center relative h-full mb-10 w-full">
            <div className="absolute left-0 top-0 w-1/2 h-full" onClick={() => changeImage(-1)}></div>
            <div className="image-container bg-black m-auto flex items-center w-full align-middle">
              <Image
                src={selectedImage}
                alt={"picture of profile " + profile.name}
                className="bg-black"
                layout="fill"
                objectFit="contain"
                width={0}
                height={0}
              />
            </div>
            <div className="absolute right-0 top-0 w-1/2 h-full" onClick={() => changeImage(1)}></div>
          </div>
          <div className={"bg-white text-black p-1 text-xl mt-5"}>
            <p>{profile.name}</p>
            <div className="flex p-1 text-gray-600">
              -{profile.age}
              <p className="font-mono text-2xl pl-1">
                {(profile.gender === "MAN" || profile.gender === "WOMAN") && profile.gender === "MAN" ? "♂" : "♀"}
              </p>
            </div>
            <p className="text-gray-600">{profile.bio}</p>
            <div className="text-gray-600">{profile.interests ? profile.interests.map((i) => "#" + i + " ") : ""}</div>
          </div>
        </div>
      )}
    </div>
  ) : (
    <p></p>
  );
};

export default MatchProfile;
