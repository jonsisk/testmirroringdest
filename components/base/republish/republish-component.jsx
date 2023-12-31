import getProperties from "fusion:properties";
import React, { useRef } from "react";
import { getRepublishableArticle } from "../../helpers/republish.helper";

/**
 * Handles the textarea display of a republished article
 */
const RepublishComponent = ({ arcSite, article, type }) => {
  const { websiteName, websiteDomain, republishHeader, republishFooter } = getProperties(arcSite);

  let repHeader = republishHeader;
  let repFooter = republishFooter;

  const output = getRepublishableArticle(
    article,
    type,
    websiteName,
    websiteDomain,
    repHeader,
    repFooter
  );
  const textareaRef = useRef(null);

  const handleTextareaClick = () => {
    textareaRef.current.select();
  };

  return (
    <textarea
      ref={textareaRef}
      readOnly={true}
      defaultValue={output}
      onClick={handleTextareaClick}
    />
  );
};

export default RepublishComponent;
