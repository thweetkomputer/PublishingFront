<template>
  <div>
    <!-- 面包屑导航 -->
    <BreadMenu
        :page_name="article_title"
    ></BreadMenu>

    <!-- 文章内容 -->
    <el-row :gutter="10">
      <el-col :xs="24" :lg="16">
        <div class="body dewb">
          <div class="header">
            {{ article_title }}
          </div>
        </div>
        <div class="body dewb">
          <div class="dewb">
            {{ description }}
          </div>
        </div>
        <div>
          <div class="pdf-tab">
            <el-button

                @click.stop="clock"
                style="margin:10px"
            >顺时针
            </el-button>
            <el-button

                @click.stop="counterClock"
                style="margin:10px">逆时针
            </el-button>
            <el-button

                @click.stop="pdfPrintAll"
                style="margin:10px">全部打印
            </el-button>
            <el-button

                @click.stop="pdfPrint"
                style="margin:10px">部分打印
            </el-button>
          </div>
          <div>{{ pageNum }}/{{ pageTotalNum }}</div>
          <div>进度：{{ loadedRatio }}</div>
          <div>页面加载成功: {{ curPageNum }}</div>
          <pdf
              ref="pdf"
              :src="pdfUrl"
              :page="pageNum"
              :rotate="pageRotate"
              @password="password"
              @progress="loadedRatio = $event"
              @page-loaded="pageLoaded($event)"
              @num-pages="pageTotalNum=$event"
              @error="pdfError($event)"
              @link-clicked="page = $event"
          >
          </pdf>
        </div>
        <div class="body dewb">
          <el-button
              @click.stop="prePage"
              style="margin:10px"
          >上一页
          </el-button>
<!--          <el-button-->
<!--              @click="downFile()"-->
<!--              style="margin:10px"-->
<!--          >下载-->
<!--          </el-button>-->
          <el-button
              type="i"
              @click.stop="nextPage"
              style="margin:10px"
          >下一页
          </el-button>
          <div>
            <span>添加审稿人</span>
            <el-transfer v-model="value" :data="data"></el-transfer>
            <el-button type="success" @click="submit(article_id)">
              确定
            </el-button>
          </div>
        </div>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import axios from "axios";
import Qs from "qs";
import BreadMenu from "../components/BreadMenu";
import pdf from 'vue-pdf'
import Element from "element-ui";

