import { useContent } from "fusion:content";
import { useFusionContext } from "fusion:context";
import getProperties from "fusion:properties";
import PropTypes from "prop-types";
import React from "react";
import HeaderSignup from "../../base/header/header-signup.component";

const Header = ({ customFields }) => {
  const context = useFusionContext();
  const { arcSite } = context;
  const { primaryLogo, primaryLogoAlt, topLevelUrl } = getProperties(arcSite);
  const {
    tagline,
    communitiesTitle,
    communitiesHierachy,
    topicsTitle,
    topicsHierachy,
    aboutUsCopy,
    aboutUsUrl,
  } = customFields;

  const communities = useContent({
    source: "site-service-hierarchy",
    query: {
      site: arcSite,
      hierarchy: communitiesHierachy,
    },
  });

  const topics = useContent({
    source: "site-service-hierarchy",
    query: {
      site: arcSite,
      hierarchy: topicsHierachy,
    },
  });

  return (
    <div className="customheader">
      <HeaderSignup
        tagline={tagline}
        aboutUsCopy={aboutUsCopy}
        aboutUsUrl={aboutUsUrl}
        logoURL={primaryLogo}
        logoAlt={primaryLogoAlt}
        topicsTitle={topicsTitle}
        topicNavigation={topics}
        communitiesTitle={communitiesTitle}
        communityNavigation={communities}
        topLevelUrl={topLevelUrl}
      />
    </div>
  );
};

Header.propTypes = {
  customFields: PropTypes.shape({
    tagline: PropTypes.string.tag({
      defaultValue: "Nonpartisan local reporting on elections and voting",
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
    aboutUsCopy: PropTypes.string.tag({
      defaultValue: "About Us",
      label: "About Us link text",
      group: "Configure Content",
    }),
    aboutUsUrl: PropTypes.string.tag({
      defaultValue: "https://www.votebeat.org/pages/about-votebeat",
      label: "About Us URL",
      group: "Configure Content",
    }),
  }),
};

Header.label = "Custom Header";

export default Header;
