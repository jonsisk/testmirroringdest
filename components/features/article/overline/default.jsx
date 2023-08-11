import { useFusionContext } from "fusion:context";
import React from "react";
import "./styles.scss";

/**
 * Handles overline of the article that shows the assigned topics/sections
 */
const OverlineFeature = () => {
  const { globalContent, arcSite } = useFusionContext();
  if (!globalContent.taxonomy?.primary_section) return null;

  const { primary_section: primarySection, sections } = globalContent.taxonomy;

  return (
    <div className="breadcrumbs">
      {primarySection && <a href={primarySection.path}>{primarySection.name}</a>}
      {sections
        ?.filter((sec) => sec._id != primarySection._id && sec._website == arcSite)
        .map((section) => {
          return (
            <a key={section._id} href={section.path}>
              {section.name}
            </a>
          );
        })}
    </div>
  );
};

OverlineFeature.label = "Overline - Civic";
OverlineFeature.description = "Shows topics linked to the article";

export default OverlineFeature;
