<template>
  <div class="container px-5">
    <div class="pt-3">
      <form class="px-5 border rounded bg-light">
        <div class="form-group pt-3">
          <label class="font-weight-bold" for="name">Tên Khách Hàng</label>
          <input class="form-control" id="name" placeholder="Họ và Tên" v-model="form.name" />
        </div>
        <div class="form-group pt-3">
          <label class="font-weight-bold" for="food">Chọn Món</label>
          <input type="text" list="food" v-model="form.food" />
          <datalist id="food" >
            <option v-for="(item,value) in listFood" :key="value">{{item.name}}</option>
          </datalist>
          <button class="btn btn-primary" type="button">Thêm</button>
          <p>{{form.food}}</p>
        </div>
        <div class="form-group">
          <label class="font-weight-bold" for="numberPeople">Số Người</label>
          <input
            class="form-control"
            id="numberPeople"
            placeholder="Nhập Số"
            v-model="form.numberPeople"
            @keypress="isNumber($event)"
            @keyup="isNotNull"
          />
          <p>{{message}}</p>
        </div>
        <div class="row">
          <p class="col-4 text-left font-weight-bold">Thời gian :</p>
          <div class="custom-control custom-radio col-2 text-left">
            <input
              class="custom-control-input"
              type="radio"
              name="time"
              id="morning"
              value="morning"
              v-model="form.time"
            />
            <label class="custom-control-label" for="morning">Sáng</label>
          </div>
          <div class="custom-control custom-radio col-2 text-left">
            <input
              class="custom-control-input"
              type="radio"
              name="time"
              id="lunch"
              value="lunch"
              v-model="form.time"
            />
            <label class="custom-control-label" for="lunch">Trưa</label>
          </div>
          <div class="custom-control custom-radio col-2 text-left">
            <input
              class="custom-control-input"
              type="radio"
              name="time"
              id="evening"
              value="evening"
              v-model="form.time"
            />
            <label class="custom-control-label" for="evening">Tối</label>
          </div>
        </div>

        <div class="d-flex row">
          <p class="col-4 text-left font-weight-bold">Địa điểm :</p>
          <div class="custom-control custom-radio col-2 text-left">
            <input
              class="custom-control-input"
              type="radio"
              name="place"
              id="inside"
              value="inside"
              v-model="form.place"
            />
            <label class="custom-control-label" for="inside">Trong nhà</label>
          </div>
          <div class="custom-control custom-radio col-2 text-left">
            <input
              class="custom-control-input"
              type="radio"
              name="place"
              id="outside"
              value="outside"
              v-model="form.place"
            />
            <label class="custom-control-label" for="outside">Ngoài trời</label>
          </div>
        </div>
        <div class="d-flex row">
          <p class="col-4 text-left font-weight-bold">Giới tính :</p>
          <div class="custom-control custom-radio col-2 text-left">
            <input
              class="custom-control-input"
              type="radio"
              name="sex"
              id="male"
              value="Nam"
              v-model="form.sex"
            />
            <label class="custom-control-label" for="male">Male</label>
          </div>
          <div class="custom-control custom-radio col-2 text-left">
            <input
              class="custom-control-input"
              type="radio"
              name="sex"
              id="female"
              value="Nữ"
              v-model="form.sex"
            />
            <label class="custom-control-label" for="female">Female</label>
          </div>
        </div>
        <div class="form-group">
          <label class="font-weight-bold" for="note">Yêu cầu khách hàng</label>
          <textarea class="form-control" id="note" placeholder="Write here" v-model="form.note"></textarea>
        </div>
        <div class="form-group">
          <p class="font-weight-bold">Khách hàng biết đến nhà hàng qua</p>
          <select class="custom-select" v-model="form.selected">
            <option disabled value>Please select one</option>
            <option>Giới Thiệu</option>
            <option>Mạng Xã Hội</option>
            <option>Tình Cờ</option>
            <option>Không Nhớ Rõ</option>
          </select>
        </div>
        <div class="pb-3 text-right">
          <router-link to="/restaurant/bills" v-if="isNotNull()==true">
            <button
              type="button"
              class="btn btn-primary"
              data-toggle="modal"
              data-target="#exampleModalLong"
              @click="handleBtnSubmit()"
            >Lưu Bill</button>
          </router-link>
          <button type="button" class="btn btn-danger px-4" @click="handleBtnReset()">Tạo Mới</button>
        </div>
      </form>
      <!-- Modal -->
      <div
        class="modal fade"
        id="exampleModalLong"
        tabindex="-1"
        role="dialog"
        aria-labelledby="exampleModalLongTitle"
        aria-hidden="true"
      >
        <div class="modal-dialog" role="document">
          <div class="modal-content">
            <div class="modal-header">
              <h5 class="modal-title" id="exampleModalLongTitle">Hoá Đơn</h5>
              <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                <span aria-hidden="true">&times;</span>
              </button>
            </div>
            <div class="modal-body">
              <div class="text-left">
                <p class="font-weight-bold">Tên Khách Hàng: {{form.name}}</p>
                <p>Số Người: {{form.numberPeople}}</p>
                <p>Giới Tính: {{form.sex}}</p>
                <p>Yêu Cầu: {{form.note}}</p>
                <hr />
                <div class="d-flex justify-content-between font-weight-bold">
                  <p>Tổng Tiền:</p>
                  <p>{{form.money.sum}}</p>
                </div>
                <p class="font-weight-bold">Khuyễn Mại:</p>
                <div class="d-flex justify-content-between" v-if="form.money.isMorning!=0">
                  <li>Buổi sáng:</li>
                  <p>-{{form.money.isMorning}}</p>
                </div>
                <div class="d-flex justify-content-between" v-if="form.money.isInside!=0">
                  <li class="text-right">Trong Nhà:</li>
                  <p>-{{form.money.isInside}}</p>
                </div>
                <div class="d-flex justify-content-between" v-if="form.money.manyPeople!=0">
                  <li class="text-right">Hơn 10 Người:</li>
                  <p>-{{form.money.manyPeople}}</p>
                </div>
                <div class="d-flex justify-content-between">
                  <p class="font-weight-bold text-right">Thanh Toán:</p>
                  <p>= {{form.money.money}} vnđ</p>
                </div>
              </div>
            </div>
            <div class="modal-footer">
              <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
              <button type="button" class="btn btn-primary">In Hoá Đơn</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";
