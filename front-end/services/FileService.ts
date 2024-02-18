import { getToken } from "@/util/token";

const baseUrl = process.env.NEXT_PUBLIC_API_URL + "/files";

const getFile = async (fileName: string) => {
  try {
    const token = getToken();
    const res = await fetch(`${baseUrl}/${fileName}`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return res.blob();
  } catch (error) {}
};

const uploadFile = async (file: FormData) => {
  const token = getToken();
  const response = await fetch(process.env.NEXT_PUBLIC_API_URL + "/files", {
    method: "POST",
    body: file,
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return response;
};

const deleteFile = async (filename: string) => {
  const token = getToken();
  const response = await fetch(process.env.NEXT_PUBLIC_API_URL + "/files/" + filename, {
    method: "DELETE",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return response;
};

const FileService = {
  getFile,
  uploadFile,
  deleteFile,
};

export default FileService;
