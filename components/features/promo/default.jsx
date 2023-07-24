import { useFusionContext } from "fusion:context";
import PropTypes from "prop-types";
import React from "react";
import "./styles.scss";

const Promo = ({ customFields }) => {
  const { contextPath, deployment } = useFusionContext();
  const { title, description, ctaCopy, ctaURL } = customFields;

  return (
    <div className="GenericPagePromoModule">
      <div className="GenericPagePromoModule-content-wrapper">
        <div className="GenericPagePromoModule-content">
          <div className="GenericPagePromoModule-icon">
            <img
              className="Image"
              alt="Flag"
              width="52"
              height="68"
              src={deployment(`${contextPath}/resources/images/votebeat/flag.png`)}
            />
          </div>

          <div className="GenericPagePromoModule-title">{title}</div>

          <div className="GenericPagePromoModule-description">{description}</div>

          <div>
            <a
              className="GenericPagePromoModule-CTALink"
              href={ctaURL}
              target="_blank"
              rel="noreferrer"
            >
              {ctaCopy}
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

Promo.label = "Promo - Civic";
Promo.description = "Right rail promo banner";

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
  }),
};

export default Promo;
