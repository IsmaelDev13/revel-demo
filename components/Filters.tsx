import Link from "next/link";
import { useRouter } from "next/router";
import { Dispatch, SetStateAction, useEffect, useRef, useState } from "react";
import { IoMdArrowDropdown, IoMdArrowDropup } from "react-icons/io";
import { PiSlidersHorizontalThin } from "react-icons/pi";

interface Props {
  showOffers: boolean;
  setShowOffers: Dispatch<SetStateAction<boolean>>;
  setOpenDrawer: Dispatch<SetStateAction<boolean>>;
}

const Filters = ({ showOffers, setShowOffers, setOpenDrawer }: Props) => {
  const [showFilters, setShowFilters] = useState(false);
  const router = useRouter();
  console.log(router.query);
  const modalRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (modalRef.current && !modalRef.current.contains(event.target as any)) {
        setShowFilters(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [modalRef]);
  return (
    <section className="max-w-[572px] lg:max-w-7xl mx-auto px-4 lg:px-20 my-[16px]">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <div
            onClick={() => setOpenDrawer(true)}
            className=" border border-[#eee]  relative cursor-pointer rounded-[8px] overflow-hidden w-fit flex items-center space-x-1 p-[8px]"
          >
            <p className="text-[12px]">Filtros</p>
            <PiSlidersHorizontalThin />
          </div>
          <div
            onClick={() => setShowOffers(!showOffers)}
            className={`border cursor-pointer rounded-[8px]  p-[8px] ${
              showOffers ? "border-[#666]" : "border-[#eee]"
            } `}
          >
            <p className="text-[12px]">Ofertas</p>
          </div>
        </div>
        <div
          onClick={() => setShowFilters(!showFilters)}
          className="border border-[#eee]  relative cursor-pointer rounded-[8px] overflow-hidden w-fit flex items-center space-x-1 p-[8px]"
        >
          <p className="text-[12px]">Precio: de menor a mayor</p>

          {showFilters && <IoMdArrowDropdown />}
          {!showFilters && <IoMdArrowDropup />}
        </div>
        {showFilters && (
          <div
            ref={modalRef}
            className="shadow-[#eee] shadow-lg  bg-white rounded-tiny z-10 absolute right-10 top-[170px]"
          >
            <Link
              href={"/coches?price=asc"}
              className="px-[12px] cursor-pointer  rounded-t-tiny hover:bg-[#eee] py-[16px] flex items-center space-x-4"
            >
              <p className="text-[16px]">Precio: de menor a mayor</p>
              <input type="checkbox" checked={router.query.price === "asc"} />
            </Link>
            <Link
              href={"/coches?price=desc"}
              className="px-[12px] cursor-pointer rounded-b-tiny hover:bg-[#eee] py-[16px] flex items-center space-x-4"
            >
              <p className="text-[16px]">Precio: de mayor a menor</p>
              <input type="checkbox" checked={router.query.price === "desc"} />
            </Link>
          </div>
        )}
      </div>
    </section>
  );
};

export default Filters;
