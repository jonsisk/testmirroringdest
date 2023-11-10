import { useFusionContext } from "fusion:context";
import PropTypes from "prop-types";
import React from "react";

const Promo = ({ customFields }) => {
  const { outputType } = useFusionContext();
  const { title, description, bgColor } = customFields;

  if (outputType === "amp") return null;

  return (
    <div className="GenericPageInfoModule" style={{ backgroundColor: bgColor }}>
      <div className="GenericPagePromoModule-content-wrapper">
        <div className="GenericPagePromoModule-content">
          <div className="GenericPagePromoModule-title">{title}</div>

          <div className="GenericPagePromoModule-description">{description}</div>
        </div>
      </div>
    </div>
  );
};

Promo.label = "Info Block - Civic";
Promo.description = "Right rail info block";
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

    bgColor: PropTypes.string.tag({
      label: "Background Color in hex (e.g: #fce487)",
      group: "Configure Content",
    }),
  }),
};

export default Promo;
