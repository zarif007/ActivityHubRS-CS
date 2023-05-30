import { ActivityInterface } from "../activity"

export interface ActivityStateInterface {
    _id?: string;
    activityId: ActivityInterface
    session: string;
    totalSeat: number;
    bookedSeat: number;
    registrationDay: number;
    createdAt?: string;
    updatedAt?: string;
    __v?: number
}