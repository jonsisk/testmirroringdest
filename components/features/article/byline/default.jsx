import { useFusionContext } from "fusion:context";
import getProperties from "fusion:properties";
import React from "react";
import Byline from "../../../base/byline/byline.component";

/**
 * Displays author name and date for the article
 */
const BylineFeature = () => {
  const { globalContent, arcSite } = useFusionContext();
  const { websiteDomain } = getProperties(arcSite);

  return <Byline element={globalContent} websiteDomain={websiteDomain} type="story" />;
};

BylineFeature.label = "Byline - Civic";
BylineFeature.description = "Shows byline and date for the article";

export default BylineFeature;
