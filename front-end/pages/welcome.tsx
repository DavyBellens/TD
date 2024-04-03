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
          <p className="mt-20 text-4xl font-bold w-auto h-auto">Welcome to</p>
          <div className="m-auto mt-10 mb-10 tinderTD logo">
            <Image src={td} alt="Logo Tinder TD" width={0} height={0} priority />
          </div>
          <a
            href="/login"
            className="bg-white bg-opacity-50 m-auto p-2 rounded-xl font-bold text-3xl text-center w-max"
          >
            Continue
          </a>
          <p className="mt-10 mb-10 text-2xl font-semibold">Made possible by</p>
          <div className="grid grid-cols-2 grid-rows-2 justify-center">
            <div className="m-auto mb-10 biomedica logo">
              <Image src={b} alt="Logo Biomedica" width={0} height={0} />
            </div>
            <div className="m-auto mt-5 primus logo">
              <Image src={p} alt="Logo Primus Scaldiae" width={0} height={0} />
            </div>
            <div className="m-auto mt-0 col-span-2 wdagency logo">
              <Image src={wd} alt="Logo We're Different Agency" width={0} height={0} />
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Welcome;
