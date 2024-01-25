const ExcelJS = require('exceljs');
const fs = require('fs');

const workbook = new ExcelJS.Workbook();

// Cargar el archivo Excel
workbook.xlsx.readFile('./public/excel/Libro1.xlsx')
  .then(() => {
    const worksheet = workbook.worksheets[0];

    // Obtener el índice de la primera columna a copiar (2 para omitir la primera)
    const startColumnIndex = 2;

    // Convertir los datos de la hoja de cálculo a un objeto JSON
    const jsonData = [];

    // Iniciar la iteración desde la segunda fila
    for (let rowNumber = 2; rowNumber <= worksheet.rowCount; rowNumber++) {
      const row = worksheet.getRow(rowNumber);
      const rowData = {};

// Iterar a través de las celdas a partir de la columna deseada
for (let colNumber = startColumnIndex; colNumber <= worksheet.columnCount; colNumber++) {
  const columnName = worksheet.getRow(1).getCell(colNumber).value;
  const cellValue = row.getCell(colNumber).value;

  // Ajustar para tags y otras columnas según sea necesario
  if (columnName === 'tags') {
      // Convertir la cadena en un array
      rowData[columnName] = cellValue ? cellValue.split(',').map(tag => tag.trim()) : [];
  } else if (columnName === 'nivel' || columnName === 'categoria' || columnName === 'dias') {
      // Reemplazar comas con espacios y eliminar espacios adicionales
      rowData[columnName] = cellValue ? cellValue.replace(/,/g, ' ').trim() : '';
  } else {
      rowData[columnName] = cellValue;
  }
}



      jsonData.push(rowData);
    }

    // Generar tarjetas HTML a partir del JSON
    const htmlCards = jsonData.map(card => generateHtmlCard(card));

    // Guardar el objeto JSON y las tarjetas HTML en archivos
    fs.writeFileSync('./public/excel/Libro1.json', JSON.stringify(jsonData, null, 2));
    fs.writeFileSync('./public/excel/cards.html', htmlCards.join('\n'));

    console.log('Archivos JSON y HTML generados exitosamente.');
  })
  .catch(error => {
    console.error('Error al leer el archivo Excel:', error);
  });

// Función para obtener las clases CSS según el nivel de experiencia
function getLevelClass(level) {
  // Verificar si level tiene un valor antes de aplicar toLowerCase
  if (level && typeof level === 'string') {
    // Limpiar la cadena y luego mapear a las clases CSS correspondientes
    const cleanLevel = level.trim().toLowerCase();

    switch (cleanLevel) {
      case 'beginner':
        return 'beginner';
      case 'intermediate':
        return 'intermediate';
      case 'advanced':
        return 'advanced';
      default:
        return '';
    }
  } else {
    return '';
  }
}

// Función para generar el HTML de cada elemento del JSON
function generateHtmlCard(card) {
  return `
    <div class="post" data-category="${card.categoria}" data-level="${card.nivel}" data-days="${card.dias}">
        <div class="ctn-img"><img src="${card.imagen}" alt=""></div>
        <h2>${card.titulo}</h2>
        <span>${card.Fecha}</span>
        <ul class="ctn-tag">
            ${card.tags.map(tag => `<li>${tag}</li>`)}
        </ul>
        <a href="${card.href}"><button>leer más</button></a>
    </div>
  `;
}
