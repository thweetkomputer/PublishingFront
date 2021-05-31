<template>
  <div id="add_article">
    <el-row :gutter="10">
      <el-col :xs='24' :lg="8">
        <div class="dewb">
          <el-form :label-position="'left'" label-width="80px" :model="article_info">
            <el-form-item label="文章标题">
              <el-input v-model="article_info.title"></el-input>
            </el-form-item>
            <el-form-item label="描述">
              <el-input type="textarea" :rows="4" v-model="article_info.describe"></el-input>
            </el-form-item>
          </el-form>
        </div>
      </el-col>
      <el-col :xs='24' :lg="16">
        <div class="dewb">
          <div v-for="(img,index) in cover_list" :key="index">
            <el-image
                v-if="img==cover_img"
                class="cover"
                style="width: 150px;height: 150px"
                :src="img"
                @click="chooseCover(img)"
                >
            </el-image>
            <el-image
                v-else
                class=""
                style="width: 150px;height: 150px"
                :src="img"
                @click="chooseCover(img)"
            >
            </el-image>
          </div>
          <el-button @click="submitArticle" type="success" round style="margin-bottom: 20px;position: absolute">保存文章</el-button>
        </div>
      </el-col>
    </el-row>
    <el-row>
      <el-col :xs='24' :lg="24">
        <div class="dewb">
          <div id="summernote">请在这里输入内容...</div>
        </div>
      </el-col>
    </el-row>
  </div>
</template>

<script >
import $ from 'jquery';
import axios from "axios";
export default {
  name: "AddArticle",
  data(){
    return{
      article_info:{
        title:'',
        describe:'',
        contents:""
      },
      cover_list:[],
      cover_img:'',
    }
  },
  mounted() {
    this.summernote()
  },
  methods:{
    submitArticle(){
      let articleData={
        title:this.article_info.title,
        describe:this.article_info.describe,
        content:this.article_info.contents,
        cover:this.cover_img
      }
      axios.post("127.0.0.1",articleData).then(res=>{
        console.log(res)
      }).catch(err=>{
        console.log(err)
      })
    },
    currentChange(val) {
      console.log('第·'+val+'页')
    },
    summernote(){
      let self=this
      $('#summernote').summernote({
        width:'100%',
        height:500,
        lang: 'zh-CN',
        callbacks:{
          onChange(contents){
            console.log(contents)
            self.article_info.contents=contents
          },
          onImageUpload(files){//本地
            let img=files[0]
            let imgDate=new FileReader()
            imgDate.readAsDataURL(img)
            imgDate.onload=function (){
              let imgnode=document.createElement('img')
              imgnode.src=imgDate.result
              $('#summernote').summernote('insertNode',imgnode)
              self.cover_list.push(imgDate.result)
            }
          },
          onImageLinkInsert(url){
            let imgnode=document.createElement('img')
            imgnode.src=url
            $('#summernote').summernote('insertNode',imgnode)
            self.cover_list.push(url)
          },
          onMediaDelete(target){
            let imgData=target[0].src
            console.log(imgData)
            for(let i=0;i<self.cover_list.length;i++){
              if(self.cover_list[i]==imgData){
                self.cover_list.splice(i,1);
              }
            }
          }
        }
      });
    },
    chooseCover(img){
      this.cover_img=img
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

</style>