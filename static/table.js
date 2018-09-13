let json_data_2 = {
  content: [
    {
      Kennzeichen: "Adolf Hitler",
      Mitarbeiter: "2345",
      Test: "maraschka",
      Makaschka: "halloWorld",
      asd: "2345",
      fas: "kakaschka",
      ada: "halloWorld",
      protocoll: [
        {
          Kennzeichen: "Prtokoll2",
          Mitarbeiter: "2345",
          Test: "kakaschka",
          Makaschka: "halloWorld",
          asd: "2345",
          fas: "kakaschka",
          ada: "halloWorld",
          asdasd: "kakaschka",
          adafsa: "halloWorld"
        },
        {
          Kennzeichen: "Protokoll alt",
          Mitarbeiter: "2345",
          Test: "kakaschka",
          Makaschka: "halloWorld",
          asd: "2345",
          fas: "kakaschka",
          ada: "halloWorld",
          asdasd: "kakaschka",
          adafsa: "halloWorld"
        }
      ],
      asdasd: "kakaschka",
      adafsa: "halloWorld"
    },
    {
      Kennzeichen: "2",
      Mitarbeiter: "2345",
      Test: "kakaschka",
      Makaschka: "halloWorld",
      asd: "2345",
      fas: "kakaschka",
      ada: "Jones",
      protocoll: [],
      asdasd: "kakasfchka",
      adafsa: "halloWorld"
    }
  ]
};

let json_data_ = {
  content: [
    {
      color: "black",
      category: "hue",
      type: "secondary",
      protocoll: []
    },
    {
      color: "white",
      category: "value",
      type: "secondary",
      protocoll: [
        {
          color: "white",
          category: "value",
          type: "secondary"
        }
      ]
    },
    {
      color: "red",
      category: "hue",
      type: "primary",
      protocoll: [
        {
          color: "red",
          category: "hue",
          type: "Peter ZWeger"
        }
      ]
    },
    {
      color: "blue",
      category: "hue",
      type: "primary",
      protocoll: []
    },
    {
      color: "yellow",
      category: "hue",
      type: "primary",
      protocoll: []
    },
    {
      color: "green",
      category: "hue",
      type: "secondary",
      protocoll: []
    }
  ]
};

let contentString = "content";
let ProtocollString = "protocoll";
let currentTable = "FahrzeugTabelle";

function createTable(json_data, TableID) {
  let tabelle = document.createElement("table");
  tabelle.setAttribute("id", TableID);

  tabelle.setAttribute("class", "table table-hover ");

  //hier erstelle ich die Columns für den head

  tableHead = createHead(json_data);
  tabelle.appendChild(tableHead);

  tableBody = createTableBody(json_data);
  tabelle.appendChild(tableBody);

  return tabelle;
}

function createHead(json_data) {
  let tableHead = document.createElement("thead");

  for (column in json_data[0]) {
    if (column != "protocoll") {
      let tableHeadColumn = document.createElement("th");

      tableHeadColumn.innerHTML = column;
      tableHead.appendChild(tableHeadColumn);
    }
  }
  return tableHead;
}

//content String -> jsonObject = {contentString: {...}, status: {...}}
function createTableBody(json_data) {
  let tableBody = document.createElement("tbody");

  //hier erstelle ich Rows für tableBody
  for (i = 0; i < json_data.length; i++) {
    tableBodyRow = createRow(json_data[i], true);
    tableBodyRow.setAttribute("id", i);

    tableBody.appendChild(tableBodyRow);
  }
  return tableBody;
}

// jsonObject = {hallo:"Test", mallo:"Test"}
function createRow(jsonObject, buttons) {
  let tableBodyRow = document.createElement("tr");
  tableBodyRow.setAttribute("style", "vertical-align:middle");

  for (value in jsonObject) {
    if (value != ProtocollString) {
      let tableBodyColumn = document.createElement("td");

      tableBodyColumn.innerHTML = jsonObject[value];
      tableBodyRow.appendChild(tableBodyColumn);
    }
  }

  if (buttons) {
    let buttonCollumn = document.createElement("td");
    editButton = createButton("edit", "editButton");
    buttonCollumn.appendChild(editButton);

    protocollButton = createButton("receipt", "protoCollButton");

    if (jsonObject[ProtocollString].length == 0) {
      $(protocollButton).addClass("noProtocoll");
    }
    buttonCollumn.appendChild(protocollButton);
    deleteButton = createButton("delete", "deleteButton");
    buttonCollumn.appendChild(deleteButton);

    tableBodyRow.appendChild(buttonCollumn);
  }

  return tableBodyRow;
}

