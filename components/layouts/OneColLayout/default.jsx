import { useFusionContext } from "fusion:context";
import React from "react";
import "./default.scss";

const OneColLayout = ({ children }) => {
  const [navigation, fullWidth, footer] = children;
  const { arcSite } = useFusionContext();

  return (
    <div className={`site-${arcSite}`}>
      <header className="header">{navigation}</header>
      <section role="main" id="main" className="main" tabIndex="-1">
        <div className="container layout-section">
          <div className="row-">
            <div className="col">{fullWidth}</div>
          </div>
        </div>
      </section>
      <footer className="footer">{footer}</footer>
    </div>
  );
};

OneColLayout.sections = ["navigation", "fullwidth", "footer"];
OneColLayout.label = "One Column - Civic Layout";
export default OneColLayout;
