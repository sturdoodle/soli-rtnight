import AdUnit from './components/AdUnit';

/**
 * Legacy Wrapper for AdUnit
 * 
 * This component is maintained for backward compatibility with existing imports.
 * It uses the new 'Dev-Safe' AdUnit component internally.
 */
const AdSenseAd = ({ slot, format = 'auto', containerClassName = '', minHeight = '100px' }) => {
    return (
        <AdUnit 
            slot={slot} 
            format={format} 
            className={containerClassName}
            minHeight={minHeight}
            style={{ display: 'block', margin: '0 auto' }}
        />
    );
};

export default AdSenseAd;