//füght eine Row ganz oben hinzu
function addRow(jsonObject, tableId) {
  //neue Zeile wird erstellt
  let newRow = createRow(jsonObject, true);
  $(newRow.getElementsByClassName("protoCollButton")[0]).addClass(
    "noProtocoll disabled"
  );

  //hier wird die erste Zeile der Tabelle selected

  let firstRow = document
    .getElementById(tableId)
    .getElementsByTagName("tbody")[0]
    .getElementsByTagName("tr")[0];

  //Neue Zeile wird vor der ersten ursprünglichen Zeile der Ziel Tabelle eingefügt
  document
    .getElementById(tableId)
    .getElementsByTagName("tbody")[0]
    .insertBefore(newRow, firstRow);
}

function toggleProtocoll(jsonObject, referenzeRow) {
  //neue Zeile wird erstellt

  if (referenzeRow.id) {
    let currentRowID = referenzeRow.id;
    let Protocoll = jsonObject[contentString][currentRowID][ProtocollString];

    for (value in Protocoll) {
      //rekursiv, ich fange mit dem letzten objekt an, so dass das aktuellste zuerst kommt
      let newRow = createRow(Protocoll[Protocoll.length - 1 - value], false);
      newRow.setAttribute("class", "protocoll");

      referenzeRow.parentNode.insertBefore(newRow, referenzeRow.nextSibling);
    }
  }
}

function insertAfter(newNode, referenceNode) {
  referenceNode.parentNode.insertBefore(newNode, referenceNode.nextSibling);
}

//delete Row
function deleteRow(rowNr, tableId) {
  document.getElementById(tableId).deleteRow(rowNr);
}

//Name von material icons
function createButton(materialIconName, buttonClass) {
  let button = document.createElement("button");
  button.setAttribute(
    "class",
    `mdl-button mdl-js-button mdl-button--icon ${buttonClass}`
  );

  let i = document.createElement("i");
  i.setAttribute("class", "material-icons");

  i.innerHTML = materialIconName;

  button.appendChild(i);

  return button;
}

function downloadCSV(csv, filename) {
  var csvFile;
  var downloadLink;

  // CSV file
  csvFile = new Blob([csv], { type: "text/csv" });

  // Download link
  downloadLink = document.createElement("a");

  // File name
  downloadLink.download = filename;

  // Create a link to the file
  downloadLink.href = window.URL.createObjectURL(csvFile);

  // Hide download link
  downloadLink.style.display = "none";

  // Add the link to DOM
  document.body.appendChild(downloadLink);

  // Click download link
  downloadLink.click();
}

function exportTableToCSV(filename, tableID) {
  var csv = [];
  var rows = document.getElementById(tableID).querySelectorAll("table tr");

  for (var i = 0; i < rows.length; i++) {
    var row = [],
      cols = rows[i].querySelectorAll("td, th");

    for (var j = 0; j < cols.length; j++) row.push(cols[j].innerText);

    csv.push(row.join(","));
  }

  // Download CSV file
  downloadCSV(csv.join("\n"), filename);
}

function exportTableToExcel(tableID, filename = "") {
  var downloadLink;
  var dataType = "application/vnd.ms-excel";
  var tableSelect = document.getElementById(tableID);
  var tableHTML = tableSelect.outerHTML.replace(/ /g, "%20");

  // Specify file name
  filename = filename ? filename + ".xls" : "excel_data.xls";

  // Create download link element
  downloadLink = document.createElement("a");

  document.body.appendChild(downloadLink);

  if (navigator.msSaveOrOpenBlob) {
    var blob = new Blob(["\ufeff", tableHTML], {
      type: dataType
    });
    navigator.msSaveOrOpenBlob(blob, filename);
  } else {
    // Create a link to the file
    downloadLink.href = "data:" + dataType + ", " + tableHTML;

    // Setting the file name
    downloadLink.download = filename;

    //triggering the function
    downloadLink.click();
  }
}

