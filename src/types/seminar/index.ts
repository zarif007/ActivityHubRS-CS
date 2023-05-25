export interface SeminarInterface {
    image: string;
    name: string;
    details: string;
    keySpeaker: string;
    venue: string;
    registeredStudents: string[]
    date: string;
    gender: "Both" | "Male" | "Female";
}