let data = {
  content: [
    {
      col1: "text1",
      col2: "text2",
      protocoll: [
        {
          col1: "prot1",
          col2: "prot2"
        }
      ]
    }
  ]
};

class Table {
  constructor(name, data, protocollString) {
    this.name = name;
    this.data = data;
    this.protocollString = protocollString;
  }

  //gibt eine Tabelle zurück über das data-> JSon Object
  create() {
    console.log("create Table");

    let tabelle = document.createElement("table");
    tabelle.setAttribute("id", this.name);

    tabelle.setAttribute("class", "table table-hover ");

    //hier erstelle ich die Columns für den head

    let thead = this.createTableHead();
    tabelle.appendChild(thead);

    tableBody = this.createTableBody();
    tabelle.appendChild(tableBody);

    return tabelle;
  }
  createRow(documentObj, buttons) {
    let tableBodyRow = document.createElement("tr");
    tableBodyRow.setAttribute("style", "vertical-align:middle");

    for (let value in documentObj) {
      if (value != this.protocollString) {
        let tableBodyColumn = document.createElement("td");

        tableBodyColumn.innerHTML = documentObj[value];
        tableBodyRow.appendChild(tableBodyColumn);
      }
    }

    if (buttons) {
      let buttonCollumn = document.createElement("td");
      editButton = this.createButton("edit", "editButton");
      editButton.setAttribute("data-toggle", "modal");
      //magic Number!!!
      editButton.setAttribute("data-target", "#exampleModalCenter");
      buttonCollumn.appendChild(editButton);

      protocollButton = this.createButton("receipt", "protoCollButton");

      if (documentObj[this.protocollString].length == 0) {
        $(protocollButton).addClass("noProtocoll");
      }
      buttonCollumn.appendChild(protocollButton);
      deleteButton = this.createButton("delete", "deleteButton");
      buttonCollumn.appendChild(deleteButton);

      tableBodyRow.appendChild(buttonCollumn);
    }
    console.log("row wurde erstellt");
    return tableBodyRow;
  }
  createTableHead() {
    let tableHead = document.createElement("thead");
    let data = this.data[0];
    console.log(data.col1);
    for (let column in data) {
      console.log(column);
      if (column != this.ProtocollString) {
        let tableHeadColumn = document.createElement("th");

        tableHeadColumn.innerHTML = column.toUpperCase();
        tableHead.appendChild(tableHeadColumn);
      }
    }
    console.log("Table head wurde erstellt");
    return tableHead;
  }
  createTableBody() {
    let tableBody = document.createElement("tbody");

    //hier erstelle ich Rows für tableBody
    for (let i = 0; i < this.data.length; i++) {
      tableBodyRow = this.createRow(this.data[i], true);
      tableBodyRow.setAttribute("id", i);

      tableBody.appendChild(tableBodyRow);
    }
    return tableBody;
  }
  appendRow(position) {
    console.log("Row wurde appended at position", position);
  }
  deleteRow(rowNr) {
    console.log("row wird gelöscht", rowNr);
  }
  exportToCsv(outputFileName) {
    console.log("CSV wird als ...", outputFileName);
  }
  exportToExcel(outputFileName) {
    console.log("Excel wird als ...", outputFileName);
  }
  createCheckBoxes() {
    console.log("CheckBoxes erstellt");
  }
  initializeModal() {
    console.log("Modal wurde initialisiert");
  }
  filterTable(expression) {
    console.log("suche nach expression: ", expression);
  }
}

$(document).ready(function() {
  FahrzeugTabelle = new Table("Test tabelle", data["content"], "protocoll");
  let FTabelle = FahrzeugTabelle.create();

  MitarbeiterTabelle = new Table(
    "Mitarbeiter tabelle",
    data["content"],
    "protocoll"
  );
  let MTabelle = MitarbeiterTabelle.create();

  document.getElementById("weitereTabelle").appendChild(FTabelle);

  document.getElementById("mTabelle").appendChild(MTabelle);
});
