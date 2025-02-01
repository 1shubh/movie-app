import React from "react";
import { Skeleton } from "./ui/skeleton";

export const MovieSkeletonCard = () => {
  const array = Array(12).fill(null); // Create an array with 8 elements

  return (
    <div className="py-5 w-[80%] xl:w-[90%] min-h-[100vh] m-auto bg-black max-h-fit">
      <div className="grid grid-cols-6 xl:grid-cols-5 lg:grid-cols-4 md:grid-cols-3 sm:grid-cols-3 xs:grid-cols-2 sm:w-[95%] gap-5">
        {array.map((_, index) => (
          <div key={index}>
            <Skeleton height={"300px"} /> {/* Skeleton for the poster */}
            <Skeleton height={"20px"} marginTop="10px" />{" "}
            {/* Skeleton for the title */}
          </div>
        ))}
      </div>
    </div>
  );
};
