import { StudentInterface } from "../student";
import { ActivityInterface } from './../activity/index';

export interface RegistrationInterface {
    _id?: string;
    studentId: StudentInterface;
    activityId: ActivityInterface;
    session: string;
    createdAt?: string;
    updatedAt?: string;
    __v?: number;
}