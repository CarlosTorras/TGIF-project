let membersarray = data.results[0].members;

// Start of the fetch function

fetch("https://api.propublica.org/congress/v1/113/house/members.json", {
  method: "GET",
  headers: { "X-API-key": "ELLwJVAERTRPBpk6kEp4sHgGNdz5jwLTUG8Tq5Uq" }
})
  .then(function(tgif) {
    console.log(tgif);
    return tgif.json();
  })
  .then(function(tgif) {
    console.log(tgif);
    membersarray = tgif.results[0].members;
    //Functions callers
    printtable(membersarray, "senate-data");
  })
  .catch(function(error) {
    console.log(error);
  });

// End of the fetch function

// Function for House members table

function printtable(array, id) {
  let tbody = document.getElementById(id);

  for (let i = 0; i < array.length; i++) {
    let row = tbody.insertRow(i);
    let fullnamecell = row.insertCell(0);
    let partycell = row.insertCell(1);
    let statecell = row.insertCell(2);
    let senioritycell = row.insertCell(3);
    let totalvotescell = row.insertCell(4);
    var fullname = array[i].last_name + " " + array[i].first_name;
    if (array[i].middle_name !== null) {
      fullname += " " + array[i].middle_name;
    }

    fullnamecell.innerHTML = fullname.link(array[i].url);
    partycell.innerHTML = array[i].party;
    statecell.innerHTML = array[i].state;
    senioritycell.innerHTML = array[i].seniority;
    totalvotescell.innerHTML = array[i].votes_with_party_pct + "%";
  }
  document.getElementById("load-icon").style.display = "none";
}

// Filters for party & state

document.getElementById("demparty").addEventListener("click", function() {
  tablefilter("senate-data");
});
document.getElementById("repparty").addEventListener("click", function() {
  tablefilter("senate-data");
});
document.getElementById("indparty").addEventListener("click", function() {
  tablefilter("senate-data");
});
document.getElementById("ddownstate").addEventListener("change", function() {
  tablefilter("senate-data");
});

function tablefilter(id) {
  var table = document.getElementById(id);
  var trrow = table.getElementsByTagName("tr");
  var noresults = true;

  var demcheck = document.getElementById("demparty").checked;
  var repcheck = document.getElementById("repparty").checked;
  var indcheck = document.getElementById("indparty").checked;
  var value = document.getElementById("ddownstate").value;

  for (i = 0; i < trrow.length; i++) {
    var tdparty = trrow[i].getElementsByTagName("td")[1].innerHTML;
    var tdstate = trrow[i].getElementsByTagName("td")[2].innerText;
    console.log(tdparty);

    trrow[i].style.display = "none";

    if (
      demcheck == false &&
      repcheck == false &&
      indcheck == false &&
      (value == "inactive" || value == "AS")
    ) {
      trrow[i].style.display = "";
      noresults = false;
    } else if (
      demcheck == false &&
      repcheck == false &&
      indcheck == false &&
      tdstate == value
    ) {
      trrow[i].style.display = "";
      noresults = false;
    }

    if (
      tdparty == "D" &&
      demcheck == true &&
      (value == "inactive" || value == "AS")
    ) {
      trrow[i].style.display = "";
      noresults = false;
    } else if (tdstate == value && tdparty == "D" && demcheck == true) {
      trrow[i].style.display = "";
      noresults = false;
    }

    if (
      tdparty == "R" &&
      repcheck == true &&
      (value == "inactive" || value == "AS")
    ) {
      trrow[i].style.display = "";
      noresults = false;
    } else if (tdstate == value && tdparty == "R" && repcheck == true) {
      trrow[i].style.display = "";
      noresults = false;
    }

    if (
      tdparty == "I" &&
      indcheck == true &&
      (value == "inactive" || value == "AS")
    ) {
      trrow[i].style.display = "";
      noresults = false;
    } else if (tdstate == value && tdparty == "I" && indcheck == true) {
      trrow[i].style.display = "";
      noresults = false;
    }
  }

  if (noresults == true) {
    let tbody = document.getElementById(id);
    let row = document.createElement("tr");
    let noresultcell = document.createElement("td");

    noresultcell.setAttribute("colspan", "5");

    noresultcell.innerHTML = "No result matching your request.";

    row.append(noresultcell);
    tbody.append(row);
  }
}
