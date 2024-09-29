import type { NextPage } from "next";
import Head from "next/head";
import Image from "next/image";
import styles from "../styles/Home.module.css";
import { Barlow } from "next/font/google";
import { RiArrowDropRightLine } from "react-icons/ri";
import Link from "next/link";
import { useEffect } from "react";
import { useRouter } from "next/router";

const Home: NextPage = () => {
  const router = useRouter();
  useEffect(() => {
    setTimeout(() => {
      router.replace("/coches");
    }, 2000);
  }, []);
  return (
    <div className="">
      <Head>
        <title>Elige tu nuevo coche | Revel Demo</title>
        <meta name="description" content="Revel Demo" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={` h-screen w-screen relative`}>
        <div
          className={`bg-[url("https://driverevel.com/images/files/home-hero/imagen-hero-home-MOB_2x.webp")] h-full w-full z-0 absolute top-0 right-0 left-0  bg-no-repeat bg-cover bg-center`}
        />
        <section className=" max-w-7xl mx-auto w-full flex flex-col items-center justify-center left-0 right-0 space-y-4 h-full z-10 absolute top-10">
          <div className="flex flex-col items-center">
            <h1 className="text-white text-[28px] font-semibold text-center ">
              El nuevo renting para particulares
            </h1>
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
        <div className="flex items-center space-x-1">
          <p>Developed by</p>{" "}
          <a
            href="https://www.linkedin.com/in/ismael-diazb/"
            target="_blank"
            rel="noopener noreferrer"
          >
            {" "}
            Ismael
          </a>{" "}
          <a
            href="https://github.com/ismaeldev13"
            target="_blank"
            rel="noopener noreferrer"
          >
            <Image
              src="/github-mark.png"
              alt="Github Logo"
              width={20}
              height={20}
            />
          </a>
        </div>
      </footer>
    </div>
  );
};

export default Home;
