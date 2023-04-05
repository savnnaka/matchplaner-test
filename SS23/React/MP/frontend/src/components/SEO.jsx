import React from 'react';
import { Helmet } from 'react-helmet-async';

Helmet.defaultProps.encodeSpecialCharacters = "false";

export default function SEO({title, description, name, type, image, url}) {
return (
<Helmet encodeSpecialCharacters="false">
    { /* Standard metadata tags */ }
    <title>{title}</title>
    <meta name='description' content={description} />
    <link rel="canonical" href={url} />
    { /* End standard metadata tags */ }
    { /* Facebook tags using Open Graph */ }
    <meta property="og:type" content={type} />
    <meta property="og:title" content={title} />
    <meta property="og:description" content={description} />
    <meta property="og:url" content={url} />
    <meta property="og:image" content={image} />
    { /* End Facebook tags */ }
    { /* Twitter tags */ }
    <meta name="twitter:creator" content={name} />
    <meta name="twitter:card" content={type} />
    <meta name="twitter:title" content={title} />
    <meta name="twitter:description" content={description} />
    { /* End Twitter tags */ }
</Helmet>
)
}