<template>
  <div class="container pt-5">
    <form class="px-5 border rounded bg-light">
      <div class="form-group pt-3">
        <label for="exampleInputEmail1">Email address</label>
        <input
          type="email"
          class="form-control"
          id="exampleInputEmail1"
          aria-describedby="emailHelp"
          placeholder="Enter email"
          v-model="email"
        />
        <small
          id="emailHelp"
          class="form-text text-muted"
        >We'll never share your email with anyone else.</small>
      </div>
      <div class="form-group">
        <label for="exampleInputPassword1">Password</label>
        <input
          type="password"
          class="form-control"
          id="exampleInputPassword1"
          placeholder="Password"
          v-model="password"
        />
      </div>
      <div class="text-danger py-3">{{message}}</div>
      <div class="pb-3">
      <button type="button" class="btn btn-primary px-4" @click="handleBtnLogin()">Login</button>
      </div>
    </form>
  </div>
</template>

<script>
import axios from "axios";
export default {
  data() {
    return {
      email: "",
      password: "",
      message: ""
    };
  },
  methods: {
    handleBtnLogin() {
      axios({
        method: "POST",
        url: "http://localhost:3000/login",
        data: { email: this.email, password: this.password }
      }).then(res => {
        if (res.data.status == 200) {
          this.$cookies.set("token", res.data.data.token);
          this.$cookies.set("user", res.data.data.user);
          this.$cookies.set("type", res.data.data.type);
          this.$router.push("/restaurant");
          return;
        }
        if (res.data.status == 404) {
          this.message = res.data.message;
          return;
        }
      });
    }
  }
};
</script>

<style  scoped>
</style>