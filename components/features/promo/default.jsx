import { useFusionContext } from "fusion:context";
import PropTypes from "prop-types";
import React from "react";

const Promo = ({ customFields }) => {
  const { contextPath, deployment, outputType } = useFusionContext();
  const { title, description, ctaCopy, ctaURL, bgColor, imageName } = customFields;

  if (outputType === "amp") return null;

  return (
    <div className="GenericPagePromoModule" style={{ backgroundColor: bgColor }}>
      <div className="GenericPagePromoModule-content-wrapper">
        <div className="GenericPagePromoModule-content">
          {imageName != null ? (
            <div className="GenericPagePromoModule-icon">
              <img
                className="Image"
                alt={imageName}
                width="52"
                height="68"
                src={deployment(`${contextPath}/resources/images/${imageName}.png`)}
              />
            </div>
          ) : (
            <div />
          )}

          <div className="GenericPagePromoModule-title">{title}</div>

          <div className="GenericPagePromoModule-description">{description}</div>

          {ctaCopy != null ? (
            <div className="GenericPagePromoModule-link">
              <a
                className="GenericPagePromoModule-CTALink"
                href={ctaURL}
                target="_blank"
                rel="noreferrer"
              >
                {ctaCopy}
              </a>
            </div>
          ) : (
            <div />
          )}
        </div>
      </div>
    </div>
  );
};

Promo.label = "Promo Banner - Civic";
Promo.description = "Right rail promo banner";
Promo.static = true;

Promo.propTypes = {
  customFields: PropTypes.shape({
    title: PropTypes.string.tag({
      label: "Title",
      group: "Configure Content",
    }),
    description: PropTypes.string.tag({
      label: "Description",
      group: "Configure Content",
    }),
    ctaCopy: PropTypes.string.tag({
      label: "CTA Copy",
      group: "Configure Content",
    }),
    ctaURL: PropTypes.string.tag({
      label: "CTA URL",
      group: "Configure Content",
    }),
    bgColor: PropTypes.string.tag({
      label: "Background Color in hex (e.g: #fce487)",
      group: "Configure Content",
    }),
    imageName: PropTypes.oneOf(["flag", "heart", "facebook"]).tag({
      label: "Image",
      group: "Configure Content",
    }),
  }),
};

export default Promo;
