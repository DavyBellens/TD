import Footer from "@/components/Footer";
import Login from "@/components/authorization/Login";
import Logout from "@/components/authorization/Logout";
import Header from "@/components/header/Header";
import FileService from "@/services/FileService";
import ProfileService from "@/services/ProfileService";
import Head from "next/head";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

const LoginPage: React.FC = () => {
  const [user, setUser] = useState<string | null>(null);

  useEffect(() => {
    const user = sessionStorage.getItem("loggedInUser");
    if (user) {
      sessionStorage.removeItem("loggedInUser");
      sessionStorage.removeItem("token");
      setUser(null);
    }
  }, []);

  return (
    <div className="app">
      <Head>
        <title>Login</title>
      </Head>
      <main className="flex flex-row align-middle items-center justify-center">{!user && <Login />}</main>
      <Footer />
    </div>
  );
};

export default LoginPage;
