import { useFusionContext } from "fusion:context";
import getProperties from "fusion:properties";
import React from "react";
import { GoogleReCaptchaProvider } from "react-google-recaptcha-v3";

const TwoColLayout = ({ children }) => {
  const [
    navigation,
    fullWidth1,
    main,
    rightRail,
    fullWidth2,
    main2,
    rightRail2,
    footer,
    fullWidth3,
  ] = children;
  const { arcSite } = useFusionContext();
  const { recaptchaSiteKey } = getProperties(arcSite);
  return (
    <GoogleReCaptchaProvider reCaptchaKey={recaptchaSiteKey}>
      <div className={`site-${arcSite} custom-layout page-twoColumn`}>
        <header className="header">{navigation}</header>
        <section role="main" tabIndex="-1">
          <div className="fullWidth1">{fullWidth1}</div>
          <div className="twoColumn">
            <main>{main}</main>
            <aside>{rightRail}</aside>
          </div>
          <div className="fullWidth2">{fullWidth2}</div>
          <div className="twoColumn">
            <main>{main2}</main>
            <aside>{rightRail2}</aside>
          </div>
          <div className="fullWidth3">{fullWidth3}</div>
        </section>
        <footer className="footer">{footer}</footer>
      </div>
    </GoogleReCaptchaProvider>
  );
};

TwoColLayout.sections = [
  "navigation",
  "fullwidth1",
  "main",
  "rightrail",
  "fullwidth2",
  "main2",
  "rightRail2",
  "fullWidth3",
  "footer",
];
TwoColLayout.label = "Two Column Plus XL - Civic Layout";
export default TwoColLayout;
