import React from 'react';
import { siteConfig } from '../../config/siteConfig';

export default function Meta() {
  return (
    <>
      <link rel="icon" href="/favicon.ico" />
      <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png" />
      <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png" />
      <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png" />
      <link rel="manifest" href="/site.webmanifest" />
      
      <title>{siteConfig.name} - Web Generator</title>
      <meta name="description" content={siteConfig.description} />
      
      <meta property="og:type" content="website" />
      <meta property="og:url" content={siteConfig.url} />
      <meta property="og:title" content={siteConfig.name} />
      <meta property="og:description" content={siteConfig.description} />
      <meta property="og:image" content={siteConfig.ogImage} />
      
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:url" content={siteConfig.url} />
      <meta name="twitter:title" content={siteConfig.name} />
      <meta name="twitter:description" content={siteConfig.description} />
      <meta name="twitter:image" content={siteConfig.ogImage} />
      
      <meta name="author" content={siteConfig.contact.developer} />
      <meta name="contact" content={`WhatsApp: ${siteConfig.contact.whatsapp}`} />
    </>
  );
}