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

excelSheet.prototype.renderAt = function (oDomRef) {
    this.oDom = oDomRef;
    this.generateSheet(this.iRows, this.iColumns, oDomRef);
}

excelSheet.prototype.getToolbar = function () {
    var oToolbar = document.createElement("div");
    var oAddBtn = document.createElement("button");
    oAddBtn.onclick = this.addRow.bind(this);
    oAddBtn.innerHTML = 'Add';
    oToolbar.appendChild(oAddBtn);
    return oToolbar;
};

excelSheet.prototype.getRow = function (iRow) {
    var oRow = document.createElement("tr");
    oRow.setAttribute("data-row", (iRow + 1));
    oRow.className = "row";
    for (var iColumn = 0; iColumn < n; iColumn++) {
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

excelSheet.prototype.generateSheet = function (m, n, oDomRef) {
    var oBody = oDomRef;

    // Get toolbar
    var oToolbar = this.getToolbar();

    this.oTable = document.createElement("table");
    // Create headers
    var oHeaderRow = document.createElement("tr");
    oHeaderRow.className = "tableHeader";
    for (var iHeader = 0; iHeader < m; iHeader++) {
        var oHeader = document.createElement("th");
        oHeader.innerHTML = (iHeader + 1);
        oHeaderRow.appendChild(oHeader);
    }
    this.oTable.appendChild(oHeaderRow);
    for (var iRow = 0; iRow < m; iRow++) {
        var oRow = this.getRow(iRow);
        this.oTable.appendChild(oRow);
    }
    oBody.appendChild(oToolbar);
    oBody.appendChild(this.oTable);
}

excelSheet.prototype.getValue = function (iRow, iColumn) {
    return this.oData[iRow][iColumn] ? this.oData[iRow][iColumn] : "";
};

excelSheet.prototype.addRow = function () {
    var iRowNum = this.oData.push(new Array(this.iColumns));
    var oRow = this.getRow(iRowNum - 1);
    this.oTable.appendChild(oRow);
};

// Assign Initial Rows and Columns
var m = 10; // rows
var n = 10; // columns

// Create an instance of excelSheet
var oSheet = new excelSheet(m, n);
var oBody = document.querySelector("body");
oSheet.renderAt(oBody);