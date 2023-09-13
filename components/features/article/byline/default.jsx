import { useFusionContext } from "fusion:context";
import React from "react";
import Byline from "../../../base/byline/byline.component";
import { getWebsiteDomain } from "../../../helpers/site.helper";

/**
 * Displays author name and date for the article
 */
const BylineFeature = () => {
  const { globalContent, arcSite } = useFusionContext();
  return <Byline element={globalContent} showTime websiteDomain={getWebsiteDomain(arcSite)} />;
};

BylineFeature.label = "Byline - Civic";
BylineFeature.description = "Shows byline and date for the article";

export default BylineFeature;
