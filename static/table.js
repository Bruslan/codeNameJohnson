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
      Mitarbeiter: "jan",
      Francheckso: "blabla",
      Francheckasdaso: "asd",
      asdarq: "a",
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
    if (column != ProtocollString) {
      let tableHeadColumn = document.createElement("th");

      tableHeadColumn.innerHTML = column.toUpperCase();
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
    editButton.setAttribute("data-toggle", "modal");
    editButton.setAttribute("data-target", "#exampleModalCenter");
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
function editRow() {}
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

function createCheckboxes(jsonObject) {
  let targetDiv = document.getElementById("switches");
  let letswitch = "";

  for (columns in jsonObject[contentString][0]) {
    if (columns != ProtocollString) {
      letswitch += `<span class="bmd-form-group is-filled col-md-auto"><div class="switch"><label><input type="checkbox" class="checkboxButton" checked=""><span class="bmd-switch-track"></span><p class="${columns.toUpperCase()}">${columns.toUpperCase()}</p></label></div></span>`;
    }
  }

  targetDiv.innerHTML = letswitch;
  // console.log("createSwitches");
  // let switchesDiv = document.getElementById("switches");

  // for (columns in jsonObject[contentString][0]) {
  //   let switchesCol = document.createElement("div");
  //   switchesCol.setAttribute("class", "col");
  //   let span = document.createElement("span");
  //   span.setAttribute("class", "mdl-switch__label");

  //   console.log("switches werden erstellt");
  //   let switchDiv = document.createElement("div");
  //   switchDiv.setAttribute("class", "switch");
  //   let swtichLabel = document.createElement("label");
  //   swtichLabel.setAttribute(
  //     "class",
  //     "mdl-switch mdl-js-switch mdl-js-ripple-effect mdl-js-ripple-effect--ignore-events is-checked is-upgraded"
  //   );

  //   swtichLabel.setAttribute("for", "switch-1");
  //   let switchInput = document.createElement("input");
  //   switchInput.setAttribute("type", "checkbox");
  //   switchInput.setAttribute("class", "mdl-switch__input");
  //   switchInput.checked = true;
  //   switchInput.innerHTML = jsonObject[contentString][0][columns];
  //   swtichLabel.appendChild(switchInput);
  //   swtichLabel.appendChild(span);
  //   switchesCol.appendChild(swtichLabel);
  //   switchesDiv.appendChild(switchesCol);
  // }
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

function toogleCheckBoxes(checkBox) {
  //die Column Name
  let currentCheckboxName = checkBox.parentNode.getElementsByTagName("p")[0]
    .innerHTML;
  let tbl = document.getElementById(currentTable);

  //sucht alle table headers
  let cols = tbl.getElementsByTagName("th");
  let targetIndex;
  //Toggle die Ths
  for (tableHeads in cols) {
    if (cols[tableHeads].innerHTML == currentCheckboxName) {
      targetIndex = tableHeads;
      //Checkbox spezifische th gefunden!
      let checkBoxSpezifischeTh = cols[tableHeads];

      if (checkBoxSpezifischeTh.classList.contains("hidden")) {
        checkBoxSpezifischeTh.classList.remove("hidden");
        //wenn die Th hidden ist soll sie wieder angezeigt werden
      } else {
        checkBoxSpezifischeTh.classList.add("hidden");

        //finde alle Trs von der th->

        //setze th auf hidden
      }
    }
  }

  //suche alle trs von targetIndex
  let allTrs = tbl.getElementsByTagName("tr");
  for (tr = 0; tr < allTrs.length; tr++) {
    let allTds = allTrs[tr];

    let targetTd = allTds.childNodes[targetIndex];

    if (targetTd.classList.contains("hidden")) {
      targetTd.classList.remove("hidden");
    } else {
      targetTd.classList.add("hidden");
    }
  }
}

//handler

$(document).ready(function() {
  createCheckboxes(json_data_);
  let TableID = currentTable;

  $(document).on("click", ".checkboxButton", function() {
    toogleCheckBoxes(this);
  });

  prepareModal("modalForm", json_data_);

  document
    .getElementById("tabelle")
    .appendChild(createTable(json_data_[contentString], TableID));

  //Funktion brauchbar wenn ein element noch nicht in der Dom ist
  $(document).on("click", ".deleteButton", function() {
    let rowIndex = $(this).closest("tr")[0].rowIndex;
    deleteRow(rowIndex, TableID);
  });

  $("#addButton").click(function() {
    //toggle die Buttons von edit auf add
    document.getElementById("addFahrzeuge").hidden = false;
    document.getElementById("editSave").hidden = true;

    let modalForm = document.getElementById("modalForm");
    modalForm.name = "";
  });
  //füge eine neue Row hinzu
  $("#addFahrzeuge").click(function() {
    let modalForm = document.getElementById("modalForm");

    let inputFields = modalForm.getElementsByTagName("input");

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

  $(document).on("click", ".editButton", function() {
    //toggle die Modal buttons von Save auf Edit
    document.getElementById("addFahrzeuge").hidden = true;
    document.getElementById("editSave").hidden = false;

    //lese die rows des edit Buttons aus
    let currentRowsTds = $(this)
      .closest("tr")[0]
      .getElementsByTagName("td");

    //geben der Modal form die Id des current Rows
    let modalForm = document.getElementById("modalForm");

    modalForm.name = this.closest("tr").id;

    //befülle die Modal inputs mit den Daten aus den tds
    let inputFields = modalForm.getElementsByTagName("input");
    for (td in currentRowsTds) {
      if (inputFields[td] != undefined) {
        let tdInhalt = currentRowsTds[td].innerHTML;
        inputFields[td].value = tdInhalt;
      }
    }

    for (input = 0; input < inputFields.length; input++) {}
  });

  $(document).on("click", "#editSave", function() {
    //suche die current Modal aus
    let modalForm = document.getElementById("modalForm");
    let modaId = modalForm.name;

    //die Input fields des MOdals werden in die target trs eingefügt
    let inputFields = modalForm.getElementsByTagName("input");
    let targetTr = document.getElementById(modaId);
    let targetTds = targetTr.getElementsByTagName("td");

    //hier in die Datenbank einspeisen
    let inputStruct = {};
    for (input = 0; input < inputFields.length; input++) {
      //setze die letzten Einträge in das Protocoll

      inputStruct[inputFields[input].name] = inputFields[input].value;

      let inputValue = inputFields[input];
      targetTds[input].innerHTML = inputValue.value;
    }

    json_data_[contentString][modaId][ProtocollString].push(inputStruct);

    //hier entferne ich die Classe von Protocoll

    $(targetTr.getElementsByClassName("noProtocoll")).removeClass(
      "noProtocoll"
    );

    ///hier json_data hochschicken zu mongo DB

    $("#exampleModalCenter").modal("hide");

    $("body").bootstrapMaterialDesign();

    // editRow(inputStruct, TableID);
  });
});
