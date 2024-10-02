const fs = require("fs");
const readline = require("readline");
const operations = require("./operations");

function getUserInput() {
  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
  });

  return new Promise((resolve) => {
    rl.question("Enter the operation (add, subtract, multiply): ", (answer) => {
      rl.close();
      resolve(answer.trim().toLowerCase());
    });
  });
}

async function main() {
  const matrix1 = operations.readMatrixFromFile("matrixfile1.txt");
  const matrix2 = operations.readMatrixFromFile("matrixfile2.txt");
  const matrix2Transposed = operations.transposeMatrix(matrix2);

  const operation = await getUserInput();

  switch (operation) {
    case "add":
      console.log(operations.addMatrices(matrix1, matrix2));
      break;
    case "subtract":
      console.log(operations.subtractMatrices(matrix1, matrix2));
      break;
    case "multiply":
      console.log(operations.multiplyMatrices(matrix1, matrix2Transposed));
      break;
    default:
      console.error("Invalid operation:", operation);
      return;
  }
}

main();
