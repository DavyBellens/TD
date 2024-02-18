import { Gender, Preference } from "@/types";
import { getAll } from "../util/get";
import { getToken } from "../util/token";

const baseUrl = process.env.NEXT_PUBLIC_API_URL + "/profiles";
const type = "profiles";

const getAllProfiles = async () => await getAll(type);

const getProfileById = async (profileId: string) => {
  const token = getToken();
  const res = await fetch(baseUrl + `/${profileId}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });

  const profile = await res.json();
  return profile;
};

const deleteProfileById = async (profileId: number): Promise<Boolean> => {
  const token = getToken();
  const res = await fetch(baseUrl + `/${profileId}`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });
  return await res.json();
};

const createProfile = async (
  profileInformation: {
    email: string;
    password: string;
    role: string;
    name: string;
    age: number;
    interests: string[];
    bio?: string;
  },
  gender: Gender,
  preference: Preference,
  socials: string[]
) => {
  const res = await fetch(process.env.NEXT_PUBLIC_API_URL + "/signup", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      email: profileInformation.email,
      password: profileInformation.password,
      role: profileInformation.role,
      name: profileInformation.name,
      age: profileInformation.age,
      interests: profileInformation.interests,
      bio: profileInformation.bio,
      gender,
      preference: preference === "OTHER/SECRET" ? "OTHER" : preference,
      socials,
      pictures: [],
    }),
  });
  return await res.json();
};
const updateProfile = async (
  id: string,
  profileInformation?: {
    email?: string;
    password?: string;
    role?: string;
    name?: string;
    age?: number;
    interests?: string[];
    bio?: string;
  },
  gender?: Gender,
  preference?: Preference,
  pictures?: string[],
  socials?: string[],
  swipedEmails?: string[]
) => {
  const token = getToken();
  const res = await fetch(baseUrl + "/" + id, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({
      email: profileInformation && profileInformation.email,
      role: profileInformation && profileInformation.role,
      name: profileInformation && profileInformation.name,
      age: profileInformation && profileInformation.age,
      interests: profileInformation && profileInformation.interests,
      bio: profileInformation && profileInformation.bio,
      gender,
      preference: preference === "OTHER/SECRET" ? "OTHER" : preference,
      socials,
      pictures: pictures ? pictures : ["default-profilePicture.jpg"],
      swipedRightEmails: swipedEmails ? swipedEmails : [],
    }),
  });
  return await res.json();
};

const loginUser = async (email: string, password: string) => {
  const url = process.env.NEXT_PUBLIC_API_URL + "/signin";
  return await fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ email, password }),
  });
};

const getLeaderboard = async () => {
  const token = getToken();
  const res = await fetch(process.env.NEXT_PUBLIC_API_URL + `/leaderboard/10`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });
  return await res.json();
};

const getLikesByProfile = async (profileId: string) => {
  const token = getToken();
  const res = await fetch(baseUrl + `/${profileId}/likes`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });

  const json = await res.json();
  return { resourceLikes: json.resourceLikes, commentLikes: json.commentLikes };
};

const emailExists = async (email: string) => {
  const token = getToken();
  const res = await fetch(process.env.NEXT_PUBLIC_API_URL + `/email?email=${email}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });

  return await res.json();
};

const getAllPossibleMatches = async (preference: Preference, swiped: string[]) => {
  const token = getToken();
  const res = await fetch(baseUrl + "/preference?preference=" + preference + "&swipedEmails=" + swiped, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });
  return await res.json();
};

export default {
  getAllPossibleMatches,
  emailExists,
  getAllProfiles,
  getProfileById,
  deleteProfileById,
  createProfile,
  updateProfile,
  loginUser,
  getLeaderboard,
  getLikesByProfile,
};
