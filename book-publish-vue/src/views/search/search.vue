<template>
  <div id="search" >
    <Form ref="formSearch" inline>
      <FormItem style="margin:auto;" prop="keywords">
        <Input search v-model="formSearch.keywords" placeholder="请输入名称"></Input>
      </FormItem>
      <FormItem style="margin:auto;">
        <Button type="primary" @click="goPage()">搜索</Button>
      </FormItem>
    </Form>

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