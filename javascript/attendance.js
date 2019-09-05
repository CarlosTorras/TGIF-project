var statistics = {
  democrats: 0,
  republicans: 0,
  independents: 0,
  total: 0,
  demvoteswparty: 0,
  repvoteswparty: 0,
  indvoteswparty: 0,
  mostengaged: 0,
  leastengaged: 0
};

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
    // Table at a glance
    memberscount(membersarray);
    voteswparty(membersarray);
    glancetable(statistics);
    // Least Engaged
    statsleastengaged(membersarray);
    leastengaged(statistics.leastengaged, "leastengaged");
    // Most Engaged
    statsmostengaged(membersarray);
    mostengaged(statistics.mostengaged, "mostengaged");
  })
  .catch(function(error) {
    console.log(error);
  });

//For the table Senate at a glance

function memberscount(array) {
  var demlist = [];
  var replist = [];
  var indlist = [];

  for (i = 0; i < array.length; i++) {
    var fullname = array[i].last_name + " " + array[i].first_name;
    if (array[i].middle_name !== null) {
      fullname += " " + array[i].middle_name;
    }
    if (array[i].party == "R") {
      replist.push(fullname);
    } else if (array[i].party == "D") {
      demlist.push(fullname);
    } else {
      indlist.push(fullname);
    }
  }

  statistics.democrats = demlist.length;
  statistics.republicans = replist.length;
  statistics.independents = indlist.length;
  statistics.total = demlist.length + replist.length + indlist.length;
}

function voteswparty(array) {
  var demsum = 0;
  var repsum = 0;
  var indsum = 0;

  for (i = 0; i < array.length; i++) {
    if (array[i].party == "R") {
      repsum += array[i].votes_with_party_pct;
    } else if (array[i].party == "D") {
      demsum += array[i].votes_with_party_pct;
    } else {
      indsum += array[i].votes_with_party_pct;
    }
  }

  statistics.demvoteswparty = demsum / statistics.democrats;
  statistics.repvoteswparty = repsum / statistics.republicans;
  statistics.indvoteswparty = indsum / statistics.independents;

  for (const key in statistics) {
    if (isNaN(statistics[key])) {
      statistics[key] = 0;
    }
  }
}

//Table for at a glance

document.getElementById("dglance").style.display = "none";
document.getElementById("rglance").style.display = "none";
document.getElementById("iglance").style.display = "none";
document.getElementById("totalglance").style.display = "none";

function glancetable(object) {
  repnumbers.innerHTML = object.republicans;
  repvotes.innerHTML = object.repvoteswparty.toFixed(2) + "%";
  demnumbers.innerHTML = object.democrats;
  demvotes.innerHTML = object.demvoteswparty.toFixed(2) + "%";
  indnumbers.innerHTML = object.independents;
  indvotes.innerHTML = object.indvoteswparty.toFixed(2) + "%";
  totalpct.innerHTML =
    (
      (object.repvoteswparty + object.demvoteswparty + object.indvoteswparty) /
      3
    ).toFixed(2) + "%";

  document.getElementById("dglance").style.display = "";
  document.getElementById("rglance").style.display = "";
  document.getElementById("iglance").style.display = "";
  document.getElementById("totalglance").style.display = "";

  document.getElementById("loader-icon").style.display = "none";
}

//Table for least engaged

function compare(a, b) {
  if (a.missed_votes_pct > b.missed_votes_pct) {
    return -1;
  }
  if (a.missed_votes_pct < b.missed_votes_pct) {
    return 1;
  }
  return 0;
}

function statsleastengaged(array) {
  array.sort(compare);

  var tenpct = Math.round(array.length * 0.1);
  var arr = [];
  for (i = 0; i < tenpct; i++) {
    arr.push(array[i]);
  }
  console.log(arr);

  for (let i = tenpct - 1; i < array.length; i++) {
    if (
      array[i].missed_votes_pct == arr[arr.length - 1].missed_votes_pct &&
      array[i].first_name !== arr[arr.length - 1].first_name
    ) {
      arr.push(array[i]);
    }
  }
  statistics.leastengaged = arr;
}

function leastengaged(array, id) {
  let tbody = document.getElementById(id);

  for (let i = 0; i < array.length; i++) {
    let row = document.createElement("tr");
    let fullnamecell = document.createElement("td");
    let missedvotescell = document.createElement("td");
    let missedprctcell = document.createElement("td");

    var name = array[i].first_name + " " + array[i].last_name;
    if (array[i].middle_name !== null) {
      name += " " + array[i].middle_name;
    }

    fullnamecell.innerHTML = name;
    missedvotescell.innerHTML = array[i].missed_votes;
    missedprctcell.innerHTML = array[i].missed_votes_pct + "%";

    row.append(fullnamecell, missedvotescell, missedprctcell);

    tbody.append(row);
  }

  document.getElementById("loader-icon2").style.display = "none";
}

//Table for most engaged

function compare2(a, b) {
  if (a.missed_votes_pct < b.missed_votes_pct) {
    return -1;
  }
  if (a.missed_votes_pct > b.missed_votes_pct) {
    return 1;
  }
  return 0;
}

function statsmostengaged(array) {
  array.sort(compare2);

  var tenpct = Math.round(array.length * 0.1);
  var tenpctarr = [];
  for (i = 0; i < tenpct; i++) {
    tenpctarr.push(array[i]);
  }
  console.log(tenpctarr);

  for (let i = tenpct - 1; i < array.length; i++) {
    if (
      array[i].missed_votes_pct ==
        tenpctarr[tenpctarr.length - 1].missed_votes_pct &&
      array[i].first_name !== tenpctarr[tenpctarr.length - 1].first_name
    ) {
      tenpctarr.push(array[i]);
    }
  }

  statistics.mostengaged = tenpctarr;
}

function mostengaged(array, id) {
  let tbody = document.getElementById(id);

  for (let i = 0; i < array.length; i++) {
    let row = document.createElement("tr");
    let fullnamecell = document.createElement("td");
    let missedvotescell = document.createElement("td");
    let missedprctcell = document.createElement("td");

    var name2 = array[i].first_name + " " + array[i].last_name;
    if (array[i].middle_name !== null) {
      name += " " + array[i].middle_name;
    }

    fullnamecell.innerHTML = name2;
    missedvotescell.innerHTML = array[i].missed_votes;
    missedprctcell.innerHTML = array[i].missed_votes_pct + "%";

    row.append(fullnamecell, missedvotescell, missedprctcell);

    tbody.append(row);
  }

  document.getElementById("loader-icon3").style.display = "none";
}
