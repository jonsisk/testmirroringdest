import { useContent } from "fusion:content";
import { useFusionContext } from "fusion:context";
import getProperties from "fusion:properties";
import PropTypes from "prop-types";
import React from "react";
import HeaderAMP from "../../base/header-cb/header-amp.component";
import HeaderSignup from "../../base/header-cb/header-signup.component";

const Header = ({ customFields }) => {
  const context = useFusionContext();
  const { arcSite, outputType } = context;

  console.log("----arcSite----->", arcSite);

  const { primaryLogo, primaryLogoAlt, topLevelUrl, parentCommunity } = getProperties(arcSite);

  console.log("----primaryLogo----->", primaryLogo);
  const {
    tagline,
    communitiesTitle,
    communitiesHierachy,
    topicsTitle,
    topicsHierachy,
    linksHierachy,
  } = customFields;

  const communities = useContent({
    source: "site-service-hierarchy-civic",
    query: {
      site: parentCommunity || arcSite,
      hierarchy: communitiesHierachy,
    },
  });

  const topics = useContent({
    source: "site-service-hierarchy-civic",
    query: {
      site: parentCommunity || arcSite,
      hierarchy: topicsHierachy,
    },
  });

  const links = useContent({
    source: "header-links",
    query: {
      site: arcSite,
      hierarchy: linksHierachy,
    },
  });

  return (
    (outputType !== "amp" && (
      <div className="customheader">
        <HeaderSignup
          tagline={tagline}
          logoURL={primaryLogo}
          logoAlt={primaryLogoAlt}
          topicsTitle={topicsTitle}
          topicNavigation={topics}
          communitiesTitle={communitiesTitle}
          communityNavigation={communities}
          topLevelUrl={topLevelUrl}
          linksNavigation={links}
        />
      </div>
    )) || (
      <HeaderAMP
        tagline={tagline}
        logoURL={primaryLogo}
        logoAlt={primaryLogoAlt}
        topicsTitle={topicsTitle}
        topicNavigation={topics}
        communitiesTitle={communitiesTitle}
        communityNavigation={communities}
        topLevelUrl={topLevelUrl}
        linksNavigation={links}
      />
    )
  );
};

Header.propTypes = {
  customFields: PropTypes.shape({
    tagline: PropTypes.string.tag({
      defaultValue: "Essential education reporting across America",
      label: "Tagline",
      group: "Configure Content",
    }),
    communitiesTitle: PropTypes.string.tag({
      defaultValue: "Communities",
      label: "Communities menu title",
      group: "Configure Content",
    }),
    communitiesHierachy: PropTypes.string.tag({
      defaultValue: "communities",
      label: "Community Hierarchy",
      group: "Configure Content",
    }),
    topicsTitle: PropTypes.string.tag({
      defaultValue: "Topics",
      label: "Topics menu title",
      group: "Configure Content",
    }),
    topicsHierachy: PropTypes.string.tag({
      defaultValue: "sections-menu",
      label: "Topics Hierarchy",
      group: "Configure Content",
    }),
    linksHierachy: PropTypes.string.tag({
      defaultValue: "sections-menu",
      label: "Links Hierarchy",
      group: "Configure Content",
    }),
  }),
};

Header.label = "Header Chalkbeat - Civic";

export default Header;
