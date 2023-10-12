import { useContent } from "fusion:content";
import React, { createRef, useCallback, useEffect, useReducer, useState } from "react";
import { LIST_FILTER } from "../../../../content/helpers/filters.helper";
import HeroItem from "../../../base/article/hero-article.component";
import ResultItem from "../../../base/article/result-list.component";
import { getActualSiteName } from "../../../helpers/article.helper";
import { reduceResultList } from "../../../helpers/list.helpers";
import { useArticleStore } from "../../stores/articles.store";

const sizeMap = {
  ListG: 3,
  ListP: 5,
  ListA: 9,
  ListU: 7,
  ListZ: 6,
  ListAH: 5,
  ListQ: 5,
  ListS: 1,
  ListT: 5,
};

const Results = ({
  arcSite,
  configuredOffset,
  configuredSize,
  contentConfigValues,
  contentService,
  imageProperties,
  imagePropertiesFeatured,
  imagePropertiesHero,
  isServerSideLazy = false,
  phrases,
  showByline = false,
  showDate = false,
  showDescription = false,
  showHeadline = false,
  showImage = false,
  showItemOverline = false,
  targetFallbackImage,
  showFeatured = true,
  filteredArticles = [],
  listType,
  globalContent,
}) => {
  const [queryOffset] = useState(configuredOffset);
  const addArticle = useArticleStore((state) => state.addArticle);

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
        case "story-feed-author-civic":
        case "story-feed-sections":
        case "story-feed-sections-civic":
        case "story-feed-no-dup-civic":
        case "story-feed-tag": {
          return { feedOffset: offset, feedSize: size };
        }
        case "content-api-collections-civic":
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
    filter: LIST_FILTER(arcSite),
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

  //get the min val between configuredSize and a specific value depending on listStyle value
  const actualSize = Math.min(configuredSize, sizeMap[listType]);

  const viewableElements = resultList?.content_elements.slice(
    0,
    queryOffset + actualSize - configuredOffset
  );

  const getWebsiteName = (element) => {
    return getActualSiteName(element);
  };

  if (viewableElements) {
    viewableElements.forEach((element) => {
      addArticle(element._id);
    });
  }

  switch (listType) {
    case "ListP":
    case "ListG":
      if (viewableElements?.length > 0) {
        const [firstElement, ...restElements] = viewableElements;
        return viewableElements?.length > 0 && !isServerSideLazy ? (
          <div className={`results-list-container ${listType}`}>
            <div className="PageListP-items-column">
              <ResultItem
                key={`result-card-${firstElement._id}`}
                ref={elementRefs[0]}
                arcSite={arcSite}
                element={firstElement}
                imageProperties={imagePropertiesFeatured}
                imagePropertiesFeatured={imagePropertiesFeatured}
                placeholderResizedImageOptions={placeholderResizedImageOptions}
                showAsList={false}
                showByline={showByline}
                showDate={showDate}
                showDescription={showDescription}
                showHeadline={showHeadline}
                showImage={showImage}
                showItemOverline={showItemOverline}
                targetFallbackImage={targetFallbackImage}
                showFeatured={showFeatured}
                websiteName={getWebsiteName(firstElement)}
                globalContent={globalContent}
              />
            </div>
            <div className="PageListP-items-column">
              {restElements &&
                restElements.map((element, index) => (
                  <ResultItem
                    key={`result-card-${element._id}`}
                    ref={elementRefs[index]}
                    arcSite={arcSite}
                    element={element}
                    imageProperties={imageProperties}
                    imagePropertiesFeatured={imagePropertiesFeatured}
                    placeholderResizedImageOptions={placeholderResizedImageOptions}
                    showAsList={false}
                    showByline={showByline}
                    showDate={showDate}
                    showDescription={showDescription}
                    showHeadline={showHeadline}
                    showImage={showImage}
                    showItemOverline={showItemOverline}
                    targetFallbackImage={targetFallbackImage}
                    showFeatured={showFeatured}
                    websiteName={getWebsiteName(element)}
                    globalContent={globalContent}
                  />
                ))}
            </div>
          </div>
        ) : null;
      } else {
        return null;
      }

    case "ListA":
      if (viewableElements?.length > 0) {
        const [firstElement, ...restElements] = viewableElements;
        //slice the viewableElements in 3 groups, the first element, the next 4 elements and the last 4 elements
        const secondGroup = restElements.slice(0, 4);
        const thirdGroup = restElements.slice(4, 8);
        return viewableElements?.length > 0 && !isServerSideLazy ? (
          <div className={`results-list-container ${listType}`}>
            <div className="PageListP-items-column">
              <ResultItem
                key={`result-card-${firstElement._id}`}
                ref={elementRefs[0]}
                arcSite={arcSite}
                element={firstElement}
                imageProperties={imagePropertiesFeatured}
                imagePropertiesFeatured={imagePropertiesFeatured}
                placeholderResizedImageOptions={placeholderResizedImageOptions}
                showAsList={false}
                showByline={showByline}
                showDate={showDate}
                showDescription={showDescription}
                showHeadline={showHeadline}
                showImage={showImage}
                showItemOverline={showItemOverline}
                targetFallbackImage={targetFallbackImage}
                showFeatured={showFeatured}
                websiteName={getWebsiteName(firstElement)}
                globalContent={globalContent}
              />
            </div>
            <div className="PageListP-items-column">
              {secondGroup &&
                secondGroup.map((element, index) => (
                  <ResultItem
                    key={`result-card-${element._id}`}
                    ref={elementRefs[index]}
                    arcSite={arcSite}
                    element={element}
                    imageProperties={imageProperties}
                    imagePropertiesFeatured={imagePropertiesFeatured}
                    placeholderResizedImageOptions={placeholderResizedImageOptions}
                    showAsList={false}
                    showByline={showByline}
                    showDate={showDate}
                    showDescription={false}
                    showHeadline={showHeadline}
                    showImage={false}
                    showItemOverline={showItemOverline}
                    targetFallbackImage={targetFallbackImage}
                    showFeatured={false}
                    websiteName={getWebsiteName(element)}
                    globalContent={globalContent}
                  />
                ))}
            </div>

            <div className="items-row-below">
              {thirdGroup &&
                thirdGroup.map((element, index) => (
                  <ResultItem
                    key={`result-card-${element._id}`}
                    ref={elementRefs[index]}
                    arcSite={arcSite}
                    element={element}
                    imageProperties={imageProperties}
                    imagePropertiesFeatured={imagePropertiesFeatured}
                    placeholderResizedImageOptions={placeholderResizedImageOptions}
                    showAsList={false}
                    showByline={showByline}
                    showDate={showDate}
                    showDescription={false}
                    showHeadline={showHeadline}
                    showImage={true}
                    showItemOverline={showItemOverline}
                    targetFallbackImage={targetFallbackImage}
                    showFeatured={false}
                    websiteName={getWebsiteName(element)}
                    globalContent={globalContent}
                  />
                ))}
            </div>
          </div>
        ) : null;
      } else {
        return null;
      }

    case "ListU":
      if (viewableElements?.length > 0) {
        const [firstElement, ...restElements] = viewableElements;
        //slice the viewableElements in 3 groups
        const secondGroup = restElements.slice(0, 2);
        const thirdGroup = restElements.slice(2);
        return viewableElements?.length > 0 && !isServerSideLazy ? (
          <div className={`results-list-container ${listType}`}>
            <div className="PageListP-items-column">
              <ResultItem
                key={`result-card-${firstElement._id}`}
                ref={elementRefs[0]}
                arcSite={arcSite}
                element={firstElement}
                imageProperties={imagePropertiesFeatured}
                imagePropertiesFeatured={imagePropertiesFeatured}
                placeholderResizedImageOptions={placeholderResizedImageOptions}
                showAsList={false}
                showByline={showByline}
                showDate={showDate}
                showDescription={showDescription}
                showHeadline={showHeadline}
                showImage={showImage}
                showItemOverline={showItemOverline}
                targetFallbackImage={targetFallbackImage}
                showFeatured={showFeatured}
                websiteName={getWebsiteName(firstElement)}
                globalContent={globalContent}
              />
            </div>
            <div className="PageListP-items-column">
              {secondGroup &&
                secondGroup.map((element, index) => (
                  <ResultItem
                    key={`result-card-${element._id}`}
                    ref={elementRefs[index]}
                    arcSite={arcSite}
                    element={element}
                    imageProperties={imageProperties}
                    imagePropertiesFeatured={imagePropertiesFeatured}
                    placeholderResizedImageOptions={placeholderResizedImageOptions}
                    showAsList={false}
                    showByline={showByline}
                    showDate={showDate}
                    showDescription={false}
                    showHeadline={showHeadline}
                    showImage={true}
                    showItemOverline={showItemOverline}
                    targetFallbackImage={targetFallbackImage}
                    showFeatured={false}
                    websiteName={getWebsiteName(element)}
                    globalContent={globalContent}
                  />
                ))}
            </div>

            <div className="PageListP-items-column">
              {thirdGroup &&
                thirdGroup.map((element, index) => (
                  <ResultItem
                    key={`result-card-${element._id}`}
                    ref={elementRefs[index]}
                    arcSite={arcSite}
                    element={element}
                    imageProperties={imageProperties}
                    imagePropertiesFeatured={imagePropertiesFeatured}
                    placeholderResizedImageOptions={placeholderResizedImageOptions}
                    showAsList={false}
                    showByline={showByline}
                    showDate={showDate}
                    showDescription={false}
                    showHeadline={showHeadline}
                    showImage={false}
                    showItemOverline={showItemOverline}
                    targetFallbackImage={targetFallbackImage}
                    showFeatured={false}
                    websiteName={getWebsiteName(element)}
                    globalContent={globalContent}
                  />
                ))}
            </div>
          </div>
        ) : null;
      } else {
        return null;
      }

    case "ListZ":
      if (viewableElements?.length > 0) {
        const [firstElement, secondElement, ...restElements] = viewableElements;
        //slice the viewableElements in 3 groups
        return viewableElements?.length > 0 && !isServerSideLazy ? (
          <div className={`results-list-container ${listType}`}>
            <div className="PageListP-items-column">
              <ResultItem
                key={`result-card-${firstElement._id}`}
                ref={elementRefs[0]}
                arcSite={arcSite}
                element={firstElement}
                imageProperties={imagePropertiesFeatured}
                imagePropertiesFeatured={imagePropertiesFeatured}
                placeholderResizedImageOptions={placeholderResizedImageOptions}
                showAsList={false}
                showByline={showByline}
                showDate={showDate}
                showDescription={showDescription}
                showHeadline={showHeadline}
                showImage={showImage}
                showItemOverline={showItemOverline}
                targetFallbackImage={targetFallbackImage}
                showFeatured={showFeatured}
                websiteName={getWebsiteName(firstElement)}
                globalContent={globalContent}
              />
            </div>
            <div className="PageListP-items-column">
              <ResultItem
                key={`result-card-${secondElement._id}`}
                ref={elementRefs[1]}
                arcSite={arcSite}
                element={secondElement}
                imageProperties={imagePropertiesFeatured}
                imagePropertiesFeatured={imagePropertiesFeatured}
                placeholderResizedImageOptions={placeholderResizedImageOptions}
                showAsList={false}
                showByline={showByline}
                showDate={showDate}
                showDescription={showDescription}
                showHeadline={showHeadline}
                showImage={showImage}
                showItemOverline={showItemOverline}
                targetFallbackImage={targetFallbackImage}
                showFeatured={showFeatured}
                websiteName={getWebsiteName(secondElement)}
                globalContent={globalContent}
              />
            </div>

            <div className="items-row-below">
              {restElements &&
                restElements.map((element, index) => (
                  <ResultItem
                    key={`result-card-${element._id}`}
                    ref={elementRefs[index]}
                    arcSite={arcSite}
                    element={element}
                    imageProperties={imageProperties}
                    imagePropertiesFeatured={imagePropertiesFeatured}
                    placeholderResizedImageOptions={placeholderResizedImageOptions}
                    showAsList={false}
                    showByline={showByline}
                    showDate={showDate}
                    showDescription={false}
                    showHeadline={showHeadline}
                    showImage={false}
                    showItemOverline={showItemOverline}
                    targetFallbackImage={targetFallbackImage}
                    showFeatured={false}
                    websiteName={getWebsiteName(element)}
                    globalContent={globalContent}
                  />
                ))}
            </div>
          </div>
        ) : null;
      } else {
        return null;
      }

    case "ListAH":
      if (viewableElements?.length > 0) {
        const [firstElement, ...restElements] = viewableElements;
        const secondGroup = restElements.slice(0, 2);
        const thirdGroup = restElements.slice(2);
        return viewableElements?.length > 0 && !isServerSideLazy ? (
          <div className={`results-list-container ${listType}`}>
            <div className="PageListP-items-column">
              <ResultItem
                key={`result-card-${firstElement._id}`}
                ref={elementRefs[0]}
                arcSite={arcSite}
                element={firstElement}
                imageProperties={imagePropertiesFeatured}
                imagePropertiesFeatured={imagePropertiesFeatured}
                placeholderResizedImageOptions={placeholderResizedImageOptions}
                showAsList={false}
                showByline={showByline}
                showDate={showDate}
                showDescription={showDescription}
                showHeadline={showHeadline}
                showImage={showImage}
                showItemOverline={showItemOverline}
                targetFallbackImage={targetFallbackImage}
                showFeatured={showFeatured}
                websiteName={getWebsiteName(firstElement)}
                globalContent={globalContent}
              />
            </div>
            <div className="PageListP-items-column">
              {secondGroup &&
                secondGroup.map((element, index) => (
                  <ResultItem
                    key={`result-card-${element._id}`}
                    ref={elementRefs[index]}
                    arcSite={arcSite}
                    element={element}
                    imageProperties={imageProperties}
                    imagePropertiesFeatured={imagePropertiesFeatured}
                    placeholderResizedImageOptions={placeholderResizedImageOptions}
                    showAsList={false}
                    showByline={showByline}
                    showDate={false}
                    showDescription={true}
                    showHeadline={showHeadline}
                    showImage={true}
                    showItemOverline={showItemOverline}
                    targetFallbackImage={targetFallbackImage}
                    showFeatured={false}
                    websiteName={getWebsiteName(element)}
                    globalContent={globalContent}
                  />
                ))}
            </div>

            <div className="items-row-below">
              {thirdGroup &&
                thirdGroup.map((element, index) => (
                  <ResultItem
                    key={`result-card-${element._id}`}
                    ref={elementRefs[index]}
                    arcSite={arcSite}
                    element={element}
                    imageProperties={imageProperties}
                    imagePropertiesFeatured={imagePropertiesFeatured}
                    placeholderResizedImageOptions={placeholderResizedImageOptions}
                    showAsList={false}
                    showByline={showByline}
                    showDate={showDate}
                    showDescription={false}
                    showHeadline={showHeadline}
                    showImage={false}
                    showItemOverline={showItemOverline}
                    targetFallbackImage={targetFallbackImage}
                    showFeatured={false}
                    websiteName={getWebsiteName(element)}
                    globalContent={globalContent}
                  />
                ))}
            </div>
          </div>
        ) : null;
      } else {
        return null;
      }

    case "ListQ":
      if (viewableElements?.length > 0) {
        const [firstElement, ...restElements] = viewableElements;
        const secondGroup = restElements.slice(0, 4);
        return viewableElements?.length > 0 && !isServerSideLazy ? (
          <div className={`results-list-container ${listType}`}>
            <div className="PageListH-items-column">
              <HeroItem
                key={`result-card-${firstElement._id}`}
                ref={elementRefs[0]}
                arcSite={arcSite}
                element={firstElement}
                imageProperties={imagePropertiesFeatured}
                imagePropertiesFeatured={imagePropertiesHero}
                placeholderResizedImageOptions={placeholderResizedImageOptions}
                showByline={showByline}
                showDate={showDate}
                showDescription={true}
                showHeadline={showHeadline}
                showImage={showImage}
                showItemOverline={showItemOverline}
                targetFallbackImage={targetFallbackImage}
                showFeatured={showFeatured}
                websiteName={getWebsiteName(firstElement)}
                globalContent={globalContent}
              />
            </div>
            <div className="items-row-below">
              {secondGroup &&
                secondGroup.map((element, index) => (
                  <ResultItem
                    key={`result-card-${element._id}`}
                    ref={elementRefs[index]}
                    arcSite={arcSite}
                    element={element}
                    imageProperties={imageProperties}
                    imagePropertiesFeatured={imagePropertiesFeatured}
                    placeholderResizedImageOptions={placeholderResizedImageOptions}
                    showAsList={false}
                    showByline={showByline}
                    showDate={showDate}
                    showDescription={false}
                    showHeadline={showHeadline}
                    showImage={showImage}
                    showItemOverline={showItemOverline}
                    targetFallbackImage={targetFallbackImage}
                    showFeatured={showFeatured}
                    websiteName={getWebsiteName(element)}
                    globalContent={globalContent}
                  />
                ))}
            </div>
          </div>
        ) : null;
      } else {
        return null;
      }

    case "ListS":
      if (viewableElements?.length > 0) {
        const firstElement = viewableElements[0];
        return viewableElements?.length > 0 && !isServerSideLazy ? (
          <div className={`results-list-container ${listType}`}>
            <div className="PageListH-items-column">
              <HeroItem
                key={`result-card-${firstElement._id}`}
                ref={elementRefs[0]}
                arcSite={arcSite}
                element={firstElement}
                imageProperties={imagePropertiesFeatured}
                imagePropertiesFeatured={imagePropertiesHero}
                placeholderResizedImageOptions={placeholderResizedImageOptions}
                showByline={showByline}
                showDate={showDate}
                showDescription={true}
                showHeadline={showHeadline}
                showImage={showImage}
                showItemOverline={showItemOverline}
                targetFallbackImage={targetFallbackImage}
                showFeatured={showFeatured}
                websiteName={getWebsiteName(firstElement)}
                globalContent={globalContent}
                style="overlay"
              />
            </div>
          </div>
        ) : null;
      } else {
        return null;
      }

    case "ListT":
      if (viewableElements?.length > 0) {
        const [firstElement, ...restElements] = viewableElements;
        const secondGroup = restElements.slice(0, 4);
        return viewableElements?.length > 0 && !isServerSideLazy ? (
          <div className={`results-list-container ${listType}`}>
            <div className="PageListH-items-column">
              <HeroItem
                key={`result-card-${firstElement._id}`}
                ref={elementRefs[0]}
                arcSite={arcSite}
                element={firstElement}
                imageProperties={imagePropertiesFeatured}
                imagePropertiesFeatured={imagePropertiesHero}
                placeholderResizedImageOptions={placeholderResizedImageOptions}
                showByline={showByline}
                showDate={showDate}
                showDescription={true}
                showHeadline={showHeadline}
                showImage={showImage}
                showItemOverline={showItemOverline}
                targetFallbackImage={targetFallbackImage}
                showFeatured={showFeatured}
                websiteName={getWebsiteName(firstElement)}
                globalContent={globalContent}
                style="overlay"
              />
            </div>
            <div className="items-row-below">
              {secondGroup &&
                secondGroup.map((element, index) => (
                  <ResultItem
                    key={`result-card-${element._id}`}
                    ref={elementRefs[index]}
                    arcSite={arcSite}
                    element={element}
                    imageProperties={imageProperties}
                    imagePropertiesFeatured={imagePropertiesFeatured}
                    placeholderResizedImageOptions={placeholderResizedImageOptions}
                    showAsList={false}
                    showByline={showByline}
                    showDate={showDate}
                    showDescription={false}
                    showHeadline={showHeadline}
                    showImage={showImage}
                    showItemOverline={showItemOverline}
                    targetFallbackImage={targetFallbackImage}
                    showFeatured={showFeatured}
                    websiteName={getWebsiteName(element)}
                    globalContent={globalContent}
                  />
                ))}
            </div>
          </div>
        ) : null;
      } else {
        return null;
      }

    default:
      return null;
  }
};

export default Results;
