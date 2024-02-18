import { BackendProfile, Profile } from "@/types";
import Image from "next/image";
import { useEffect, useState } from "react";

type Props = {
  profile: BackendProfile;
  images: string[];
};

const MatchProfile: React.FC<Props> = ({ profile, images }: Props) => {
  const [index, setIndex] = useState<number>(0);
  const [selectedImage, setSelectedImage] = useState<string>();

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
    setSelectedImage(images[0]);
  }, [images]);

  return profile ? (
    <div className="flex items-center flex-col w-10/12 justify-center">
      {selectedImage && (
        <div>
          <div className="flex justify-center relative">
            <div className="absolute left-0 top-0 w-1/2 h-full" onClick={() => changeImage(-1)}></div>
            <div className="image-container bg-transparent m-auto flex items-center align-middle">
              <Image src={selectedImage} alt={"picture of profile " + profile.name} className="bg-black " width={350} />
            </div>
            <div className="absolute right-0 top-0 w-1/2 h-full" onClick={() => changeImage(1)}></div>
          </div>
          <div className={"bg-white text-black p-1 text-xl mt-5"}>
            <p>{profile.name}</p>
            <small>
              -{profile.age} {(profile.gender === "MAN" || profile.gender === "WOMAN") && profile.gender}
            </small>
          </div>
        </div>
      )}
    </div>
  ) : (
    <p></p>
  );
};

export default MatchProfile;
