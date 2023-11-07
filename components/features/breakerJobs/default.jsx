import PropTypes from "@arc-fusion/prop-types";
import { useFusionContext } from "fusion:context";
import React, { useRef, useEffect, useState } from "react";
import { getSiteProperties } from "../../helpers/site.helper";
import { useGetJobs } from "../../hooks/use-getjobs";

const BreakerJobs = ({ customFields }) => {
  const context = useFusionContext();
  const { contextPath, deployment } = context;
  let { fromContext, title, buttonLabel, buttonLink, htmlTitle, bereau } = customFields;
  const { name: sectionName } = getSiteProperties(context);

  if (sectionName && fromContext) {
    bereau = sectionName.toLowerCase();
  }

  const jobs = useGetJobs({
    bureau: bereau,
  });

  const JobsRef = useRef(null);
  const Jobs2Ref = useRef(null);
  const [JobsHeight, setJobsHeight] = useState(null);

  useEffect(() => {
    setTimeout(() => {
      if (JobsRef.current) {
        const height = JobsRef.current.clientHeight;
        if (Jobs2Ref.current) {
          Jobs2Ref.current.style.height = `${height}px`;
          setJobsHeight(height);
        }
      }
    }, 500);
  }, [JobsHeight]);

  return (
    <>
      <div className="Breaker-wrapper Jobs">
        <div className="Breaker-content-header">
          <div className="Breaker-content-header-icon">
            <img
              className="Image"
              alt="icon-jobs"
              width="78"
              height="83"
              src={deployment(`${contextPath}/resources/images/votebeat/iconJobs.png`)}
            />
          </div>

          <h3 className="Breaker-content-header-title">{title}</h3>

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
        <div className="Breaker-content-body" ref={JobsRef}>
          <h4 className="Breaker-content-body-title">{htmlTitle}</h4>

          <ol className="Breaker-content-body-list">
            {jobs?.data?.length > 0 &&
              jobs?.data?.map((job) => (
                <li key={job.title} className="Breaker-content-body-list-item">
                  <a
                    className="Link"
                    href={job.link}
                    target="_blank"
                    data-cms-ai="0"
                    rel="noreferrer"
                  >
                    {job.title}
                  </a>
                </li>
              ))}
          </ol>
        </div>
        <div ref={Jobs2Ref} className="breaker-full"></div>
      </div>
    </>
  );
};

BreakerJobs.label = "Jobs – Civic";

BreakerJobs.icon = "arc-list";

BreakerJobs.propTypes = {
  customFields: PropTypes.shape({
    fromContext: PropTypes.bool.tag({
      label: "Take data from active bureau",
      defaultValue: false,
      description:
        "If set to true, it will ignore bureau field and instead it will take the active section.",
      group: "Configure Content",
    }),
    title: PropTypes.string.tag({
      label: "Title",
      group: "Configure Content",
    }),
    buttonLink: PropTypes.string.tag({
      label: "Button Link",
      group: "Configure Content",
      ctaUrl: PropTypes.string,
    }),
    buttonLabel: PropTypes.string.tag({
      label: "Button Label",
      group: "Configure Content",
    }),
    bereau: PropTypes.string.tag({
      label: "Bureau",
      group: "Configure Content",
    }),
    htmlTitle: PropTypes.string.tag({
      label: "Subtitle",
      group: "Configure Content",
    }),
  }),
};
export default BreakerJobs;
