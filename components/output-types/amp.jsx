/* eslint-disable */
import React from "react";
import PropTypes from "fusion:prop-types";
import getProperties from "fusion:properties";
import { getSchema } from "../helpers/schema.helper";
import { Html, BaseMarkup } from "@arc-core-components/amp-document-boilerplate";
import IconsMap from "../features/iconsMap/default";

const AmpOutputType = (props) => {
  const { arcSite, children, globalContent } = props;
  const { gtmIDAMP, parentCommunity, primaryLogo, websiteDomain, websiteName } =
    getProperties(arcSite);

  const canonicalUrl = `${websiteDomain}${globalContent?.canonical_url}`;

  return (
    <Html>
      <head>
        <BaseMarkup canonicalUrl={canonicalUrl} />
        <script src="https://cdn.ampproject.org/v0/amp-ad-0.1.js" custom-element="amp-ad" async />
        <script
          src="https://cdn.ampproject.org/v0/amp-analytics-0.1.js"
          custom-element="amp-analytics"
          async
        />
        <script
          src="https://cdn.ampproject.org/v0/amp-bind-0.1.js"
          custom-element="amp-bind"
          async
        />
        <script
          src="https://cdn.ampproject.org/v0/amp-access-0.1.js"
          custom-element="amp-access"
          async
        />
        <script
          src="https://cdn.ampproject.org/v0/amp-sidebar-0.1.js"
          custom-element="amp-sidebar"
          async
        />
        <script
          src="https://cdn.ampproject.org/v0/amp-accordion-0.1.js"
          custom-element="amp-accordion"
          async
        ></script>
        <script
          src="https://cdn.ampproject.org/v0/amp-list-0.1.js"
          custom-element="amp-list"
          async
        />
        <script
          src="https://cdn.ampproject.org/v0/amp-mustache-0.2.js"
          custom-template="amp-mustache"
          async
        />
        <script
          src="https://cdn.ampproject.org/v0/amp-carousel-0.2.js"
          custom-element="amp-carousel"
          async
        />
        <script
          src="https://cdn.ampproject.org/v0/amp-lightbox-gallery-0.1.js"
          custom-element="amp-lightbox-gallery"
          async
        />
        <script
          src="https://cdn.ampproject.org/v0/amp-iframe-0.1.js"
          custom-element="amp-iframe"
          async
        />
        <script
          src="https://cdn.ampproject.org/v0/amp-audio-0.1.js"
          custom-element="amp-audio"
          async
        />
        <script
          src="https://cdn.ampproject.org/v0/amp-video-0.1.js"
          custom-element="amp-video"
          async
        />
        <script
          src="https://cdn.ampproject.org/v0/amp-social-share-0.1.js"
          custom-element="amp-social-share"
          async
        />
        <script
          src="https://cdn.ampproject.org/v0/amp-youtube-0.1.js"
          custom-element="amp-youtube"
          async
        />
        <script
          src="https://cdn.ampproject.org/v0/amp-twitter-0.1.js"
          custom-element="amp-twitter"
          async
        />
        <script
          src="https://cdn.ampproject.org/v0/amp-instagram-0.1.js"
          custom-element="amp-instagram"
          async
        />
        <script
          src="https://cdn.ampproject.org/v0/amp-facebook-0.1.js"
          custom-element="amp-facebook"
          async
        />
        <props.Resource path={`resources/site-theme/${parentCommunity || arcSite}/amp.css`}>
          {({ data }) =>
            data && (
              <style
                amp-custom="amp-custom"
                dangerouslySetInnerHTML={{
                  __html: data,
                }}
              />
            )
          }
        </props.Resource>
        <link
          rel="stylesheet"
          href="https://fonts.googleapis.com/css?family=Barlow%20Condensed:300,300i,400,400i,600,600i,700,700i|Barlow%20Condensed:300,300i,400,400i,600,600i,700,700i|IBM Plex Serif:300,300i,400,400i,600,600i,700,700i"
        />
        {globalContent && (
          <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{
              __html: getSchema(globalContent, primaryLogo, websiteDomain, websiteName),
            }}
          ></script>
        )}
      </head>
      <body className="Page-body Page-Amp">
        <amp-analytics
          config={`https://www.googletagmanager.com/amp.json?id=${gtmIDAMP}`}
          data-credentials="include"
        ></amp-analytics>
        {children}
        <IconsMap />
      </body>
    </Html>
  );
};

// If no amp.jsx file exists, this feature will not render.
// AmpOutputType.fallback = false;

AmpOutputType.propTypes = {
  arcSite: PropTypes.string,
  layout: PropTypes.string,
  children: PropTypes.node,
  siteProperties: PropTypes.object,
  globalContent: PropTypes.object,
};
//
export default AmpOutputType;
