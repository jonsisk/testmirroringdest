import React, { useMemo } from "react";
import { useTable, useSortBy, useGlobalFilter, usePagination } from "react-table";

function GlobalFilter({
  preGlobalFilteredRows,
  globalFilter,
  setGlobalFilter,
  state,
  pageOptions,
  setPageSize,
}) {
  const count = preGlobalFilteredRows.length;

  return (
    <div className="dataTableHeader dataTableHelpers">
      <div className="dataTablePagination">
        <span>Show </span>
        <select
          className="dataTableSelect pageSize"
          value={state.pageSize}
          onChange={(e) => {
            setPageSize(Number(e.target.value));
          }}
        >
          {[10, 20, 30, 40, 50].map((pageSize) => (
            <option key={pageSize} value={pageSize}>
              {pageSize}
            </option>
          ))}
        </select>
        <span> entries</span>
      </div>
      <div className="dataTableInfo right">
        Search:
        <input
          className="dataTableInput globalFilter"
          value={globalFilter || ""}
          onChange={(e) => {
            setGlobalFilter(e.target.value || undefined);
          }}
          placeholder={`...`}
        />
      </div>
    </div>
  );
}

function DataTable({ columns, data }) {
  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    page,
    prepareRow,
    state,
    preGlobalFilteredRows,
    setGlobalFilter,
    canPreviousPage,
    canNextPage,
    pageOptions,
    pageCount,
    gotoPage,
    nextPage,
    previousPage,
    setPageSize,
  } = useTable(
    {
      columns,
      data,
      initialState: { pageIndex: 0, pageSize: 5 },
    },
    useGlobalFilter,
    useSortBy,
    usePagination
  );

  return (
    <>
      <GlobalFilter
        preGlobalFilteredRows={preGlobalFilteredRows}
        globalFilter={state.globalFilter}
        setGlobalFilter={setGlobalFilter}
        state={state}
        pageOptions={pageOptions}
        setPageSize={setPageSize}
      />
      <div className="dataTableWrapper">
        <table className="table dataTable" {...getTableProps()}>
          <thead>
            {headerGroups.map((headerGroup) => (
              <tr {...headerGroup.getHeaderGroupProps()}>
                {headerGroup.headers.map((column) => (
                  <th {...column.getHeaderProps(column.getSortByToggleProps())}>
                    {column.render("Header")}
                    <span
                      className={
                        column.isSorted ? (column.isSortedDesc ? "sort desc" : "sort asc") : "sort"
                      }
                    ></span>
                  </th>
                ))}
              </tr>
            ))}
          </thead>
          <tbody {...getTableBodyProps()}>
            {page.map((row) => {
              prepareRow(row);
              return (
                <tr {...row.getRowProps()}>
                  {row.cells.map((cell) => {
                    return <td {...cell.getCellProps()}>{cell.render("Cell")}</td>;
                  })}
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
      <div className="dataTableFooter dataTableHelpers">
        <div className="dataTableInfo">
          Showing {state.pageIndex * state.pageSize + 1} to{" "}
          {state.pageIndex * state.pageSize + state.pageSize} of {data.length} entries
        </div>
        <div className="dataTablePagination right">
          <button onClick={() => gotoPage(0)} disabled={!canPreviousPage}>
            {"<<"}
          </button>{" "}
          <button onClick={() => previousPage()} disabled={!canPreviousPage}>
            {"Previousss"}
          </button>{" "}
          <button onClick={() => nextPage()} disabled={!canNextPage}>
            {"Next"}
          </button>{" "}
          <button onClick={() => gotoPage(pageCount - 1)} disabled={!canNextPage}>
            {">>"}
          </button>{" "}
        </div>
      </div>
    </>
  );
}

export default DataTable;
