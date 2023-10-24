import React from "react";
import Static from "fusion:static";
import styled from "styled-components";
import { extractTableData } from "../../../../content/helpers/tableParser.helper";

const StyledDiv = styled.div`
  a {
    color: ${(props) => props.primaryColor};
  }
`;

const HTML = ({ id, content, primaryColor }) => {
  console.log(extractTableData(content), "content-----");
  return !content ? null : (
    <Static id={`article-html-block-${id}`}>
      <StyledDiv
        className="block-margin-bottom"
        dangerouslySetInnerHTML={{ __html: content }}
        primaryColor={primaryColor}
      />
    </Static>
  );
};

export default HTML;
