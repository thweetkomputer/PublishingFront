<template>
  <div>
    
    <div>
      <!-- 面包屑导航 -->
    <div>
      <el-breadcrumb separator-class="el-icon-arrow-right" style="padding: 10px">
        <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
        <el-breadcrumb-item>文章提交</el-breadcrumb-item>
      </el-breadcrumb>
    </div>
      <el-button type="success" style="float: right;margin-right: 100px"  @click="submitUpload">提交文章</el-button>
      <el-form ref="form" :model="form" label-width="80px" style="margin-right:400px">
        <el-form-item label="文章标题">
          <el-input v-model="form.name"></el-input>
        </el-form-item>
        <el-form-item label="作者" ref="form" :model="form" label-width="80px">
          <el-input v-model="form.author"></el-input>
        </el-form-item>
        <el-form-item label="文章标签" ref="form" :model="form" label-width="80px">
          <el-tag
              :key="tag"
              v-for="tag in dynamicTags"
              closable
              v-model="dynamicTags"
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
        <el-form-item label="文章简介">
          <el-input type="textarea" v-model="form.info" :autosize="{ minRows: 15, maxRows: 20}"></el-input>
        </el-form-item>
      </el-form>
    </div>
    <div >
      <el-upload
      :limit="1"
      class="upload-demo"
      ref="upload"
      action
      :on-preview="handlePreview"
      :on-remove="handleRemove"
      :file-list="fileList"
      :auto-upload="false"
      :http-request="UploadSubmit"
    >
      <el-button slot="trigger" size="small" type="primary">选取文件</el-button>
    </el-upload>
    </div>
  </div>
</template>

<script>
import BreadMenu from '@/components/BreadMenu'
export default {
  name: "SubmitArticle",
  data() {
    return {
      fileList:[],
      form: {
        name: '',
        author: '',
        delivery: false,
        type: [],
        info:''
      },
      dynamicTags: ['科技', '文化', '学术'],
      inputVisible: false,
      inputValue: '',
      article_info:{
        title:'',
        author:'',
        tag:[],
        info:''
      },
    }
  },
  methods: {
    UploadSubmit(param) {
      var file = param.file;
      //console.log(param.file);
      var file_form = new FormData(); //获取上传表单（文件）
      
      file_form.append("title",this.form.name);
      file_form.append("author",this.form.author);
      file_form.append("tag",JSON.stringify(this.dynamicTags));
      file_form.append("info",this.form.info);
      file_form.append("file", file);
      console.log(file_form.get('title'))
      console.log(file_form.get('author'))
      console.log(file_form.get('tag'))
      console.log(file_form.get('info'))
      console.log(file_form.get('file'))
      this.$axios({
        url: "/file/submitArticle",
        method: "POST",
        headers: {
          token: localStorage.getItem("token"),
        },
        data: file_form,
      })
        .then((res) => {
          console.log(res);
        })
        .catch((err) => {
          console.log(err);
        });
    },
    // submitArticle(){
    //   console.log('/ArticleSubmit')
    //   let articleData={
    //     title:this.form.name,
    //     author:this.form.author,
    //     article_info:this.form.info,
    //     content:this.fileList,
    //     tag:this.dynamicTags
    //   }
    //   console.log(articleData)
    //   this.$axios.post("/ArticleSubmit",articleData).then(res=>{
    //     console.log(res)
    //   }).catch(err=>{
    //     console.log('error submit!!');
    //     console.log(err)
    //   })
    // },
    submitUpload() {
      this.$refs.upload.submit();
    },
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
    },
  },
  components:{
    BreadMenu,
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