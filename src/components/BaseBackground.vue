<template>
  <div
    v-if="seasonIsLoaded"
    id="background"
    :style="{
      backgroundImage: `url(${require(`@/assets/backgrounds/${season}/${backgroundIndex}.jpg`)})`,
    }"
  >
    <div id="vertical-container">
      <slot></slot>
    </div>
    <div id="logo">
      <router-link to="./">
        <img id="logo" src="./../assets/logo.png" />
      </router-link>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      backgroundIndex: 0,
      season: "",
    };
  },
  computed: {
    seasonIsLoaded() {
      return this.season !== "";
    },
  },
  methods: {
    next() {
      // get list of .jpg in backgrounds directory (https://stackoverflow.com/questions/48850155/vue-js-webpack-how-to-get-the-list-of-files-in-a-directory)
      // cannot use dynamic variable in assets string, because it is solve at compile, not at run.
      const seasonalBackgrounds = {};
      seasonalBackgrounds.spring = require.context(
        `@/assets/backgrounds/spring`,
        true,
        /^.*\.jpg$/
      );
      seasonalBackgrounds.fall = require.context(
        `@/assets/backgrounds/fall`,
        true,
        /^.*\.jpg$/
      );
      seasonalBackgrounds.halloween = require.context(
        `@/assets/backgrounds/halloween`,
        true,
        /^.*\.jpg$/
      );
      seasonalBackgrounds.winter = require.context(
        `@/assets/backgrounds/winter`,
        true,
        /^.*\.jpg$/
      );
      setInterval(() => {
        // console.log(backgrounds.keys());
        if (
          this.backgroundIndex <
          seasonalBackgrounds[this.season].keys().length - 1
        ) {
          // console.log(this.backgroundIndex);
          this.backgroundIndex++;
        } else {
          this.backgroundIndex = 0;
        }
      }, 4000);
    },
    updateBackgroundIndex() {
      this.$emit("update-backgroundIndex", this.backgroundIndex);
    },
    seasons() {
      let d = new Date();
      // let d = new Date(1988, 10, 15, 0); // for testing
      d.setFullYear(1988); // ignore year with static placeholder
      const spring = new Date(1988, 4, 1, 0); // March 1st
      const fall = new Date(1988, 8, 1, 0); // September 1st
      const halloween = new Date(1988, 9, 25, 0); // October 25th
      const halloweenEnd = new Date(1988, 10, 1, 0); // November 1st
      const winter = new Date(1988, 11, 0); // December 1st

      if (d < spring) this.season = "winter";
      if (d > spring && d < fall) this.season = "spring";
      if (d > fall && d < halloween) this.season = "fall";
      if (d > halloween && d < halloweenEnd) this.season = "halloween";
      if (d > halloweenEnd && d < winter) this.season = "fall";
      if (d > winter) this.season = "winter";
      console.log(this.season);
    },
  },
  mounted() {
    this.seasons();
    this.next();
  },
  watch: {
    backgroundIndex() {
      this.updateBackgroundIndex();
    },
  },
};
</script>

<style scoped>
#background {
  background-size: cover;
}
#vertical-container {
  height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
}

#logo {
  position: fixed;
  bottom: 0;
  right: 0;
  width: 300px;
  margin: 50px;
}
</style>