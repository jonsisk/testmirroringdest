import React from "react";

function Author({ author, websiteDomain }) {
  return (
    <div key={author.slug} className="Page-byline">
      <div className="Page-authors">
        {author.slug ? (
          <a href={`${websiteDomain}/authors/${author.slug}`}>{author.name}</a>
        ) : (
          author.name
        )}
      </div>
    </div>
  );
}

export default Author;
