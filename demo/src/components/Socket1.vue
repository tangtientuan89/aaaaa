<template>
  <div>
    <div class="box" style="height:50vh">
      <div class="msg" v-for="item in msg">{{item}}</div>
      <div class="receiceAdmin"></div>
    </div>
    <div class="type">{{type}}</div>
    <input class="input" type="text" v-model="msgSend" />
    <button type="button" @click="handleBtnClick()">sent</button>
    <button type="button" @click="test()">test</button>
  </div>
</template>

<script>
import io from "socket.io-client";
const socket = io("http://localhost:80");
socket.on("connect", () => {});
// socket.on("disconnect", () => {});

export default {
  data() {
    return {
      name: "tuan",
      msg: [],
      newMsg:[],
      msgSend: "",
      msgReceive: "",
      type: this.$cookies.get("type")
    };
  },
  created() {
    console.log('create')
    socket.on("all", data => {
      console.log('dataaaa',data)
      this.msg.push(data);
    });
  },
  mounted() {
    console.log('mouned')
  },
  updated(){
    console.log('update')
  },
  destroyed(){
    console.log('destroyed')
  },
  methods: {
    handleBtnClick() {
      this.msg.push(this.msgSend)
      socket.emit("all",this.msgSend);

    },
    test(){
      this.name=this.msgSend
    }
  }
};
</script>

<style scoped>
</style>