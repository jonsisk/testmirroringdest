import PropTypes from "@arc-fusion/prop-types";
import { isServerSide, LazyLoad } from "@wpmedia/arc-themes-components";
import { useFusionContext } from "fusion:context";
import getTranslatedPhrases from "fusion:intl";
import getProperties from "fusion:properties";
import React from "react";
import { resolveDefaultPromoElements } from "../../helpers/list.helpers";
import { useArticleStore } from "../stores/articles.store";
import Results from "./results";

const ResultsListCivic = ({ customFields }) => {
  const { arcSite, contextPath, deployment, isAdmin, globalContent, outputType } =
    useFusionContext();
  const {
    lazyLoad,
    listContentConfig: { contentService, contentConfigValues },
    title,
    showTitle,
    optionButton,
    textButton,
  } = customFields;
  const { fallbackImage, locale, primaryLogoAlt, breakpoints, resizerURL } = getProperties(arcSite);
  const imageProperties = {
    smallWidth: 377,
    smallHeight: 212,
    mediumWidth: 377,
    mediumHeight: 212,
    largeWidth: 377,
    largeHeight: 212,
    primaryLogoAlt,
    breakpoints,
    resizerURL,
  };
  const imagePropertiesFeatured = {
    smallWidth: 768,
    smallHeight: 432,
    mediumWidth: 768,
    mediumHeight: 432,
    largeWidth: 768,
    largeHeight: 432,
    primaryLogoAlt,
    breakpoints,
    resizerURL,
  };
  const targetFallbackImage = !fallbackImage.includes("http")
    ? deployment(`${contextPath}/${fallbackImage}`)
    : fallbackImage;
  const promoElements = resolveDefaultPromoElements(customFields);
  const phrases = getTranslatedPhrases(locale || "en");
  const isServerSideLazy = lazyLoad && isServerSide() && !isAdmin;
  const configuredOffset =
    parseInt(contentConfigValues?.offset, 10) ||
    parseInt(contentConfigValues?.feedOffset, 10) ||
    parseInt(contentConfigValues?.from, 10) ||
    0;
  const configuredSize =
    parseInt(contentConfigValues?.size, 10) || parseInt(contentConfigValues?.feedSize, 10) || 10;

  const articles = useArticleStore((state) => state.articles);

  return (
    <LazyLoad enabled={lazyLoad && !isAdmin}>
      {showTitle && (
        <div className="PageList-header articles-slider">
          <svg className="PageList-header-squiggly">
            <use xlinkHref="#squiggly"></use>
          </svg>
          <div className="PageList-header-title-wrap">
            <div className="PageList-header-title">{title}</div>
          </div>
        </div>
      )}
      <div className="List">
        <Results
          arcSite={arcSite}
          outputType={outputType}
          configuredOffset={configuredOffset}
          configuredSize={configuredSize}
          contentConfigValues={contentConfigValues}
          contentService={contentService}
          imageProperties={imageProperties}
          imagePropertiesFeatured={imagePropertiesFeatured}
          isServerSideLazy={isServerSideLazy}
          phrases={phrases}
          showAsList={true}
          textButton={textButton}
          showByline={promoElements.showByline}
          showDate={promoElements.showDate}
          showDescription={promoElements.showDescription}
          showHeadline={promoElements.showHeadline}
          showImage={promoElements.showImage}
          showItemOverline={promoElements.showItemOverline}
          targetFallbackImage={targetFallbackImage}
          optionButton={optionButton}
          showPagination={promoElements.showPagination}
          showFeatured={promoElements.showFeatured}
          filteredArticles={articles}
          globalContent={globalContent}
        />
      </div>
    </LazyLoad>
  );
};

ResultsListCivic.label = "Results List – Civic";

ResultsListCivic.icon = "arc-list";

ResultsListCivic.propTypes = {
  customFields: PropTypes.shape({
    textButton: PropTypes.string.tag({
      label: "Button text",
      group: "Configure Content",
    }),
    optionButton: PropTypes.oneOf(["small", "large"]).tag({
      label: "Button style",
      group: "Configure Content",
      defaultValue: "large",
    }),
    title: PropTypes.string.tag({
      label: "Title",
      group: "Configure Content",
    }),

    listContentConfig: PropTypes.contentConfig("ans-feed").tag({
      label: "Display Content Info",
      group: "Configure Content",
    }),
    showItemOverline: PropTypes.bool.tag({
      label: "Show overline",
      defaultValue: false,
      group: "Show promo elements",
    }),
    showHeadline: PropTypes.bool.tag({
      label: "Show headline",
      defaultValue: true,
      group: "Show promo elements",
    }),
    showImage: PropTypes.bool.tag({
      label: "Show image",
      defaultValue: true,
      group: "Show promo elements",
    }),
    showTitle: PropTypes.bool.tag({
      label: "Show title",
      defaultValue: false,
      group: "Show promo elements",
    }),

    showDescription: PropTypes.bool.tag({
      label: "Show description",
      defaultValue: true,
      group: "Show promo elements",
    }),
    showByline: PropTypes.bool.tag({
      label: "Show byline",
      defaultValue: true,
      group: "Show promo elements",
    }),
    showDate: PropTypes.bool.tag({
      label: "Show date",
      defaultValue: true,
      group: "Show promo elements",
    }),
    showPagination: PropTypes.bool.tag({
      label: "Show pagination",
      defaultValue: true,
      group: "Show promo elements",
    }),
    showFeatured: PropTypes.bool.tag({
      label: "Show featured article layout",
      defaultValue: true,
      group: "Show promo elements",
    }),
    lazyLoad: PropTypes.bool.tag({
      name: "Lazy Load block?",
      defaultValue: false,
      description:
        "Turning on lazy-loading will prevent this block from being loaded on the page until it is nearly in-view for the user.",
    }),
  }),
};

export default ResultsListCivic;
