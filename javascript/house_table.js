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

    fullnamecell.innerHTML = array[i].last_name + " " + array[i].first_name;
    if (array[i].middle_name !== null) {
      fullnamecell.innerHTML += " " + array[i].middle_name;
    }
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
