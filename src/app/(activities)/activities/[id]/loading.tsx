import { Skeleton } from '@/components/ui/Skeleton'
import React from 'react'

const Loading = () => {
  return (
    <Skeleton className="text-gray-400 bg-gray-900 body-font">
      <Skeleton className="container px-5 py-24 mx-auto flex flex-col">
        <Skeleton className="lg:w-4/6 mx-auto">
          <Skeleton className="rounded-lg h-80 w-80 mx-auto overflow-hidden">
            <Skeleton
              className="object-center h-full w-full bg-gray-800"
            />
          </Skeleton>
          <Skeleton className="flex flex-col-reverse sm:flex-row mt-10">
            <Skeleton className="sm:w-1/3 text-center sm:pr-8 sm:py-8">
              <Skeleton className="w-20 h-20 rounded-full inline-flex items-center justify-center bg-gray-800 text-gray-600">
              <svg
                    fill="none"
                    stroke="currentColor"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    className="w-10 h-10"
                    viewBox="0 0 24 24"
                  >
                    <path d="M20 21v-2a4 4 0 00-4-4H8a4 4 0 00-4 4v2"></path>
                    <circle cx="12" cy="7" r="4"></circle>
                  </svg>
              </Skeleton>
              <Skeleton className="flex flex-col items-center text-center justify-center bg-gray-800">
                <Skeleton className="font-medium title-font mt-4 text-white text-lg bg-white">
                  
                </Skeleton>
                <Skeleton className="w-12 h-1 bg-indigo-500 rounded mt-2 mb-4"></Skeleton>
                <Skeleton className="text-base text-gray-400 bg-gray-800">
                  
                </Skeleton>
              </Skeleton>
            </Skeleton>
            <Skeleton className="sm:w-2/3 sm:pl-8 sm:py-8 sm:border-l border-gray-800 bg-gray-800 sm:border-t-0 border-t mt-4 pt-4 sm:mt-0 text-center sm:text-left">
              <Skeleton className="my-2 font-extrabold text-2xl md:text-4xl text-white"></Skeleton>
              <Skeleton className="w-24 h-1 bg-indigo-500 rounded mt-2 mb-4 mx-auto sm:mx-0"></Skeleton>
              <Skeleton className="tracking-widest text-indigo-400 text-sm font-medium title-font bg-gray-800">
                
              </Skeleton>
              <Skeleton className="leading-relaxed text-lg mb-4 bg-gray-800">
                
              </Skeleton>
            </Skeleton>
          </Skeleton>
        </Skeleton>
      </Skeleton>
    </Skeleton>
  )
}

export default Loading
