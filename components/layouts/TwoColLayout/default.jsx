import { useFusionContext } from "fusion:context";
import getProperties from "fusion:properties";
import React from "react";
import { GoogleReCaptchaProvider } from "react-google-recaptcha-v3";

const TwoColLayout = ({ children }) => {
  const [navigation, fullWidth1, main, rightRail, fullWidth2, footer] = children;
  const { arcSite } = useFusionContext();
  const { recaptchaSiteKey } = getProperties(arcSite);
  return (
    <GoogleReCaptchaProvider reCaptchaKey={recaptchaSiteKey}>
      <div className={`site-${arcSite} custom-layout page-twoColumn`}>
        <header className="header">{navigation}</header>
        <section role="main" tabIndex="-1">
          <div className="fullWidth1">{fullWidth1}</div>
          <div className="twoColumn">
            <main className="main">{main}</main>
            <aside>{rightRail}</aside>
          </div>
          <div className="fullWidth2">{fullWidth2}</div>
        </section>
        <footer className="footer">{footer}</footer>
      </div>
    </GoogleReCaptchaProvider>
  );
};

TwoColLayout.sections = ["navigation", "fullwidth1", "main", "rightrail", "fullwidth2", "footer"];
TwoColLayout.label = "Two Column - Civic Layout";
export default TwoColLayout;
