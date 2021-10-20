<template>
  <div
    id="background"
    :style="{
      backgroundImage: `url(${require(`@/assets/backgrounds/fall/${backgroundIndex}.jpg`)})`,
    }"
  >
    <div id="vertical-container">
      <slot></slot>
    </div>
    <div id="logo"></div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      backgroundIndex: 0,
    };
  },
  methods: {
    next() {
      // get list of .jpg in backgrounds directory (https://stackoverflow.com/questions/48850155/vue-js-webpack-how-to-get-the-list-of-files-in-a-directory)
      const backgrounds = require.context(
        "@/assets/backgrounds/fall",
        true,
        /^.*\.jpg$/
      );
      setInterval(() => {
        // console.log(backgrounds.keys());
        if (this.backgroundIndex < backgrounds.keys().length - 1) {
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
  },
  mounted() {
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
</style>