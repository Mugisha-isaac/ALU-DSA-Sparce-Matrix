const fs = require("fs");

const readMatrixFromFile = (filePath) => {
  const matrix = { numRows: 0, numCols: 0, elements: [] };

  try {
    const lines = fs.readFileSync(filePath, "utf-8").split("\n");
    matrix.numRows = parseInt(lines[0].split("=")[1]);
    matrix.numCols = parseInt(lines[1].split("=")[1]);

    const elementRegex = /^\(\s*-?\d+\s*,\s*-?\d+\s*,\s*-?\d+\s*\)$/;
    for (let i = 2; i < lines.length; i++) {
      const line = lines[i].trim();
      if (line && elementRegex.test(line)) {
        const parts = line
          .replace(/[()]/g, "")
          .split(",")
          .map((part) => part.trim());
        matrix.elements.push({
          row: parseInt(parts[0]),
          col: parseInt(parts[1]),
          value: parseInt(parts[2]),
        });
      } else {
        console.error("Invalid element format:", line);
        throw new Error("Invalid matrix file format");
      }
    }

    return matrix;
  } catch (error) {
    console.error("Error reading matrix file:", error);
    throw new Error("Invalid matrix file format");
  }
};

const addMatrices = (matrix1, matrix2) => {
  if (
    matrix1.numRows !== matrix2.numRows ||
    matrix1.numCols !== matrix2.numCols
  ) {
    throw new Error("Matrices must have the same dimensions");
  }

  const resultMatrix = {
    numRows: matrix1.numRows,
    numCols: matrix1.numCols,
    elements: [],
  };
  const matrix2Elements = matrix2.elements.reduce((acc, element) => {
    acc[`${element.row},${element.col}`] = element.value;
    return acc;
  }, {});

  for (const element of matrix1.elements) {
    const value2 = matrix2Elements[`${element.row},${element.col}`] || 0;
    resultMatrix.elements.push({
      row: element.row,
      col: element.col,
      value: element.value + value2,
    });
  }

  return resultMatrix;
};

const subtractMatrices = (matrix1, matrix2) => {
    if (
        matrix1.numRows !== matrix2.numRows ||
        matrix1.numCols !== matrix2.numCols
    ) {
        throw new Error("Matrices must have the same dimensions");
    }
    
    const resultMatrix = {
        numRows: matrix1.numRows,
        numCols: matrix1.numCols,
        elements: [],
    };
    const matrix2Elements = matrix2.elements.reduce((acc, element) => {
        acc[`${element.row},${element.col}`] = element.value;
        return acc;
    }, {});
    
    for (const element of matrix1.elements) {
        const value2 = matrix2Elements[`${element.row},${element.col}`] || 0;
        resultMatrix.elements.push({
        row: element.row,
        col: element.col,
        value: element.value - value2,
        });
    }
    
    return resultMatrix;
}

const multiplyMatrices = (matrix1, matrix2) => {
    if (matrix1.numCols !== matrix2.numRows) {
        throw new Error("Matrix1 number of columns must be equal to matrix2 number of rows");
    }
    
    const resultMatrix = {
        numRows: matrix1.numRows,
        numCols: matrix2.numCols,
        elements: [],
    };
    const matrix2Elements = matrix2.elements.reduce((acc, element) => {
        acc[`${element.row},${element.col}`] = element.value;
        return acc;
    }, {});
    
    for (const element of matrix1.elements) {
        const value2 = matrix2Elements[`${element.row},${element.col}`] || 0;
        resultMatrix.elements.push({
        row: element.row,
        col: element.col,
        value: element.value * value2,
        });
    }
    
    return resultMatrix;
}

const matrix1 = readMatrixFromFile("matrixfile1.txt");
const matrix2 = readMatrixFromFile("matrixfile2.txt");
const sum = addMatrices(matrix1, matrix2);
const difference = subtractMatrices(matrix1, matrix2);
const product = multiplyMatrices(matrix1, matrix2);
console.log(product);

// console.log(matrix);
