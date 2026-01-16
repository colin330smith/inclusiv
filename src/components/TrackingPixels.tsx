'use client';

import Script from 'next/script';
import { useEffect } from 'react';
import { usePathname, useSearchParams } from 'next/navigation';

// Environment variables for pixel IDs
const FB_PIXEL_ID = process.env.NEXT_PUBLIC_FB_PIXEL_ID;
const GOOGLE_ADS_ID = process.env.NEXT_PUBLIC_GOOGLE_ADS_ID;
const LINKEDIN_PARTNER_ID = process.env.NEXT_PUBLIC_LINKEDIN_PARTNER_ID;
const TIKTOK_PIXEL_ID = process.env.NEXT_PUBLIC_TIKTOK_PIXEL_ID;

// Declare global types
declare global {
  interface Window {
    fbq?: (...args: unknown[]) => void;
    _fbq?: (...args: unknown[]) => void;
    gtag?: (...args: unknown[]) => void;
    lintrk?: (...args: unknown[]) => void;
    _linkedin_data_partner_ids?: string[];
    ttq?: {
      load: (id: string) => void;
      page: () => void;
      track: (event: string, data?: Record<string, unknown>) => void;
      identify: (data: Record<string, unknown>) => void;
    };
  }
}

/**
 * Facebook Pixel Component
 * Tracks: PageView, Lead, Purchase, InitiateCheckout, ViewContent
 */
function FacebookPixel() {
  const pathname = usePathname();
  const searchParams = useSearchParams();

  useEffect(() => {
    if (!FB_PIXEL_ID || typeof window.fbq !== 'function') return;

    // Track page views on route change
    window.fbq('track', 'PageView');
  }, [pathname, searchParams]);

  if (!FB_PIXEL_ID) return null;

  return (
    <>
      <Script id="fb-pixel" strategy="afterInteractive">
        {`
          !function(f,b,e,v,n,t,s)
          {if(f.fbq)return;n=f.fbq=function(){n.callMethod?
          n.callMethod.apply(n,arguments):n.queue.push(arguments)};
          if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
          n.queue=[];t=b.createElement(e);t.async=!0;
          t.src=v;s=b.getElementsByTagName(e)[0];
          s.parentNode.insertBefore(t,s)}(window, document,'script',
          'https://connect.facebook.net/en_US/fbevents.js');
          fbq('init', '${FB_PIXEL_ID}');
          fbq('track', 'PageView');
        `}
      </Script>
      <noscript>
        <img
          height="1"
          width="1"
          style={{ display: 'none' }}
          src={`https://www.facebook.com/tr?id=${FB_PIXEL_ID}&ev=PageView&noscript=1`}
          alt=""
        />
      </noscript>
    </>
  );
}

/**
 * Google Ads Remarketing Component
 * Tracks: Conversion events for Google Ads campaigns
 */
function GoogleAdsRemarketing() {
  if (!GOOGLE_ADS_ID) return null;

  return (
    <Script id="google-ads-remarketing" strategy="afterInteractive">
      {`
        // Google Ads remarketing tag
        gtag('config', '${GOOGLE_ADS_ID}', {
          'allow_enhanced_conversions': true
        });

        // Set up remarketing audiences
        gtag('event', 'page_view', {
          'send_to': '${GOOGLE_ADS_ID}'
        });
      `}
    </Script>
  );
}

/**
 * LinkedIn Insight Tag
 * Essential for B2B targeting - accessibility compliance buyers
 */
function LinkedInInsight() {
  if (!LINKEDIN_PARTNER_ID) return null;

  return (
    <>
      <Script id="linkedin-insight" strategy="afterInteractive">
        {`
          _linkedin_partner_id = "${LINKEDIN_PARTNER_ID}";
          window._linkedin_data_partner_ids = window._linkedin_data_partner_ids || [];
          window._linkedin_data_partner_ids.push(_linkedin_partner_id);
          (function(l) {
            if (!l){window.lintrk = function(a,b){window.lintrk.q.push([a,b])};
            window.lintrk.q=[]}
            var s = document.getElementsByTagName("script")[0];
            var b = document.createElement("script");
            b.type = "text/javascript";b.async = true;
            b.src = "https://snap.licdn.com/li.lms-analytics/insight.min.js";
            s.parentNode.insertBefore(b, s);})(window.lintrk);
        `}
      </Script>
      <noscript>
        <img
          height="1"
          width="1"
          style={{ display: 'none' }}
          alt=""
          src={`https://px.ads.linkedin.com/collect/?pid=${LINKEDIN_PARTNER_ID}&fmt=gif`}
        />
      </noscript>
    </>
  );
}

