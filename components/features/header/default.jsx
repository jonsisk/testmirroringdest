import { useContent } from "fusion:content";
import { useFusionContext } from "fusion:context";
import getProperties from "fusion:properties";
import PropTypes from "prop-types";
import React from "react";
import HeaderAMP from "../../base/header/header-amp.component";
import HeaderSignup from "../../base/header/header-signup.component";
import { isSiteSection, getSiteProperties } from "../../helpers/site.helper";

const Header = ({ customFields }) => {
  const context = useFusionContext();
  const { arcSite, outputType, globalContent } = context;
  const {
    primaryLogo,
    primaryLogoAlt,
    tagline: bureauTagline,
    hideTopics,
    topicsHierachy: bureauTopicsHierarchy,
  } = isSiteSection(globalContent) ? getSiteProperties(context) : getProperties(arcSite);
  const {
    tagline,
    communitiesTitle,
    communitiesHierachy,
    topicsTitle,
    topicsHierachy,
    aboutUsCopy,
    aboutUsUrl,
    donateUrl,
  } = customFields;

  const communities = useContent({
    source: "site-service-hierarchy-civic",
    query: {
      site: arcSite,
      hierarchy: communitiesHierachy,
    },
  });

  const topics = useContent({
    source: "site-service-hierarchy-civic",
    query: {
      site: arcSite,
      hierarchy: bureauTopicsHierarchy || topicsHierachy,
    },
  });

  return (
    (outputType !== "amp" && (
      <div className="customheader">
        <HeaderSignup
          tagline={bureauTagline || tagline}
          aboutUsCopy={aboutUsCopy}
          aboutUsUrl={aboutUsUrl}
          logoURL={primaryLogo}
          logoAlt={primaryLogoAlt}
          topicsTitle={hideTopics ? null : topicsTitle}
          topicNavigation={hideTopics ? null : topics}
          communitiesTitle={communitiesTitle}
          communityNavigation={communities}
          logoHref={globalContent?.site_section ? `${globalContent?.site_section._id}/` : "/"}
          donateUrl={donateUrl}
        />
      </div>
    )) || (
      <HeaderAMP
        tagline={bureauTagline || tagline}
        aboutUsCopy={aboutUsCopy}
        aboutUsUrl={aboutUsUrl}
        logoURL={primaryLogo}
        logoAlt={primaryLogoAlt}
        topicsTitle={hideTopics ? null : topicsTitle}
        topicNavigation={hideTopics ? null : topics}
        communitiesTitle={communitiesTitle}
        communityNavigation={communities}
      />
    )
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
    donateUrl: PropTypes.string.tag({
      label: "Donate URL",
      group: "Configure Content",
    }),
  }),
};

Header.label = "Custom Header";

export default Header;
