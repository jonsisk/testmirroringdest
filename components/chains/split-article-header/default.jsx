import PropTypes from "@arc-fusion/prop-types";
import { useFusionContext } from "fusion:context";
import getProperties from "fusion:properties";
import React from "react";
import { isSiteSection, getSiteProperties } from "../../helpers/site.helper";

const SplitArticleHeader = (props) => {
  const context = useFusionContext();
  const { arcSite, globalContent } = context;
  const { style } = props.customFields;
  const [articleImage, ...elements] = props.children;
  const { lightBackgroundLogo, lightBackgroundLogoAlt } = isSiteSection(globalContent)
    ? getSiteProperties(context)
    : getProperties(arcSite);

  switch (style) {
    case "right":
      return (
        <div className={`split-header ${style}`}>
          <div className="split-text-container">
            <a className="split-logo-link" aria-label="home page" href="/" data-cms-ai="0">
              <img className="split-logo" src={lightBackgroundLogo} alt={lightBackgroundLogoAlt} />
            </a>
            {elements}
          </div>
          <div className="split-image-container">{articleImage}</div>
        </div>
      );
    case "left":
      return (
        <div className={`split-header ${style}`}>
          <div className="split-image-container">
            <a className="split-logo-link" aria-label="home page" href="/" data-cms-ai="0">
              <img className="split-logo" src={lightBackgroundLogo} alt={lightBackgroundLogoAlt} />
            </a>
            {articleImage}
          </div>
          <div className="split-text-container">{elements}</div>
        </div>
      );
    default:
      return null;
  }
};

SplitArticleHeader.propTypes = {
  customFields: PropTypes.shape({
    style: PropTypes.oneOf(["left", "right"]).tag({
      label: "Style",
      defaultValue: "left",
      description: "Header alignment",
    }),
  }),
};

SplitArticleHeader.label = "Split Article Header - Civic";
SplitArticleHeader.static = true;

export default SplitArticleHeader;