/**
 * TikTok Pixel
 * For reaching younger entrepreneurs and marketing managers
 */
function TikTokPixel() {
  const pathname = usePathname();

  useEffect(() => {
    if (!TIKTOK_PIXEL_ID || typeof window.ttq === 'undefined') return;
    window.ttq.page();
  }, [pathname]);

  if (!TIKTOK_PIXEL_ID) return null;

  return (
    <Script id="tiktok-pixel" strategy="afterInteractive">
      {`
        !function (w, d, t) {
          w.TiktokAnalyticsObject=t;var ttq=w[t]=w[t]||[];ttq.methods=["page","track","identify","instances","debug","on","off","once","ready","alias","group","enableCookie","disableCookie"],ttq.setAndDefer=function(t,e){t[e]=function(){t.push([e].concat(Array.prototype.slice.call(arguments,0)))}};for(var i=0;i<ttq.methods.length;i++)ttq.setAndDefer(ttq,ttq.methods[i]);ttq.instance=function(t){for(var e=ttq._i[t]||[],n=0;n<ttq.methods.length;n++)ttq.setAndDefer(e,ttq.methods[n]);return e},ttq.load=function(e,n){var i="https://analytics.tiktok.com/i18n/pixel/events.js";ttq._i=ttq._i||{},ttq._i[e]=[],ttq._i[e]._u=i,ttq._t=ttq._t||{},ttq._t[e]=+new Date,ttq._o=ttq._o||{},ttq._o[e]=n||{};var o=document.createElement("script");o.type="text/javascript",o.async=!0,o.src=i+"?sdkid="+e+"&lib="+t;var a=document.getElementsByTagName("script")[0];a.parentNode.insertBefore(o,a)};
          ttq.load('${TIKTOK_PIXEL_ID}');
          ttq.page();
        }(window, document, 'ttq');
      `}
    </Script>
  );
}

/**
 * Main Tracking Pixels Component
 * Combines all retargeting pixels in one place
 */
export default function TrackingPixels() {
  return (
    <>
      <FacebookPixel />
      <GoogleAdsRemarketing />
      <LinkedInInsight />
      <TikTokPixel />
    </>
  );
}

// ==========================================
// Conversion Tracking Helpers
// ==========================================

/**
 * Track a scan completion - key engagement event
 */
export function trackScanCompletion(url: string, score: number, issueCount: number) {
  // Facebook
  if (typeof window.fbq === 'function') {
    window.fbq('track', 'ViewContent', {
      content_name: 'Accessibility Scan',
      content_category: 'Scan',
      value: score,
      currency: 'USD',
      content_ids: [url],
      num_items: issueCount,
    });
  }

  // Google Ads
  if (typeof window.gtag === 'function' && GOOGLE_ADS_ID) {
    window.gtag('event', 'conversion', {
      'send_to': `${GOOGLE_ADS_ID}/scan_complete`,
      'value': score / 100,
      'currency': 'USD',
    });
  }

  // LinkedIn
  if (typeof window.lintrk === 'function') {
    window.lintrk('track', { conversion_id: 'scan_complete' });
  }

  // TikTok
  if (typeof window.ttq !== 'undefined') {
    window.ttq.track('ViewContent', {
      content_type: 'scan_result',
      content_id: url,
      value: score,
    });
  }
}

/**
 * Track email lead capture
 */
