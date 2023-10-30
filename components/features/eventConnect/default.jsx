import { useFusionContext } from "fusion:context";
import PropTypes from "prop-types";
import React, { useRef, useEffect, useState } from "react";
import { getUserDate } from "../../helpers/date.helper";
import { useGetEvents } from "../../hooks/use-getevents";

const Events = ({ customFields }) => {
  const { outputType, contextPath, deployment } = useFusionContext();
  const { title, subtitle, buttonLink, buttonLabel, htmlTitle, count, bereau } = customFields;

  const events = useGetEvents({
    bureau: bereau,
    count: count,
  });

  const EventsRef = useRef(null);
  const Events2Ref = useRef(null);
  const [EventsHeight, setEventsHeight] = useState(null);

  useEffect(() => {
    if (EventsRef.current) {
      const height = EventsRef.current.clientHeight;
      if (Events2Ref.current) {
        Events2Ref.current.style.height = `${height}px`;
        setEventsHeight(height);
      }
    }
  }, [EventsHeight]);

  if (outputType === "amp") return null;
  return (
    <>
      <div className="Breaker-wrapper Events">
        <div className="Breaker-content-header">
          <div className="Breaker-content-header-icon">
            <img
              className="Image"
              alt="icon-events"
              width="105"
              height="95"
              src={deployment(`${contextPath}/resources/images/votebeat/iconEvents.png`)}
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
        </div>
        <div className="Breaker-content-body" ref={EventsRef}>
          <h4 className="Breaker-content-body-title">{htmlTitle}</h4>

          <ol className="Breaker-content-body-list">
            {events.data &&
              events.data.length > 0 &&
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
                        <span className="PagePromoSimpleEvent-title hyphen">
                          <a
                            className="Link"
                            href={event.link}
                            target="_blank"
                            data-cms-ai="0"
                            rel="noreferrer"
                          >
                            {event.title}
                          </a>
                        </span>
                      </div>
                    </div>
                  </div>
                </li>
              ))}
          </ol>
        </div>
        <div ref={Events2Ref} className="breaker-full"></div>
      </div>
    </>
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
      label: "Subtitle",
      group: "Configure Content",
    }),
    buttonLink: PropTypes.string.tag({
      label: "Button Link",
      group: "Configure Content",
      ctaUrl: PropTypes.string,
    }),
    count: PropTypes.number.tag({
      label: "Amount",
      group: "Configure Content",
    }),
    bereau: PropTypes.string.tag({
      label: "Bureau",
      group: "Configure Content",
    }),
    buttonLabel: PropTypes.string.tag({
      label: "Button Label",
      group: "Configure Content",
    }),
    htmlTitle: PropTypes.string.tag({
      label: "Events title",
      group: "Configure Content",
    }),
  }),
};

export default Events;
