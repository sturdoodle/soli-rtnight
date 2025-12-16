import { useEffect } from 'react';

const AdSenseAd = ({ client, slot, format = 'auto', containerClassName = '' }) => {

    // 1. Function to insert the main AdSense script
    const insertAdScript = () => {
        // Check if the script is already loaded to avoid duplicates
        if (!document.querySelector('script[src^="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js"]')) {
            const script = document.createElement('script');
            script.src = `https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=${client}`;
            script.async = true;
            script.crossOrigin = 'anonymous';
            document.head.appendChild(script);
        }
    };

    // 2. useEffect hook to handle script injection and ad loading
    useEffect(() => {
        // Insert the main AdSense script when the component mounts
        insertAdScript();

        // Push an empty ad slot object to the adsbygoogle array.
        // This tells AdSense to check for new ad units on the page.
        try {
            if (window.adsbygoogle) {
                // This is necessary to load the ad after the script is loaded.
                (window.adsbygoogle = window.adsbygoogle || []).push({});
            }
        } catch (e) {
            // console.error("AdSense Error: ", e);
        }

        // Cleanup function (optional, but good practice)
        return () => {
            // If you need to stop ads from loading or clean up, do it here.
        };
    }, [slot, client]); // Re-run if the slot or client ID changes

    return (
        <div className={`adsense-ad-container ${containerClassName}`}>
            <ins
                className="adsbygoogle"
                style={{ display: 'block', margin: '0 auto' }} // Important: AdSense requires display: 'block' or similar
                data-ad-client={client}
                data-ad-slot={slot}
                data-ad-format={format}
                data-full-width-responsive="true" // Recommended for modern web design
            ></ins>
        </div>
    );
};

export default AdSenseAd;