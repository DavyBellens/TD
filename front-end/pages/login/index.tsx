import Footer from "@/components/Footer";
import Login from "@/components/Login";
import Head from "next/head";
import { useEffect, useState } from "react";

const LoginPage: React.FC = () => {
  const [user, setUser] = useState<string | null>(null);
  useEffect(() => {
    setUser(sessionStorage.getItem("loggedInUser"));
  }, [user]);

  return (
    <>
      <Head>
        <title>Login</title>
      </Head>
      <main className="flex flex-row align-middle items-center justify-center">
        <Login />
      </main>
      <Footer />
    </>
  );
};

export default LoginPage;
