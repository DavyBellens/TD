import { getToken } from "@/util/token";

const match = async (swiperId: number, id2: number) => {
  const token = getToken();
  return await fetch(process.env.NEXT_PUBLIC_API_URL + "/matches/match?profileId1=" + swiperId + "&profileId2=" + id2, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });
};

const getMatchesByProfile = async (profileId: string) => {
  const token = getToken();
  return await fetch(process.env.NEXT_PUBLIC_API_URL + "/matches/profile?profileId=" + profileId, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });
};
const MatchService = { match, getMatchesByProfile };
export default MatchService;
