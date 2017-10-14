import * as React from 'react';
import {cat} from 'shelljs';

const tachyons = cat('./node_modules/tachyons/css/tachyons.min.css');

export function Layout({Content}: {Content: () => JSX.Element}) {
  return <html lang="en" className="bg-light-blue">
  <head>
    <meta charSet="utf-8"/>
    <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
    <meta httpEquiv="X-UA-Compatible" content="ie=edge"/>
    <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png"/>
    <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png"/>
    <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png"/>
    <link rel="manifest" href="/manifest.json"/>
    <link rel="mask-icon" href="/safari-pinned-tab.svg" color="#326ce5"/>
    <meta name="theme-color" content="#ffffff"/>
    <style dangerouslySetInnerHTML={{__html: tachyons}}></style>
    <title>learnk8s</title>
  </head>
  <body className="bg-near-white">
  </body>
</html>
}