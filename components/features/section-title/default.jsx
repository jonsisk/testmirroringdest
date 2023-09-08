import PropTypes from "@arc-fusion/prop-types";
import React from "react";
import CustomContentSectionTitleCivic from "./_children/custom-content";
import GlobalContentSectionTitleCivic from "./_children/global-content";

const SectionTitleContainerCivic = ({
  customFields: { inheritGlobalContent = true, sectionContentConfig } = {},
} = {}) => {
  if (inheritGlobalContent) {
    return <GlobalContentSectionTitleCivic />;
  }

  return <CustomContentSectionTitleCivic contentConfig={sectionContentConfig} />;
};

SectionTitleContainerCivic.label = "Section Title – Civic";

SectionTitleContainerCivic.propTypes = {
  customFields: PropTypes.shape({
    sectionContentConfig: PropTypes.contentConfig().tag({
      group: "Configure Content",
      label: "Display Content Info",
    }),
    inheritGlobalContent: PropTypes.bool.tag({
      group: "Configure Content",
    }),
  }),
};

export default SectionTitleContainerCivic;
