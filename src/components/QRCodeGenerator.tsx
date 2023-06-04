'use client'

import React from 'react'
import QRCode from "react-qr-code";

const QRCodeGenerator = ({ value }: { value: string }) => {
    return (
        // Can be anything instead of `maxWidth` that limits the width.
        <div className="p-3 flex flex-col items-center justify-center border-2 border-indigo-500 rounded">
            <QRCode
                
                style={{ height: "auto", maxWidth: "50%", width: "50%" }}
                value={value}
                bgColor="#111827"
                fgColor="#6366f1"
            />
        </div>
    )
}

export default QRCodeGenerator
