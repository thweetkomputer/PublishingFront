<template>
  <div >
    <!-- 面包屑导航 -->
    <BreadMenu
        :page_name="article_title"
    ></BreadMenu>
    <!-- 文章内容 -->
    <el-row :gutter="10">
      <el-col :xs="24" :lg="24">
        <div class="body dewb">
          <div>
            <p style="font-weight: bold; display: inline-block; margin-right: 10px">作者</p>{{ type }}
          </div>
        </div>
        <div class="body dewb">
          <div style="word-wrap:break-word">
            <p style="font-weight: bold; display: inline-block;  margin-right: 10px">简介</p><br/><p>{{ description }}</p>
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
              type="i"
              @click.stop="nextPage"
              style="margin:10px"
          >下一页
          </el-button>
        </div>
      </el-col>
    </el-row>
    <el-button type="success" @click="submit(article_data)" style="margin-top:10px; background-color: #409EFF">
      发布文章
    </el-button>

    <el-button type="success" @click="delete1(article_data)" style="margin-top:10px; background-color: #409EFF">
      删除文章
    </el-button>
  </div>
</template>

<script>
import axios from "axios";
import BreadMenu from "../components/BreadMenu";
import pdf from 'vue-pdf'

export default {
  data() {
    const query = this.$route.query;
    console.log(query.id)
    return {
      type: '',
      ReaderList: [],
      firstValue: '',
      secondValue:'',
      thirdValue:'',
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
  },
  methods: {
    submit(id) {
        axios({
          url: "/publishPassage",
          method: "get",
          params: {
            article_id: id,
          },
        }).then((res) => {
          this.$router.push({path: '/books'});
        });
    },
    delete1(id) {
      axios({
        url: "/deletePassage",
        method: "get",
        params: {
          article_id: id,
        },
      }).then((res) => {
        this.$router.push({path: '/books'});
      });
    },
    downFile() {
      let a = document.createElement('a')
      a.href = this.pdfUrl // 这里的请求方式为get，如果需要认证，接口上需要带上token
      a.click()
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
        this.article_title = res.data.data.title;
        this.type = res.data.data.type;
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
