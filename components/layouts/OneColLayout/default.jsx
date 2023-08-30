import { useFusionContext } from "fusion:context";
import getProperties from "fusion:properties";
import React from "react";
import { GoogleReCaptchaProvider } from "react-google-recaptcha-v3";

const OneColLayout = ({ children }) => {
  const [navigation, overlay, overlayText, fullWidth, footer] = children;
  const { arcSite, globalContent } = useFusionContext();
  const { recaptchaSiteKey } = getProperties(arcSite);

  return (
    <GoogleReCaptchaProvider reCaptchaKey={recaptchaSiteKey}>
      <div
        className={`site-${arcSite} custom-layout oneColumn story-layout-${globalContent?.subtype}`}
      >
        <header className="header">{navigation}</header>
        <div className="overlay-header">
          <div className="overlay-image">{overlay}</div>
          <div className="overlay-text">{overlayText}</div>
        </div>
        <section role="main" id="main" className="main" tabIndex="-1">
          <div className="container layout-section">
            <div className="row-">
              <div className="col">{fullWidth}</div>
            </div>
          </div>
        </section>
        <footer className="footer">{footer}</footer>
      </div>
    </GoogleReCaptchaProvider>
  );
};

OneColLayout.sections = ["navigation", "overlay", "overlayText", "fullWidth", "footer"];
OneColLayout.label = "One Column - Civic Layout";
export default OneColLayout;
