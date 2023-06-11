import React, { useState } from 'react'
import { Dialog, Transition } from "@headlessui/react";
import { Fragment } from "react";
import { colorSchema } from '@/lib/ColorSchema';
import { Input } from './ui/Input';

const MultiPurposeRegistrationModal = ({ isOpen, setIsOpen, title, isSeminar }: 
    { isOpen: boolean, setIsOpen: React.Dispatch<React.SetStateAction<boolean>>, title: string, isSeminar: boolean }) => {
    const styles = {
        wrapper: `flex bg-gray-900 space-y-4 w-full max-w-xl rounded flex-col items-center justify-center py-12 mx-2 border-2 border-indigo-500`,
        label: `leading-7 text-md font-semibold text-gray-400 mb-2`,
        button: `${colorSchema.button} cursor-pointer mt-8 flex py-3 w-full max-w-lg font-extrabold text-xl rounded-sm items-center justify-center space-x-2 hover:space-x-4 `,
    };

    const [isLoading, setIsLoading] = useState<boolean>(false);

    const handleSubmit = async () => {

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
                                        <label className={styles.label}>Register for <span className="text-indigo-500">{title}</span> {isSeminar ? 'Seminar' : 'Workshop'} </label>
                                        <Input
                                            defaultValue=""
                                            placeholder="G-Suite"
                                            required
                                            onChange={(e: React.ChangeEvent<HTMLInputElement>) => { }}
                                        />
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
