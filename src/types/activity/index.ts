import { InstructorInterface } from "../instructor";

export interface ActivityInterface {
    remarks: { gender: 'Both' | "Male" | 'Female' },
    _id?: string;
    name: string;
    image: string;
    description: string;
    level: 'Beginner' | 'Advance' | 'None'
    price: number;
    day: string;
    classTime: string;
    venue: string;
    ds: string;
    instructor: InstructorInterface;
    createdAt?: string;
    updatedAt?: string;
    __v?: number
}