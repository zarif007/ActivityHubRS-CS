export interface SeminarInterface {
  _id?: string;
  image: string;
  name: string;
  details: string;
  keySpeaker: string;
  venue: string;
  registeredStudents: string[];
  slot?: string;
  type?: string;
  seatLimit?: number;
  date: string;
  time?: string;
  gender: "Both" | "Male" | "Female";
  createdAt?: string;
  updatedAt?: string;
  __v?: number;
}
