'use client'

import { SeminarInterface } from '@/types/seminar'
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

const Seminars = ({ params }: PageParams) => {
    const styles = {
        wrapper: `flex space-y-4 min-h-screen flex-col items-center justify-center py-24 max-w-5xl w-full mx-auto text-white`,
    };


    const { data: seminar, isLoading } = useQuery<SeminarInterface>({
        queryKey: ["seminar"],
        queryFn: () => axios.get(`${apiEndpointV1}/seminar?_id=${params.id}`).then(res => res.data.data[0])
    })

    return (
        <div className={styles.wrapper}>
            {
                seminar ? <MultiPurposeDetailsPage props={seminar} /> :
                    (
                        isLoading ? <LoadingSpinner /> : <h1>Not found</h1>
                    )
            }
        </div>
    )
}

export default Seminars
