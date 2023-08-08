import { useFusionContext } from "fusion:context";
import React from "react";

const TwoColLayoutAMP = ({ children }) => {
  const [navigation, fullWidth1, main, rightRail, fullWidth2, footer] = children;
  const { arcSite } = useFusionContext();
  return (
    <>
      <header className="header">{navigation}</header>
      <div className={`site-${arcSite} Page-content`}>
        <section role="main" id="main" className="main" tabIndex="-1">
          <div className="container layout-section">
            <div className="row-">
              <div className="col">{fullWidth1}</div>
              <div className="col">{main}</div>
              <div className="col">{rightRail}</div>
              <div className="col">{fullWidth2}</div>
            </div>
          </div>
        </section>
      </div>
      {footer}
    </>
  );
};

TwoColLayoutAMP.sections = [
  "navigation",
  "fullwidth1",
  "main",
  "rightrail",
  "fullwidth2",
  "footer",
];
TwoColLayoutAMP.label = "Two Column - Civic Layout";
export default TwoColLayoutAMP;
