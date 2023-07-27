import { useFusionContext } from "fusion:context";
import React from "react";

const OneColLayout = ({ children }) => {
  const [navigation, fullWidth, footer] = children;
  const { arcSite, contextPath, deployment } = useFusionContext();
  const theme = arcSite.split("-")[0];

  return (
    <>
      <link
        rel="stylesheet"
        href={deployment(`${contextPath}/resources/site-theme/${theme}.css`)}
      />
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
    </>
  );
};

OneColLayout.sections = ["navigation", "fullwidth", "footer"];
OneColLayout.label = "One Column - Civic Layout";
export default OneColLayout;
