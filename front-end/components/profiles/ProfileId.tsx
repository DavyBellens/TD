import Social from "@/components/profiles/socials/Social";
import Image from "next/image";
import { useEffect, useState } from "react";

type Props = {
  profile: any;
  images: any;
};

const ProfileId: React.FC<Props> = ({ profile, images }: Props) => {
  const [pictureSize, setSize] = useState<boolean>(false);
  const [index, setIndex] = useState<boolean>(false);
  const spanStyle = "text-black font-bold m-1";
  const divStyle = "bg-white text-black rounded-lg m-1 p-1";
  return (
    profile && (
      <div className="m-2 bg-white bg-opacity-75 ">
        <div className="text-md grid grid-cols-4 pt-1 pb-1 border border-b-2 ">
          {images && (
            <Image
              alt={`profile picture ${index ? "2" : "1"} of profile with name ` + profile.name}
              className="rounded-full row-span-2 row-start-1 m-auto"
              src={images[index ? 1 : 0]}
              width={50}
              height={100}
              onClick={() => setSize(!pictureSize)}
            />
          )}
          {pictureSize && (
            <div className="fixed inset-0 z-50 flex justify-center items-center bg-black bg-opacity-50">
              <div className="relative">
                <span
                  className="text-4xl absolute top-0 right-0 cursor-pointer p-1 bg-red-600"
                  onClick={() => setSize(false)}
                >
                  &times;
                </span>
                <Image
                  alt={`profile picture ${index ? "2" : "1"} of profile with name ` + profile.name}
                  src={images[index ? 1 : 0]}
                  width={400}
                  height={800}
                  onClick={() => setIndex(!index)}
                />
              </div>
            </div>
          )}
          <div className={spanStyle + " grid text-opacity-70 col-span-3 "}>
            <span className={" row-start-1 " + (profile.name.length > 15 ? " text-sm " : " text-lg ")}>
              {profile.name}
            </span>
            <span>
              - {profile.age}
              <span className="font-mono text-xl">
                {profile.gender === "MAN" ? " ♂" : profile.gender === "WOMAN" ? " ♀" : ""}
              </span>
            </span>
          </div>
        </div>
        <div className="flex flex-col">
          <span className={spanStyle}>Bio</span>
          <div className={divStyle}>
            <span>{profile.bio}</span>
          </div>
        </div>
        <div className="flex flex-col">
          <span className={spanStyle}>Interests</span>
          <div className={divStyle}>
            <span className="m-1">{String(profile.interests.map((i: string) => " " + i))}</span>
          </div>
        </div>
        <Social name="Instagram" data={profile.socials[0]} />
        <Social name="Facebook" data={profile.socials[1]} />
        <Social name="Snapchat" data={profile.socials[2]} />
        <Social name="Messenger" data={profile.socials[3]} />
        <Social name="Phone number" data={profile.socials[4]} />
      </div>
    )
  );
};
export default ProfileId;
