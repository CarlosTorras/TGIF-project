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
leastloyalarr(membersarray);

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

lloyaltable(statistics.leastloyal, "leastloyal");
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
mostloyalarr(membersarray);
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

mloyaltable(statistics.mostloyal, "mostloyal");
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
}