function filterTable() {
  let TableID = currentTable;
  // Declare variables
  var input, filter, table, tr, td, i;

  input = document.getElementById("searchField");

  filter = input.value.toUpperCase();
  table = document.getElementById(TableID);
  tr = table.getElementsByTagName("tr");

  // Loop through all table rows, and hide those who don't match the search query
  for (var i = 0; i < tr.length; i++) {
    var check = false;
    for (var j = 0; j < tr[i].getElementsByTagName("td").length; j++) {
      td = tr[i].getElementsByTagName("td")[j];
      if (td) {
        if (td.innerHTML.includes("</") == false) {
          if (td.innerHTML.toUpperCase().indexOf(filter) > -1) {
            check = true;
          }
        }
      }
    }

    if (check) {
      tr[i].style.display = "";
      if (tr[i].classList.contains("nodisplay")) {
        tr[i].classList.remove("nodisplay");
      }
      if (tr[i].getElementsByTagName("button").length != 0) {
        button_id = tr[i].getElementsByTagName("button")[0].id;
        var protocol_elemets = table.getElementsByClassName(button_id);
        for (j = 0; j < protocol_elemets.length; j++) {
          protocol_elemets[j].style.display = "";
          if (protocol_elemets[j].classList.contains("nodisplay")) {
            protocol_elemets[j].classList.remove("nodisplay");
          }
        }
      }
    } else {
      tr[i].style.display = "none";
      tr[i].classList.add("nodisplay");
    }
  }
}

function prepareModal(modalFormID, json_data) {
  let modalForm = document.getElementById(modalFormID);

  for (column in json_data[contentString][0]) {
    if (column != "protocoll") {
      let formDiv = document.createElement("div");
      formDiv.setAttribute("class", "form-group");
      let formLabel = document.createElement("label");
      formLabel.setAttribute("class", "bmd-label-floating");
      formLabel.innerHTML = column;
      formDiv.appendChild(formLabel);
      let formInput = document.createElement("input");
      formInput.setAttribute("class", "form-control");
      formInput.setAttribute("name", column);

      formDiv.appendChild(formInput);
      let formSpan = document.createElement("span");
      formSpan.setAttribute("class", "bmd-help");

      formDiv.appendChild(formSpan);
      modalForm.appendChild(formDiv);
    }
  }
}

//handler

$(document).ready(function() {
  let TableID = currentTable;

  prepareModal("modalForm", json_data_);

  document
    .getElementById("tabelle")
    .appendChild(createTable(json_data_[contentString], TableID));

  //Funktion brauchbar wenn ein element noch nicht in der Dom ist
  $(document).on("click", ".deleteButton", function() {
    let rowIndex = $(this).closest("tr")[0].rowIndex;
    deleteRow(rowIndex, TableID);
  });

  //füge eine neue Row hinzu
  $("#addFahrzeuge").click(function() {
    let modalForm = document.getElementById("modalForm");

    let inputFields = modalForm.getElementsByTagName("input");
    console.log(inputFields);

    let inputStruct = { protocoll: [] };
    for (input = 0; input < inputFields.length; input++) {
      let inputValue = inputFields[input];
      inputStruct[inputFields[input].name] = inputValue.value;
    }

    addRow(inputStruct, TableID);
  });

  //downloade die Tabelle als CSV
  $(".downloadCSV").click(function() {
    exportTableToCSV(`${TableID}Tabelle.csv`, TableID);
  });

  //downloade die Tabelle als excel
  $(".downloadExcel").click(function() {
    exportTableToExcel(TableID, (filename = `${TableID}Tabelle`));
  });

  // Trigger das PRotocoll

  $(document).on("click", ".protoCollButton", function() {
    if ($(this).hasClass("pressed")) {
      $("table tr.protocoll").remove();
      $(this).removeClass("pressed");
    } else {
      $(".pressed").removeClass("pressed");
      $("table tr.protocoll").remove();
      let referenceRow = $(this).closest("tr")[0];

      toggleProtocoll(json_data_, referenceRow);
      $(this).addClass("pressed");
    }
  });

  $(document).on("click", ".noProtocoll", function() {});
});
