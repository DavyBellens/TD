import { Gender, PersonalInformation, Preference, Profile, StatusMessage } from "@/types";
import { useRouter } from "next/router";
import React, { FormEvent, SetStateAction, useEffect, useState } from "react";
import PersonalInformationForm from "./personalInformation/PersonalInformation";
import ProfileService from "@/services/ProfileService";
import SocialsForm from "./socials/Socials";
import GenderForm from "./personalInformation/Gender";
import PreferenceForm from "./personalInformation/Preference";
import ProfileInfo from "./ProfileInfo";

type Props = {
  existingUser?: Profile;
};

const ProfileCreateForm: React.FC<Props> = ({ existingUser }: Props) => {
  const [stage, setStage] = useState<1 | 2 | 3 | 4 | 5 | 6>(1);
  const [personalInformation, setPersonalInformation] = useState<PersonalInformation | undefined>(
    existingUser ? existingUser.personalInformation : undefined
  );
  const [statusMessages, setStatusMessages] = useState<StatusMessage[]>([]);
  const [socials, setSocials] = useState<string[]>(existingUser ? existingUser.socials : []);
  const [gender, setGender] = useState<Gender | undefined>(existingUser ? existingUser.gender : undefined);
  const [preference, setPreference] = useState<Preference | undefined>(
    existingUser ? existingUser.preference : undefined
  );

  const createProfile = async () => {
    try {
      if (personalInformation && gender && preference) {
        setStatusMessages([{ message: "Creating profile...", type: "success" }]);
        const res = await ProfileService.createProfile(personalInformation, gender, preference, socials);

        setStage(6);
        const profileObject = await ProfileService.loginUser(personalInformation.email, personalInformation.password);
        const profile = await profileObject.json();
        console.log(profile);

        sessionStorage.setItem("loggedInUser", JSON.stringify(profile.profile));
        sessionStorage.setItem("token", JSON.stringify(profile.token));
        const message = res.message;
        const type = res.status;
        setStatusMessages([]);
        setStatusMessages([{ message, type }]);
        setTimeout(() => 1000);
        router.push("/");
      }
    } catch (error) {
      console.log(error);
    }
  };

  const router = useRouter();
  const btns = "bg-white bg-opacity-80 rounded-lg text-black p-2 pl-4 pr-4 ";

  return (
    <>
      {statusMessages && stage !== 6 && (
        <ul>
          {statusMessages.map((statusMessage, index) => (
            <li key={index}>{statusMessage.message}</li>
          ))}
        </ul>
      )}
      {stage === 1 ? (
        <PersonalInformationForm
          setStatusMessages={setStatusMessages}
          user={personalInformation}
          callBack={setPersonalInformation}
          nextStage={() => setStage(2)}
        />
      ) : stage === 2 ? (
        <SocialsForm socials={socials} callBack={setSocials} setStage={setStage} />
      ) : stage === 3 ? (
        <GenderForm callBack={setGender} existing={gender} setStage={setStage} />
      ) : stage === 4 ? (
        <PreferenceForm callBack={setPreference} existing={preference} setStage={setStage} />
      ) : stage === 5 ? (
        gender &&
        preference &&
        personalInformation && (
          <>
            <ProfileInfo
              profile={{
                id: "/",
                gender: gender,
                preference: preference,
                personalInformation: personalInformation,
                socials: socials,
                pictures: [],
              }}
            />
            <div className="flex justify-between w-full mt-3">
              <button type="submit" className={btns} onClick={() => setStage(4)}>
                Go back
              </button>
              <button type="submit" className={btns} onClick={createProfile}>
                Create
              </button>
            </div>
          </>
        )
      ) : stage === 6 ? (
        <div className="flex flex-col items-center p-5 pt-20 pb-10 w-screen">
          <div className="text-xl pb-20 text-center font-bold">Please be patient while we create your profile</div>
          {statusMessages && (
            <ul>
              {statusMessages.map((statusMessage, index) => (
                <li key={index} className="text-xl p-10 pb-20 text-center w-full">
                  {statusMessage.message}
                </li>
              ))}
            </ul>
          )}
        </div>
      ) : (
        <>
          <p>Something went wrong</p>
          <button className={btns} onClick={() => router.push("/login")}>
            Go home
          </button>
        </>
      )}
    </>
  );
};

export default ProfileCreateForm;
