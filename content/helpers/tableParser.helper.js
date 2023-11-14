export function extractTableData(htmlString) {
  // eslint-disable-next-line no-restricted-globals
  if (typeof window !== "undefined") {
    const parser = new DOMParser();
    const doc = parser.parseFromString(htmlString, "text/html");

    const headers = Array.from(doc.querySelectorAll("figure table thead tr th")).map((th) => ({
      Header: th.textContent.trim(),
      accessor: th.textContent.trim().toLowerCase(),
    }));

    const rows = Array.from(doc.querySelectorAll("figure table tbody tr")).map((tr) => {
      const cells = tr.querySelectorAll("td");
      const rowData = {};
      cells.forEach((cell, index) => {
        rowData[headers[index].accessor] = cell.textContent.trim();
      });
      return rowData;
    });

    return { headers, rows };
  } else {
    return { headers: [], rows: [] };
  }
}
