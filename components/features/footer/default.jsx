import { useContent } from "fusion:content";
import { useFusionContext } from "fusion:context";
import getProperties from "fusion:properties";
import PropTypes from "prop-types";
import React from "react";

const Footer = (props) => {
  const { arcSite, outputType } = useFusionContext();
  const { parentCommunity } = getProperties(arcSite);
  const { topHierachy, bottomHierarchy } = props.customFields;
  const { primaryLogo, primaryLogoAlt } = getProperties(
    parentCommunity ? parentCommunity : arcSite
  );

  const topFooter = useContent({
    source: "site-service-hierarchy-civic",
    query: {
      site: parentCommunity || arcSite,
      hierarchy: topHierachy,
    },
  });

  const bottomFooter = useContent({
    source: "site-service-hierarchy-civic",
    query: {
      site: parentCommunity || arcSite,
      hierarchy: bottomHierarchy,
    },
  });

  return (
    <div className="customfooter">
      {outputType === "amp" && (
        <section className="top">
          <a href="#top">Back To Top ↑</a>
        </section>
      )}
      <footer className="Page-footer">
        <div className="Page-footer-container">
          <div className="Page-footer-container-section Page-footer-container-links">
            <div className="Page-footer-container-logo">
              <a aria-label="home page" href="/">
                <img className="PageLogo-image" src={primaryLogo} alt={primaryLogoAlt} />
              </a>
            </div>

            <div className="Page-footer-container-navigation">
              <nav className="FooterNavigation">
                <ul className="FooterNavigation-items">
                  {topFooter &&
                    topFooter.children.map((item) => (
                      <li key={item._id} className="FooterNavigation-items-item">
                        <a href={item.url}>{item.display_name}</a>
                      </li>
                    ))}
                </ul>
              </nav>
            </div>

            <div className="Page-footer-container-navigation">
              <nav className="FooterNavigation">
                <ul className="FooterNavigation-items">
                  {bottomFooter &&
                    bottomFooter.children.map((item) => (
                      <li key={item._id} className="FooterNavigation-items-item">
                        <a href={item.url}>{item.display_name}</a>
                      </li>
                    ))}
                </ul>
              </nav>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

Footer.propTypes = {
  customFields: PropTypes.shape({
    topHierachy: PropTypes.string.tag({
      description: "Top hierarchy",
    }),
    bottomHierarchy: PropTypes.string.tag({
      description: "Bottom hierarchy",
    }),

    display: PropTypes.boolean,
  }),
};

Footer.label = "Custom Footer";

export default Footer;
