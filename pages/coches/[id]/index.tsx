import {
  GetServerSideProps,
  GetServerSidePropsContext,
  InferGetServerSidePropsType,
} from "next";
import { CarSchema } from "../../../schema";
import { RiArrowDropRightLine } from "react-icons/ri";
import Image from "next/image";
import Link from "next/link";

export const getServerSideProps = (async (
  context: GetServerSidePropsContext
) => {
  console.log(context);
  const { id } = context.params!;
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/cars/${id}`);
  const car: CarSchema = await res.json();
  if (!car) {
    return { notFound: true };
  }
  return { props: { car } };
}) satisfies GetServerSideProps<{
  car: CarSchema;
}>;

const SingleCar = ({
  car,
}: InferGetServerSidePropsType<typeof getServerSideProps>) => {
  return (
    <div className="h-screen w-screen">
      <section className="max-w-4xl mx-auto py-2 px-10">
        <div className="flex items-end">
          <p className="text-[12px] text-[#aaa]">Inicio</p>
          <RiArrowDropRightLine className="mb-[1px] text-[#aaa]" />
          <Link href={"/coches"}>
            <p className="text-[12px] text-[#aaa]">Coches</p>
          </Link>
          <RiArrowDropRightLine className="mb-[1px] text-[#aaa]" />
          <p className="text-[12px] text-[#aaa]">
            {car.make} {car.model}
          </p>
        </div>
        <div>
          <p className="text-[12px] text-[#666]">
            Entrega estimada {car.minEstDelivery / 7}-{car.maxEstDelivery / 7}{" "}
            semanas
          </p>
        </div>
        <h1 className="text-[44px] font-semibold">
          {car.make} {car.model}
        </h1>
        <p className="text-[#666] text-[16px] mb-1">{car.type}</p>
        {car.isOffer && (
          <div className="bg-blueTag w-fit px-1 h-[24px] py-1 flex items-center justify-start gap-tiny rounded-modular">
            <p className="text-white uppercase font-semibold text-[12px]">
              🤪 Ofertas Locas🤪
            </p>
          </div>
        )}
        <div className="w-full mx-auto flex flex-col items-center justify-center ">
          <Image
            alt={`${car.id}-${car.make}-${car.model}`}
            width={300}
            height={300}
            src={`${car.carImage}`}
          />
          <div className="flex mb-[2.5rem] flex-wrap justify-center items-center space-x-2">
            {car.isNew && (
              <div className="border-[#eee] border py-[0.2rem] rounded-[26px] px-[0.5rem] w-fit">
                <p className="text-[12px]">A estrenar</p>
              </div>
            )}
            <div className="bg-[#eee]  rounded-[26px] py-[0.2rem] px-[0.5rem] w-fit">
              <p className="text-[12px]">{car.fuelType}</p>
            </div>
            <div className="bg-[#eee]  rounded-[26px] py-[0.2rem] px-[0.5rem] w-fit">
              <p className="text-[12px]">{car.gearType}</p>
            </div>
            <div className="bg-[#eee]  rounded-[26px] py-[0.2rem] px-[0.5rem] w-fit">
              <p className="text-[12px]">{car.horsePower} CV</p>
            </div>
          </div>
        </div>
        <div className="">
          <h2 className="font-semibold text-[22px]">
            Elige la permanencia de tu renting
          </h2>
          <div className="flex items-center justify-between">
            <p className="text-[#aaa] text-[12px]">(Precios con IVA inc.)</p>
            <p className="text-[#666] text-[12px] cursor-pointer underline hover:no-underline transition-all ease-in duration-200 underline-offset-4">
              Saber mas
            </p>
          </div>
          <div className="grid grid-cols-2 mb-[40px] gap-[16px] mt-[16px]">
            <div className="border min-h-[72px] rounded-tiny border-[#eee] px-[16px] py-[8px]">
              <div className="flex flex-col items-center">
                <p className="font-medium">
                  {Number(car.permanency) / 3} meses
                </p>
                <div className="flex items-end space-x-1">
                  <p className="font-semibold line-through text-[12px]">
                    {Math.round(car.lastPrice * 1.18)}€
                  </p>
                  <div className="flex items-end">
                    <p className="text-blueSale font-semibold">
                      {Math.round(car.currentPrice * 1.18)}€
                    </p>
                    <p className="text-[12px] mb-[1px] text-[#666]">/mes</p>
                  </div>
                </div>
              </div>
            </div>
            <div className="border min-h-[72px] rounded-tiny border-[#eee] px-[16px] py-[8px]">
              <div className="flex flex-col items-center">
                <p className="font-medium">
                  {Number(car.permanency) / 3} meses
                </p>
                <div className="flex items-end space-x-1">
                  <p className="font-semibold line-through text-[12px]">
                    {Math.round(car.lastPrice)}€
                  </p>
                  <div className="flex items-end">
                    <p className="text-blueSale font-semibold">
                      {car.currentPrice}€
                    </p>
                    <p className="text-[12px] text-[#666] mb-[1px]">/mes</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="">
            <h2 className="font-semibold text-[22px]">Seleccionar el color</h2>
            <div className="flex items-center justify-between">
              <p className="">{car.color}</p>
              <p className="text-[#666] text-[12px] cursor-pointer underline hover:no-underline transition-all ease-in duration-200 underline-offset-4">
                Saber mas
              </p>
            </div>
            <div className="grid grid-cols-2 mb-[40px] gap-[16px] mt-[16px]">
              <div className="border min-h-[72px] rounded-tiny border-[#eee] px-[16px] py-[8px]">
                <div className="flex flex-col items-center">
                  <div className="bg-g"></div>
                </div>
              </div>
            </div>
          </div>
        </div>
        {/* descripcion */}
        <div>
          <div className="flex items-center justify-between">
            <h2 className="text-[22px]">Aqui tienes tu REVEL</h2>
            {car.isNew && (
              <div className="border-[#eee] flex border bg-white px-[8px] py-[4px] rounded-[26px]">
                <p className="text-[12px]">A estrenar</p>
              </div>
            )}
          </div>
          <div className="flex items-center justify-between border-b border-[#eee] pt-4 pb-1">
            <p className="text-[#323236] text-[16px]">Permanencia</p>
            <p className="text-[#323236] text-[16px]">{car.permanency} meses</p>
          </div>
          <div className="flex items-center justify-between border-b border-[#eee] pt-4 pb-1">
            <p className="text-[#323236] text-[16px]">Color</p>
            <p className="text-[#323236] text-[16px]">{car.color}</p>
          </div>
          <div className="flex items-center justify-between border-b border-[#eee] pt-4 pb-1">
            <p className="text-[#323236] text-[16px]">
              Kilometraje anual incluido
            </p>
            <p className="text-[#323236] text-[16px]">{car.kilometraje} km</p>
          </div>
          <div className="flex items-center justify-between border-b border-[#eee] pt-4 pb-1">
            <p className="text-[#323236] text-[16px]">Entrega a domicilio</p>
            <p className="text-[#323236] text-[16px]">
              {car.minEstDelivery / 7}-{car.maxEstDelivery / 7} semanas
            </p>
          </div>
        </div>
        <div className=" mt-4 flex items-center justify-between min-h-[56px] mb-10">
          <div>
            <h2 className="text-[22px]">
              {car.make} {car.model}
            </h2>
            <p className="text-[12px]">
              {car.year} - <span className="text-[#666]">{car.type}</span>
            </p>
          </div>
          <div className="flex flex-col items-end">
            <div className="flex items-end">
              <p className="text-[22px] text-blueTag  font-semibold">
                {car.currentPrice}€{" "}
              </p>
              <p className="text-[12px] text-[#666] mb-[3px]">/mes</p>
              <p className="text-[#aaa] text-[12px] mb-[3px] ml-[2px]">
                (IVA inc.)
              </p>
            </div>
            <p className="text-[12px]">
              <span className="text-[#666]">Antes</span>
              <span className="font-semibold line-through ml-[2px] text-[12px]">
                {car.lastPrice}€
              </span>
            </p>
          </div>
        </div>
        <div className="bg-button hover:bg-button/40 transition duration-200 ease-in cursor-pointer flex items-end px-[12px] py-[16px] justify-center">
          <p className="font-semibold">Siguiente</p>
          <RiArrowDropRightLine className="mb-[1px] " />
        </div>
      </section>
    </div>
  );
};

export default SingleCar;
