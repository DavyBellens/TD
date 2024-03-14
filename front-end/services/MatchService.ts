import { getToken } from "@/util/token";

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
const MatchService = { getMatchesByProfile };
export default MatchService;
