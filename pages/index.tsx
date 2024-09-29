import type { NextPage } from "next";
import Head from "next/head";
import Image from "next/image";
import styles from "../styles/Home.module.css";
import { Barlow } from "next/font/google";
import { RiArrowDropRightLine } from "react-icons/ri";
import Link from "next/link";

const Home: NextPage = () => {
  return (
    <div className="">
      <Head>
        <title>Elige tu nuevo coche | Revel Demo</title>
        <meta name="description" content="Revel Demo" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={" h-screen w-screen bg-[#3A5C78]"}>
        <section className=" max-w-7xl mx-auto w-full flex flex-col items-center space-y-4">
          <h1 className="text-white text-[28px] font-semibold">
            El nuevo renting para particulares
          </h1>
          <div className="flex flex-col items-center">
            <p className="text-[16px] text-white">Contratalo 100% online.</p>
            <p className="text-[16px] text-white">
              Te lo entregamos a domicilio gratis.
            </p>
            <p className="text-[16px] text-white">
              Compensamos el CO₂ de tu coche.
            </p>
            <p className="text-[16px] text-white">
              Todo incluido en una cuota mensual.
            </p>
          </div>
          <div>
            <Link
              href={"/coches"}
              className="bg-button rounded-md px-4 py-3 flex items-end"
            >
              <p className="text-black font-semibold">Encuentra tu coche</p>
              <RiArrowDropRightLine className="mb-[1px]" />
            </Link>
          </div>
        </section>
      </main>

      <footer className={styles.footer}>
        <a
          href="https://vercel.com?utm_source=create-next-app&utm_medium=default-template&utm_campaign=create-next-app"
          target="_blank"
          rel="noopener noreferrer"
        >
          Powered by{" "}
          <span className={styles.logo}>
            <Image src="/vercel.svg" alt="Vercel Logo" width={72} height={16} />
          </span>
        </a>
      </footer>
    </div>
  );
};

export default Home;
