import { MetaData } from "@wpmedia/engine-theme-sdk";
import { useFusionContext } from "fusion:context";
import getProperties from "fusion:properties";
import React from "react";
import CivicMetaTags from "../base/metatags/metatags.components.jsx";
import IconsMap from "../features/iconsMap/default";
import { getSchema } from "../helpers/schema.helper";
// this is blank import but used to inject scss
import "./default.scss";
import { getSiteProperties, isSiteSection } from "../helpers/site.helper.js";

const querylyCode = (querylyId, querylyOrg, pageType) => {
  if (!querylyId) {
    return null;
  }
  return (
    <>
      <script defer data-integration="queryly" src="https://www.queryly.com/js/queryly.v4.min.js" />
      {pageType === "queryly-search" ? (
        <script
          defer
          data-integration="queryly"
          src={`https://www.queryly.com/js/${querylyOrg}-advanced-search.js`}
        />
      ) : null}
    </>
  );
};

const comscoreNoScript = (accountId) => {
  if (!accountId) {
    return null;
  }
  return (
    <noscript data-integration="comscore">
      <img
        alt="comscore"
        src={`https://sb.scorecardresearch.com/p?c1=2&c2=${accountId}&cv=2.0&cj=1`}
      />
    </noscript>
  );
};

const googleTagManagerNoScript = (gtmID) => {
  if (!gtmID) {
    return null;
  }
  return (
    <noscript>
      <iframe
        title="gtm"
        src={`https://www.googletagmanager.com/ns.html?id=${gtmID}`}
        height="0"
        width="0"
        style={{
          display: "none",
          visibility: "hidden",
        }}
      />
    </noscript>
  );
};

const optimalFontLoading = (fontUrl, index = "") => (
  <>
    <link rel="preload" as="style" href={fontUrl} />
    <link rel="stylesheet" key={fontUrl} data-testid={`font-loading-url-${index}`} href={fontUrl} />
  </>
);

const fontUrlLink = (fontUrl) => {
  // If fontURL is an array, then iterate over the array and build out the links
  if (fontUrl && Array.isArray(fontUrl) && fontUrl.length > 0) {
    const fontLinks = [...new Set(fontUrl)].map((url, index) => optimalFontLoading(url, index));

    return (
      <>
        <>{fontLinks}</>
      </>
    );
  }
  // Legacy support where fontUrl is a string
  return fontUrl ? <>{optimalFontLoading(fontUrl)}</> : "";
};

