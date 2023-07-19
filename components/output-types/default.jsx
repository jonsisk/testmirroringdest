import PropTypes from "prop-types";
import React from "react";
import "./main.scss";

const DefaultLayout = ({ children, contextPath, deployment, CssLinks, Fusion, Libs, MetaTags }) => (
  <html>
    <head>
      <title>Fusion Article</title>
      <MetaTags />
      <Libs />
      <CssLinks />
      <link
        rel="icon"
        type="image/x-icon"
        href={deployment(`${contextPath}/resources/favicon.ico`)}
      />
    </head>
    <body>
      <div id="fusion-app" className="container">
        {children}
      </div>
      <Fusion />
    </body>
  </html>
);

DefaultLayout.propTypes = {
  metaValue: PropTypes.any,
  MetaTags: PropTypes.any,
  Libs: PropTypes.any,
  CssLinks: PropTypes.any,
  Fusion: PropTypes.any,
  deployment: PropTypes.any,
  contextPath: PropTypes.string,
  children: PropTypes.any,
  MetaTag: PropTypes.any,
  siteProperties: PropTypes.any,
  requestUri: PropTypes.string,
};

export default DefaultLayout;
