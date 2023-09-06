import { useFusionContext } from "fusion:context";
import getProperties from "fusion:properties";
import React from "react";
import { GoogleReCaptchaProvider } from "react-google-recaptcha-v3";

const StaticLayout = ({ children }) => {
  const [navigation, fullWidth1, contentTitle, contentBody, fullWidth2, footer] = children;
  const { arcSite } = useFusionContext();
  const { recaptchaSiteKey } = getProperties(arcSite);
  return (
    <GoogleReCaptchaProvider reCaptchaKey={recaptchaSiteKey}>
      <div className={`site-${arcSite} page-staticLayout`}>
        <header className="header">{navigation}</header>
        <div className="fullWidth1">{fullWidth1}</div>
        <section role="main" className="container" tabIndex="-1">
          <div className="contentTitle">{contentTitle}</div>
          <div className="contentBody">{contentBody}</div>
        </section>
        <div className="fullWidth2">{fullWidth2}</div>
        <footer className="footer">{footer}</footer>
      </div>
    </GoogleReCaptchaProvider>
  );
};

StaticLayout.sections = [
  "navigation",
  "fullwidth1",
  "contentTitle",
  "contentBody",
  "fullwidth2",
  "footer",
];
StaticLayout.label = "Static Page - Civic Layout";

export default StaticLayout;
