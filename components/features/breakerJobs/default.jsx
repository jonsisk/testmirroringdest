import PropTypes from "@arc-fusion/prop-types";
import React from "react";
import { useGetJobs } from "../../hooks/use-getjobs";

const BreakerJobs = ({ customFields }) => {
  const jobs = useGetJobs({
    bureau: "chicago",
  });
  console.log(jobs, "jobs");
  const { title, buttonLabel, buttonLink, htmlTitle } = customFields;
  return (
    <div className="Breaker-wrapper">
      <div className="Breaker-content-header">
        <div className="Breaker-content-header-icon">
          <img
            className="Image"
            alt="icon-jobs"
            srcSet="https://chalkbeat.brightspotcdn.com/dims4/default/d08ebc2/2147483647/strip/true/crop/78x83+0+0/resize/78x83!/quality/90/?url=https%3A%2F%2Fchorus-production-chalkbeat.s3.amazonaws.com%2Fbrightspot%2F33%2Fe7%2Faa3478f34a6cab364893d0877fb9%2Fcb-icon-signpost.0.png 1x,https://chalkbeat.brightspotcdn.com/dims4/default/9316b48/2147483647/strip/true/crop/78x83+0+0/resize/156x166!/quality/90/?url=https%3A%2F%2Fchorus-production-chalkbeat.s3.amazonaws.com%2Fbrightspot%2F33%2Fe7%2Faa3478f34a6cab364893d0877fb9%2Fcb-icon-signpost.0.png 2x"
            width="78"
            height="83"
            data-src="https://chalkbeat.brightspotcdn.com/dims4/default/d08ebc2/2147483647/strip/true/crop/78x83+0+0/resize/78x83!/quality/90/?url=https%3A%2F%2Fchorus-production-chalkbeat.s3.amazonaws.com%2Fbrightspot%2F33%2Fe7%2Faa3478f34a6cab364893d0877fb9%2Fcb-icon-signpost.0.png"
            src="https://chalkbeat.brightspotcdn.com/dims4/default/d08ebc2/2147483647/strip/true/crop/78x83+0+0/resize/78x83!/quality/90/?url=https%3A%2F%2Fchorus-production-chalkbeat.s3.amazonaws.com%2Fbrightspot%2F33%2Fe7%2Faa3478f34a6cab364893d0877fb9%2Fcb-icon-signpost.0.png"
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

BreakerJobs.label = "BreakerJobs – Civic";

BreakerJobs.icon = "arc-list";

BreakerJobs.propTypes = {
  customFields: PropTypes.shape({
    title: PropTypes.string.tag({
      label: "Title",
      group: "Configure Content",
    }),
    buttonLink: PropTypes.string.tag({
      label: "linkButton",
      group: "Configure Content",
      ctaUrl: PropTypes.string,
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
export default BreakerJobs;
