import React, { useEffect, useState } from 'react'
import { Dialog, Transition } from "@headlessui/react";
import { Fragment } from "react";
import { colorSchema } from '@/lib/ColorSchema';
import { Input } from './ui/Input';
import { WorkshopInterface } from '@/types/workshop';
import { SeminarInterface } from '@/types/seminar';
import { StudentInterface } from '@/types/student';
import axios from 'axios';
import { apiEndpointV1 } from '@/lib/ApiEndpoints';
import StudentInfoDisplayer from './StudentInfoDisplayer';
import { toast } from './ui/Toast';

interface RegistrationInputsInterface {
    email: string;
    id: string;
}


const MultiPurposeRegistrationModal = ({ isOpen, setIsOpen, options, dedicated }:
    { isOpen: boolean, setIsOpen: React.Dispatch<React.SetStateAction<boolean>>, options: (WorkshopInterface | SeminarInterface)[], dedicated: boolean }) => {
    const styles = {
        wrapper: `flex bg-gray-900 space-y-4 w-full max-w-xl rounded flex-col items-center justify-center py-12 border-2 border-indigo-500`,
        label: `leading-7 text-sm text-gray-400 mb-2`,
        select: `w-full max-w-lg h-12 bg-gray-800 rounded-sm border border-gray-700 focus:border-indigo-500 
            focus:ring-2 focus:ring-indigo-900 text-base outline-none text-gray-100 py-1 px-3 leading-8 
            transition-colors duration-200 ease-in-out`,
        button: `${colorSchema.button} cursor-pointer mt-8 flex py-3 w-full max-w-lg font-extrabold text-xl rounded-sm items-center justify-center space-x-2 hover:space-x-4 `,
    };

    const isSeminar = (props: SeminarInterface | WorkshopInterface): props is SeminarInterface => 'name' in props

    const [isLoading, setIsLoading] = useState<boolean>(false);

    const [studentInfo, setStudentInfo] = useState<StudentInterface | null>();

    const [error, setError] = useState<string>("");

    const [registrationInputs, setRegistrationInputs] =
        useState<RegistrationInputsInterface>({
            email: "",
            id: '',
        });

    useEffect(() => {
        const getStudentInfo = async () => {
            if (registrationInputs.email.endsWith("@g.bracu.ac.bd")) {
                setIsLoading(true);
                // Checking if there is any student with this email
                const studentRes = await axios.get(
                    `${apiEndpointV1}/student/byEmail/${registrationInputs.email}`
                );

                setStudentInfo(studentRes.data.data);
                setIsLoading(false);
            } else {
                setStudentInfo(null);
            }
        };
        getStudentInfo();
    }, [registrationInputs.email]);

    const registrationErrorHandling = (errMsg: string) => {
        toast({
            title: "Error",
            message: errMsg,
            type: "error",
        });
        setIsLoading(false);
    };

    const validateInputs = () => {
        if (registrationInputs.id === "") {
            setError(`You must select ${isSeminar(options[0]) ? 'Seminar' : 'Workshop'}`);
            return false;
        }

        // Checking if there is any student with this email
        if (studentInfo === null) {
            registrationErrorHandling("Invalid Email iD, check and try again");
            return false;
        }

        return true;
    };

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        setError("");

        if (dedicated) {
            const up = registrationInputs;
            registrationInputs.id = options[0]._id || '';
            setRegistrationInputs(up)
        }

        if (isLoading) return;

        if (!validateInputs()) return;

        setIsLoading(true);
    }


    return (
        <Transition appear show={isOpen} as={Fragment}>
            <Dialog
                as="div"
                className="relative z-10"
                onClose={() => setIsOpen(false)}
            >
                <Transition.Child
                    as={Fragment}
                    enter="ease-out duration-300"
                    enterFrom="opacity-0"
                    enterTo="opacity-100"
                    leave="ease-in duration-200"
                    leaveFrom="opacity-100"
                    leaveTo="opacity-0"
                >
                    <div className="fixed inset-0 bg-black bg-opacity-25" />
                </Transition.Child>

                <div className="fixed inset-0 overflow-y-auto">
                    <div className="flex min-h-full items-center justify-center p-4 text-center">
                        <Transition.Child
                            as={Fragment}
                            enter="ease-out duration-300"
                            enterFrom="opacity-0 scale-95"
                            enterTo="opacity-100 scale-100"
                            leave="ease-in duration-200"
                            leaveFrom="opacity-100 scale-100"
                            leaveTo="opacity-0 scale-95"
                        >
                            <Dialog.Panel className={styles.wrapper}>
                                <div className="w-full">
                                    <form
                                        onSubmit={handleSubmit}
                                        className="w-full flex items-center flex-col px-2"
                                    >
                                        <label className={styles.label}>G-Suite<span className="text-red-500 text-lg">*</span></label>
                                        <Input
                                            defaultValue={registrationInputs.email}
                                            placeholder="*****@g.bracu.ac.bd"
                                            required
                                            onChange={(e: React.ChangeEvent<HTMLInputElement>) => setRegistrationInputs({ ...registrationInputs, email: e.target.value })}

                                        />
                                        <div className="my-3 w-full">
                                            <label className={styles.label}>
                                                Select a {isSeminar(options[0]) ? 'Seminar' : 'Workshop'} <span className="text-red-500 text-lg">*</span>
                                            </label>
                                            <select
                                                id="large"
                                                className={styles.select}
                                                onChange={(e) => {
                                                    setRegistrationInputs({
                                                        ...registrationInputs,
                                                        id: e.target.value,
                                                    });
                                                }}
                                                defaultValue={dedicated ? options[0]._id : ""}
                                            >
                                                <option value="">Select {isSeminar(options[0]) ? 'Seminar' : 'Workshop'}</option>
                                                {options.map((option: WorkshopInterface | SeminarInterface) => (
                                                    <option key={option._id} value={option._id} selected={dedicated} >
                                                        {isSeminar(option) ? option.name : option.title} ({isSeminar(option) ? option.date : `${option.time}-${option.date}`})
                                                    </option>
                                                ))}
                                            </select>
                                        </div>

                                        {/* Student info based on valid G-Suite  */}
                                        <div className="w-full sm:px-6">
                                            {studentInfo && <StudentInfoDisplayer studentInfo={studentInfo} />}
                                        </div>

                                        {/* Error msg */}
                                        {error !== "" && (
                                            <p className="my-2 text-sm font-semibold text-red-500">{error}</p>
                                        )}

                                        <button
                                            className={styles.button}
                                            disabled={isLoading}
                                            type="submit"
                                        >
                                            {isLoading ? "Loading..." : "Register"}
                                        </button>
                                    </form>
                                </div>
                            </Dialog.Panel>
                        </Transition.Child>
                    </div>
                </div>
            </Dialog>
        </Transition>
    )
}

export default MultiPurposeRegistrationModal
