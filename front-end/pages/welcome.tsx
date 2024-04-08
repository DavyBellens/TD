import Footer from "@/components/Footer";
import b from "@/public/images/BioMedica_logo.png";
import wd from "@/public/images/We're Different Agency LOGO (Wit-Blauw).png";
import p from "@/public/images/primus-logo.jpg";
import td from "@/public/images/td_logo.png";
import Head from "next/head";

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
            {/* <Image src={td} alt="Logo Tinder TD" width={0} height={0} priority /> */}
            {/* replace above with img element */}
            <img src={td.src} alt="Logo Tinder TD" className="m-auto" />
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
              {/* <Image src={b} alt="Logo Biomedica" width={0} height={0} /> */}
              {/* as img */}
              <img src={b.src} alt="Logo Biomedica" className="m-auto" />
            </div>
            <div className="m-auto mt-5 primus logo">
              {/* <Image src={p} alt="Logo Primus Scaldiae" width={0} height={0} /> */}
              {/* as img */}
              <img src={p.src} alt="Logo Primus Scaldiae" className="m-auto" />
            </div>
            <div className="m-auto mt-0 col-span-2 wdagency logo">
              {/* <Image src={wd} alt="Logo We're Different Agency" width={0} height={0} /> */}
              {/* as img */}
              <img src={wd.src} alt="Logo We're Different Agency" className="m-auto" />
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Welcome;
