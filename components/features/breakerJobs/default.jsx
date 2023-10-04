import PropTypes from "@arc-fusion/prop-types";
import { useFusionContext } from "fusion:context";
import React from "react";
import { useGetJobs } from "../../hooks/use-getjobs";

const BreakerJobs = ({ customFields }) => {
  const { contextPath, deployment } = useFusionContext();
  const { title, buttonLabel, buttonLink, htmlTitle, bereau } = customFields;
  const jobs = useGetJobs({
    bureau: bereau,
  });
  return (
    <div className="Breaker-wrapper">
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
      <div className="Breaker-content-body">
        <h4 className="Breaker-content-body-title">{htmlTitle}</h4>

        <ol className="Breaker-content-body-list">
          {jobs.data.length > 0 &&
            jobs.data.map((job) => (
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
    </div>
  );
};

BreakerJobs.label = "Jobs – Civic";

BreakerJobs.icon = "arc-list";

BreakerJobs.propTypes = {
  customFields: PropTypes.shape({
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
