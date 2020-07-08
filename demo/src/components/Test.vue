<template>
  <div class="my-component">
    <div>{{ reverseMessage }}</div>
    <div>
      <button @click="changeMessage">Click me</button>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      message: "aaaa"
    };
  },
  computed: {
    reverseMessage(a) {
      console.log("computed");
      return this.message
        .split("")
        .reverse()
        .join("");
    }
  },
  methods: {
    changeMessage() {
        this.reverseMessage
      console.log("methods");
      this.message = "this is new message";
    }
  },

//   watch: {
//     reverseMessage() {
//       console.log("watch");
//       this.message = "gihihhihihih";
//     }
//   }
};
</script>

<style  scoped>
.my-component {
  color: red;
}
</style>