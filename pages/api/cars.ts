import { NextApiRequest, NextApiResponse } from "next";
import { NextResponse } from "next/server";
import { CarSchema } from "../../schema";
import { cars } from "../../data";

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<CarSchema[]>
) {
  const { price, fuelType, carType, permanency, gearType, make } = req.query;
  let filterCars = [...cars];
  if (fuelType) {
    const fuelArray = Array.isArray(fuelType)
      ? fuelType
      : fuelType.split(",").map((m) => m.trim());
    filterCars = filterCars.filter((car) => fuelArray.includes(car.fuelType));
  }
  if (carType) {
    const carTypeArray = Array.isArray(carType)
      ? carType
      : carType.split(",").map((m) => m.trim());
    filterCars = filterCars.filter((car) => carTypeArray.includes(car.carType));
  }
  if (permanency) {
    const permanencyArray = Array.isArray(permanency)
      ? permanency
      : permanency.split(",").map((m) => m.trim());
    filterCars = filterCars.filter((car) =>
      permanencyArray.includes(car.permanency)
    );
  }
  if (gearType) {
    const gearTypeArray = Array.isArray(gearType)
      ? gearType
      : gearType.split(",").map((m) => m.trim());
    filterCars = filterCars.filter((car) =>
      gearTypeArray.includes(car.gearType)
    );
    // const gearTypeArray = Array.isArray(gearType) ? gearType : [gearType];

    // filterCars = filterCars.filter((car) =>
    //   gearTypeArray.includes(car.gearType)
    // );
  }
  if (make) {
    const makeArray = Array.isArray(make)
      ? make
      : make.split(",").map((m) => m.trim());
    filterCars = filterCars.filter((car) => makeArray.includes(car.make));
  }

  if (price === "asc") {
    filterCars = filterCars.sort((a, b) => a.currentPrice - b.currentPrice);
  } else if (price === "desc") {
    filterCars = filterCars.sort((a, b) => b.currentPrice - a.currentPrice);
  }
  res.status(200).json(filterCars);
}
