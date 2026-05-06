import React from 'react';
import { Helmet } from 'react-helmet-async';

const SITE_URL = 'https://www.lemondedeschiensetdesnacs.com';
const SITE_NAME = 'Le Monde des Chiens et des NACs';
const DEFAULT_IMAGE = SITE_URL + '/logo-web.png';

export interface SEOProps {
  title: string;
  description: string;
  path: string;
  image?: string;
  noindex?: boolean;
  ogType?: 'website' | 'article' | 'profile';
  jsonLd?: Record<string, any> | Record<string, any>[];
}

const SEO: React.FC<SEOProps> = ({
  title,
  description,
  path,
  image = DEFAULT_IMAGE,
  noindex = false,
  ogType = 'website',
  jsonLd,
}) => {
  const fullTitle = title.indexOf(SITE_NAME) >= 0 ? title : title + ' | ' + SITE_NAME;
  const url = SITE_URL + path;
  const fullImage = image.indexOf('http') === 0 ? image : SITE_URL + image;
  const jsonLdArray = jsonLd ? (Array.isArray(jsonLd) ? jsonLd : [jsonLd]) : [];

  return (
    <Helmet>
      <title>{fullTitle}</title>
      <meta name="description" content={description} />
      <link rel="canonical" href={url} />
      <meta name="robots" content={noindex ? 'noindex, follow' : 'index, follow'} />

      <meta property="og:title" content={fullTitle} />
      <meta property="og:description" content={description} />
      <meta property="og:url" content={url} />
      <meta property="og:image" content={fullImage} />
      <meta property="og:type" content={ogType} />
      <meta property="og:locale" content="fr_FR" />
      <meta property="og:site_name" content={SITE_NAME} />

      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={fullTitle} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={fullImage} />

      {jsonLdArray.map((data, i) => (
        <script key={i} type="application/ld+json">
          {JSON.stringify(data)}
        </script>
      ))}
    </Helmet>
  );
};

export default SEO;
