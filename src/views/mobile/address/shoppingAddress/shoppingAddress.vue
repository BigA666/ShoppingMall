<template>
  <div class="address">
      <p>
          <span>{{val.name}}</span>
          <span>{{val.phoneNumber}}</span>
      </p>
      <p>
          <span>{{val.provinceCity.province}}</span>
          <span>{{val.provinceCity.city}}</span>
          <span>{{val.provinceCity.area}}</span>
          <span>{{val.address}}</span>
      </p>
  </div>
</template>

<script>
export default {
    name: 'shoppingAddress',
    props: ['val']
}
</script>

<style scoped>
.address {
    padding: 0.1rem;
    box-sizing: border-box;
    background: white;
    border-bottom: 1px solid #ccc;
}
.address p {
    line-height: 0.3rem;

}
.address p span {
    color: #666;
    margin-right: 0.1rem;
}
</style>
