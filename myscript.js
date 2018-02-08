// Class for an excel sheet
function excelSheet(m, n) {
    this.iRows = m;
    this.iColumns = n;

    this.oData = new Array(m);

    // Parent element that will hold excel sheet
    this.oDom = null;
    // Table element
    this.oTable = null;

    // Initialize each row array of columns
    for (var iIndex = 0; iIndex < m; iIndex++) {
        this.oData[iIndex] = new Array(n);
    }
}
/**
 * 
 * @param  {Object} oDomRef
 */
excelSheet.prototype.renderAt = function (oDomRef) {
    this.oDom = oDomRef;
    this.generateSheet(this.iRows, this.iColumns, oDomRef);
}

/**
 * 
 * @param {Integer} m 
 * @param {Integer} n 
 * @param {Object} oDomRef 
 */
excelSheet.prototype.generateSheet = function (m, n, oDomRef) {
    var oBody = oDomRef;

    // Get toolbar
    var oToolbar = this.getToolbar();

    this.oTable = document.createElement("table");
    // Create headers
    var oHeaderRow = document.createElement("tr");
    oHeaderRow.className = "tableHeader";
    for (var iHeader = 1; iHeader <= m; iHeader++) {
        var oHeader = document.createElement("th");
        oHeader.innerHTML = (iHeader);
        oHeaderRow.appendChild(oHeader);
    }
    this.oTable.appendChild(oHeaderRow);
    for (var iRow = 1; iRow <= m; iRow++) {
        var oRow = this.getRow(iRow);
        this.oTable.appendChild(oRow);
    }
    oBody.appendChild(oToolbar);
    oBody.appendChild(this.oTable);
}

excelSheet.prototype.getToolbar = function () {
    var oToolbar = document.createElement("div");
    var oAddRowBtn = document.createElement("button");
    oAddRowBtn.onclick = this.addRow.bind(this);
    oAddRowBtn.innerHTML = 'Add Row';
    oToolbar.appendChild(oAddRowBtn);
    var oAddColBtn = document.createElement("button");
    oAddColBtn.onclick = this.addColumn.bind(this);
    oAddColBtn.innerHTML = 'Add Column';
    oToolbar.appendChild(oAddColBtn);
    return oToolbar;
};

excelSheet.prototype.addRow = function () {
    var iRowNum = this.oData.push(new Array(this.iColumns));
    var oRow = this.getRow(iRowNum);
    this.oTable.appendChild(oRow);
};

excelSheet.prototype.addColumn = function () {
   // write code to add a new column
};

excelSheet.prototype.getRow = function (iRow) {
    var oRow = document.createElement("tr");
    oRow.setAttribute("data-row", (iRow));
    oRow.className = "row";
    for (var iColumn = 1; iColumn <= n; iColumn++) {
        var oColumn = document.createElement("td");
        oColumn.setAttribute("data-col", iColumn);
        oColumn.setAttribute("data-row", iRow);
        var oInput = document.createElement("div");
        oInput.className = "cell";
        oInput.setAttribute("contenteditable", "true");
        oInput.innerHTML = this.getValue(iRow, iColumn);
        oColumn.appendChild(oInput);
        oRow.appendChild(oColumn);
    }
    return oRow;
};

excelSheet.prototype.getValue = function (iRow, iColumn) {
    return this.oData[iRow - 1][iColumn - 1] ? this.oData[iRow - 1][iColumn - 1] : "";
};

// Assign Initial Rows and Columns
var m = 10; // rows
var n = 10; // columns

// Create an instance of excelSheet
var oSheet = new excelSheet(m, n);
var oBody = document.querySelector("body");
oSheet.renderAt(oBody);