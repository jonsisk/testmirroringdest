import { useFusionContext } from "fusion:context";
import getProperties from "fusion:properties";
import PropTypes from "prop-types";
import React from "react";
import { replaceSiteVariables, getSiteProperties } from "../../helpers/site.helper";
import { newsletterInterests, newsletterCopy } from "../../utilities/newsletters";
import NewsletterSignup from "./newsletter-signup.component";

/**
 * Handles the composer-driven newsletter signup form together with the power-up for newsletters
 * @param {*} embed - power-up stored data (custom_embed)
 * @returns
 */
const NewsletterComposer = ({ embed }) => {
  const context = useFusionContext();
  const { arcSite, globalContent, outputType } = context;
  const { websiteName, newsletterSignupEndpoint } = getProperties(arcSite);
  const { websiteName: globalContentWebsite } = getSiteProperties(globalContent);
  const { title, description, thankYouMsg } = newsletterCopy[arcSite] || newsletterCopy["default"];

  if (outputType === "amp") return null;

  const composerNewsletter = newsletterInterests[arcSite]
    .filter((int) => int.slug === embed.config?.newsletter)
    .map((int) => int.id);

  const replacedDescription = replaceSiteVariables(
    description,
    globalContentWebsite || websiteName
  );

  return (
    <div className="newsletter-composer">
      <div className="content">
        <div className="col-desc">
          <h3>{title}</h3>
          <p>{replacedDescription}</p>
        </div>
        <div className="col-info">
          <NewsletterSignup
            newsletterSignupEndpoint={newsletterSignupEndpoint}
            website={arcSite}
            interestIds={composerNewsletter}
            thankYouMsg={thankYouMsg}
            layout="powerup"
          />

          <p className="small">
            <i>By signing up, you agree to our</i>
            <a href="/pages/privacy-policy" target="_blank" rel="noreferrer">
              <i> Privacy Notice</i>
            </a>
            <i> and European users agree to the data transfer policy. You may also receive</i>
            <a href="/dedicated-emails" target="_blank" rel="noreferrer">
              <i> occasional messages from sponsors</i>
            </a>
            <i>.</i>
          </p>
        </div>
      </div>
    </div>
  );
};

NewsletterComposer.propTypes = {
  embed: PropTypes.any,
};

export default NewsletterComposer;
