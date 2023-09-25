import { useFusionContext } from "fusion:context";
import getProperties from "fusion:properties";
import PropTypes from "prop-types";
import React from "react";
import { getUserDate } from "../../helpers/date.helper";
import { useGetEvents } from "../../hooks/use-getevents";
import { useGetJobs } from "../../hooks/use-getjobs";

const Events = ({ customFields }) => {
  const { outputType, arcSite } = useFusionContext();
  const { title, subtitle, buttonLink, buttonLabel, htmlTitle, count, bereau } = customFields;
  const pruebaproper = getProperties(arcSite);
  const pruebacontext = useFusionContext();
  console.log(pruebacontext, "pruebacontext");
  console.log(pruebaproper, "pruebaproper");
  const events = useGetEvents({
    bureau: bereau,
    count: count,
  });

  if (outputType === "amp") return null;
  console.log(events, "events");
  return (
    <div className="Breaker-wrapper-connect">
      <div className="Breaker-content-header">
        <div className="Breaker-content-header-icon">
          <img
            className="Image"
            alt="icon-events"
            srcSet="https://chalkbeat.brightspotcdn.com/dims4/default/fc0ec5b/2147483647/strip/true/crop/105x95+0+0/resize/105x95!/quality/90/?url=https%3A%2F%2Fchorus-production-chalkbeat.s3.amazonaws.com%2Fbrightspot%2F8a%2Fdc%2F2e5fd7664be79f23ffea8ba4df66%2Fcb-icon-calendar-2x-v2.0.png 1x,https://chalkbeat.brightspotcdn.com/dims4/default/4f043ef/2147483647/strip/true/crop/105x95+0+0/resize/210x190!/quality/90/?url=https%3A%2F%2Fchorus-production-chalkbeat.s3.amazonaws.com%2Fbrightspot%2F8a%2Fdc%2F2e5fd7664be79f23ffea8ba4df66%2Fcb-icon-calendar-2x-v2.0.png 2x"
            width="105"
            height="95"
            data-src="https://chalkbeat.brightspotcdn.com/dims4/default/fc0ec5b/2147483647/strip/true/crop/105x95+0+0/resize/105x95!/quality/90/?url=https%3A%2F%2Fchorus-production-chalkbeat.s3.amazonaws.com%2Fbrightspot%2F8a%2Fdc%2F2e5fd7664be79f23ffea8ba4df66%2Fcb-icon-calendar-2x-v2.0.png"
            src="https://chalkbeat.brightspotcdn.com/dims4/default/fc0ec5b/2147483647/strip/true/crop/105x95+0+0/resize/105x95!/quality/90/?url=https%3A%2F%2Fchorus-production-chalkbeat.s3.amazonaws.com%2Fbrightspot%2F8a%2Fdc%2F2e5fd7664be79f23ffea8ba4df66%2Fcb-icon-calendar-2x-v2.0.png"
          />
        </div>

        <h3 className="Breaker-content-header-title">{title}</h3>

        <h4 className="Breaker-content-header-description">{subtitle}</h4>

        <div>
          <a
            className="Breaker-content-header-CTALink Button"
            href={buttonLink}
            target="_blank"
            data-cms-ai="0"
            rel="noreferrer"
          >
            {buttonLabel}
          </a>
        </div>
        <div className="Breaker-content-body">
          <h4 className="Breaker-content-body-title">{htmlTitle}</h4>

          <ol className="Breaker-content-body-list">
            {events.data.length > 0 &&
              events.data.map((event) => (
                <li key={event.title} className="Breaker-content-body-list-item">
                  <div className="PagePromoSimpleEvent">
                    <div className="PagePromoSimpleEvent-content">
                      <div>
                        <span className="PagePromoSimpleEvent-date">
                          <bsp-timestamp
                            data-timestamp="1694543400000"
                            data-recent-thresholdinhours="2"
                          >
                            <span data-date="">{getUserDate(event.pubDate)}</span>
                          </bsp-timestamp>
                        </span>
                        <div className="PagePromoSimpleEvent-title">
                          <a
                            className="Link"
                            href={event.link}
                            target="_blank"
                            data-cms-ai="0"
                            rel="noreferrer"
                          >
                            {event.title}
                          </a>
                        </div>
                      </div>
                    </div>
                  </div>
                </li>
              ))}
          </ol>
        </div>
      </div>
    </div>
  );
};

Events.label = "Events - Civic";
Events.description = "Right rail Events banner";
Events.static = true;

Events.propTypes = {
  customFields: PropTypes.shape({
    title: PropTypes.string.tag({
      label: "Title",
      group: "Configure Content",
    }),
    subtitle: PropTypes.string.tag({
      label: "SubTitle",
      group: "Configure Content",
    }),
    buttonLink: PropTypes.string.tag({
      label: "linkButton",
      group: "Configure Content",
      ctaUrl: PropTypes.string,
    }),
    count: PropTypes.number.tag({
      label: "count",
      group: "Configure Content",
    }),
    bereau: PropTypes.string.tag({
      label: "bereau",
      group: "Configure Content",
    }),
    buttonLabel: PropTypes.string.tag({
      label: "labelButton",
      group: "Configure Content",
    }),
    htmlTitle: PropTypes.string.tag({
      label: "name of the html element",
      group: "Configure Content",
    }),
  }),
};

export default Events;
