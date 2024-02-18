import AuthError from "@/components/authorization/AuthError";
import Footer from "@/components/Footer";
import Header from "@/components/header/Header";
import MatchProfile from "@/components/profiles/MatchProfile";
import ProfileService from "@/services/ProfileService";
import { BackendProfile, Profile } from "@/types";
import Head from "next/head";
import React, { useEffect, useState } from "react";
import useSWR from "swr";

const Home: React.FC = () => {
  const [profile, setProfile] = useState<BackendProfile | undefined>();
  const [possibleMatches, setPossibleMatches] = useState<BackendProfile[]>();
  const [images, setImages] = useState<any[]>([]);
  const getUser = async () => {
    if (!profile) {
      const user = sessionStorage.getItem("loggedInUser");

      if (user) {
        const p = JSON.parse(user);
        if (p) {
          const response = await ProfileService.getProfileById(p.id);
          const profile = response.profile;
          if (profile) {
            setProfile(profile);
          }
        }
      }
    }
  };

  const likeProfile = async (profile: BackendProfile) => {
    console.log(profile);

    // await ProfileService.getProfileById(id);
  };

  const getPictures = async (profile: BackendProfile) => {
    if (profile.pictures.length > 0) {
      const pictures = await Promise.all(
        profile.pictures.map(async (p) => await import("../../back-end/uploads/" + p))
      );
      if (pictures) {
        setImages(pictures);
      }
    }
  };
  useEffect(() => {
    getUser();

    const getPossibleMatches = async () => {
      if (profile) {
        const matches = await ProfileService.getAllPossibleMatches(profile.preference);
        if (matches) {
          setPossibleMatches(matches.profiles);
          matches.profiles.forEach(async (p: BackendProfile) => await getPictures(p));
        }
      }
    };
    getPossibleMatches();
  }, [profile]);

  return (
    <div className="app">
      <Head>
        <title>Home</title>
        <meta name="viewport" content="width=device-with, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className="flex flex-col items-center">
        {profile ? (
          <>
            <Header isLoggedIn={true} gender={profile.gender} preference={profile.preference} />
            {profile.pictures.length > 0 && possibleMatches ? (
              <ul className="flex w-full items-center ">
                {possibleMatches.length > 0 ? (
                  <li className="flex flex-col items-center">
                    <MatchProfile profile={possibleMatches[0]} images={images} />
                    <div className="flex ">
                      <button
                        className="m-5 p-2 bg-green-600 text-white "
                        onClick={() => likeProfile(possibleMatches[0])}
                      >
                        Smash
                      </button>
                      <button
                        className="m-5 p-2 bg-red-600 text-white "
                        onClick={() =>
                          setPossibleMatches(possibleMatches.filter((p) => p.email != possibleMatches[0].email))
                        }
                      >
                        Pass
                      </button>
                    </div>
                  </li>
                ) : (
                  <p className="m-5 p-5 text-center">Well it looks like you swiped 'em all...</p>
                )}
              </ul>
            ) : (
              <>
                <p className="p-5 text-center">Before you start, we gotta upload some pictures first</p>
                <a
                  href={profile.id && "/profiles/" + profile.id + "/addPictures"}
                  className="bg-white bg-opacity-50 mt-10 p-2 rounded-xl font-bold"
                >
                  Start
                </a>
              </>
            )}
          </>
        ) : (
          <>
            <Header isLoggedIn={false} />
            <AuthError />
          </>
        )}
        <Footer />
      </main>
    </div>
  );
};

export default Home;
