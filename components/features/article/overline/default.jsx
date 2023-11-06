import { useFusionContext } from "fusion:context";
import React from "react";

/**
 * Handles overline of the article that shows the assigned topics/sections
 */
const OverlineFeature = () => {
  const { globalContent } = useFusionContext();
  if (!globalContent.taxonomy?.primary_section) return null;

  let { primary_section: primarySection, sections } = globalContent.taxonomy;

  if (
    primarySection?.additional_properties?.original?.bureau?.is_bureau_section === "true" ||
    primarySection?.additional_properties?.original?.site?.is_internal === "true" ||
    primarySection?.name?.startsWith("#StoryType")
  ) {
    // we won't show primary section if it's a bureu section or internal section
    primarySection = null;
  }

  return (
    <div className="breadcrumbs">
      {primarySection && <a href={`${primarySection.path}/`}>{primarySection.name}</a>}
      {sections
        ?.filter(
          (sec) =>
            !sec?.name?.startsWith("#StoryType") &&
            sec._id != primarySection?._id &&
            sec.additional_properties?.original?.bureau?.is_bureau_section !== "true" &&
            sec.additional_properties?.original?.site?.is_internal !== "true"
        )
        .slice(0, primarySection ? 2 : 3)
        .map((section) => {
          return (
            <a key={`${section._id}/`} href={section.path}>
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
