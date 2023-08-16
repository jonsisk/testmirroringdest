import { useFusionContext } from "fusion:context";
import React from "react";
import Byline from "../../../base/byline/byline.component";

/**
 * Displays author name and date for the article
 */
const BylineFeature = () => {
  const { globalContent } = useFusionContext();

  return <Byline element={globalContent} />;
};

BylineFeature.label = "Byline - Civic";
BylineFeature.description = "Shows byline and date for the article";

export default BylineFeature;