export default {
  data() {
    const generateData = _ => {
      axios({
        url: "",
        method: "get",
      }).then((res) => {
        this.ReaderList = res.data.data;
      });
      return data;
    };
    const query = this.$route.query;
    console.log(query.id)
    return {
      ReaderList: generateData(),
      value: [],
      article_data: this.$route.query.id,
      article_title: '',
      description: '',
      user_article_info: {
        "like": false,
        "favor": false,
        "report": false
      },
      //评论
      new_pinglun: "",
      ping_total: 10,
      ping_num: 0,
      pinglun_pageSize: 10,
      pinglun_data: [],
      // pdfUrl: ""
      pdfUrl: this.$axios.defaults.baseURL + '/download?filename=' + query.id,
      pageNum: 1,
      pageTotalNum: 1,
      pageRotate: 0,
      // 加载进度
      loadedRatio: 0,
      curPageNum: 0,
      reportMessage: '',
      visible: false
    };
  },
  components: {
    BreadMenu,
    pdf
  },
  created() {

  },
  mounted() {
    this.getArticleDescription(this.article_data);
    this.getAllPinglun(1, this.pinglun_pageSize);
  },
  methods: {
    downFile () {
      let a = document.createElement('a')
      a.href = this.pdfUrl // 这里的请求方式为get，如果需要认证，接口上需要带上token
      a.click()
    },
    open() {
      this.$prompt('请输入举报理由', '举报', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        //inputPattern: /[\w!#$%&'*+/=?^_`{|}~-]+(?:\.[\w!#$%&'*+/=?^_`{|}~-]+)*@(?:[\w](?:[\w-]*[\w])?\.)+[\w](?:[\w-]*[\w])?/,
        //inputErrorMessage: '邮箱格式不正确'
      }).then(({value}) => {
        this.reportMessage = value;
        this.toReport();
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '取消举报'
        });
      });
    },
    getUserToArtcile() {
      axios({
        url: "/getUserToArticle",
        method: "get",
        params: {
          user_id: JSON.parse(this.$store.state.userInfo).id,
          article_id: this.article_data,
        },
      }).then((res) => {
        this.user_article_info.favor = res.data.data.favor;
        this.user_article_info.like = res.data.data.like;
        console.log(this.ping_num);
        console.log(this.article_data);
      });
    },
    prePage() {
      var p = this.pageNum
      p = p > 1 ? p - 1 : this.pageTotalNum
      this.pageNum = p
    },
    nextPage() {
      var p = this.pageNum
      p = p < this.pageTotalNum ? p + 1 : 1
      this.pageNum = p
    },
    clock() {
      this.pageRotate += 90
    },
    counterClock() {
      this.pageRotate -= 90
    },
    password(updatePassword, reason) {
      updatePassword(prompt('password is "123456"'))
      console.log('...reason...')
      console.log(reason)
      console.log('...reason...')
    },
    pageLoaded(e) {
      this.curPageNum = e
    },
    pdfError(error) {
      console.error(error)
    },
    pdfPrintAll() {
      this.$refs.pdf.print()
    },
    pdfPrint() {
      this.$refs.pdf.print(100, [1, 2])
    },
    //点赞
    toLike() {
      axios({
        url: "/likeArticle",
        method: "post",
        data: Qs.stringify({
          // token: this.$store.getters.isnotUserlogin,
          article_id: this.article_data,
          user_id: JSON.parse(this.$store.state.userInfo).id,
        }),
      }).then((res) => {
        this.user_article_info.like = res.data.data.like;
      });
    },
    notLike() {
      axios({
        url: "/cancelLikeArticle",
        method: "post",
        data: Qs.stringify({
          // token: this.$store.getters.isnotUserlogin,
          article_id: this.article_data,
          user_id: JSON.parse(this.$store.state.userInfo).id,
        }),
      }).then((res) => {
        this.user_article_info.like = res.data.data.like;
      });
    },
    //收藏
    toFavor() {
      axios({
        url: "/favorArticle",
        method: "post",
        data: Qs.stringify({
          article_id: this.article_data,
          user_id: JSON.parse(this.$store.state.userInfo).id,
        }),
      }).then((res) => {
        this.user_article_info.favor = res.data.data.favor;
      });
    },
    notFavor() {
      axios({
        url: "/cancelFavorArticle",
        method: "post",
        data: Qs.stringify({
          article_id: this.article_data,
          user_id: JSON.parse(this.$store.state.userInfo).id,
        }),
      }).then((res) => {
        this.user_article_info.favor = res.data.data.favor;
      });
    },
    toReport() {
      axios({
        url: "/submitComplaint",
        method: "post",
        data: Qs.stringify({
          article_id: this.article_data,
          user_id: JSON.parse(this.$store.state.userInfo).id,
          report_message: this.reportMessage,
        }),
      }).then((res) => {

      });
    },
    //获取文章评论
    getAllPinglun(page, pageSize) {
      axios({
        url: "/getComment",
        method: "get",
        params: {
          page,
          pageSize,
          article_id: this.article_data,
        },
      }).then((res) => {
        this.pinglun_data = res.data.data.comment_list;
        this.ping_num = res.data.data.total_num;

        if (this.ping_num % 10 !== 0) {
          this.ping_total = this.ping_num / 10 + 1;
        } else {
          this.ping_total = this.ping_num / 10;
        }
        console.log(this.ping_total + "??")
        console.log(this.ping_num);
        console.log(this.article_data);
      });
    },
    //发表评论
    saveNewPinglun() {
      if (this.new_pinglun.length === 0) {
        Element.Message({
          showClose: true,
          message: "评论内容不能为空~",
          type: 'error',
          duration: 2000
        })
        return;
      }
      axios({
        url: "/addComment",
        method: "post",
        data: Qs.stringify({
          article_id: this.article_data,
          text: this.new_pinglun,
          user_id: JSON.parse(this.$store.state.userInfo).id
        }),
      }).then((res) => {
        this.getAllPinglun(1, this.pinglun_pageSize);
        this.new_pinglun = null
      });
    },
    // 评论翻页
    pinglunCurrentChange(page) {
      this.getAllPinglun(page, this.pinglun_pageSize);
    },
    //跳转文章 上下
    // toOtherPage(id) {
    //   if (id === 0) {
    //     alert("没有了");
    //     return;
    //   }
    //   this.$router.push({path: "/content", query: {id: id}});
    // },
    getArticleDescription(id) {
      // console.log(id);
      axios({
        url: "/getPassage",
        method: "get",
        params: {
          article_title: id,
        },
      }).then((res) => {
        // console.log(res.data)
        // this.getUserArticleInfo();
        this.description = res.data.data.description;
        this.article_title=res.data.data.title;
      });
    },
  },
};
</script>

<style scoped>
.body.dewb .dewb {
  padding: 10px;
  color: #b7b7b7;
  font-size: 12px;
  font-style: italic;
}

.body.dewb {
  padding: 10px 10px;
  margin-top: 10px;
}

.like-btn {
  text-align: center;
  color: #fff;
}

.like-btn i {
  font-size: 30px;
  cursor: pointer;
}

.body.dewb.pinglun-item {
  color: #fff;
  font-size: 16px;
}

.annotationLayer .linkAnnotation > a {
  position: absolute;
  font-size: 1em;
  top: 0;
  left: 0;
  width: 1% !important;
  height: 1% !important;
}

.linkAnnotation > a:hover {
  color: #20a0ff;
}
</style>
