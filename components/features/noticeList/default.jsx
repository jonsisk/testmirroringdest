import PropTypes from "@arc-fusion/prop-types";
import { isServerSide, LazyLoad } from "@wpmedia/engine-theme-sdk";
import { useFusionContext } from "fusion:context";
import getTranslatedPhrases from "fusion:intl";
import getProperties from "fusion:properties";
import React from "react";
import { resolveDefaultPromoElements } from "../../helpers/list.helpers";
import { useArticleStore } from "../stores/articles.store";
import NoticeCard from "./notice-card";

const NoticeListCivic = ({ customFields }) => {
  const { arcSite, contextPath, deployment, isAdmin, globalContent } = useFusionContext();
  const {
    lazyLoad,
    columns,
    title,
    readMoreUrl,
    listContentConfig: { contentService, contentConfigValues },
  } = customFields;
  const { fallbackImage, locale, primaryLogoAlt, breakpoints, resizerURL } = getProperties(arcSite);
  const imageProperties = {
    smallWidth: 158,
    smallHeight: 89,
    mediumWidth: 274,
    mediumHeight: 154,
    largeWidth: 274,
    largeHeight: 154,
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
      <div>
        <NoticeCard
          arcSite={arcSite}
          columns={columns}
          configuredOffset={configuredOffset}
          configuredSize={configuredSize}
          contentConfigValues={contentConfigValues}
          contentService={contentService}
          imageProperties={imageProperties}
          imagePropertiesFeatured={imagePropertiesFeatured}
          isServerSideLazy={isServerSideLazy}
          phrases={phrases}
          title={title}
          showAsList={true}
          showByline={promoElements.showByline}
          showDate={promoElements.showDate}
          showDescription={promoElements.showDescription}
          showHeadline={promoElements.showHeadline}
          showImage={promoElements.showImage}
          showItemOverline={promoElements.showItemOverline}
          targetFallbackImage={targetFallbackImage}
          showPagination={promoElements.showPagination}
          showFeatured={false}
          filteredArticles={articles}
          globalContent={globalContent}
          readMoreUrl={readMoreUrl}
        />
      </div>
    </LazyLoad>
  );
};

NoticeListCivic.label = "Story Grid – Civic";

NoticeListCivic.icon = "arc-list";

NoticeListCivic.propTypes = {
  customFields: PropTypes.shape({
    listContentConfig: PropTypes.contentConfig("ans-feed").tag({
      group: "Configure Content",
      label: "Display Content Info",
    }),
    title: PropTypes.string.tag({
      label: "title",
      group: "Configure Content",
    }),
    showItemOverline: PropTypes.bool.tag({
      label: "Show overline",
      defaultValue: false,
      group: "Show promo elements",
    }),
    columns: PropTypes.oneOf(["2", "3", "4"]).tag({
      label: "Columns",
      group: "Configure Content",
      defaultValue: "3",
    }),
    readMoreUrl: PropTypes.string.tag({
      label: "Read More URL (relative)",
      description: "If provided, Read more button will redirect to URL",
      group: "Configure Content",
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
    lazyLoad: PropTypes.bool.tag({
      name: "Lazy Load block?",
      defaultValue: false,
      description:
        "Turning on lazy-loading will prevent this block from being loaded on the page until it is nearly in-view for the user.",
    }),
  }),
};

export default NoticeListCivic;
