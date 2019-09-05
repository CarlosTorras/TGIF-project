var app = new Vue({
  el: "#app",
  data: {
    loading: true,
    members: [],
    party: [],
    selected: "inactive"
  },
  methods: {
    getData() {
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
          app.members = tgif.results[0].members;
          app.loading = false;
        })
        .catch(function(error) {
          console.log(error);
        });
    }
  },
  computed: {
    getMembers() {
      console.log(this.selected);
      return this.members.filter(member => {
        let partyfilter =
          this.selected.includes(member.state) ||
          (this.selected == "inactive" || this.selected == "AA");
        let statefilter = this.party == "" || this.party.includes(member.party);

        return partyfilter && statefilter;
      });
    }
  },

  created() {
    this.getData();
  }
});
