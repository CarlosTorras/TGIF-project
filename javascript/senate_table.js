let membersarray = data.results[0].members;

printtable(membersarray, "senate-data");

function printtable(array, id) {
  let tbody = document.getElementById(id);
  for (let i = 0; i < array.length; i++) {
    let row = document.createElement("tr");
    let fullnamecell = document.createElement("td");
    let partycell = document.createElement("td");
    let statecell = document.createElement("td");
    let senioritycell = document.createElement("td");
    let totalvotescell = document.createElement("td");
    var fullname = array[i].last_name + " " + array[i].first_name;
    if (array[i].middle_name !== null) {
      fullname += " " + array[i].middle_name;
    }

    fullnamecell.innerHTML = fullname.link(array[i].url);
    partycell.innerHTML = array[i].party;
    statecell.innerHTML = array[i].state;
    senioritycell.innerHTML = array[i].seniority;
    totalvotescell.innerHTML = array[i].votes_with_party_pct + "%";

    row.append(
      fullnamecell,
      partycell,
      statecell,
      senioritycell,
      totalvotescell
    );
    tbody.append(row);
  }
}

// Filter for party

document.getElementById("demparty").addEventListener("click", function() {
  partyfilter("senate-data");
});
document.getElementById("repparty").addEventListener("click", function() {
  partyfilter("senate-data");
});
document.getElementById("indparty").addEventListener("click", function() {
  partyfilter("senate-data");
});

function partyfilter(id) {
  var table = document.getElementById(id);
  var trrow = table.getElementsByTagName("tr");
  var demcheck = document.getElementById("demparty").checked;
  var repcheck = document.getElementById("repparty").checked;
  var indcheck = document.getElementById("indparty").checked;

  for (i = 0; i < trrow.length; i++) {
    var tdparty = trrow[i].getElementsByTagName("td")[1].innerText;

    trrow[i].style.display = "none";

    if (demcheck == false && repcheck == false && indcheck == false) {
      trrow[i].style.display = "";
    }

    if (tdparty == "D" && demcheck == true) {
      trrow[i].style.display = "";
    }

    if (tdparty == "R" && repcheck == true) {
      trrow[i].style.display = "";
    }

    if (tdparty == "I" && indcheck == true) {
      trrow[i].style.display = "";
    }
  }
}

//Filter for state

document.getElementById("ddownstate").addEventListener("change", function() {
  statefilter("senate-data");
});

function statefilter(id) {
  var table = document.getElementById(id);
  var trrow = table.getElementsByTagName("tr");
  var value = document.getElementById("ddownstate").value;
  console.log(value);

  for (i = 0; i < trrow.length; i++) {
    var tdparty = trrow[i].getElementsByTagName("td")[2].innerText;
    trrow[i].style.display = "none";
    if (tdparty == value) {
      trrow[i].style.display = "";
    }
  }
}
