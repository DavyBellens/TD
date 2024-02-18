import Social from "@/components/profiles/socials/Social";
import Image from "next/image";

type Props = {
  profile: any;
  image: any;
};

const ProfileId: React.FC<Props> = ({ profile, image }: Props) => {
  const spanStyle = "text-black font-bold m-1";
  const divStyle = "bg-white text-black rounded-lg m-1";
  return (
    profile && (
      <div className="m-2 bg-white bg-opacity-75 ">
        <div className="text-md grid grid-cols-4 pt-1 pb-1 border border-b-2 ">
          {image && (
            <Image
              alt={"profile picture of profile with name " + profile.name}
              className="rounded-full row-span-2 row-start-1 m-auto"
              src={image}
              width={50}
              height={100}
            />
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
            <span className="m-1">{profile.bio}</span>
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
