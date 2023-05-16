export interface StudentInterface {
    _id?: string;
    studentId: string;
    name: string;
    email: string;
    gender: 'Male' | 'Female' | '',
    depertment: string;
    roomNumber: string;
    semester: string;
    phoneNumber: string;
    bngSection: string;
    __v?: 0,
    createdAt?: string;
    updatedAt?: string;
}