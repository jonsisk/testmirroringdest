/* export function extractTableData(htmlString) {
  console.log("extractTableData called"); // Depuración
  // eslint-disable-next-line no-restricted-globals
  if (typeof window !== "undefined") {
    console.log("Running on client"); // Depuración
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
    console.log("Running on server"); // Depuració
    return { headers: [], rows: [] };
  }
}
 */
export function extractTableData(htmlString) {
  console.log("extractTableData called"); // Depuración
  // eslint-disable-next-line no-restricted-globals
  if (typeof window !== "undefined") {
    console.log("Running on client"); // Depuración
    try {
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
    } catch (error) {
      console.error("Error al procesar HTML:", error);
      // Aquí puedes decidir qué retornar en caso de error
      return { headers: [], rows: [] };
    }
  } else {
    console.log("Running on server"); // Depuració
    // Este es el caso para el servidor donde window no está definido
    return { headers: [], rows: [] };
  }
}
