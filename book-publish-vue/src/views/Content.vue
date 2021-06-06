<template>
  <div>
    <!-- 面包屑导航 -->
    <BreadMenu
        :page_name="article_data"
    ></BreadMenu>

    <!-- 文章内容 -->
    <el-row :gutter="10">
      <el-col :xs="24" :lg="16">
        <div class="body dewb">
          <div class="header">
            {{ article_data}}
          </div>
        </div>
        <div class="body dewb">
          <div class="dewb">
            {{ article_data.description }}
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
          <el-button
              type="i"
              @click.stop="nextPage"
              style="margin:10px"
          >下一页
          </el-button>
        </div>
      </el-col>
      <el-col :xs="24" :lg="8">
        <div class="body dewb">
          <el-image :src="article_data.cover" :fit="'cover'"></el-image>
        </div>
        <div class="body dewb like-btn">
          <el-row>
            <el-col :span="12">
              <i
                  v-if="user_article_info.like"
                  class="iconfont icon-dianzan"
                  style="color:#fc5959"
                  @click="toLike()"
              ></i>
              <i @click="toLike()" v-else class="iconfont icon-dianzan"></i>
            </el-col>
            <el-col :span="12">
              <i
                  v-if="user_article_info.favor"
                  class="iconfont icon-collection-b"
                  style="color:#e6e1e8"
                  @click="toFavor()"
              ></i>
              <i
                  @click="toFavor()"
                  v-else
                  class="iconfont icon-shoucang"
              ></i>
            </el-col>
          </el-row>
        </div>
        <div class="body dewb">
          <div
              v-for="(item, index) in pinglun_data"
              :key="index"
              class="body dewb pinglun-item"
          >
            {{ item.nickName }} 说：
            <el-divider></el-divider>
            {{ item.text }}
          </div>
        </div>
        <div class="dewb" style="margin-top:10px">
          <el-pagination
              background
              small
              :pager-count="5"
              layout="prev, pager, next"
              :total="ping_total"
              :page-size="pinglun_pageSize"
              @current-change="pinglunCurrentChange"
          >
          </el-pagination>
        </div>
        <div class="body dewb">
          <el-input
              type="textarea"
              :maxlength="120"
              :rows="2"
              placeholder="请输入内容"
              v-model="new_pinglun"
          >
          </el-input>
          <el-button @click="saveNewPinglun()" type="success"
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

export default {
  data() {
    const query = this.$route.query;
    console.log(query.id)
    return {
      // article_data: this.$route.query.id,
      article_data: this.$route.query.id,
      description:'',
      user_article_info: {
        "like": false,
        "favor": false
      },
      //评论
      new_pinglun: "1231",
      ping_total: 100,
      pinglun_pageSize: 4,
      pinglun_data: [],
      // pdfUrl: ""
      pdfUrl: this.$axios.defaults.baseURL + '/download?filename=' + query.id,
      pageNum: 1,
      pageTotalNum: 1,
      pageRotate: 0,
      // 加载进度
      loadedRatio: 0,
      curPageNum: 0,
      // pdfUrl: this.$route.query.pdfUrl

    };
  },
  components: {
    BreadMenu,
    pdf
  },
  // watch: {
  //   $route(to) {
  //     // console.log(to)
  //     this.article_data = to.query.id;
  //     // this.getArticleData(to.query.id);

  //     // this.pdfUrl = 'http://127.0.0.1:8081/download?filename=xuqiuguigeshuomingshu.pdf'
  //     // this.getAllPinglun(1, this.pinglun_pageSize);
  //   }

  // },
  created() {

  },
  mounted() {
    this.getArticleDescription(this.article_data);
    this.getAllPinglun(1, this.pinglun_pageSize);
  },
  methods: {
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
        url: "",
        method: "post",
        data: Qs.stringify({
          // token: this.$store.getters.isnotUserlogin,
          article_id: this.article_id,
        }),
      }).then((res) => {
      });
    },
    //收藏
    toFavor() {
      axios({
        url: "",
        method: "post",
        data: Qs.stringify({
          article_id: this.article_id,
        }),
      }).then((res) => {
        // console.log(res.data)
      });
    },

    //获取文章评论
    getAllPinglun(page, pagesize) {
      axios({
        url: "/",
        method: "get",
        params: {
          page,
          pagesize,
          article_id: this.article_id,
        },
      }).then((res) => {
        this.pinglun_data = res.data.data;
        this.ping_total = res.data.data.total;
        if(this.total_num%10!==0){
          this.total=this.total_num/10+1;
        }
        else{
          this.total=this.total_num/10;
        }
        console.log(this.total)
      });
    },
    //发表评论
    saveNewPinglun() {
      if (this.new_pinglun.length === 0) {
        alert("内容为空");
        return;
      }

      axios({
        url: "",
        method: "post",
        data: Qs.stringify({
          article_id: this.article_id,
          text: this.new_pinglun,
        }),
      }).then((res) => {
        // console.log(res.data)
        if (res.data === "nologin") {
          alert("尚未登录");
          return;
        }
        if (res.data === "noperm") {
          alert("权限不足");
          return;
        }
        if (res.data === "ok") {
          this.getAllPinglun(1, this.pinglun_pageSize);
        }
      });
    },
    // 评论翻页
    pinglunCurrentChange(page) {
      this.getAllPinglun(page, this.pinglun_pageSize);
    },
    //跳转文章 上下
    toOtherPage(id) {
      if (id === 0) {
        alert("没有了");
        return;
      }
      this.$router.push({path: "/content", query: {id: id}});
    },
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

.linkAnnotation > a:hover{
  color: #20a0ff;
}
</style>