let foods = [];
let listFood = [
  { name: "tôm" },
  { name: "bầu" },
  { name: "cua" },
  { name: "cá" }
];
export default {
  data() {
    return {
      listFood: listFood,
      form: {
        name: "",
        numberPeople: "",
        time: "",
        place: "",
        foods: "",
        sex: "",
        note: "",
        selected: "",
        food: "",
        money: {
          sum: 0,
          isMorning: 0,
          isInside: 0,
          manyPeople: 0,
          money: 0
        }
      },
      message: ""
    };
  },
  mounted() {
    axios({
      method: "GET",
      url: "http://localhost:3000/restaurant",
      headers: {
        Authorization: `Bearer token=${$cookies.get("token")}`,
        "Content-Type": "application/json"
      }
    }).then(res => {
      if (res.data.status == 404) {
        return this.$router.push("/login");
      }
      this.message = res.data;
    });
  },
  methods: {
    handleBtnSubmit() {
      this.form.money = {
        sum: 0,
        isMorning: 0,
        isInside: 0,
        manyPeople: 0,
        money: 0
      };
      this.form.money.sum = parseInt(this.form.numberPeople) * 500000;
      if (this.form.time == "morning") {
        this.form.money.isMorning = this.form.money.sum / 10;
      }
      if (this.form.place == "inside") {
        this.form.money.isInside = this.form.money.sum / 10;
      }
      if (this.form.numberPeople >= 10) {
        this.form.money.manyPeople = (this.form.money.sum * 3) / 10;
      }
      this.form.money.money =
        this.form.money.sum -
        this.form.money.isMorning -
        this.form.money.isInside -
        this.form.money.manyPeople;
      this.$store.dispatch("GET_DATA", this.form);
    },
    handleBtnReset() {
      this.form.message = "";
      this.form.numberPeople = "";
      this.form.time = "";
      this.form.place = "";
      this.form.name = "";
      this.form.sex = "";
      this.form.note = "";
      this.form.selected = "";
      this.form.money = {
        sum: 0,
        isMorning: 0,
        isInside: 0,
        manyPeople: 0,
        money: 0
      };
    },
    addFood() {
      this.form.food;
    },
    isNumber: function(evt) {
      evt = evt ? evt : window.event;
      var charCode = evt.which ? evt.which : evt.keyCode;
      if (
        charCode > 31 &&
        (charCode < 48 || charCode > 57) &&
        charCode !== 46
      ) {
        evt.preventDefault();
      } else {
        return true;
      }
    },
    isNotNull() {
      if (!this.form.numberPeople) {
        this.message = "Hãy nhập số người";
        return false;
      }
      return true;
    }
  }
};
</script>

<style scoped>
</style>