const CivicOutputType = ({
  children,
  contextPath,
  deployment,
  CssLinks,
  Fusion,
  Libs,
  MetaTag,
  MetaTags,
  metaValue,
}) => {
  const context = useFusionContext();
  const { globalContent, arcSite, requestUri } = context;
  const {
    api,
    websiteName,
    websiteDomain,
    primaryLogo,
    parselyTags,
    twitterUsername,
    gtmID,
    gaID,
    dangerouslyInjectJS = [],
    resizerURL,
    facebookAdmins,
    nativoIntegration,
    chartbeatAccountId,
    chartbeatDomain,
    fallbackImage,
    comscoreID,
    querylyId,
    facebookAppId,
    locale = "en",
  } = getProperties(arcSite);

  const fontUrl = [
    "https://fonts.googleapis.com/css?family=Barlow%20Condensed:300,300i,400,400i,600,600i,700,700i|Barlow%20Condensed:300,300i,400,400i,600,600i,700,700i|IBM%20Plex%20Serif:300,300i,400,400i,600,600i,700,700i&display=swap",
  ];

  const chartbeatInline = `
    (function() {
      var _sf_async_config = window._sf_async_config = (window._sf_async_config || {});
      _sf_async_config.uid = ${chartbeatAccountId};
      _sf_async_config.domain = "${chartbeatDomain}";
      _sf_async_config.useCanonical = true;
      _sf_async_config.useCanonicalDomain = true;
      _sf_async_config.sections = '';
      _sf_async_config.authors = '';
    })();
  `;
  const scriptCodeInline = `
    var _comscore = _comscore || []; _comscore.push({ c1: "2", c2: "${comscoreID}" });
  `;
  const gaScriptInline = `
      window.dataLayer = window.dataLayer || [];
      function gtag(){dataLayer.push(arguments);}
      gtag('js', new Date());gtag('config', '${gaID}');
  `;
  const gtmScriptInline = `
    (function(w,d,s,l,i){
      w[l]=w[l]||[];w[l].push({'gtm.start': new Date().getTime(),event:'gtm.js'});
      var f=d.getElementsByTagName(s)[0],
      j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
      'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
    })(window,document,'script','dataLayer','${gtmID}');
  `;
  const querylyInline = `
    window.addEventListener('DOMContentLoaded', (event) => {
      queryly.init("${querylyId}", document.querySelectorAll("#fusion-app"));
    });
  `;

  const inlineScripts = [
    ...new Set([
      ...dangerouslyInjectJS,
      ...(chartbeatAccountId && chartbeatDomain ? [chartbeatInline] : []),
      ...(comscoreID ? [scriptCodeInline] : []),
      ...(gaID ? [gaScriptInline] : []),
      ...(gtmID ? [gtmScriptInline] : []),
      ...(querylyId ? [querylyInline] : []),
      "window.isIE = !!window.MSInputMethodContext && !!document.documentMode;", // Not sure window.isIE is even used.
    ]),
  ].join(";");

  let bureau;
  const isSection = isSiteSection(globalContent);
  if (isSection) {
    const sectionData = getSiteProperties(context);
    bureau = `${arcSite}-${sectionData?._id?.replace(/\//g, "")}`;
  } else {
    bureau = arcSite?.split("-")[0];
  }

  // custom metaValue to override specific keys and still use the default <Meta> component
  const customMetaValue = (key) => {
    // let's use meta-title if it's defined, otherwise let it handle it by default.
    if (globalContent?.type === "story") {
      if (key === "title") {
        const metaTitle = globalContent?.headlines?.meta_title;
        if (metaTitle) {
          return `${metaTitle} - ${websiteName}`;
        } else {
          return metaValue(key);
        }
      }

      if (key === "og:title" || key === "twitter:title") {
        return globalContent?.labels?.social_title || metaValue(key);
      }
    }
    return metaValue(key);
  };

  return (
    <html className={arcSite} lang={locale}>
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <MetaData
          arcSite={arcSite}
          canonicalDomain={
            /*
             * Overriding specific page types here for primary website article sources if available
             * author, homepage, *search, section, and tag will still go to the current site domain
             */
            metaValue("page-type")?.match(/^(article|gallery|video)$/)
              ? getProperties(arcSite)?.websiteDomain || null
              : null
          }
          facebookAdmins={facebookAdmins}
          fallbackImage={fallbackImage}
          globalContent={globalContent}
          outputCanonicalLink
          MetaTag={MetaTag}
          MetaTags={MetaTags}
          metaValue={customMetaValue}
          requestUri={requestUri}
          resizerURL={resizerURL}
          twitterUsername={twitterUsername}
          websiteName={websiteName}
          websiteDomain={websiteDomain}
        />
        {fontUrlLink(fontUrl)}
        <CivicMetaTags
          content={globalContent}
          arcSite={arcSite}
          parselyTags={parselyTags}
          websiteUrl={websiteDomain}
          websiteName={websiteName}
          pageType={metaValue("page-type")}
        />
        <link
          rel="apple-touch-icon"
          sizes="180x180"
          href={deployment(`${contextPath}/resources/images/${arcSite}/apple-touch-icon.png`)}
        />
        <link
          rel="icon"
          type="image/png"
          href={deployment(`${contextPath}/resources/images/${arcSite}/favicon-32x32.png`)}
        />
        <link
          rel="icon"
          type="image/png"
          href={deployment(`${contextPath}/resources/images/${arcSite}/favicon-16x16.png`)}
        />
        <meta name="fb:app_id" content={facebookAppId} />
        <CssLinks />
        <link
          rel="stylesheet"
          href={deployment(`${contextPath}/resources/site-theme/_css/${bureau}.min.css`)}
        />
        <Libs />
        <script
          async
          src="https://polyfill.io/v3/polyfill.min.js?features=IntersectionObserver%2CElement.prototype.prepend%2CElement.prototype.remove%2CArray.prototype.find%2CArray.prototype.includes"
        />
        <script
          data-integration="inlineScripts"
          dangerouslySetInnerHTML={{ __html: inlineScripts }}
        />
        {gaID ? (
          <script
            async
            data-integration="googleAnalyticsTag"
            src={`https://www.googletagmanager.com/gtag/js?id=${gaID}`}
          />
        ) : null}
        {nativoIntegration ? (
          <script async data-integration="nativo-ad" src="https://s.ntv.io/serve/load.js" />
        ) : null}
        {chartbeatAccountId && chartbeatDomain ? (
          <script
            async
            data-integration="chartbeat"
            src="https://static.chartbeat.com/js/chartbeat.js"
          />
        ) : null}
        {comscoreID ? (
          <script
            async
            data-integration="comscore"
            src="https://sb.scorecardresearch.com/beacon.js"
          />
        ) : null}
        {api?.retail?.script ? (
          <script defer data-integration="arcp" src={api?.retail?.script} />
        ) : null}
        {querylyCode(querylyId, arcSite, metaValue("page-type"))}
        {globalContent && (
          <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{
              __html: getSchema(globalContent, primaryLogo, websiteDomain, websiteName),
            }}
          ></script>
        )}
      </head>
      <body className={`content-${globalContent?.type}`}>
        {comscoreNoScript(comscoreID)}
        {googleTagManagerNoScript(gtmID)}
        <a className="skip-main" href="#main">
          Skip to main content
        </a>
        <div id="fusion-app" className="layout-section">
          {children}
        </div>
        <Fusion />
        <IconsMap />
      </body>
    </html>
  );
};

export default CivicOutputType;
