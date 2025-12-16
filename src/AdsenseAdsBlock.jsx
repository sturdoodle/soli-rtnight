import  { useEffect } from 'react';

/**
 * Reusable React component for displaying a Google AdSense ad unit.
 *
 * @param {object} props
 * @param {string} props.client - Your AdSense Publisher ID (e.g., 'ca-pub-1234567890123456')
 * @param {string} props.slot - The data-ad-slot ID for the specific ad unit.
 * @param {string} [props.format='auto'] - The ad format (e.g., 'auto', 'fluid', 'rectangle').
 * @param {string} [props.style] - Optional inline CSS style for the ad container.
 */
const AdSenseAd = ({ client, slot, format = 'auto', style }) => {

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
            console.error("AdSense Error: ", e);
        }

    // Cleanup function (optional, but good practice)
    return () => {
      // If you need to stop ads from loading or clean up, do it here.
    };
  }, [slot, client]); // Re-run if the slot or client ID changes

  return (
      <section className="card-container">
          <div className="adsense-ad-container" style={style}>
              <ins
                  className="adsbygoogle"
                  style={{ display: 'block' }} // Important: AdSense requires display: 'block' or similar
                  data-ad-client={client}
                  data-ad-slot={slot}
                  data-ad-format={format}
                  data-full-width-responsive="true" // Recommended for modern web design
              ></ins>
          </div>
      </section>
  );
};

export default AdSenseAd;