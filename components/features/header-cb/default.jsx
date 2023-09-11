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
  const { primaryLogo, primaryLogoAlt, topLevelUrl, parentCommunity } = getProperties(arcSite);
  const {
    tagline,
    communitiesTitle,
    communitiesHierachy,
    topicsTitle,
    topicsHierachy,
    jobsBoardCopy,
    jobsBoardUrl,
    eventsCopy,
    eventsUrl,
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

  return (
    (outputType !== "amp" && (
      <div className="customheader">
        <HeaderSignup
          tagline={tagline}
          jobsBoardCopy={jobsBoardCopy}
          jobsBoardUrl={jobsBoardUrl}
          eventsCopy={eventsCopy}
          eventsUrl={eventsUrl}
          logoURL={primaryLogo}
          logoAlt={primaryLogoAlt}
          topicsTitle={topicsTitle}
          topicNavigation={topics}
          communitiesTitle={communitiesTitle}
          communityNavigation={communities}
          topLevelUrl={topLevelUrl}
        />
      </div>
    )) || (
      <HeaderAMP
        tagline={tagline}
        jobsBoardCopy={jobsBoardCopy}
        jobsBoardUrl={jobsBoardUrl}
        eventsCopy={eventsCopy}
        eventsUrl={eventsUrl}
        logoURL={primaryLogo}
        logoAlt={primaryLogoAlt}
        topicsTitle={topicsTitle}
        topicNavigation={topics}
        communitiesTitle={communitiesTitle}
        communityNavigation={communities}
        topLevelUrl={topLevelUrl}
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
    jobsBoardCopy: PropTypes.string.tag({
      defaultValue: "Jobs Board",
      label: "Jobs Board link text",
      group: "Configure Content",
    }),
    jobsBoardUrl: PropTypes.string.tag({
      defaultValue:
        "https://jobs.chalkbeat.org/?_ga=2.35798752.1159973125.1647355477-775160776.1647355476",
      label: "Jobs Board URL",
      group: "Configure Content",
    }),
    eventsCopy: PropTypes.string.tag({
      defaultValue: "Events",
      label: "Events link text",
      group: "Configure Content",
    }),
    eventsUrl: PropTypes.string.tag({
      defaultValue:
        "https://events.chalkbeat.org/?_ga=2.35798752.1159973125.1647355477-775160776.1647355476",
      label: "Events URL",
      group: "Configure Content",
    }),
  }),
};

Header.label = "Custom Header Chalkbeat - Civic";

export default Header;
