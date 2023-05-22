export interface SeminarInterface {
    image: string;
    name: string;
    details: string;
    keySpeaker: string;
    venue: string;
    registeredStudents: number;
    date: string;
    gender: "Both" | "Male" | "Female";
}