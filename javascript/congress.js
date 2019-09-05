let membersarray;

// Start of fetch

let url;

if (window.location.pathname.includes("house")) {
  url = "https://api.propublica.org/congress/v1/113/house/members.json";
} else {
  url = "https://api.propublica.org/congress/v1/113/senate/members.json";
}

// Fetch caller

fetch(url, {
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

// Function for members table

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

// Dropdown menu

let statesarray = [
  {
    name: "Alabama",
    abbreviation: "AL"
  },
  {
    name: "Alaska",
    abbreviation: "AK"
  },
  {
    name: "American Samoa",
    abbreviation: "AS"
  },
  {
    name: "Arizona",
    abbreviation: "AZ"
  },
  {
    name: "Arkansas",
    abbreviation: "AR"
  },
  {
    name: "California",
    abbreviation: "CA"
  },
  {
    name: "Colorado",
    abbreviation: "CO"
  },
  {
    name: "Connecticut",
    abbreviation: "CT"
  },
  {
    name: "Delaware",
    abbreviation: "DE"
  },
  {
    name: "District Of Columbia",
    abbreviation: "DC"
  },
  {
    name: "Florida",
    abbreviation: "FL"
  },
  {
    name: "Georgia",
    abbreviation: "GA"
  },
  {
    name: "Guam",
    abbreviation: "GU"
  },
  {
    name: "Hawaii",
    abbreviation: "HI"
  },
  {
    name: "Idaho",
    abbreviation: "ID"
  },
  {
    name: "Illinois",
    abbreviation: "IL"
  },
  {
    name: "Indiana",
    abbreviation: "IN"
  },
  {
    name: "Iowa",
    abbreviation: "IA"
  },
  {
    name: "Kansas",
    abbreviation: "KS"
  },
  {
    name: "Kentucky",
    abbreviation: "KY"
  },
  {
    name: "Louisiana",
    abbreviation: "LA"
  },
  {
    name: "Maine",
    abbreviation: "ME"
  },
  {
    name: "Maryland",
    abbreviation: "MD"
  },
  {
    name: "Massachusetts",
    abbreviation: "MA"
  },
  {
    name: "Michigan",
    abbreviation: "MI"
  },
  {
    name: "Minnesota",
    abbreviation: "MN"
  },
  {
    name: "Mississippi",
    abbreviation: "MS"
  },
  {
    name: "Missouri",
    abbreviation: "MO"
  },
  {
    name: "Montana",
    abbreviation: "MT"
  },
  {
    name: "Nebraska",
    abbreviation: "NE"
  },
  {
    name: "Nevada",
    abbreviation: "NV"
  },
  {
    name: "New Hampshire",
    abbreviation: "NH"
  },
  {
    name: "New Jersey",
    abbreviation: "NJ"
  },
  {
    name: "New Mexico",
    abbreviation: "NM"
  },
  {
    name: "New York",
    abbreviation: "NY"
  },
  {
    name: "North Carolina",
    abbreviation: "NC"
  },
  {
    name: "North Dakota",
    abbreviation: "ND"
  },
  {
    name: "Northern Mariana Islands",
    abbreviation: "MP"
  },
  {
    name: "Ohio",
    abbreviation: "OH"
  },
  {
    name: "Oklahoma",
    abbreviation: "OK"
  },
  {
    name: "Oregon",
    abbreviation: "OR"
  },
  {
    name: "Pennsylvania",
    abbreviation: "PA"
  },
  {
    name: "Puerto Rico",
    abbreviation: "PR"
  },
  {
    name: "Rhode Island",
    abbreviation: "RI"
  },
  {
    name: "South Carolina",
    abbreviation: "SC"
  },
  {
    name: "South Dakota",
    abbreviation: "SD"
  },
  {
    name: "Tennessee",
    abbreviation: "TN"
  },
  {
    name: "Texas",
    abbreviation: "TX"
  },
  {
    name: "Utah",
    abbreviation: "UT"
  },
  {
    name: "Vermont",
    abbreviation: "VT"
  },
  {
    name: "Virgin Islands",
    abbreviation: "VI"
  },
  {
    name: "Virginia",
    abbreviation: "VA"
  },
  {
    name: "Washington",
    abbreviation: "WA"
  },
  {
    name: "West Virginia",
    abbreviation: "WV"
  },
  {
    name: "Wisconsin",
    abbreviation: "WI"
  },
  {
    name: "Wyoming",
    abbreviation: "WY"
  }
];

statesdropdown(statesarray);

function statesdropdown(array) {
  let sbody = document.getElementById("ddownstate");

  for (let i = 0; i < array.length; i++) {
    let option = document.createElement("option");

    option.innerHTML = array[i].name;

    option.setAttribute("value", array[i].abbreviation);

    sbody.append(option);
  }
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

  var demcheck = document.getElementById("demparty").checked;
  var repcheck = document.getElementById("repparty").checked;
  var indcheck = document.getElementById("indparty").checked;
  var value = document.getElementById("ddownstate").value;

  var noresults = true;

  for (i = 0; i < trrow.length - 1; i++) {
    var tdparty = trrow[i].getElementsByTagName("td")[1].innerHTML;
    var tdstate = trrow[i].getElementsByTagName("td")[2].innerText;

    trrow[i].style.display = "none";

    if (
      demcheck == false &&
      repcheck == false &&
      indcheck == false &&
      (value == "inactive" || value == "AA")
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
      (value == "inactive" || value == "AA")
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
      (value == "inactive" || value == "AA")
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
      (value == "inactive" || value == "AA")
    ) {
      trrow[i].style.display = "";
      noresults = false;
    } else if (tdstate == value && tdparty == "I" && indcheck == true) {
      trrow[i].style.display = "";
      noresults = false;
    }
  }

  if (noresults == true) {
    document.getElementById("noresults").style.display = "block";
  } else if (noresults == false) {
    document.getElementById("noresults").style.display = "none";
  }
}
