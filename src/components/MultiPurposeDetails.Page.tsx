import React, { useState } from 'react'
import { SeminarInterface } from '@/types/seminar';
import { WorkshopInterface } from '@/types/workshop';
import MultiPurposeRegistrationModal from './MultiPurposeRegistration.Modal';

const MultiPurposeDetailsPage = ({ props }: { props: SeminarInterface | WorkshopInterface }) => {
    const isSeminar = (props: SeminarInterface | WorkshopInterface): props is SeminarInterface => 'name' in props

    const [isRegistrationModalOpen, setIsRegistrationModalOpen] = useState<boolean>(false)

    const makeLine = (text: string) => {
        return (
            <>
                {
                    text.split('\n').map((nl: string, index: number) => <p key={index}>{nl}</p>)
                }
            </>
        )
    }
    return (
        <section className="text-gray-400 bg-gray-900 body-font">
            <div className="container mx-auto flex px-5 py-24 items-center justify-center flex-col">
                <img className="lg:w-2/6 md:w-3/6 w-5/6 mb-10 object-cover object-center rounded" alt="hero" src={props.image} />
                <div className="text-center lg:w-2/3 w-full">
                    <h1 className="title-font sm:text-4xl text-3xl mb-4 font-bold text-white">{ isSeminar(props) ? props.name : props.title }</h1>

                    <h1 className="my-4 text-indigo-500 font-bold text-lg uppercase">{isSeminar(props) ? 'Details' : 'Objective'}</h1>
                    <p className="leading-relaxed text-md font-semibold mb-8">{ isSeminar(props) ? makeLine(props.details) : makeLine(props.objective) }</p>
                    
                    <h1 className="my-4 text-indigo-500 font-bold text-lg uppercase">{isSeminar(props) ? 'Key Speaker' : 'Facilitators'}</h1>
                    <div>
                        {
                            isSeminar(props) ? <p>props.keySpeaker</p> : <div className='flex flex-col'>
                                {
                                    props.facilitators.map((facilitator: string, index: number) => (
                                        <p className="text-md font-semibold" key={index}>{facilitator}</p>
                                    ))
                                }
                            </div>
                        }
                    </div>

                    <h1 className="my-4 text-indigo-500 font-bold text-lg uppercase">Date And Time</h1>
                    <p className="text-md font-semibold">{props.date} {!isSeminar(props) && props.time}</p>

                    <h1 className="my-4 text-indigo-500 font-bold text-lg uppercase">Venue</h1>
                    <p className="text-md font-semibold">{props.venue}</p>

                    <h1 className="my-4 text-indigo-500 font-bold text-lg">SEAT STATUS</h1>
                    <p className="text-md font-semibold">{isSeminar(props) ? props.registeredStudents.length : `${props.registeredStudents.length} / ${props.seatLimit}`}</p>
                    <div className="flex justify-center mt-4">
                        <button className="inline-flex text-white bg-indigo-500 border-0 py-2 px-6 focus:outline-none hover:bg-indigo-600 rounded text-lg" onClick={() => setIsRegistrationModalOpen(true)}>Register</button>
                    </div>

                    {
                        <MultiPurposeRegistrationModal 
                            isOpen={isRegistrationModalOpen} 
                            setIsOpen={setIsRegistrationModalOpen} 
                            options={new Array(props)} 
                            dedicated={true}
                        />
                    }
                </div>
            </div>
        </section>
    )
}

export default MultiPurposeDetailsPage
