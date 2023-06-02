import React, { useCallback, useRef } from 'react'
import { BiCamera } from "react-icons/bi";
import * as htmlToImage from 'html-to-image';
import { toPng, toJpeg } from 'html-to-image';

const ScreenShotTaker = ({ currentRef, imgName }: { currentRef: any, imgName: string}) => {
    const onButtonClick = useCallback(() => {
        if (currentRef.current === null) {
          return
        }
        
        toJpeg(currentRef.current, { cacheBust: true, quality: 1.0 })
          .then((dataUrl) => {
            const link: any = document.createElement('a')
            link.download = `${imgName}.jpeg`
            link.href = dataUrl
            link.click()
          })
          .catch((err) => {
            console.log(err)
          })
      }, [currentRef])
    return (
        <div className="flex items-center space-x-2 p-1 bg-black cursor-pointer text-gray-500 border-2 border-gray-500 rounded-md w-fit font-semibold" onClick={onButtonClick}>
            <BiCamera className="w-6 h-6" />
            <p>Take Screen Shot</p>
        </div>
    )
}

export default ScreenShotTaker
