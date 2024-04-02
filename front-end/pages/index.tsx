import AuthError from "@/components/authorization/AuthError";
import Footer from "@/components/Footer";
import Header from "@/components/header/Header";
import MatchProfile from "@/components/profiles/MatchProfile";
import FileService from "@/services/FileService";
import MatchService from "@/services/MatchService";
import ProfileService from "@/services/ProfileService";
import SwipeService from "@/services/SwipeService";
import { BackendProfile } from "@/types";
import Head from "next/head";
import React, { useEffect, useState } from "react";

const Home: React.FC = () => {
  const [profile, setProfile] = useState<BackendProfile | undefined>();
  const [possibleMatches, setPossibleMatches] = useState<BackendProfile[]>();
  const [match, setMatch] = useState<BackendProfile | null>(null);
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

  const unlikeProfile = async (matchProfile: BackendProfile) => {
    if (profile) {
      await SwipeService.swipe(matchProfile.id as unknown as number, "L");
      if (possibleMatches) {
        setPossibleMatches(possibleMatches.filter((p) => p.email != possibleMatches[0].email));
      }
    }
  };

  const likeProfile = async (matchProfile: BackendProfile) => {
    if (profile) {
      const swipe = await SwipeService.swipe(matchProfile.id as unknown as number, "R");
      if (swipe.message === "match") setMatch(matchProfile);
      if (possibleMatches) {
        setPossibleMatches(possibleMatches.filter((p) => p.email != possibleMatches[0].email));
      }
    }
  };

  const getPossibleMatches = async () => {
    if (profile) {
      const matches = await ProfileService.getAllPossibleMatches(profile.preference);
      if (matches) {
        setPossibleMatches(matches.profiles);
      }
    }
  };
  useEffect(() => {
    getUser();
    getPossibleMatches();
  }, [profile]);
  const btnStyle = "bg-red-500 w-full m-1 text-white text-center rounded-lg";
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
              <>
                {match ? (
                  <div className="flex mt-24 ">
                    <div className="bg-white text-black rounded-xl p-3 ">
                      <div className="h-10 p-3 animate-bounce text-center">It's a match! ❤️</div>
                      <div className="flex flex-col justify-center">
                        <a className={btnStyle} href="/matches">
                          Check it out
                        </a>
                        <button className={btnStyle} onClick={() => setMatch(null)}>
                          Continue swiping
                        </button>
                      </div>
                    </div>
                    <span className="relative flex h-3 w-3">
                      <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-sky-400 opacity-75"></span>
                      <span className="relative inline-flex rounded-full h-3 w-3 bg-sky-500"></span>
                    </span>
                  </div>
                ) : (
                  <ul className="flex w-full items-center mt-10 mb-10 justify-center">
                    <p>Coming soon...</p>
                    {/* {possibleMatches.length > 0 ? (
                      <li className="flex flex-col items-center justify-evenly">
                        <MatchProfile profile={possibleMatches[0]} />
                        <div className="flex ">
                          <button
                            className="m-5 p-2 bg-red-600 text-white text-xl w-auto"
                            onClick={() => unlikeProfile(possibleMatches[0])}
                          >
                            Pass
                          </button>
                          <button
                            className="m-5 p-2 bg-green-600 text-white text-xl w-auto"
                            onClick={() => likeProfile(possibleMatches[0])}
                          >
                            Smash
                          </button>
                        </div>
                      </li>
                    ) : (
                      <p className="m-5 p-5 text-center">Well it looks like you swiped 'em all...</p>
                    )} */}
                  </ul>
                )}
              </>
            ) : (
              <>
                <p className="p-5 text-center">Before you start, we gotta upload some pictures first</p>
                <a
                  href={profile.id && "/matches/" + profile.id + "/addPictures"}
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
