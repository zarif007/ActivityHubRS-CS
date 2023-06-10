export interface WorkshopInterface {
    _id?: string;
    image: string;
    title: string;
    objective: string;
    date: string;
    time: string;
    venue: string;
    seatLimit: number;
    facilitators: string[];
    registeredStudents: string[];
    createdAt?: string;
    updatedAt?: string;
    __v?: number;
}