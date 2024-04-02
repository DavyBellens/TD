import Footer from "@/components/Footer";
import b from "@/public/images/BioMedica_logo.png";
import p from "@/public/images/primus-logo.jpg";
import wd from "@/public/images/We're Different Agency LOGO (Wit-Blauw).png";
import td from "@/public/images/td_logo.png";
import Head from "next/head";
import Image from "next/image";

const Welcome: React.FC = () => {
  return (
    <div className="app">
      <Head>
        <title>Welcome!</title>
        <meta name="viewport" content="width=device-with, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main>
        <div className="flex flex-col justify-center align-middle text-center">
          <p className="mt-20 text-4xl font-bold">Welcome to</p>
          <Image src={td} alt="Logo Tinder TD" width={250} height={50} className="m-auto mt-10 mb-10" />
          <a
            href="/login"
            className="bg-white bg-opacity-50 m-auto p-2 rounded-xl font-bold text-3xl text-center w-max"
          >
            Continue
          </a>
          <p className="mt-10 mb-10 text-2xl font-semibold">Made possible by</p>
          <div className="grid grid-cols-2 grid-rows-2 justify-center">
            <Image src={b} alt="Logo Biomedica" width={150} height={100} className="m-auto mb-10" />
            <Image src={p} alt="Logo Primus Scaldiae" width={200} height={200} className="mt-5" />
            <Image
              src={wd}
              alt="Logo We're Different Agency"
              width={175}
              height={100}
              className="m-auto mt-0 col-span-2"
            />
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Welcome;
