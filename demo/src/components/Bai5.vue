<template>
  <div>
    <div class="row">
      <div class="col-4 p-3" v-for="item in data" :key="item.id">
        <div class="border p-3" v-if="checkStatus(item.id)">
          <h3>Thông Tin cá nhân</h3>
          <div>Tên: {{item.name}}</div>
          <div>Tuổi: {{item.age}}</div>
          <div>Địa Chỉ: {{item.address}}</div>
          <button class="btn btn-primary" @click="getInfo(item)">Sửa</button>
          <button class="btn btn-primary">Xoá</button>
        </div>
      </div>
    </div>

    <div class="col-12 d-flex justify-content-center align-items-center" v-if="statusForm==true">
      <div>
        <h3>Thông Tin cá nhân</h3>
        <span>Tên</span>
        <input class="form-control" type="text" v-model="info.name" />
        <br />
        <span>Tuổi</span>
        <input class="form-control" type="text" v-model="info.age" />
        <br />
        <span>Địa chỉ</span>
        <input class="form-control" type="text" v-model="info.address" />
        <br />
        <button class="btn btn-primary">Save</button>
        <button class="btn btn-primary" @click="editFormHide()">Cancel</button>
      </div>
    </div>
  </div>
</template>

<script>
let array = [
  {
    id: 1,
    name: "nodemy",
    age: 2020,
    address: "Ha Noi"
  },
  {
    id: 2,
    name: "nodejs",
    age: 53,
    address: "Ha Nam"
  },
  {
    id: 3,
    name: "php",
    age: 30,
    address: "Hai Phong"
  }
];

export default {
  data() {
    return {
      data: array,
      info: {
        id: "",
        name: "",
        age: "",
        address: ""
      },
      statusForm: false
    };
  },
  methods: {
    getInfo(info) {
      this.editFormShow();
      return (this.info = info);
    },
    editFormShow() {
      this.statusForm = true;
    },
    editFormHide() {
      this.statusForm = false;
    },

    checkStatus(id) {
      if (id == this.info.id) return false;
      return true;
    }
  }
};
</script>

<style scoped>
</style>