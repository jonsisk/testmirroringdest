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

  const tableData = extractTableData(content);
  console.log(tableData, "tableData");

  return (
    <Static id={`article-html-block-${id}`}>
      <div id="tableContainer"></div>
      {isTableContent ? (
        <DataTable columns={tableData.headers} data={tableData.rows} />
      ) : (
        <StyledDiv
          className="block-margin-bottom"
          dangerouslySetInnerHTML={{ __html: content }}
          primaryColor={primaryColor}
        />
      )}
    </Static>
  );
};

export default HTML;

/* import React, { useState, useEffect } from "react";
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
  // Estado para almacenar los datos de la tabla
  const [tableData, setTableData] = useState({ headers: [], rows: [] });

  useEffect(() => {
    // Verifica si el contenido incluye una tabla
    const isTableContent = content.includes("<table>") && content.includes("<thead>") && content.includes("<tbody>");

    // Actualiza el estado con los datos extraídos o vacíos si no hay tabla
    if (isTableContent) {
      const extractedData = extractTableData(content);
      setTableData(extractedData);
    } else {
      setTableData({ headers: [], rows: [] });
    }
  }, [content]); // Dependencia en 'content', para que se ejecute este efecto cuando 'content' cambie

  return (
    <Static id={`article-html-block-${id}`}>
      {tableData.headers.length > 0 ? ( // Usa 'tableData' del estado para renderizar
        <DataTable columns={tableData.headers} data={tableData.rows} />
      ) : (
        <StyledDiv
          className="block-margin-bottom"
          dangerouslySetInnerHTML={{ __html: content }}
          primaryColor={primaryColor}
        />
      )}
    </Static>
  );
};

export default HTML; */
