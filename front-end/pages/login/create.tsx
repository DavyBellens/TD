import Footer from "@/components/Footer";
import ProfileCreateForm from "@/components/profiles/ProfileCreateForm";
import Head from "next/head";
import { useEffect, useState } from "react";

const CreatePage: React.FC = () => {
  const [user, setUser] = useState<string | null>(null);
  useEffect(() => {
    setUser(sessionStorage.getItem("loggedInUser"));
  }, [user]);

  return (
    <div className="app">
      <Head>
        <title>Login</title>
      </Head>
      <main className="flex flex-row align-middle items-center justify-center">
        <div className="flex flex-col justify-center">
          <section className="w-min">
            <ProfileCreateForm />
          </section>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default CreatePage;
