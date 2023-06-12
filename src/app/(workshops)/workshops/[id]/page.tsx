'use client'

import { WorkshopInterface } from '@/types/workshop'
import axios from 'axios'
import React from 'react'
import { useQuery } from 'react-query'
import { apiEndpointV1 } from './../../../../lib/ApiEndpoints';
import LoadingSpinner from '@/components/ui/LoadingSpinner'
import MultiPurposeDetailsPage from '@/components/MultiPurposeDetails.Page'

interface PageParams {
    params: {
        id: string;
    };
}

const Workshops = ({ params }: PageParams) => {
    const styles = {
        wrapper: `flex space-y-4 min-h-screen flex-col items-center justify-center py-24 max-w-5xl w-full mx-auto text-white`,
    };


    const { data: workshop, isLoading } = useQuery<WorkshopInterface>({
        queryKey: ["workshop"],
        queryFn: () => axios.get(`${apiEndpointV1}/workshop?_id=${params.id}`).then(res => res.data.data[0])
    })

    return (
        <div className={styles.wrapper}>
            {
                workshop ? <MultiPurposeDetailsPage props={workshop} /> :
                    (
                        isLoading ? <LoadingSpinner /> : <h1>Not found</h1>
                    )
            }
        </div>
    )
}

export default Workshops
