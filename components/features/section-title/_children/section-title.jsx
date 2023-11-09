import { PrimaryFont } from "@wpmedia/shared-styles";
import { useFusionContext } from "fusion:context";
import React from "react";

const SectionTitleCivic = (props) => {
  const { content } = props;
  const context = useFusionContext();
  const { deployment, contextPath } = context;

  if (content?.sidebar && content.sidebar.sidebar_logo) {
    return (
      <>
        <div className="section-logo">
          <img
            src={
              content?.sidebar.sidebar_logo.startsWith("/")
                ? deployment(`${contextPath}/resources/images${content.sidebar.sidebar_logo}`)
                : content.sidebar.sidebar_logo
            }
          />
        </div>
        <h2 className="section-tagline">{content.site?.site_tagline}</h2>
      </>
    );
  }

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
