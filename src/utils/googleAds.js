export function trackGoogleAdsConversion() {
  if (typeof window === 'undefined') return;

  const conversionId = import.meta.env.VITE_GOOGLE_ADS_CONVERSION_ID || 'AW-18148455939';
  const conversionLabel = import.meta.env.VITE_GOOGLE_ADS_CONVERSION_LABEL;

  if (!conversionLabel || conversionLabel === 'conversion' || conversionLabel.includes('your_')) {
    console.warn('[Google Ads] Missing or placeholder conversion label. Set VITE_GOOGLE_ADS_CONVERSION_LABEL in your environment to enable tracking.');
    return;
  }

  const payload = {
    send_to: `${conversionId}/${conversionLabel}`,
    value: 1,
    currency: 'INR'
  };

  if (typeof window.gtag === 'function') {
    window.gtag('event', 'conversion', payload);
  }

  if (window.dataLayer) {
    window.dataLayer.push({
      event: 'google_ads_conversion',
      ...payload
    });
  }
}

export function trackGoogleAdsPageView(pathname) {
  if (typeof window === 'undefined') return;
  if (typeof window.gtag !== 'function') return;

  const pagePath = pathname || window.location.pathname;
  window.gtag('event', 'page_view', {
    page_path: pagePath
  });
}
