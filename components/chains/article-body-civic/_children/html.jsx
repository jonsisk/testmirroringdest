import React from "react";
import DataTable from "./dataTable";
import { extractTableData } from "../../../../content/helpers/tableParser.helper";

const HTML = ({ content, id }) => {
  // busca si el contenido tiene una tabla
  const isTableContent =
    content.includes("<table>") && content.includes("<thead>") && content.includes("<tbody>");

  // Extraer los datos si el contenido es una tabla
  const tableData = isTableContent ? extractTableData(content) : null;

  return (
    <div id={`article-html-block-${id}`}>
      {isTableContent ? (
        <DataTable columns={tableData.headers} data={tableData.rows} />
      ) : (
        <div dangerouslySetInnerHTML={{ __html: content }} />
      )}
    </div>
  );
};

export default HTML;
