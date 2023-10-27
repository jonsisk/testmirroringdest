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
  const { arcSite, outputType } = context;
  const { newsletterSignupEndpoint, websiteName } = getProperties(arcSite);
  const { websiteName: globalContentWebsite, newsletter: globalNewsletter } =
    getSiteProperties(context);
  let {
    fromContext,
    title,
    description,
    errorMsg,
    thankYouMsg,
    buttonLabel,
    disclaimer,
    newsletter,
    renderMobile,
    renderTablet,
    renderDesktop,
  } = customFields;

  if (globalNewsletter && fromContext) {
    title = globalNewsletter.title;
    description = globalNewsletter.description;
    newsletter = globalNewsletter.newsletter;
  }

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

  const filteredInterests = newsletterInterests[arcSite]
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
    <div
      ref={stickyRef}
      className={`newsletter-sticky ${!closed && sticky ? "sticky" : ""} ${
        !closed ? "" : "closed"
      }`}
    >
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
            errorMsg={errorMsg}
            disclaimer={disclaimer}
            buttonLabel={buttonLabel}
            layout="sticky"
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
    fromContext: PropTypes.bool.tag({
      label: "Take newsletter from active bureau",
      defaultValue: false,
      description:
        "If set to true, it will ignore title, description and newsletter fields. Instead it will take the infomation set on the bureau section.",
      group: "Configure Content",
    }),
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
    errorMsg: PropTypes.string.tag({
      label: "Error message",
      group: "Configure Content",
      description: "Shown in case of error",
    }),
    buttonLabel: PropTypes.string.tag({
      label: "Submit button label",
      default: "Sign Me Up",
      group: "Configure Content",
    }),
    disclaimer: PropTypes.richtext.tag({
      label: "Disclaimer (HTML)",
      group: "Configure Content",
      description: "Shown below the form. Accepts HTML.",
    }),
    newsletter: PropTypes.oneOf(
      [].concat(...Object.values(newsletterInterests).map((list) => list.map((item) => item.slug)))
    ).tag({
      defaultValue: "votebeat-national",
      label: "Newsletter",
      group: "Configure Content",
    }),
    ...deviceRender,
  }),
};

export default StickyNewsletterFeature;
