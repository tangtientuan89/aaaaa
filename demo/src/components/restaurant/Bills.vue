<template>
  <div>
    <h1 class="p-3">Bảng số liệu</h1>
    <table class="table table-hover table-sm">
      <thead>
        <tr>
          <th scope="col">#</th>
          <th scope="col">Số người</th>
          <th scope="col">Buổi</th>
          <th scope="col">Nơi tổ chức</th>
          <th scope="col">Tên khách</th>
          <th scope="col">Giới tính</th>
          <th scope="col">Yêu cầu</th>
          <th scope="col">Biết qua</th>
          <th scope="col">Tổng tiền</th>
        </tr>
      </thead>
      <tbody v-for="(item,index) in $store.state.restaurant.data" :key="index">
        <tr>
          <th scope="row">{{index+1}}</th>
          <td>{{item.numberPeople}}</td>
          <td>{{item.time}}</td>
          <td>{{item.place}}</td>
          <td>{{item.name}}</td>
          <td>{{item.sex}}</td>
          <td>{{item.note}}</td>
          <td>{{item.selected}}</td>
          <td>{{item.money.sum}}</td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
export default {};
</script>

<style scoped>
</style>