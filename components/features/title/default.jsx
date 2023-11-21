import { useFusionContext } from "fusion:context";
import PropTypes from "prop-types";
import React from "react";

const Promo = ({ customFields }) => {
  const { contextPath, deployment, outputType } = useFusionContext();
  const { title, subtitle, imageName } = customFields;

  if (outputType === "amp") return null;

  return (
    <div className="PageHeading-content">
      <div className="">
        <div>
          {imageName != null ? (
            <div className="GenericPagePromoModule-icon">
              <img
                className="Image"
                alt={imageName}
                src={deployment(
                  `${contextPath}/resources/images/chalkbeat/sections/${imageName}.png`
                )}
              />
            </div>
          ) : (
            <div />
          )}

          <h1>{title}</h1>

          <h2>{subtitle}</h2>
        </div>
      </div>
    </div>
  );
};

Promo.label = "Title - Civic";
Promo.description = "Right rail promo banner";
Promo.static = true;

Promo.propTypes = {
  customFields: PropTypes.shape({
    title: PropTypes.string.tag({
      label: "Title",
      group: "Configure Content",
    }),
    subtitle: PropTypes.string.tag({
      label: "Sub title",
      group: "Configure Content",
    }),

    imageName: PropTypes.oneOf(["student-voice", "meeting"]).tag({
      label: "Image",
      group: "Configure Content",
    }),
  }),
};

export default Promo;
