import PropTypes from "@arc-fusion/prop-types";
import { isServerSide, LazyLoad } from "@wpmedia/engine-theme-sdk";
import { extractResizedParams, extractImageFromStory } from "@wpmedia/resizer-image-block";
import { HeadingSection, Overline, Byline, Heading, SecondaryFont } from "@wpmedia/shared-styles";
import { useContent } from "fusion:content";
import { useFusionContext } from "fusion:context";
import getProperties from "fusion:properties";
import React from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "@wpmedia/shared-styles/scss/_results-list.scss";
import { SlideCard } from "./slideCard";

const settings = {
  infinite: true,
  speed: 500,
  slidesToShow: 3,
  slidesToScroll: 3,
  arrow: true,
  autoplay: false,
  nextArrow: (
    <div>
      <svg>
        <use xlinkHref="#icon-arrow-right"></use>
      </svg>
    </div>
  ),
  prevArrow: (
    <div>
      <svg>
        <use xlinkHref="#icon-arrow-left"></use>
      </svg>
    </div>
  ),
};
const Carrousel = ({ customFields }) => {
  const { arcSite, isAdmin, deployment, contextPath } = useFusionContext();
  const { fallbackImage } = getProperties(arcSite);
  const {
    lazyLoad,
    listContentConfig: { contentService, contentConfigValues },
  } = customFields;

  const isServerSideLazy = lazyLoad && isServerSide() && !isAdmin;

  const requestedResultList = useContent({
    source: isServerSideLazy ? null : contentService,
    query: {
      ...contentConfigValues,
      feature: "results-list",
    },
  });
  const targetFallbackImage = !fallbackImage.includes("http")
    ? deployment(`${contextPath}/${fallbackImage}`)
    : fallbackImage;
  const placeholderResizedImageOptions = useContent({
    source: !targetFallbackImage.includes("/resources/") ? "resize-image-api" : null,
    query: { raw_image_url: targetFallbackImage, respect_aspect_ratio: true },
  });
  const { content_elements } = requestedResultList;
  return (
    <LazyLoad enabled={lazyLoad && !isAdmin}>
      <HeadingSection>
        <Slider {...settings} className="slider">
          {content_elements?.length > 0 &&
            !isServerSideLazy &&
            content_elements.map((slide, index) => (
              <SlideCard
                key={index}
                slide={slide}
                arcSite={arcSite}
                targetFallbackImage={targetFallbackImage}
                placeholderResizedImageOptions={placeholderResizedImageOptions}
              />
            ))}
        </Slider>
      </HeadingSection>
    </LazyLoad>
  );
};

Carrousel.label = "Slider – Civic";

Carrousel.icon = "arc-list";

Carrousel.propTypes = {
  customFields: PropTypes.shape({
    listContentConfig: PropTypes.contentConfig("ans-feed").tag({
      group: "Configure Content",
      label: "Display Content Info",
    }),
  }),
};

export default Carrousel;
