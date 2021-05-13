<template>
  <div id="search" >
    <el-input   @focus="focus" @blur="blur" />
    <el-card v-if="isSearch" >...</el-card>
    <el-input @keyup.enter.native="searchHandler"/>
  </div>
</template>

<script>
export default {
  name: "search",
  computed: {
    isSearch() {
      return this.isFocus;
    }
  }


}
</script>

<style scoped>

</style>