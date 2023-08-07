import { useContent } from "fusion:content";
import { useFusionContext } from "fusion:context";
import getProperties from "fusion:properties";
import PropTypes from "prop-types";
import React from "react";

const Footer = (props) => {
  const { arcSite } = useFusionContext();
  const { primaryLogo, primaryLogoAlt, parentCommunity } = getProperties(arcSite);
  const { topHierachy, bottomHierarchy } = props.customFields;

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
    message: PropTypes.string.tag({
      description: "Add a message",
    }),
    topHierachy: PropTypes.string.tag({
      description: "Top hierarchy",
    }),
    bottomHierarchy: PropTypes.string.tag({
      description: "Bottom hierarchy",
    }),
    textColor: PropTypes.oneOf(["purple", "green", "black"]).tag({
      description: "Text Color",
    }),
    textSize: PropTypes.oneOf(["18px", "30px", "66px", "100px"]).tag({
      description: "Text Size",
    }),
    display: PropTypes.boolean,
  }),
};

Footer.label = "Custom Footer";

export default Footer;
