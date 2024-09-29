import Image from "next/image";
import Link from "next/link";
import { CarSchema } from "../../schema";

interface Props {
  car: CarSchema;
}
const CarCard = ({ car }: Props) => {
  return (
    <Link
      href={`/coches/${car.id}`}
      className="border group hover:shadow-lg ease-in duration-200 rounded-tiny border-[#eee] cursor-pointer bg-[#fafafa]"
    >
      <div className="pl-[16px] pt-[16px] min-h-[68px]">
        <p className="text-[#666] text-[12px] mb-[0.5rem]">
          Entrega estimada en {car.minEstDelivery / 7}-{car.maxEstDelivery / 7}{" "}
          semanas
        </p>
        {car.isOffer && (
          <div className="bg-blueTag w-fit px-1 h-[24px] py-1 flex items-center justify-start gap-tiny rounded-modular">
            <p className="text-white uppercase text-[12px]">
              🤪 Ofertas Locas🤪
            </p>
          </div>
        )}
      </div>
      <div className="relative">
        <Image
          alt={`${car.id}-${car.model}`}
          className="group-hover:-translate-y-2 transition duration-150 ease-in"
          src={car.carImage}
          height={400}
          width={400}
        />
        {car.isNew && (
          <div className="border-[#eee] flex border bg-white px-[8px] py-[4px] absolute bottom-4 left-4 rounded-[26px]">
            <p className="text-[12px]">Nuevo a estrenar</p>
          </div>
        )}
      </div>
      <div className="flex items-center justify-between mb-[16px] mx-[16px]">
        <div>
          <p className="text-[22px] mb-[4px]">
            {car.make} {car.model}
          </p>
          <p className="text-[12px] text-[#666]">Play</p>
        </div>
        <div>
          <div className="flex items-end">
            <p className="text-blueSale font-semibold">{car.currentPrice}€</p>
            <p className="text-[12px]">/mes</p>
          </div>
          {car.currentPrice !== car.lastPrice && (
            <div className="flex items-center space-x-1">
              <p className="text-[12px] text-[#666]">Antes</p>
              <p className="font-semibold line-through text-[12px]">
                {car.lastPrice}€
              </p>
            </div>
          )}
        </div>
      </div>
      <div className="h-[48px] flex items-center justify-between border-t border-t-[#eee]">
        <p className="w-[calc(100%/3)] text-[12px] text-center text-[#666]">
          {car.fuelType}
        </p>
        <p className="w-[calc(100%/3)] text-center text-[#666] text-[12px] ">
          {car.carType}
        </p>
        <p className="w-[calc(100%/3)] text-center text-[#666] text-[12px] ">
          {car.gearType}
        </p>
      </div>
    </Link>
  );
};

export default CarCard;
