var statistics = {
  democrats: 0,
  republicans: 0,
  independents: 0,
  total: 0,
  demvoteswparty: 0,
  repvoteswparty: 0,
  indvoteswparty: 0,
  attendance: 0
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

//NEED TO FIX

//Array for attendance
attendarray(membersarray);

function attendarray(array) {
  var arr = [];

  for (i = 0; i < array.length; i++) {
    var fullname = array[i].first_name + " " + array[i].last_name;
    if (array[i].middle_name !== null) {
      fullname += " " + array[i].middle_name;
    }

    arr.push({
      name: fullname,
      missedvotes: array[i].missed_votes,
      missedvotespct: array[i].missed_votes_pct
    });
  }

  arr.sort(compare);

  statistics.attendance = arr;
}

function compare(a, b) {
  if (a.missedvotespct < b.missedvotespct) {
    return -1;
  }
  if (a.missedvotespct > b.missedvotespct) {
    return 1;
  }
  return 0;
}

console.log(statistics);
//Table for attendance (top 10%)

attendtable(statistics.attendance, "mostengaged");

function attendtable(array, id) {
  var tenpct = Math.round(array.length * 0.1);
  var tenpctarr = [];
  for (i = 0; i < tenpct; i++) {
    tenpctarr.push(array[i]);
  }

  for (let i = tenpct + 1; i < array.length; i++) {
    if (
      array[i].missedvotespct == tenpctarr[tenpctarr.length - 1].missedvotespct
    ) {
      tenpctarr.push(array[i]);
    }
  }

  let tbody = document.getElementById(id);

  for (let i = 0; i < tenpctarr.length; i++) {
    let row = document.createElement("tr");
    let fullnamecell = document.createElement("td");
    let missedvotescell = document.createElement("td");
    let missedprctcell = document.createElement("td");

    fullnamecell.innerHTML = tenpctarr[i].name;
    missedvotescell.innerHTML = tenpctarr[i].missedvotes;
    missedprctcell.innerHTML = tenpctarr[i].missedvotespct + "%";

    row.append(fullnamecell, missedvotescell, missedprctcell);

    tbody.append(row);
  }
}

//END OF NEED TO FIX

//Table for the least engaged

function compare2(a, b) {
  if (a.missed_votes_pct < b.missed_votes_pct) {
    return -1;
  }
  if (a.missed_votes_pct > b.missed_votes_pct) {
    return 1;
  }
  return 0;
}

attendtable2(membersarray, "leastengaged");

function attendtable2(array, id) {
  array.sort(compare2);

  var tenpct = Math.round(array.length * 0.1);
  var tenpctarr = [];
  for (i = array.length - 1; i >= array.length - tenpct; i--) {
    tenpctarr.push(array[i]);
  }
  console.log(tenpctarr);

  for (let i = array.length - tenpct; i > 0; i--) {
    if (
      array[i].missed_votes_pct ==
      tenpctarr[tenpctarr.length - 1].missed_votes_pct
    ) {
      tenpctarr.push(array[i]);
    }
  }

  let tbody = document.getElementById(id);

  for (let i = 0; i < tenpctarr.length; i++) {
    let row = document.createElement("tr");
    let fullnamecell = document.createElement("td");
    let missedvotescell = document.createElement("td");
    let missedprctcell = document.createElement("td");

    var name2 = array[i].first_name + " " + array[i].last_name;
    if (array[i].middle_name !== null) {
      name += " " + array[i].middle_name;
    }

    fullnamecell.innerHTML = name2;
    missedvotescell.innerHTML = tenpctarr[i].missed_votes;
    missedprctcell.innerHTML = tenpctarr[i].missed_votes_pct + "%";

    row.append(fullnamecell, missedvotescell, missedprctcell);

    tbody.append(row);
  }
}
