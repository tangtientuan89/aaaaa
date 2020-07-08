import Vue from "vue";
import Router from "vue-router";
import Login from "@/components/Login";
import Restaurant from "@/components/restaurant/Index";
import Socket from "@/components/Socket";
import Socket1 from "@/components/Socket1";
import Bai5 from "@/components/Bai5";
import Bills from "@/components/restaurant/Bills";
import Test from "@/components/Test"
Vue.use(Router);

export default new Router({
  routes: [
    {
      path: "/login",
      name: "Login",
      component: Login
    },
    {
      path: "/restaurant",
      name: "Restaurant",
      component: Restaurant,
    },
    {
      path: "/restaurant/bills",
      name: "Bills",
      component: Bills
    },
    {
      path: "/socket",
      name: "Socket",
      component: Socket
    }, {
      path: "/socket1",
      name: "Socket1",
      component: Socket1
    },
    {
      path: "/bai5",
      name: "Bai5",
      component: Bai5
    },
    {
      path: "/test",
      name: "Test",
      component: Test
    }
  ],
  mode: "history"
});
