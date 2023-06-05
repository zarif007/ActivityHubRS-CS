import { ActivityStateInterface } from "@/types/activityState";
import React from "react";
import Image from "next/image";
import Link from "next/link";
import { colorSchema } from "@/lib/ColorSchema";

const registrationDays = ['6th of June', '7th of June', '8th of June'];

const ActivityCard = ({
  activityState,
}: {
  activityState: ActivityStateInterface;
}) => {
  const styles = {
    button: `${colorSchema.button} mt-2 flex py-2 w-full max-w-lg font-extrabold text-xl rounded-sm items-center justify-center space-x-2 hover:space-x-4 `,
  };
  return (
    <div className="bg-gray-800 bg-opacity-40 p-6 rounded-lg">
      <Image
        className="h-40 rounded w-full object-cover object-center mb-6"
        src={activityState.activityId.image}
        alt="Activity Image"
        width={100}
        height={100}
        style={{ objectFit: "contain" }}
        blurDataURL={activityState.activityId.image}
        placeholder="blur"
        priority
        quality={100}
      />
      {/* <h3 className="tracking-widest text-indigo-400 text-xs font-medium title-font uppercase">
                            {activityState.activityId.day}(
                            {activityState.activityId.classTime})
                          </h3> */}
      <h3 className="tracking-widest text-indigo-400 text-xs font-medium title-font uppercase">
        Registration Fee: {activityState.activityId.price}
      </h3>
      <Link href={`/activities/${activityState.activityId._id}`}>
        <div className="text-lg text-white font-medium title-font mb-6 h-8">
          {activityState.activityId.name.slice(0, 35)}
          {
            activityState.activityId.name.length > 35 && '...'
          }
        </div>
      </Link>
      <h3 className="tracking-widest text-indigo-400 text-xs font-medium title-font uppercase">
        SignUp date: {registrationDays[activityState.registrationDay - 1]}
      </h3>
      <h3
        className={`tracking-widest ${
          activityState.bookedSeat < activityState.totalSeat
            ? "text-green-400"
            : "text-red-500"
        } text-xs font-medium title-font uppercase`}
      >
        Seat Status: {activityState.bookedSeat}/{activityState.totalSeat}
      </h3>
      <Link
        href={`/activities/${activityState.activityId._id}`}
        className={styles.button}
      >
        Details
      </Link>
    </div>
  );
};

export default ActivityCard;
