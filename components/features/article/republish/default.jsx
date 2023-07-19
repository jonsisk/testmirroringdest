import { useFusionContext } from "fusion:context";
import PropTypes from "prop-types";
import React from "react";
import RepublishComponent from "../../../base/republish/republish-component";

/**
 * Handles republish textareas where articles are displayed as HTML and plain text
 */
const RepublishFeature = ({ customFields }) => {
  const { globalContent: items = {}, arcSite } = useFusionContext();

  const { titleHtml, titlePlain, instructionsHtml, instructionsPlain } = customFields;

  return (
    <div className="republishForm">
      <h3>{titleHtml}</h3>
      <p>{instructionsHtml}</p>
      <RepublishComponent article={items} type="html" arcSite={arcSite} />

      <h2>{titlePlain}</h2>
      <p>{instructionsPlain}</p>
      <RepublishComponent article={items} type="plain" arcSite={arcSite} />
    </div>
  );
};

RepublishFeature.label = "Republish - Civic";
RepublishFeature.description = "Shows republish code in html and plain text";

RepublishFeature.propTypes = {
  customFields: PropTypes.shape({
    titleHtml: PropTypes.string.tag({
      label: "Title HTML section",
      group: "Configure Content",
    }),
    instructionsHtml: PropTypes.string.tag({
      label: "Instructions HTML section",
      group: "Configure Content",
    }),
    titlePlain: PropTypes.string.tag({
      label: "Title Plain Text section",
      group: "Configure Content",
    }),
    instructionsPlain: PropTypes.string.tag({
      label: "Instructions Plain Text section",
      group: "Configure Content",
    }),
  }),
};

export default RepublishFeature;
