import Footer from "@/components/Footer";
import Login from "@/components/Login";
import Logout from "@/components/Logout";
import Header from "@/components/header/Header";
import { useTranslation } from "next-i18next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import Head from "next/head";
import { useEffect, useState } from "react";

const LoginPage: React.FC = () => {
  const [user, setUser] = useState<string | null>(null);
  const { t } = useTranslation();
  useEffect(() => {
    setUser(sessionStorage.getItem("loggedInUser"));
  }, [user]);

  return (
    <>
      <Head>
        <title>{user ? t("header.nav.logout") : t("header.nav.login")}</title>
      </Head>
      {user ? <Header current="login" isLoggedIn /> : <Header current="login" />}
      <main className="flex flex-row align-middle items-center justify-center">
        {user ? <Logout callBack={setUser} /> : <Login />}
      </main>
      <Footer />
    </>
  );
};

export const getServerSideProps = async (context: any) => {
  const { locale } = context;
  return {
    props: {
      ...(await serverSideTranslations(locale ?? "en", ["common"])),
    },
  };
};

export default LoginPage;
