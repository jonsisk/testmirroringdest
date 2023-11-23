/* const jsdom = require("jsdom");

eval('require("fs")');
export function extractTableData(htmlString) {
  // Verifica si estamos en un entorno de navegador
  // eslint-disable-next-line no-restricted-globals
  // Solo importa y usa jsdom en el lado del servidor

  // Este código se ejecutará solo en Node.js (servidor)
  console.log("Ejecutando en el servidor, procesando HTML con jsdom");
  const { JSDOM } = require("jsdom");
  const { document } = new JSDOM(htmlString).window;

  const headers = Array.from(document.querySelectorAll("figure table thead tr th")).map((th) => ({
    Header: th.textContent.trim(),
    accessor: th.textContent.trim().toLowerCase(),
  }));

  const rows = Array.from(document.querySelectorAll("figure table tbody tr")).map((tr) => {
    const cells = tr.querySelectorAll("td");
    const rowData = {};
    cells.forEach((cell, index) => {
      rowData[headers[index].accessor] = cell.textContent.trim();
    });
    return rowData;
  });
  return { headers, rows };
}
 */
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
  console.log("HTML String:", htmlString);
  // eslint-disable-next-line no-restricted-globals
  if (typeof window !== "undefined") {
    console.log("Running on client"); // Depuración
    const parser = new DOMParser();
    const doc = parser.parseFromString(htmlString, "text/html");

    const headers = Array.from(doc.querySelectorAll("figure table thead tr th")).map((th) => {
      console.log("Header:", th.textContent.trim()); // Depuración
      return {
        Header: th.textContent.trim(),
        accessor: th.textContent.trim().toLowerCase(),
      };
    });

    const rows = Array.from(doc.querySelectorAll("figure table tbody tr")).map((tr) => {
      const cells = tr.querySelectorAll("td");
      const rowData = {};
      cells.forEach((cell, index) => {
        rowData[headers[index].accessor] = cell.textContent.trim();
      });
      return rowData;
    });
    console.log("Headers:", headers);
    console.log("Rows:", rows);
    return { headers, rows };
  } else {
    console.log("Running on server"); // Depuració
    // Este es el caso para el servidor donde window no está definido
    return { headers: [], rows: [] };
  }
}

/* export function extractTableData(htmlString) {
  // Crear un elemento DIV temporal para alojar el HTML
  // eslint-disable-next-line no-restricted-globals
  if (typeof window !== "undefined") {
    // eslint-disable-next-line no-restricted-globals
    const tempDiv = document.createElement("div");
    tempDiv.innerHTML = htmlString;

    // Extraer los encabezados de la tabla
    const headers = Array.from(tempDiv.querySelectorAll("figure table thead tr th")).map((th) => ({
      Header: th.textContent.trim(),
      accessor: th.textContent.trim().toLowerCase(),
    }));

    // Extraer las filas de la tabla
    const rows = Array.from(tempDiv.querySelectorAll("figure table tbody tr")).map((tr) => {
      const cells = tr.querySelectorAll("td");
      const rowData = {};
      cells.forEach((cell, index) => {
        rowData[headers[index].accessor] = cell.textContent.trim();
      });
      return rowData;
    });
    return { headers, rows };
  }
} */
/* export function extractTableData(htmlString) {
  // Crear un elemento DIV temporal para alojar el HTML
  // eslint-disable-next-line no-restricted-globals
  const tempDiv = document.createElement("div");
  tempDiv.innerHTML = htmlString;
  // eslint-disable-next-line no-restricted-globals

  // Extraer los encabezados de la tabla
  const headers = Array.from(tempDiv.querySelectorAll("figure table thead tr th")).map((th) => ({
    Header: th.textContent.trim(),
    accessor: th.textContent.trim().toLowerCase(),
  }));

  // Extraer las filas de la tabla
  const rows = Array.from(tempDiv.querySelectorAll("figure table tbody tr")).map((tr) => {
    const cells = tr.querySelectorAll("td");
    const rowData = {};
    cells.forEach((cell, index) => {
      rowData[headers[index].accessor] = cell.textContent.trim();
    });
    return rowData;
  });

  return { headers, rows };
} */
