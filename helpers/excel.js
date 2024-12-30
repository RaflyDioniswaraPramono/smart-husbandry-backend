const XLSX = require("xlsx");

const excel = async (filePath) => {
	try {
		const workBook = XLSX.readFile(filePath);
		const sheetName = workBook.SheetNames[0];
		const sheet = workBook.Sheets[sheetName];
		const data = XLSX.utils.sheet_to_json(sheet);

		return data;
	} catch (error) {
		console.error("Error processing Excel file:", error);
		throw new Error("Failed to process Excel file");
	}
};

const allExcel = async (filePath) => {
	try {
		const workbook = XLSX.readFile(filePath);
		const allSheets = [];

		workbook.SheetNames.forEach((sheetName) => {
			const sheetData = XLSX.utils.sheet_to_json(workbook.Sheets[sheetName]);
			allSheets.push({ sheetName, data: sheetData });
		});

		return allSheets;
	} catch (error) {
		console.error("Error processing Excel file:", error);
		throw new Error("Failed to process Excel file");
	}
};

module.exports = { allExcel, excel };
