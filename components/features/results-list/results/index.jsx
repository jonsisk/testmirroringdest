import { Button, BUTTON_STYLES, BUTTON_TYPES } from "@wpmedia/shared-styles";
import { useContent } from "fusion:content";
// import getProperties from "fusion:properties";
import React, { createRef, useCallback, useEffect, useReducer, useState } from "react";
import ResultItem from "../../../base/article/result-list.component";
import { getActualSiteName } from "../../../helpers/article.helper";
import { reduceResultList } from "../../../helpers/list.helpers";

const Results = ({
  arcSite,
  outputType,
  configuredOffset,
  configuredSize,
  contentConfigValues,
  contentService,
  imageProperties,
  imagePropertiesFeatured,
  isServerSideLazy = false,
  phrases,
  showAsList = true,
  showByline = false,
  showDate = false,
  showDescription = false,
  showHeadline = false,
  showImage = false,
  showItemOverline = false,
  targetFallbackImage,
  showPagination = true,
  showFeatured = true,
  filteredArticles = [],
  globalContent,
}) => {
  const [queryOffset, setQueryOffset] = useState(configuredOffset);

  const placeholderResizedImageOptions = useContent({
    source: !targetFallbackImage.includes("/resources/") ? "resize-image-api" : null,
    query: { raw_image_url: targetFallbackImage, respect_aspect_ratio: true },
  });

  const serviceQueryPage = useCallback(
    (requestedOffset) => {
      /*
      This sets up a window view of the data starting from the initial index
      to *twice* the size.  When clicking on the more button, we will render
      the next size worth of items and load the next size from the server.
    */
      const size = requestedOffset === configuredOffset ? configuredSize * 2 : configuredSize;
      const offset =
        requestedOffset === configuredOffset ? configuredOffset : requestedOffset + configuredSize;
      switch (contentService) {
        case "story-feed-author":
        case "story-feed-sections":
        case "story-feed-no-dup-civic":
        case "story-feed-tag": {
          return { feedOffset: offset, feedSize: size };
        }
        case "content-api-collections": {
          return { from: offset, size: configuredSize, getNext: true };
        }
        default: {
          break;
        }
      }
      return { offset, size };
    },
    [configuredOffset, configuredSize, contentService]
  );

  const requestedResultList = useContent({
    source: isServerSideLazy ? null : contentService,
    query: {
      ...contentConfigValues,
      filteredArticles: filteredArticles,
      feature: "results-list",
      ...serviceQueryPage(queryOffset),
    },
  });

  const [resultList, alterResultList] = useReducer(reduceResultList, requestedResultList);

  useEffect(() => {
    if (requestedResultList) {
      alterResultList({
        type: "appendUnique",
        data: requestedResultList,
      });
    }
  }, [requestedResultList]);

  const [elementRefs, setElementRefs] = useState([]);
  const [focalElement, setFocalElement] = useState(null);
  useEffect(() => {
    setElementRefs((existingRefs) => {
      const refArray = existingRefs.concat(
        requestedResultList?.content_elements
          ? requestedResultList.content_elements.map(() => createRef())
          : []
      );
      if (queryOffset !== configuredOffset) {
        // ignore the first item for focus purposes
        const topItem = queryOffset - configuredOffset;
        setFocalElement(refArray[topItem]);
      }
      return refArray;
    });
  }, [configuredOffset, queryOffset, requestedResultList]);

  useEffect(() => {
    if (focalElement?.current) {
      const focusLink = focalElement.current.querySelector("a:not([aria-hidden])");
      if (focusLink) {
        focusLink.focus();
      }
    }
  }, [focalElement]);

  const viewableElements = resultList?.content_elements.slice(
    0,
    queryOffset + configuredSize - configuredOffset
  );

  const fullListLength = resultList?.count
    ? resultList?.count - configuredOffset
    : resultList?.content_elements.length;

  const isThereMore = requestedResultList?.next || viewableElements?.length < fullListLength;

  const onReadMoreClick = useCallback(() => {
    setQueryOffset((oldOffset) => oldOffset + configuredSize);
  }, [configuredSize, setQueryOffset]);

  const getWebsiteName = (element) => {
    return getActualSiteName(element);
  };

  return viewableElements?.length > 0 && !isServerSideLazy ? (
    <div className="results-list-container">
      {viewableElements.map((element, index) => (
        <ResultItem
          key={`result-card-${element._id}`}
          ref={elementRefs[index]}
          arcSite={arcSite}
          element={element}
          imageProperties={imageProperties}
          imagePropertiesFeatured={imagePropertiesFeatured}
          placeholderResizedImageOptions={placeholderResizedImageOptions}
          showAsList={showAsList}
          showByline={showByline && outputType !== "amp"}
          showDate={showDate && outputType !== "amp"}
          showDescription={showDescription && outputType !== "amp"}
          showHeadline={showHeadline}
          showImage={showImage}
          showItemOverline={showItemOverline || outputType === "amp"}
          targetFallbackImage={targetFallbackImage}
          showFeatured={showFeatured}
          websiteName={getWebsiteName(element)}
          globalContent={globalContent}
        />
      ))}
      {isThereMore && showPagination && showAsList && (
        <div className="see-more">
          <Button
            ariaLabel={"More Stories"}
            buttonStyle={BUTTON_STYLES.PRIMARY}
            buttonTypes={BUTTON_TYPES.LABEL_ONLY}
            onClick={onReadMoreClick}
            text={"More Stories"}
          />
        </div>
      )}
    </div>
  ) : null;
};

export default Results;
