import { getToken } from "@/util/token";

const baseUrl = process.env.NEXT_PUBLIC_API_URL + "/swipes";

const swipe = async (swipeeId: number, direction: string): Promise<any> => {
  const token = getToken();
  const result = await fetch(`${baseUrl}`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({
      swipeeId,
      direction,
    }),
  });
  const response = await result.json();
  return response;
};

export default { swipe };
