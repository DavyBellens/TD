export type Role = "ADMIN" | "USER";

export type Profile = {
  id: string;
  personalInformation: PersonalInformation;
  preference: Preference;
  gender: Gender;
  socials: string[];
  pictures: string[];
};

export type Swipe = {
  swiperId: number;
  swipeeId: number;
  direction: "L" | "R";
};

export type BackendProfile = {
  id: string;
  email: string;
  name: string;
  password: string;
  role: Role;
  age: number;
  interests: string[];
  bio?: string;
  preference: Preference;
  gender: Gender;
  socials: string[];
  pictures: string[];
  swipedRightEmails: string[];
};

export type PersonalInformation = {
  email: string;
  name: string;
  password: string;
  role: Role;
  age: number;
  interests: string[];
  bio?: string;
};

export type Gender = "WOMAN" | "MAN" | "X" | "OTHER" | "SECRET";
export type Preference = "FEMALE" | "MALE" | "BOTH" | "OTHER/SECRET";

export type StatusMessage = {
  message: string;
  type: "error" | "success";
};

export type Type = "profiles" | "matches";
