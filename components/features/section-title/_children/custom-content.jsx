import { useContent } from "fusion:content";
import React from "react";
import SectionTitleCivic from "./section-title";

const CustomContentSectionTitleCivic = ({ contentConfig }) => {
  const content =
    useContent({
      source: contentConfig.contentService,
      query: contentConfig.contentConfigValues,
    }) || {};

  return <SectionTitleCivic content={content} />;
};

export default CustomContentSectionTitleCivic;
