import { Skeleton } from "@/components/ui/Skeleton";
import { colorSchema } from "@/lib/ColorSchema";
import React from "react";

const iAR = [0, 1, 2, 3, 4, 5, 6, 7];

const Loading = () => {
  const styles = {
    button: `${colorSchema.button} mt-2 flex py-2 w-full max-w-lg font-extrabold text-xl rounded-sm items-center justify-center space-x-2 hover:space-x-4 `,
  };
  return (
    <div className="mt-16 md:mt-24 w-full max-w-7xl mx-auto bg-gray-900 px-5 md:px-2">
      <Skeleton className="flex flex-wrap w-full mb-16">
        <Skeleton className="lg:w-1/2 w-full mb-6 lg:mb-0">
          <Skeleton className="sm:text-3xl text-2xl font-medium title-font mb-2 text-white">
            RS Activities
          </Skeleton>
          <Skeleton className="h-1 w-20 bg-indigo-500 rounded"></Skeleton>
        </Skeleton>
      </Skeleton>

      <div className="flex flex-wrap -m-4">
        {iAR.map((elm: number) => (
          <Skeleton key={elm} className="xl:w-1/4 md:w-1/2 w-full p-4">
            <div className="bg-gray-800 bg-opacity-40 p-6 rounded-lg">
              <Skeleton className="h-40 rounded w-full object-cover object-center mb-6" />
              <Skeleton className="tracking-widest text-indigo-400 text-xs font-medium title-font uppercase"></Skeleton>
              <Skeleton>
                <Skeleton className="text-lg text-white font-medium title-font mb-4 h-12"></Skeleton>
              </Skeleton>
              <Skeleton className="leading-relaxed text-base h-20"></Skeleton>

              <Skeleton className={styles.button}>Details</Skeleton>
            </div>
          </Skeleton>
        ))}
      </div>
    </div>
  );
};

export default Loading;
