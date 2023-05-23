import Script from "next/script";
import React from "react";

 const GoogleAnalytics = () => {
    return (
        <>

            {/* <Script
                strategy="lazyOnload"
                src={`https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-9836849754521257`}
            /> */}
            <Script
                strategy="lazyOnload"
                src={`https://www.googletagmanager.com/gtag/js?id=G-3KD4B1FJ2E`}
            />
            <Script strategy="lazyOnload" id="gtag"
            >
                {`
                window.dataLayer = window.dataLayer || [];
                function gtag(){dataLayer.push(arguments);}
                gtag('js', new Date());
              
                gtag('config', 'G-3KD4B1FJ2E');
                `}
            </Script>
        </>

    );
};

export default GoogleAnalytics;