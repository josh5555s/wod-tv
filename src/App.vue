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
        { url: "beaverton", name: "Beaverton" },
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
    async getSpecials() {
      try {
        // fetch("https://api.westernoregondispensary.com/specials")
        const response = await fetch("https://wod-users.herokuapp.com/specials/")
        // const response = await fetch("http://192.168.1.86:8000/specials/");
        this.allSpecials = await response.json();
      } catch (error) {
        // Handle error
        console.log(error);
      }


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
