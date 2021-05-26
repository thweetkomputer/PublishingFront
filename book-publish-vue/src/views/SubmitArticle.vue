<template>
  <div>
    <div>
      <el-button type="success" style="float: right;margin-right: 100px">提交文章</el-button>
      <el-form ref="form" :model="form" label-width="80px" style="margin-right:400px">
        <el-form-item label="文章标题">
          <el-input v-model="form.name"></el-input>
        </el-form-item>
        <el-form-item label="作者" ref="form" :model="form" label-width="80px">
          <el-input v-model="form.name"></el-input>
        </el-form-item>
        <el-form-item label="文章标签" ref="form" :model="form" label-width="80px">
          <el-tag
              :key="tag"
              v-for="tag in dynamicTags"
              closable
              :disable-transitions="false"
              @close="handleClose(tag)">
            {{tag}}
          </el-tag>
          <el-input
              class="input-new-tag"
              v-if="inputVisible"
              v-model="inputValue"
              ref="saveTagInput"
              size="small"
              @keyup.enter.native="handleInputConfirm"
              @blur="handleInputConfirm"
          >
          </el-input>
          <el-button v-else class="button-new-tag" size="small" @click="showInput">+ New Tag</el-button>
        </el-form-item>
        <el-form-item label="文章简介" >
          <el-input type="textarea" v-model="form.desc" :autosize="{ minRows: 15, maxRows: 20}"></el-input>
        </el-form-item>
      </el-form>
    </div>
    <div >
      <el-upload
          class="upload-demo"
          action="https://jsonplaceholder.typicode.com/posts/"
          :on-preview="handlePreview"
          :on-remove="handleRemove"
          :before-remove="beforeRemove"
          multiple
          :limit="5"
          :on-exceed="handleExceed"
          :file-list="fileList"
          style="color: black"
      >
        <el-button type="primary" style="margin-top: 10px; margin-left:260px">上传文件</el-button>
<!--        <div slot="tip" class="el-upload__tip">只能上传jpg/png文件，且不超过500kb</div>-->
      </el-upload>

    </div>

  </div>
</template>

<script>
export default {
  name: "SubmitArticle",
  data() {
    return {
      fileList: [],
      form: {
        name: '',
        region: '',
        date1: '',
        date2: '',
        delivery: false,
        type: [],
        resource: '',
        desc: '',
      },
      dynamicTags: ['科技', '文化', '学术'],
      inputVisible: false,
      inputValue: ''
    }
  },
  methods: {
    handleRemove(file, fileList) {
      console.log(file, fileList);
    },
    handlePreview(file) {
      console.log(file);
    },
    handleExceed(files, fileList) {
      this.$message.warning(`当前限制选择 3 个文件，本次选择了 ${files.length} 个文件，共选择了 ${files.length + fileList.length} 个文件`);
    },
    beforeRemove(file, fileList) {
      return this.$confirm(`确定移除 ${ file.name }？`);
    },
    downloadFileClick(item) {
      console.log(item);
      //在本页打开窗口
      let $eleForm = $("<form method='get'></form>");
      $eleForm.attr("action",item.url);
      $(document.body).append($eleForm);
      //提交表单，实现下载
      $eleForm.submit();
    },
    onSubmit() {
      console.log('submit!');
    },
    handleClose(tag) {
      this.dynamicTags.splice(this.dynamicTags.indexOf(tag), 1);
    },

    showInput() {
      this.inputVisible = true;
      this.$nextTick(_ => {
        this.$refs.saveTagInput.$refs.input.focus();
      });
    },

    handleInputConfirm() {
      let inputValue = this.inputValue;
      if (inputValue) {
        this.dynamicTags.push(inputValue);
      }
      this.inputVisible = false;
      this.inputValue = '';
    }
  }
}
</script>

<style scoped>
.dewb{
  min-height: 200px;
  padding: 20px 20px;
  display: flex;
  align-items: center;
  justify-content: center;
}
.dewb .el-button{
  position:fixed;
  margin-top: 280px;
  right: 20px;
}
.dewb .el-image :hover{
  border:2px solid red;
}
.dewb .el-image.cover{
  border:2px solid red;
}
.el-form-item{
  margin-top: 22px;
}

.el-col{
  margin-top: 10px;
}
p{
  color: black;
}
.el-tag + .el-tag {
  margin-left: 10px;
}
.button-new-tag {
  margin-left: 10px;
  height: 32px;
  line-height: 30px;
  padding-top: 0;
  padding-bottom: 0;
}
.input-new-tag {
  width: 90px;
  margin-left: 10px;
  vertical-align: bottom;
}
el-upload-list__item-name{
  color: black;
}
</style>