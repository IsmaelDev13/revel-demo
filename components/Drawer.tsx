import {
  Dialog,
  DialogBackdrop,
  DialogPanel,
  DialogTitle,
  TransitionChild,
} from "@headlessui/react";
import React, { Dispatch, SetStateAction, useEffect, useState } from "react";
import { IoIosClose } from "react-icons/io";
import { CarSchema } from "../schema";
import { PiTrash } from "react-icons/pi";
import { useRouter } from "next/router";
interface Props {
  open: boolean;
  setOpen: Dispatch<SetStateAction<boolean>>;
}
const permanency = ["12", "36"];
const carType = ["Compacto", "Coupe", "Sedan", "SUV"];
const fuelType = [
  "Electrico",
  "Hibrido Enchufable",
  "Hibrido",
  "Diesel",
  "Gasolina",
];
const gearType = ["Manual", "Automático"];
const makeType = [
  "Toyota",
  "Opel",
  "Fiat",
  "Citroen",
  "Renault",
  "Peugeot",
  "Kia",
];
const Drawer = ({ open, setOpen }: Props) => {
  const [selectedPermanency, setSelectedPermanency] = useState<string[]>([]);
  const [selectedCarType, setSelectedCarType] = useState<string[] | any>([]);
  const [selectedFuelType, setSelectedFuelType] = useState<string[] | any>([]);
  const [selectedGearType, setSelectedGearType] = useState<string[] | any>([]);
  const [selectedMakeType, setSelectedMakeType] = useState<string[] | any>([]);
  const [carsResults, setCarsResults] = useState<CarSchema[]>([]);
  const [queryString, setQueryString] = useState("");
  const router = useRouter();
  const getCars = async () => {
    const response = await fetch(
      `http://localhost:3000/api/cars?make=${selectedMakeType}&fuelType=${selectedFuelType}&permanency=${selectedPermanency}&gearType=${selectedGearType}&carType=${selectedCarType}`
    )
      .then((res) => res.json())
      .then((data) => {
        setCarsResults(data);
      })
      .catch((err) => {
        console.log(err);
      });

    return response;
  };

  useEffect(() => {
    getCars();
    setQueryString(buildQueryString());
  }, [
    selectedMakeType,
    selectedFuelType,
    selectedPermanency,
    selectedGearType,
    selectedCarType,
  ]);

  useEffect(() => {
    console.log("queryString", queryString);
  }, [queryString]);
  const buildQueryString = () => {
    const params = new URLSearchParams();

    if (router.query.price) {
      params.append("price", router.query.price.toString());
    }

    if (selectedMakeType.length > 0) {
      params.append("make", selectedMakeType.join(","));
    }

    if (selectedCarType.length > 0) {
      params.append("carType", selectedCarType.join(","));
    }
    if (selectedGearType.length > 0) {
      params.append("gearType", selectedGearType.join(","));
    }
    if (selectedPermanency.length > 0) {
      params.append("permanency", selectedPermanency.join(","));
    }
    if (selectedFuelType.length > 0) {
      params.append("fuelType", selectedFuelType.join(","));
    }

    return params.toString() ? `?${params.toString()}` : "";
  };

  const handleClickMake = (make: string) => {
    const makeArray = Array.isArray(make) ? make : [make];

    setSelectedMakeType((prev: string[]) => {
      const newSelectedMakeType = [...prev];

      makeArray.forEach((currentMake) => {
        const index = newSelectedMakeType.indexOf(currentMake);
        if (index > -1) {
          newSelectedMakeType.splice(index, 1);
        } else {
          newSelectedMakeType.push(currentMake);
        }
      });

      return newSelectedMakeType;
    });
  };
  const handleClickPermanency = (permanency: string) => {
    const permanencyArray = Array.isArray(permanency)
      ? permanency
      : [permanency];

    setSelectedPermanency((prev: string[]) => {
      const newSelectedPermanencyType = [...prev];

      permanencyArray.forEach((currentPermanency) => {
        const index = newSelectedPermanencyType.indexOf(currentPermanency);
        if (index > -1) {
          newSelectedPermanencyType.splice(index, 1);
        } else {
          newSelectedPermanencyType.push(currentPermanency);
        }
      });

      return newSelectedPermanencyType;
    });
  };
  const handleClickFuel = (fuelType: string) => {
    const fuelTypeArray = Array.isArray(fuelType) ? fuelType : [fuelType];

    setSelectedFuelType((prev: string[]) => {
      const newSelectedFuelType = [...prev];

      fuelTypeArray.forEach((currentFuelType) => {
        const index = newSelectedFuelType.indexOf(currentFuelType);
        if (index > -1) {
          newSelectedFuelType.splice(index, 1);
        } else {
          newSelectedFuelType.push(currentFuelType);
        }
      });

      return newSelectedFuelType;
    });
  };
  const handleClickGearType = (gearType: string) => {
    const gearTypeArray = Array.isArray(gearType) ? gearType : [gearType];

    setSelectedGearType((prev: string[]) => {
      const newSelectedGearType = [...prev];

      gearTypeArray.forEach((currentGearType) => {
        const index = newSelectedGearType.indexOf(currentGearType);
        if (index > -1) {
          newSelectedGearType.splice(index, 1);
        } else {
          newSelectedGearType.push(currentGearType);
        }
      });

      return newSelectedGearType;
    });
  };
  const handleClickCarType = (carType: string) => {
    const carTypeArray = Array.isArray(carType) ? carType : [carType];

    setSelectedCarType((prev: string[]) => {
      const newSelectedCarType = [...prev];

      carTypeArray.forEach((currentCarType) => {
        const index = newSelectedCarType.indexOf(currentCarType);
        if (index > -1) {
          newSelectedCarType.splice(index, 1);
        } else {
          newSelectedCarType.push(currentCarType);
        }
      });

      return newSelectedCarType;
    });
  };

  const removeFilters = () => {
    setSelectedCarType([]);
    setSelectedFuelType([]);
    setSelectedGearType([]);
    setSelectedMakeType([]);
    setSelectedPermanency([]);
  };
  return (
    <Dialog open={open} onClose={setOpen} className="relative z-10">
      <DialogBackdrop
        transition
        className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity duration-500 ease-in-out data-[closed]:opacity-0"
      />

      <div className="fixed inset-0 overflow-hidden">
        <div className="absolute inset-0 overflow-hidden">
          <div className="pointer-events-none fixed inset-y-0 right-0 flex max-w-full pl-10">
            <DialogPanel
              transition
              className="pointer-events-auto relative w-screen max-w-md transform transition duration-500 ease-in-out data-[closed]:translate-x-full sm:duration-700"
            >
              <TransitionChild>
                <div className="absolute left-0 top-0 -ml-8 flex pr-2 pt-4 duration-500 ease-in-out data-[closed]:opacity-0 sm:-ml-10 sm:pr-4">
                  <button
                    type="button"
                    onClick={() => setOpen(false)}
                    className="relative rounded-md text-gray-300 hover:text-white focus:outline-none focus:ring-2 focus:ring-white"
                  >
                    <span className="absolute -inset-2.5" />
                    <span className="sr-only">Close panel</span>
                    <IoIosClose aria-hidden="true" className="h-6 w-6" />
                  </button>
                </div>
              </TransitionChild>
              <div className="flex h-full flex-col overflow-y-scroll bg-white py-6 shadow-xl">
                <div className="px-4 sm:px-6">
                  <DialogTitle className="text-base font-semibold leading-6 text-gray-900">
                    Filtrar
                  </DialogTitle>
                </div>
                <div className="relative pt-4 mt-4 border-t border-[#eee] pb-10 px-4 sm:px-6">
                  <p className="text-[16px] mb-[10px]">Permanencia</p>
                  <div className="flex flex-wrap items-center space-x-2 gap-tiny">
                    {permanency.map((type) => (
                      <div
                        onClick={() => handleClickPermanency(type)}
                        key={type}
                        className={`${
                          selectedPermanency.includes(type)
                            ? "border-[#666]"
                            : "border-[#eee]"
                        } border  rounded-tiny px-[12px] py-[16px] cursor-pointer hover:bg-[#eee] transition duration-200 ease-in`}
                      >
                        <p className="text-[#666]">{type} meses</p>
                      </div>
                    ))}
                  </div>
                </div>
                <div className="relative pt-4 border-t border-[#eee] pb-10 px-4 sm:px-6">
                  <p className="text-[16px] mb-[10px]">Tipo de coche</p>
                  <div className="flex flex-wrap items-center space-x-2 gap-tiny">
                    {carType.map((type) => (
                      <div
                        onClick={() => handleClickCarType(type)}
                        key={type}
                        className={`${
                          selectedCarType.includes(type)
                            ? "border-[#666]"
                            : "border-[#eee]"
                        } border  rounded-tiny px-[12px] py-[16px] cursor-pointer hover:bg-[#eee] transition duration-200 ease-in`}
                      >
                        <p className="text-[#666]">{type}</p>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="relative pt-4 border-t border-[#eee] pb-10 px-4 sm:px-6">
                  <p className="text-[16px] mb-[10px]">Combustible</p>
                  <div className="flex flex-wrap items-center space-x-2 gap-tiny">
                    {fuelType.map((type) => (
                      <div
                        onClick={() => handleClickFuel(type)}
                        key={type}
                        className={`${
                          selectedFuelType.includes(type)
                            ? "border-[#666]"
                            : "border-[#eee]"
                        } border  rounded-tiny px-[12px] py-[16px] cursor-pointer hover:bg-[#eee] transition duration-200 ease-in`}
                      >
                        <p className="text-[#666]">{type}</p>
                      </div>
                    ))}
                  </div>
                </div>
                <div className="relative pt-4 border-t border-[#eee] pb-10 px-4 sm:px-6">
                  <p className="text-[16px] mb-[10px]">Cambio</p>
                  <div className="flex flex-wrap items-center space-x-2 gap-tiny">
                    {gearType.map((type) => (
                      <div
                        onClick={() => handleClickGearType(type)}
                        key={type}
                        className={`${
                          selectedGearType.includes(type)
                            ? "border-[#666]"
                            : "border-[#eee]"
                        } border  rounded-tiny px-[12px] py-[16px] cursor-pointer hover:bg-[#eee] transition duration-200 ease-in`}
                      >
                        <p className="text-[#666]">{type}</p>
                      </div>
                    ))}
                  </div>
                </div>
                <div className="relative pt-4 border-t border-[#eee] pb-10 px-4 sm:px-6">
                  <p className="text-[16px] mb-[10px]">Marca</p>
                  <div className="flex flex-wrap items-center space-x-2 gap-tiny">
                    {makeType.map((type) => (
                      <div
                        key={type}
                        onClick={() => handleClickMake(type)}
                        className={`${
                          selectedMakeType.includes(type)
                            ? "border-[#666]"
                            : "border-[#eee]"
                        } border  rounded-tiny px-[12px] py-[16px] cursor-pointer hover:bg-[#eee] transition duration-200 ease-in`}
                      >
                        <p className="text-[#666]">{type}</p>
                      </div>
                    ))}
                  </div>
                </div>
                <div className="flex items-center justify-between space-x-4 px-3">
                  <div
                    onClick={() => removeFilters()}
                    className="px-[12px] w-full py-[16px] border border-[#666] flex items-center justify-center rounded-tiny"
                  >
                    <PiTrash className="mr-1" />
                    <p className="text-[16px] font-semibold">Borrar Filtros</p>
                  </div>
                  <div
                    onClick={() => {
                      router.push(`/coches/${queryString}`);
                      setOpen(false);
                    }}
                    className="bg-button w-full px-[12px] py-[16px] flex items-center justify-center rounded-tiny cursor-pointer"
                  >
                    <p className="text-[16px] font-semibold">
                      Mostrar {carsResults.length} coches
                    </p>
                  </div>
                </div>
              </div>
            </DialogPanel>
          </div>
        </div>
      </div>
    </Dialog>
  );
};

export default Drawer;
