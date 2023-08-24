import { useFusionContext } from "fusion:context";
import React from "react";

const SideBySideLayout = ({ children }) => {
  const [navigation, fullWidth1, main, rightRail, fullWidth2, footer] = children;
  const { arcSite } = useFusionContext();
  return (
    <>
      <div className={`site-${arcSite} page-sideBySide`}>
        <header className="header">{navigation}</header>
        <section role="main" tabIndex="-1">
          <div className="fullWidth1">{fullWidth1}</div>
          <div className="sideBySide">
            <main>{main}</main>
            <aside>{rightRail}</aside>
          </div>
          <div className="fullWidth2">{fullWidth2}</div>
        </section>
        <footer className="footer">{footer}</footer>
      </div>
    </>
  );
};

SideBySideLayout.sections = [
  "navigation",
  "fullwidth1",
  "main",
  "rightrail",
  "fullwidth2",
  "footer",
];
SideBySideLayout.label = "Side by Side - Civic Layout";
export default SideBySideLayout;
