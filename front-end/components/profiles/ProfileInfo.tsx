import { BackendProfile, Profile } from "@/types";
import { FormEvent, useState } from "react";

type Props = {
  profile: any; //Profile | BackendProfile;
};

const ProfileInfo: React.FC<Props> = ({ profile }: Props) => {
  const [showing, setShowing] = useState<boolean>(false);
  return (
    <div className="flex flex-col justify-center items-center w-min sm:p-5 sm:w-screen">
      <h1 className="text-2xl w-max p-5">
        <strong>Your profile</strong>
      </h1>
      <h2 className="text-lg w-max">
        <strong>Personal Information</strong>
      </h2>

      <div className="bg-white bg-opacity-75 text-black w-full rounded-md p-1 ">
        <p>
          <strong>Name: </strong>
          {profile.personalInformation ? profile.personalInformation.name : profile.name}
        </p>
        <p>
          <strong>Age: </strong>
          {profile.personalInformation ? profile.personalInformation.age : profile.age}
        </p>
        <p>
          <strong>Email: </strong>
          {profile.personalInformation ? profile.personalInformation.email : profile.email}
        </p>
        {profile.personalInformation && (
          <p className="break-all flex flex-col">
            <span>
              <strong>Password: </strong>
              {"*".repeat(profile.personalInformation.password.length)}
            </span>
            <span>
              <span onClick={() => setShowing(!showing)} className={showing ? "font-bold italic text-sm" : ""}>
                {showing ? "Hide " : "👁️"}
              </span>
              {showing && (
                <span className="bg-white bg-opacity-50 text-black text-opacity-40">
                  {profile.personalInformation.password}
                </span>
              )}
            </span>
          </p>
        )}
        <p className="break-words">
          <strong>Bio: </strong>
          {profile.personalInformation ? profile.personalInformation.bio : profile.bio}
        </p>
        <p>
          <strong>Interests: </strong>
          {String(
            profile.personalInformation
              ? profile.personalInformation.interests.map((i: string) => " " + i)
              : profile.interests.map((i: string) => " " + i)
          )}
        </p>
      </div>
      <h2 className="text-lg">
        <strong>Socials</strong>
      </h2>
      <div className="bg-white bg-opacity-75 text-black w-full rounded-md p-1">
        <p>
          <strong>Instagram:</strong> {profile.socials[0]}
        </p>
        <p>
          <strong>Facebook:</strong> {profile.socials[1]}
        </p>
        <p>
          <strong>Snapchat:</strong> {profile.socials[2]}
        </p>
        <p>
          <strong>Messenger:</strong> {profile.socials[3]}
        </p>
        <p>
          <strong>Phone number:</strong> {profile.socials[4]}
        </p>
      </div>
      <h2 className="text-lg">
        <strong>Sex stuff</strong>
      </h2>
      <div className="bg-white bg-opacity-75 text-black w-full rounded-md p-1">
        <p>
          <strong>Gender</strong>: {profile.gender === "SECRET" ? "Prefer not to say" : profile.gender}
        </p>
        <p>
          <strong>Preference: </strong>
          {profile.preference === "OTHER/SECRET" ? "Other/ Prefer not to say" : profile.preference}
        </p>
      </div>
    </div>
  );
};
export default ProfileInfo;
