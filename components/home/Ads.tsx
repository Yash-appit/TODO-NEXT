import React, { useEffect, useState } from 'react';
import Script from 'next/script';

// Define types for the package data
interface PackageData {
  package_status: string;
}

interface DashboardData {
  packageData?: PackageData;
}

interface ResumeContextType {
  dashboard?: DashboardData;
}


const getFromLocalStorage = (key: string) => {
  if (typeof window !== 'undefined') {
    return localStorage.getItem(key);
  }
  return null;
};

const Ads: React.FC = () => {
  const [scriptLoaded, setScriptLoaded] = useState<boolean>(false);

  // Check if user doesn't have an active package
  const packageData = getFromLocalStorage("package");
  const shouldShowAds = packageData !== "true";

  // Initialize ads after component mounts and script is loaded
  useEffect(() => {
    if (scriptLoaded && shouldShowAds) {
      // Use a small delay to ensure the ad container is rendered
      const timer = setTimeout(() => {
        try {
          // Check if adsbygoogle is loaded and push the ad
          if ((window as any).adsbygoogle) {
            ((window as any).adsbygoogle = (window as any).adsbygoogle || []).push({});
          }
        } catch (error) {
          console.log('Error initializing ads:', error);
        }
      }, 100);

      return () => clearTimeout(timer);
    }
  }, [scriptLoaded, shouldShowAds]);

  if (!shouldShowAds) return null;

  // Always show the ad container
  return (
    <>
      <Script
        id="adsense-script"
        async
        src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-4949029990361775"
        crossOrigin="anonymous"
        strategy="lazyOnload"
        onLoad={() => setScriptLoaded(true)}
        onError={(e) => {
          console.error('Script failed to load', e);
          setScriptLoaded(false);
        }}
      />
      <div className='text-center py-3'>
        <ins
          className="adsbygoogle"
          style={{
            display: 'block',
          }}
          data-ad-client="ca-pub-4949029990361775"
          data-ad-slot="3989436532"
          data-ad-format="auto"
          data-full-width-responsive="true"
        ></ins>
      </div>
    </>
  );
};

export default Ads;