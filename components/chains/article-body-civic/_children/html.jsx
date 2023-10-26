import React from "react";
import Static from "fusion:static";
import styled from "styled-components";
import { extractTableData } from "../../../../content/helpers/tableParser.helper";
import DataTable from "./dataTable";

const StyledDiv = styled.div`
  a {
    color: ${(props) => props.primaryColor};
  }
`;

const HTML = ({ content }) => {
  return !content ? null : (
    <DataTable columns={extractTableData(content).headers} data={extractTableData(content).rows} />
  );
};

export default HTML;
