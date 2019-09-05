var statistics = {
  democrats: 0,
  republicans: 0,
  independents: 0,
  total: 0,
  demvoteswparty: 0,
  repvoteswparty: 0,
  indvoteswparty: 0,
  leastloyal: 0,
  mostloyal: 0
};

let membersarray;

// Start of the fetch function

fetch("https://api.propublica.org/congress/v1/113/senate/members.json", {
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
    //Senate at a glance
    memberscount(membersarray);
    voteswparty(membersarray);
    table2(statistics);
    // Least Loyal
    leastloyalarr(membersarray);
    lloyaltable(statistics.leastloyal, "leastloyal");
    // Most Loyal
    mostloyalarr(membersarray);
    mloyaltable(statistics.mostloyal, "mostloyal");
  })
  .catch(function(error) {
    console.log(error);
  });

// Info for table at a glance

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
}

//Table for senate at a glance

document.getElementById("dglance").style.display = "none";
document.getElementById("rglance").style.display = "none";
document.getElementById("iglance").style.display = "none";
document.getElementById("totalglance").style.display = "none";

function table2(object) {
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

//Table for least loyal

function compare2(a, b) {
  if (a.votes_with_party_pct < b.votes_with_party_pct) {
    return -1;
  }
  if (a.votes_with_party_pct > b.votes_with_party_pct) {
    return 1;
  }
  return 0;
}

function leastloyalarr(array) {
  array.sort(compare2);

  var arr = [];
  var tenpct = Math.round(array.length * 0.1);

  for (i = 0; i < tenpct; i++) {
    arr.push(array[i]);
  }

  for (let i = tenpct + 1; i < array.length; i++) {
    if (
      array[i].votes_with_party_pct == arr[arr.length - 1].votes_with_party_pct
    ) {
      arr.push(array[i]);
    }
  }

  statistics.leastloyal = arr;
}

function lloyaltable(array, id) {
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
    var votes_w_party = Math.round(
      ((array[i].total_votes - array[i].missed_votes) *
        array[i].votes_with_party_pct) /
        100
    );

    fullnamecell.innerHTML = name;
    missedvotescell.innerHTML = votes_w_party;
    missedprctcell.innerHTML = array[i].votes_with_party_pct + "%";

    row.append(fullnamecell, missedvotescell, missedprctcell);

    tbody.append(row);
  }

  document.getElementById("loader-icon2").style.display = "none";
}

//Table for most loyal

function compareback(a, b) {
  if (a.votes_with_party_pct > b.votes_with_party_pct) {
    return -1;
  }
  if (a.votes_with_party_pct < b.votes_with_party_pct) {
    return 1;
  }
  return 0;
}

function mostloyalarr(array) {
  array.sort(compareback);

  var arr = [];
  var tenpct = Math.round(array.length * 0.1);

  for (i = 0; i < tenpct; i++) {
    arr.push(array[i]);
  }

  for (let i = tenpct + 1; i < array.length; i++) {
    if (
      array[i].votes_with_party_pct == arr[arr.length - 1].votes_with_party_pct
    ) {
      arr.push(array[i]);
    }
  }

  statistics.mostloyal = arr;
}

function mloyaltable(array, id) {
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
    var votes_w_party = Math.round(
      ((array[i].total_votes - array[i].missed_votes) *
        array[i].votes_with_party_pct) /
        100
    );

    fullnamecell.innerHTML = name;
    missedvotescell.innerHTML = votes_w_party;
    missedprctcell.innerHTML = array[i].votes_with_party_pct + "%";

    row.append(fullnamecell, missedvotescell, missedprctcell);

    tbody.append(row);
  }

  document.getElementById("loader-icon3").style.display = "none";
}
