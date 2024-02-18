import Apologize from "@/components/Apologize";
import Footer from "@/components/Footer";
import Header from "@/components/header/Header";
import ProfileService from "@/services/ProfileService";
import Head from "next/head";
import { useRouter } from "next/router";
import { FormEvent, useEffect, useState } from "react";

const deletePage: React.FC = () => {
  const [userId, setUserId] = useState<string | null>();
  const router = useRouter();
  const id = router.query.profileId as string;
  const removeAccount = async (e: FormEvent) => {
    e.stopPropagation();
    e.preventDefault();
    if (id) {
      try {
        const res = await ProfileService.deleteProfileById(parseInt(id));
        if (res) {
          sessionStorage.removeItem("loggedInUser");
          sessionStorage.removeItem("token");
          router.push("/login");
        }
      } catch (error) {
        console.log(error);
      }
    }
  };
  useEffect(() => {
    const user = sessionStorage.getItem("loggedInUser");
    if (user) {
      const id = JSON.parse(user).id;
      if (id) setUserId(id);
    }
  }, []);
  const buttonStyle = "bg-white bg-opacity-75 rounded-lg p-3 mt-5 w-10/12 text-lg font-bold items-center";
  return (
    <div className="app">
      <Head>
        <title>Remove account</title>
      </Head>
      {userId ? (
        userId === id ? (
          <main className="flex flex-col justify-center items-center">
            <h1 className="text-3xl mt-5 font-bold text-center p-5">
              Are you really sure?
              <br />
              <small className="text-lg">(This action is irreversible)</small>
            </h1>
            <button className={buttonStyle + " text-red-700"} onClick={(e) => removeAccount(e)}>
              Yes, remove my account
            </button>
            <button className={buttonStyle + " text-black"} onClick={() => router.push("/options")}>
              Nah just checking
            </button>
          </main>
        ) : (
          <Apologize what="remove" />
        )
      ) : (
        <div className="flex flex-col items-center">
          <p className="p-5 text-center">Please login or create an account before continuing</p>
          <a href="/login" className="bg-white bg-opacity-50 mt-10 p-2 rounded-xl font-bold text-center">
            Sign in/up
          </a>
        </div>
      )}
      <Footer />
    </div>
  );
};
export default deletePage;
