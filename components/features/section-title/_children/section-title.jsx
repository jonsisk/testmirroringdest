import { PrimaryFont } from "@wpmedia/shared-styles";
import React from "react";

const SectionTitleCivic = (props) => {
  const { content } = props;

  return (
    !!(content && (content.name || content.display_name)) && (
      <>
        <PrimaryFont as="h1" className="section-title">
          {content.name || content.display_name}
        </PrimaryFont>
        <h2 className="section-tagline">{content.site?.site_tagline}</h2>
      </>
    )
  );
};

export default SectionTitleCivic;
