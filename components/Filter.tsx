"use client";
import { FC, useRef } from "react";
import Image from "next/image";
import { FilterInterface } from "@/lib/interface";
import { urlFor } from "@/lib/sanityImageUrl";

interface FilterProps {
  item: FilterInterface;
}

const Filter: FC<FilterProps> = ({ item }) => {
  const handleClick = () => {
    console.log("clicked");
  };
  return (
    <div
      onClick={handleClick}
      className="flex items-center gap-2 bg-teal-500 w-fit py-1 px-3 rounded-3xl"
    >
      <Image
        src={urlFor(item.image).url()}
        alt={item.image.alt}
        width={24}
        height={24}
      />
      <span className="text-sm">{item.title}</span>
    </div>
  );
};

export default Filter;