export function trackLeadCapture(email: string, source: string) {
  // Facebook - Lead event
  if (typeof window.fbq === 'function') {
    window.fbq('track', 'Lead', {
      content_name: source,
      content_category: 'Lead',
    });
  }

  // Google Ads
  if (typeof window.gtag === 'function' && GOOGLE_ADS_ID) {
    window.gtag('event', 'conversion', {
      'send_to': `${GOOGLE_ADS_ID}/lead_capture`,
      'value': 5.00, // Estimated lead value
      'currency': 'USD',
    });
  }

  // LinkedIn
  if (typeof window.lintrk === 'function') {
    window.lintrk('track', { conversion_id: 'lead_capture' });
  }

  // TikTok
  if (typeof window.ttq !== 'undefined') {
    window.ttq.track('SubmitForm', {
      content_type: 'lead',
      content_name: source,
    });
  }
}

/**
 * Track checkout initiation
 */
export function trackCheckoutStart(planName: string, price: number) {
  // Facebook
  if (typeof window.fbq === 'function') {
    window.fbq('track', 'InitiateCheckout', {
      content_name: planName,
      content_category: 'Subscription',
      value: price,
      currency: 'USD',
      num_items: 1,
    });
  }

  // Google Ads
  if (typeof window.gtag === 'function' && GOOGLE_ADS_ID) {
    window.gtag('event', 'conversion', {
      'send_to': `${GOOGLE_ADS_ID}/checkout_start`,
      'value': price,
      'currency': 'USD',
    });
  }

  // LinkedIn
  if (typeof window.lintrk === 'function') {
    window.lintrk('track', { conversion_id: 'checkout_start' });
  }

  // TikTok
  if (typeof window.ttq !== 'undefined') {
    window.ttq.track('InitiateCheckout', {
      content_type: 'subscription',
      content_name: planName,
      value: price,
      currency: 'USD',
    });
  }
}

/**
 * Track successful purchase
 */
export function trackPurchase(planName: string, price: number, transactionId: string) {
  // Facebook
  if (typeof window.fbq === 'function') {
    window.fbq('track', 'Purchase', {
      content_name: planName,
      content_category: 'Subscription',
      value: price,
      currency: 'USD',
      content_ids: [planName],
      num_items: 1,
    });
  }

  // Google Ads
  if (typeof window.gtag === 'function' && GOOGLE_ADS_ID) {
    window.gtag('event', 'conversion', {
      'send_to': `${GOOGLE_ADS_ID}/purchase`,
      'value': price,
      'currency': 'USD',
      'transaction_id': transactionId,
    });
  }

  // LinkedIn
  if (typeof window.lintrk === 'function') {
    window.lintrk('track', { conversion_id: 'purchase' });
  }

  // TikTok
  if (typeof window.ttq !== 'undefined') {
    window.ttq.track('CompletePayment', {
      content_type: 'subscription',
      content_name: planName,
      value: price,
      currency: 'USD',
    });
  }
}

/**
 * Track pricing page view
 */
export function trackPricingView() {
  // Facebook - custom event
  if (typeof window.fbq === 'function') {
    window.fbq('track', 'ViewContent', {
      content_name: 'Pricing Page',
      content_category: 'Pricing',
    });
  }

  // Google Ads
  if (typeof window.gtag === 'function' && GOOGLE_ADS_ID) {
    window.gtag('event', 'view_item_list', {
      'send_to': GOOGLE_ADS_ID,
      'item_list_name': 'Pricing Plans',
    });
  }

  // LinkedIn
  if (typeof window.lintrk === 'function') {
    window.lintrk('track', { conversion_id: 'pricing_view' });
  }

  // TikTok
  if (typeof window.ttq !== 'undefined') {
    window.ttq.track('ViewContent', {
      content_type: 'pricing',
      content_name: 'Pricing Page',
    });
  }
}

/**
 * Track high-intent actions (viewing compliance info, downloading reports)
 */
export function trackHighIntent(action: string, details?: Record<string, unknown>) {
  // Facebook - custom event
  if (typeof window.fbq === 'function') {
    window.fbq('trackCustom', 'HighIntent', {
      action,
      ...details,
    });
  }

  // Google Ads
  if (typeof window.gtag === 'function' && GOOGLE_ADS_ID) {
    window.gtag('event', 'high_intent', {
      'send_to': GOOGLE_ADS_ID,
      'action': action,
      ...details,
    });
  }
}
