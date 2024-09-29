import { NextApiRequest, NextApiResponse } from "next";
import { cars } from "../../../data";
import { CarSchema } from "../../../schema";

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<CarSchema>
) {
  const { id } = req.query;
  const car = cars.find((car) => car.id === Number(id));
  if (!car) {
    return res.status(404);
  }
  res.status(200).json(car);
}
