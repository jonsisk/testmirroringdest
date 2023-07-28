import { useFusionContext } from "fusion:context";
import React from "react";
import { ThemeComponent } from "./ThemeComponent";

const TwoColLayout = ({ children }) => {
  const [navigation, fullWidth1, main, rightRail, fullWidth2, footer] = children;
  const { arcSite } = useFusionContext();
  return (
    <>
      <ThemeComponent />
      <div className={`site-${arcSite}`}>
        <header className="header">{navigation}</header>
        <section role="main" id="main" className="main" tabIndex="-1">
          <div className="container layout-section">
            <div className="row-">
              <div className="col">{fullWidth1}</div>
            </div>
            <div className="row-">
              <div className="col">{main}</div>
              <div className="col">{rightRail}</div>
            </div>
            <div className="row-">
              <div className="col">{fullWidth2}</div>
            </div>
          </div>
        </section>
        <footer className="footer">{footer}</footer>
      </div>
    </>
  );
};

TwoColLayout.sections = ["navigation", "fullwidth1", "main", "rightrail", "fullwidth2", "footer"];
TwoColLayout.label = "Two Column - Civic Layout";
export default TwoColLayout;
