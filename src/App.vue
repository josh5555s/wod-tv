<template>
  <router-view
    :sortedSpecials="sortedSpecials"
    :stores="stores"
    @get-specials="getSpecials"
  >
  </router-view>
</template>

<script>
export default {
  name: "App",
  data() {
    return {
      allSpecials: [],
      stores: [
        { url: "cedarMill", name: "Cedar Mill" },
        { url: "hillsboro", name: "Hillsboro" },
        { url: "newberg", name: "Newberg" },
        { url: "sherwood", name: "Sherwood" },
      ],
    };
  },
  computed: {
    sortedSpecials() {
      let sortedSpecials = this.allSpecials;
      const prop = "id";
      sortedSpecials = sortedSpecials.sort((a, b) => {
        return a[prop] - b[prop];
      });
      return sortedSpecials;
    },
  },
  methods: {
    getSpecials() {
      // console.log("getting specials...");
      fetch("https://api.westernoregondispensary.com/specials")
        .then((response) => response.json())
        .then((data) => (this.allSpecials = JSON.parse(data)));
      // .then(() => console.log("# of specials", this.allSpecials.length))
      // .then(() => console.log("specials", this.allSpecials));
    },
  },
  created() {
    this.getSpecials();
  },
};
</script>

<style>
body {
  margin: 0;
  padding: 0;
}

#app {
  font-family: "Montserrat", sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: white;
  height: 100vh;
  list-style-type: none;
}

h1 {
  font-size: 5rem;
  font-weight: bold;
}

ul {
  padding-left: 0;
}
</style>
