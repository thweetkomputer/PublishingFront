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
          <div class="header" style="color: black!important;">
            {{ article_title }}
          </div>
        </div>
        <div class="body dewb">
          <div class="dewb">
            <div style="word-wrap:break-word">
              <p>{{ description }}</p>
            </div>
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
<!--            <el-button-->

<!--                @click.stop="pdfPrintAll"-->
<!--                style="margin:10px">全部打印-->
<!--            </el-button>-->
<!--            <el-button-->

<!--                @click.stop="pdfPrint"-->
<!--                style="margin:10px">部分打印-->
<!--            </el-button>-->
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
          <el-button
              @click="downFile()"
              style="margin:10px"
          >下载
          </el-button>
          <el-button
              type="i"
              @click.stop="nextPage"
              style="margin:10px"
          >下一页
          </el-button>
        </div>
      </el-col>
      <el-col :xs="24" :lg="8" v-if="this.$store.state.userInfo!==null">
        <div class="body dewb like-btn">
          <el-row>
            <el-col :span="8">
              <i
                  v-if="user_article_info.like"
                  class="iconfont icon-dianzan"
                  style="color:#fc5959"
                  @click="notLike()"
              ></i>
              <i @click="toLike()" v-else class="iconfont icon-dianzan"></i>
            </el-col>
            <el-col :span="8">
              <i
                  v-if="user_article_info.favor"
                  class="iconfont icon-shoucang"
                  style="color:#fc5959"
                  @click="notFavor()"
              ></i>
              <i @click="toFavor()" v-else class="iconfont icon-shoucang"></i>
            </el-col>
            <el-col :span="8">
                <i
                    v-if="!user_article_info.report"
                    class="iconfont icon-jubao"
                    style="color:#000"
                    @click="open"
                ></i>
            </el-col>
          </el-row>
        </div>
        <div class="body dewb">
          <div
              v-for="(item, index) in pinglun_data"
              :key="index"
              class="body dewb pinglun-item"
              style="color: #000;"
          >
            {{ item.content.slice(0, item.content.indexOf(' ')) }} 说：
            <span style="float: right; color: #8c939d">{{ item.createdTime.replace('T', ' ') }}</span>
            <el-divider></el-divider>
            {{ item.content.slice(item.content.indexOf(' ')) }}
          </div>
        </div>
        <div class="dewb" style="margin-top:10px">
          <el-pagination
              background
              small
              :pager-count="5"
              layout="prev, pager, next"
              :total="ping_num"
              :page-size="pinglun_pageSize"
              @current-change="pinglunCurrentChange"
          >
          </el-pagination>
        </div>
        <div class="body dewb">
          <el-input
              type="textarea"
              :maxlength="120"
              :rows="4"
              placeholder="请输入内容"
              v-model="new_pinglun"
              style="background-color:#ffffff00!important; border-radius: 5px"
          >
          </el-input>
          <el-button @click="saveNewPinglun()" type="success" style="margin-top: 10px;background-color: #409EFF"
          >发表评论
          </el-button
          >
        </div>
        <div>
          <a id="payLink" href="" target="_blank"></a>
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
    const query = this.$route.query;
    console.log(query.id)
    return {
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
    if (this.$store.state.userInfo === null) {
      return
    }
    this.getUserToArtcile();
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
      // alert(id)
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
  color: #00000060;
  font-size: 12px;
  font-style: italic;
}

.body.dewb {
  padding: 10px 10px;
  margin-top: 10px;
  color: black!important;
}

.dewb .header {
  font-size: 18px;
  color: #000;
  text-align: center;
  font-weight: 500;
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

.body.dewb.pinglun-item[data-v-76cda6af] {
  color: #000!important;
  font-size: 16px;
}
</style>
