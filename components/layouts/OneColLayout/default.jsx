import { useFusionContext } from "fusion:context";
import React from "react";

const OneColLayout = ({ children }) => {
  const [navigation, overlay, overlayText, fullWidth, footer] = children;
  const { arcSite } = useFusionContext();

  return (
    <>
      <div className={`site-${arcSite} custom-layout oneColumn`}>
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
    </>
  );
};

OneColLayout.sections = ["navigation", "overlay", "overlayText", "fullwidth", "footer"];
OneColLayout.label = "One Column - Civic Layout";
export default OneColLayout;
