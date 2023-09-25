/* eslint-disable no-restricted-globals */
import { useFusionContext } from "fusion:context";
import getProperties from "fusion:properties";
import PropTypes from "prop-types";
import React, { useState } from "react";
import NewsletterSignup from "../../../base/newsletter/newsletter-signup.component";
import { replaceSiteVariables, getSiteProperties } from "../../../helpers/site.helper";
import useRenderForBreakpoint from "../../../hooks/use-renderforbreakpoint";
import useSticky from "../../../hooks/use-sticky";
import { deviceRender } from "../../../utilities/customFields";
import { newsletterInterests } from "../../../utilities/newsletters";

/**
 * Handles sticky newsletter with close button
 */
const StickyNewsletterFeature = ({ customFields }) => {
  const { sticky, stickyRef } = useSticky("up");
  const context = useFusionContext();
  const { arcSite, outputType, globalContent } = context;
  const { newsletterSignupEndpoint, websiteName } = getProperties(arcSite);
  const { websiteName: globalContentWebsite } = getSiteProperties(globalContent);
  const {
    title,
    description,
    thankYouMsg,
    disclaimer,
    newsletter,
    renderMobile,
    renderTablet,
    renderDesktop,
  } = customFields;

  const { shouldRender } = useRenderForBreakpoint({
    renderMobile,
    renderTablet,
    renderDesktop,
  });

  const [closed, setClosed] = useState(
    typeof window !== "undefined" && window.localStorage
      ? localStorage.getItem("newsletterbreaker") === "true"
      : true
  );

  const handleClose = () => {
    if (typeof window !== "undefined" && window.localStorage) {
      localStorage.setItem("newsletterbreaker", "true");
      setClosed(true);
    }
  };

  const filteredInterests = newsletterInterests
    .filter((int) => int.slug === newsletter)
    .map((int) => int.id);

  if (!shouldRender || outputType === "amp") {
    return null;
  }

  const replacedTitle = replaceSiteVariables(title, globalContentWebsite || websiteName);

  const replacedDescription = replaceSiteVariables(
    description,
    globalContentWebsite || websiteName
  );

  return (
    <div ref={stickyRef} className={`newsletter-sticky ${!closed && sticky ? "sticky" : ""}`}>
      <div className="content">
        <div className="col-desc">
          <h3>{replacedTitle}</h3>
          <p>{replacedDescription}</p>
        </div>

        <div className="col-info">
          <NewsletterSignup
            newsletterSignupEndpoint={newsletterSignupEndpoint}
            website={arcSite}
            interestIds={filteredInterests}
            thankYouMsg={thankYouMsg}
            disclaimer={disclaimer}
          />
        </div>
        {!closed && (
          <div className="close-wrapper">
            <button className="close-button" onClick={handleClose}>
              <span>close</span>
              <svg
                width="12"
                height="12"
                viewBox="0 0 12 12"
                fill="#fff"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fillRule="evenodd"
                  clipRule="evenodd"
                  d="M6 7.5L10.5 12L12 10.5L7.5 6L12 1.50001L10.5 1.12754e-05L6 4.5L1.5 0L0 1.5L4.5 6L0 10.5L1.5 12L6 7.5Z"
                ></path>
              </svg>
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

StickyNewsletterFeature.label = "Sticky Newsletter - Civic";

StickyNewsletterFeature.propTypes = {
  customFields: PropTypes.shape({
    title: PropTypes.string.tag({
      label: "Title",
      group: "Configure Content",
    }),
    description: PropTypes.string.tag({
      label: "Description",
      group: "Configure Content",
    }),
    thankYouMsg: PropTypes.string.tag({
      label: "Thank you message",
      group: "Configure Content",
      description: "Shown after the user submits the form.",
    }),
    disclaimer: PropTypes.richtext.tag({
      label: "Disclaimer (HTML)",
      group: "Configure Content",
      description: "Shown below the form. Accepts HTML.",
    }),
    newsletter: PropTypes.oneOf([
      "votebeat-national",
      "votebeat-arizona",
      "votebeat-michigan",
      "votebeat-pennsylvania",
      "votebeat-texas",
    ]).tag({
      defaultValue: "votebeat-national",
      label: "Newsletter",
      group: "Configure Content",
    }),
    ...deviceRender,
  }),
};

export default StickyNewsletterFeature;
