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
      <meta name="theme-color" content="#ffffff" />
      
      <title>{siteConfig.name} - Web Development Solutions</title>
      <meta name="description" content={siteConfig.description} />
      
      {/* Open Graph / Facebook */}
      <meta property="og:type" content="website" />
      <meta property="og:url" content={siteConfig.url} />
      <meta property="og:title" content={siteConfig.name} />
      <meta property="og:description" content={siteConfig.description} />
      <meta property="og:image" content={siteConfig.ogImage} />
      <meta property="og:image:width" content="1200" />
      <meta property="og:image:height" content="630" />
      
      {/* Twitter */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:url" content={siteConfig.url} />
      <meta name="twitter:title" content={siteConfig.name} />
      <meta name="twitter:description" content={siteConfig.description} />
      <meta name="twitter:image" content={siteConfig.ogImage} />
      
      {/* Additional Meta */}
      <meta name="author" content={siteConfig.contact.developer} />
      <meta name="contact" content={`WhatsApp: ${siteConfig.contact.whatsapp}`} />
      <meta name="keywords" content="web development, full-stack, React, Node.js, TypeScript, JavaScript, Like Look Solutions, web solutions" />
      <meta name="application-name" content={siteConfig.name} />
      <meta name="mobile-web-app-capable" content="yes" />
      <meta name="apple-mobile-web-app-capable" content="yes" />
      <meta name="apple-mobile-web-app-title" content={siteConfig.name} />
      <meta name="apple-mobile-web-app-status-bar-style" content="default" />
      <meta name="format-detection" content="telephone=no" />
    </>
  );
}