import { useEffect } from 'react';

/**
 * Lightweight SEO Component for dynamic page metadata & title updates
 */
export default function SEO({ 
  title = "Qayam | Best Hostels in Peshawar, KPK - Boys & Girls Hostel Finder", 
  description = "Find & book verified boys and girls hostels in Peshawar, KPK. Search student & working hostels in University Road, Abdara Road, Town, Hayatabad, Saddar & Mardan.",
  keywords = "hostel in peshawar, boys hostel in peshawar, girls hostel in peshawar, hostel in university road peshawar, hostel in abdara road peshawar, hostel in town peshawar, hostels in kpk",
  canonical = "https://qayam.site/"
}) {
  useEffect(() => {
    // Update document title
    document.title = title;

    // Helper function to set meta tag
    const setMeta = (nameAttr, attrVal, contentVal) => {
      let element = document.querySelector(`meta[${nameAttr}="${attrVal}"]`);
      if (!element) {
        element = document.createElement('meta');
        element.setAttribute(nameAttr, attrVal);
        document.head.appendChild(element);
      }
      element.setAttribute('content', contentVal);
    };

    setMeta('name', 'description', description);
    setMeta('name', 'keywords', keywords);
    setMeta('property', 'og:title', title);
    setMeta('property', 'og:description', description);
    setMeta('property', 'og:url', canonical);
    setMeta('property', 'twitter:title', title);
    setMeta('property', 'twitter:description', description);

    // Update canonical link
    let canonicalLink = document.querySelector('link[rel="canonical"]');
    if (!canonicalLink) {
      canonicalLink = document.createElement('link');
      canonicalLink.setAttribute('rel', 'canonical');
      document.head.appendChild(canonicalLink);
    }
    canonicalLink.setAttribute('href', canonical);

  }, [title, description, keywords, canonical]);

  return null;
}
