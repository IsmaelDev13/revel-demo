import { Barlow } from "next/font/google";
import { PiSlidersHorizontalThin } from "react-icons/pi";
import { IoMdArrowDropdown } from "react-icons/io";
import CarCard from "../../components/cards/CarCard";
import { GetServerSideProps, InferGetServerSidePropsType } from "next";
import { CarSchema } from "../../schema";
import Filters from "../../components/Filters";
import { useState } from "react";
import Drawer from "../../components/Drawer";

export const getServerSideProps = (async ({ query }) => {
  const sort = query.price || "";
  console.log("query", query);
  const params = new URLSearchParams();

  if (query.price) {
    params.append("price", query.price.toString());
  }

  if (query.make) {
    if (Array.isArray(query.make)) {
      params.append("make", query.make.join(","));
    } else {
      params.append("make", query.make);
    }
  }
  if (query.carType) {
    if (Array.isArray(query.carType)) {
      params.append("carType", query.carType.join(","));
    } else {
      params.append("carType", query.carType);
    }
  }
  if (query.gearType) {
    if (Array.isArray(query.gearType)) {
      params.append("gearType", query.gearType.join(","));
    } else {
      params.append("gearType", query.gearType);
    }
  }
  if (query.permanency) {
    if (Array.isArray(query.permanency)) {
      params.append("permanency", query.permanency.join(","));
    } else {
      params.append("permanency", query.permanency);
    }
  }
  if (query.fuelType) {
    if (Array.isArray(query.fuelType)) {
      params.append("fuelType", query.fuelType.join(","));
    } else {
      params.append("fuelType", query.fuelType);
    }
  }

  const apiUrl = `${
    process.env.NEXT_PUBLIC_API_URL
  }/api/cars?${params.toString()}`;
  const res = await fetch(apiUrl);
  // const res = await fetch(`http://localhost:3000/api/cars?price=${sort}`);
  const cars: CarSchema[] = await res.json();
  return { props: { cars } };
}) satisfies GetServerSideProps<{
  cars: CarSchema[];
}>;

const Coches = ({
  cars,
}: InferGetServerSidePropsType<typeof getServerSideProps>) => {
  const [showOffers, setShowOffers] = useState(false);
  const [openDrawer, setOpenDrawer] = useState(false);
  return (
    <main className="h-screen w-screen">
      <section className="max-w-[584px] lg:max-w-7xl  lg:px-20 mx-auto px-4">
        <p className="text-[32px] lg:text-5xl font-semibold mb-[12px]">
          El nuevo renting para particulares
        </p>
        <p className="text-[16px] text-[#666]">
          En REVEL hemos creado el renting pensado para ti. Escoge entre 12 o 36
          meses de permanencia. Contrátalo 100% online y en pocos minutos. Te
          entregamos el coche en casa, gratis.
        </p>
      </section>
      <Filters
        setOpenDrawer={setOpenDrawer}
        setShowOffers={setShowOffers}
        showOffers={showOffers}
      />
      <section className="max-w-[584px] lg:max-w-7xl mx-auto px-4 lg:px-20 grid sm:grid-cols-2 lg:grid-cols-3  gap-[16px]">
        {cars
          .filter((car) => (showOffers ? car.isOffer : true))
          .map((car) => (
            <CarCard key={car.id} car={car} />
          ))}
      </section>
      <Drawer setOpen={setOpenDrawer} open={openDrawer} />
    </main>
  );
};

export default Coches;
