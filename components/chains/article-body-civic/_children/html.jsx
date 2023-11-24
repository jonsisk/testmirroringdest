import React from "react";
import Static from "fusion:static";
import DataTable from "./dataTable";
import { extractTableData } from "../../../../content/helpers/tableParser.helper";
import styled from "styled-components";

const StyledDiv = styled.div`
  a {
    color: ${(props) => props.primaryColor};
  }
`;

const HTML = ({ content, id, primaryColor }) => {
  // busca si el contenido tiene una tabla
  const isTableContent =
    content.includes("<table>") && content.includes("<thead>") && content.includes("<tbody>");
  console.log(content, "content12");

  // Extraer los datos si el contenido es una tabla
  const tableData = isTableContent ? extractTableData(content) : { headers: [], rows: [] };

  return (
    <StyledDiv id={`article-html-block-${id}`} primaryColor={primaryColor}>
      {isTableContent ? (
        <DataTable columns={tableData.headers} data={tableData.rows} />
      ) : (
        <div className="block-margin-bottom" dangerouslySetInnerHTML={{ __html: content }} />
      )}
    </StyledDiv>
  );
};

export default HTML;
