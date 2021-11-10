<template>
  <div v-if="seasonIsLoaded" class="background-container">
    <div
      id="under-background"
      class="background"
      :style="{
        backgroundImage: `url(${require(`@/assets/backgrounds/${season}/${underBackgroundIndex}.jpg`)})`,
      }"
    ></div>

    <div
      id="top-background"
      class="background"
      :style="{
        opacity: topTranspanency,
        backgroundImage: `url(${require(`@/assets/backgrounds/${season}/${topBackgroundIndex}.jpg`)})`,
      }"
    ></div>

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
      duration: 3000,
      backgroundInterval: "",
      backgroundIndex: 0,
      underBackgroundIndex: 1,
      topBackgroundIndex: 0,
      season: "",
      hideTop: false,
      loadTopBackground: false,
      topTranspanency: 1,
    };
  },
  computed: {
    seasonIsLoaded() {
      return this.season !== "";
    },
  },
  methods: {
    clearBackgroundInterval() {
      clearInterval(this.backgroundInterval);
    },
    next() {
      // get list of .jpg in backgrounds directory (https://stackoverflow.com/questions/48850155/vue-js-webpack-how-to-get-the-list-of-files-in-a-directory)
      // cannot use dynamic variable in assets string, because it is solved at compile, not at run.
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
      const backgroundsLength = seasonalBackgrounds[this.season].keys().length;
      // console.log("backgroundsLength");
      // console.log(backgroundsLength);
      this.backgroundInterval = setInterval(() => {
        // console.log(backgrounds.keys());
        if (this.backgroundIndex < (backgroundsLength - 1) * 2 - 1) {
          if (this.backgroundIndex % 2 == 0) {
            // is even
            this.hideTop = !this.hideTop;
            if (this.hideTop) {
              this.topTranspanency = 0; // transparent
            } else {
              this.topTranspanency = 1; // visible
            }
          } else if (this.backgroundIndex % 2 == 1) {
            // is odd
            this.loadTopBackground = !this.loadTopBackground;
            if (this.loadTopBackground) {
              this.topBackgroundIndex = this.topBackgroundIndex + 2;
            } else {
              this.underBackgroundIndex = this.underBackgroundIndex + 2;
            }
          }
          this.backgroundIndex++;
        } else {
          this.clearBackgroundInterval();
          this.$emit("update-backgroundIndex");

          if (backgroundsLength % 2 == 1) {
            // is odd
            this.underBackgroundIndex = 0;

            setTimeout(() => {
              // next slide transition
              this.topTranspanency = 0;
              this.backgroundIndex++;
              setTimeout(() => {
                // cross fade between same background for i = i.length and i = 0
                this.topBackgroundIndex = 1;
              }, this.duration / 2);
            }, this.duration);
          } else {
            // is even - one i before switch to next slide
            this.topBackgroundIndex = 0;

            setTimeout(() => {
              // next slide transition
              this.topTranspanency = 1;
              this.backgroundIndex++;
            }, this.duration);
          }
          // whether odd or even
          setTimeout(() => {
            this.backgroundIndex = 0;
            this.topBackgroundIndex = 0;
            this.hideTop = false;
            this.loadTopBackground = false;
            this.topTranspanency = 1;
            this.next();
            setTimeout(() => {
              // cross fade between same background for i = i.length and i = 0
              this.underBackgroundIndex = 1;
            }, this.duration / 2);
          }, this.duration * 2);
        }
      }, this.duration);
    },
    seasons() {
      let d = new Date();
      // let d = new Date(1988, 4, 15, 0); // for testing
      d.setFullYear(1988); // ignore year with static placeholder
      const spring = new Date(1988, 4, 1, 0); // March 1st
      const summer = new Date(1988, 6, 1, 0); // May 1st
      const fall = new Date(1988, 8, 1, 0); // September 1st
      const halloween = new Date(1988, 9, 25, 0); // October 25th
      const halloweenEnd = new Date(1988, 10, 1, 0); // November 1st
      const winter = new Date(1988, 11, 0); // December 1st

      if (d < spring) this.season = "winter";
      if (d > spring && d < summer) this.season = "spring";
      if (d > summer && d < fall) this.season = "summer";
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
  unmounted() {
    this.clearBackgroundInterval();
  },
  watch: {
    backgroundIndex() {
      this.$emit("update-backgroundIndex");
    },
  },
};
</script>

<style scoped>
.background {
  position: fixed;
  height: 100vh;
  width: 100vw;
  background-size: cover;
  margin: 0;
}
#vertical-container {
  position: fixed;
  height: 100vh;
  width: 100vw;
  display: flex;
  flex-direction: column;
  justify-content: center;
}

#top-background {
  transition: opacity 1.4s;
}

#logo {
  position: fixed;
  bottom: 0;
  right: 0;
  width: 300px;
  margin: 50px;
}
</style>