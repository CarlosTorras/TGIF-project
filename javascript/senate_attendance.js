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

let membersarray = data.results[0].members;

memberscount(membersarray);

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

//For the table Senate at a glance

voteswparty(membersarray);

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
table2();

function table2() {
  repnumbers.innerHTML = statistics.republicans;
  repvotes.innerHTML = statistics.repvoteswparty.toFixed(2) + "%";
  demnumbers.innerHTML = statistics.democrats;
  demvotes.innerHTML = statistics.demvoteswparty.toFixed(2) + "%";
  indnumbers.innerHTML = statistics.independents;
  indvotes.innerHTML = statistics.indvoteswparty.toFixed(2) + "%";
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

statsleastengaged(membersarray);

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

leastengaged(statistics.leastengaged, "leastengaged");

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

statsmostengaged(membersarray);

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

mostengaged(statistics.mostengaged, "mostengaged");

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
}
