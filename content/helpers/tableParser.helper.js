export const extractTableData = (html) => {
  // eslint-disable-next-line no-restricted-globals
  const tempDiv = document.createElement("div");
  tempDiv.innerHTML = html;

  const headers = Array.from(tempDiv.querySelectorAll("thead th")).map((th) => ({
    Header: th.innerText,
    accessor: th.innerText.toLowerCase().replace(/ /g, "_"), // Transforma el texto del encabezado en un identificador único
  }));
  const rows = Array.from(tempDiv.querySelectorAll("figure table tbody tr")).map((tr) => {
    const cells = tr.querySelectorAll("td");
    const rowData = {};
    cells.forEach((cell, index) => {
      rowData[headers[index].accessor] = cell.textContent.trim();
    });
    return rowData;
  });

  return { headers, rows };
};
