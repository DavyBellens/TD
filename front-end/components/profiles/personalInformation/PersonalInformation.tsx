import ProfileService from "@/services/ProfileService";
import { PersonalInformation, StatusMessage } from "@/types";
import { useRouter } from "next/router";
import { FormEvent, useState } from "react";
import InputField from "./InputField";
import Interests from "./Interests";

type Props = {
  nextStage: Function;
  callBack: Function;
  setStatusMessages: Function;
  user?: PersonalInformation;
};

const PersonalInformationForm: React.FC<Props> = ({ callBack, nextStage, setStatusMessages, user }: Props) => {
  const [email, setEmail] = useState(user ? user.email : "");
  const [emailError, setEmailError] = useState("");
  const [name, setName] = useState(user ? user.name : "");
  const [nameError, setNameError] = useState<string>("");
  const [password, setPassword] = useState(user ? user.password : "");
  const [passwordError, setPasswordError] = useState("");
  const [age, setAge] = useState<number>(user ? user.age : 0);
  const [ageError, setAgeError] = useState<string>("");
  const [interests, setInterests] = useState<string[]>(user ? user.interests : []);
  const [interestsError, setInterestsError] = useState<string>("");
  const [bio, setBio] = useState(user ? (user.bio ? user.bio : "") : "");
  const [bioError, setBioError] = useState<string>("");
  const clearErrors = () => {
    setEmailError("");
    setNameError("");
    setPasswordError("");
    setAgeError("");
    setInterestsError("");
    setBioError("");
    setStatusMessages([]);
  };

  const router = useRouter();

  const validate = async () => {
    let isValid = true;
    if (!email.trim()) {
      setEmailError("Email is required");
      isValid = false;
    }
    if (!email.match(/.+@.+\..+/)) {
      setEmailError("Please enter valid email");
      isValid = false;
    } else {
      const res = await ProfileService.emailExists(email);
      if (res === true) {
        setEmailError("Profile with this email already exists");
        isValid = false;
      }
    }
    if (!name.trim()) {
      setNameError("First name is required");
      isValid = false;
    }
    if (name.length > 50) {
      setNameError("Name can't be longer than 20 characters");
      isValid = false;
    }
    if (bio.trim() && bio.length > 50) {
      setBioError("Bio can't be longer than 50 characters");
      isValid = false;
    }
    if (!password.trim()) {
      setPasswordError("Password is required");
      isValid = false;
    } else if (password.length < 8) {
      setPasswordError("Password must be at least 8 characters long");
      isValid = false;
    } else if (!password.match(/\d/)) {
      setPasswordError("Password must contain at least 1 number");
      isValid = false;
    } else if (!password.match(/[A-Z]/)) {
      setPasswordError("Password must contain at least 1 capital letter");
      isValid = false;
    }
    if (!age || age === null || age === undefined) {
      setAgeError("Age is required");
      isValid = false;
    } else {
      if (age < 0) {
        setAgeError("Age can't be negative");
        isValid = false;
      }
      if (age < 16) {
        setAgeError("You have to be at least 16");
        isValid = false;
      }
      if (age >= 100) {
        setAgeError("I fucking doubt it");
        isValid = false;
      }
    }
    if (!interests || interests.length === 0) {
      setInterestsError("You gotta be interested in something right?");
      isValid = false;
    }
    return isValid;
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    clearErrors();
    if (!(await validate())) return;
    const personalInformation: PersonalInformation = {
      email,
      name,
      password,
      role: "USER",
      age,
      interests,
      bio,
    };
    callBack(personalInformation);
    nextStage();
  };

  const btns = "bg-white bg-opacity-80 rounded-lg text-black p-2 pl-4 pr-4 ";
  const labelStyle = "text-md mt-3";
  const input = "bg-white bg-opacity-60 text-black p-1 rounded-lg";
  return (
    <>
      <form className="flex flex-col justify-center items-center mt-5" onSubmit={(e) => handleSubmit(e)}>
        <h1 className="text-xl m-5 text-center">
          <strong>Personal Information</strong>
        </h1>
        <InputField
          field="First Name"
          id="nameInput"
          type="text"
          value={name}
          callBack={setName}
          labelStyle={labelStyle}
          inputStyle={input}
        />
        {nameError && <div>{nameError}</div>}

        <InputField
          field="Email"
          id="emailInput"
          type="email"
          value={email}
          callBack={setEmail}
          labelStyle={labelStyle}
          inputStyle={input}
        />
        {emailError && <div>{emailError}</div>}

        <InputField
          field="Age"
          id="ageInput"
          type="number"
          value={age}
          callBack={setAge}
          labelStyle={labelStyle}
          inputStyle={input}
        />
        {ageError && <div>{ageError}</div>}

        <InputField
          field="Password"
          id="passwordInput"
          type="password"
          value={password}
          callBack={setPassword}
          labelStyle={labelStyle}
          inputStyle={input}
        />
        {passwordError && <div>{passwordError}</div>}
        <label className="text-md m-0 mt-3" htmlFor="bioInput">
          <strong>Bio:</strong>
        </label>
        <textarea
          className="bg-white bg-opacity-60 text-black p-1 rounded-lg resize-none placeholder:text-black placeholder:text-opacity-40"
          rows={3}
          id="bioInput"
          value={bio}
          placeholder="Tell them something about yourself"
          onChange={(e) => setBio(e.target.value)}
        />
        {bioError && <div>{bioError}</div>}
        <Interests existing={interests} callback={setInterests} setInterestsError={setInterestsError} />
        {interestsError && <div>{interestsError}</div>}
      </form>

      <div className="flex justify-between w-full mt-3">
        <button type="submit" className={btns} onClick={() => router.push("/login")}>
          Go back
        </button>
        <button type="submit" className={btns} onClick={handleSubmit}>
          Next
        </button>
      </div>
    </>
  );
};
export default PersonalInformationForm;
