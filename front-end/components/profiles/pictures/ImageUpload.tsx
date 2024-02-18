import FileService from "@/services/FileService";
import { getToken } from "@/util/token";
import { useRouter } from "next/router";
import { useState } from "react";

type Props = {
  callBack: Function;
};

const ImageUpload: React.FC<Props> = ({ callBack }: Props) => {
  const [image, setImage] = useState<any>(null);
  const [imageError, setImageError] = useState<string>("");
  const [file, setFile] = useState<any>(null);
  const [filename, setFilename] = useState<string>("");
  const [fileUploaded, setFileUploaded] = useState<boolean>(false);
  const uploaded = "bg-lime-500 bg-opacity-80";
  const notUploaded = "bg-white bg-opacity-40";
  const router = useRouter();

  const uploadPicture = async () => {
    if (!fileUploaded) {
      try {
        const formData = new FormData();
        formData.append("file", file);
        const response = await FileService.uploadFile(formData);
        if (response.ok) {
          const result = await response.json();
          setFileUploaded(true);
          setFilename(result.file.filename);
          callBack(result.file.filename);
        }
      } catch (error) {
        console.log(error);
      }
    }
  };

  const handleImageChange = async (e: any) => {
    setFileUploaded(false);
    const file = e.target.files[0];
    if (file) {
      if (["image/jpeg", "image/jpg", "image/png"].includes(file.type)) {
        const reader = new FileReader();
        reader.onload = () => {
          setImage(reader.result);
        };
        setFile(file);
        reader.readAsDataURL(file);
      } else {
        setImageError("Image must be of type JPEG, JPG or PNG");
      }
    } else {
      setImage(null);
    }
  };
  return (
    <>
      <div className="text-center flex flex-col items-center">
        <input
          type="file"
          id="imageInput"
          accept={".jpg, .jpeg, .png"}
          className="hidden"
          onChange={handleImageChange}
        />
        <label htmlFor="imageInput">
          {image ? (
            <img src={image} alt="Uploaded Image" className="w-32 h-full rounded-lg" />
          ) : (
            <div className="w-32 h-full rounded-lg border-2 border-gray-300 flex items-center justify-center m-5">
              <span className="text-gray-500">Click to add picture</span>
            </div>
          )}
        </label>
        <div className={"flex w-32 " + (fileUploaded ? "justify-between" : "justify-center")}>
          <button
            onClick={uploadPicture}
            className={(fileUploaded ? uploaded : notUploaded) + " text-white  rounded-lg p-1 mt-1"}
          >
            {fileUploaded ? "Uploaded succesfully" : "Upload"}
          </button>
          {fileUploaded && (
            <button
              className={" bg-red-600 mt-1 p-1 rounded-lg"}
              onClick={() => router.push(router.asPath + "/../" + filename + "/remove")}
            >
              X
            </button>
          )}
        </div>
      </div>
      {imageError && <div className="m-3">{imageError}</div>}
    </>
  );
};
export default ImageUpload;
