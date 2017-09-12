<template>
  <div class="mdui-container movieListBox"
       :class="{
  'movieMoveBox':!ismove
  }"
  >
    <div class="mdui-row-xs-3 mdui-row-sm-4 mdui-row-md-5 mdui-row-lg-6 mdui-row-xl-7 mdui-grid-list movieList">
      <router-link :to="{path:'/detail',query: {id: value.id}}" class="mdui-col detailLink"
                   v-for="(value,index) in listdata"
                   tag="a"
                   v-if="index < pagenum*pagesize && index >= (pagenum-1)*pagesize"
      >
        <div class="mdui-grid-tile">
          <img src="../assets/images/film.jpg"/>
        </div>
        <p class="moveMessage">{{value.name}}</p>
      </router-link>
    </div>
    <div class="pageItemBox" v-if="Math.floor(listdata.length/pagesize) > 1">
      <button class="mdui-btn"
              :disabled="pagenum <= 1"
              @click="previousPage"
      >上一页
      </button>
      <select class="mdui-select"
              v-model="pagenum"
              >
        <option
                v-for="(valueS,indexS) in Math.floor(listdata.length/pagesize)"
                :value="indexS+1"
        >第{{indexS+1}}页</option>
      </select>
      <button class="mdui-btn"
              :disabled="pagenum >= Math.floor(listdata.length/pagesize)"
              @click="nextPage"
      >下一页
      </button>
    </div>
  </div>
</template>
<script>
  import axios from 'axios'

  export default {
    created() {
      //判断状态中acntionSearch中state值是否为真,为真则发起请求
      if (this.$store.state.searched.state) {
        this.searchAxios()
      }

    },
    methods: {
      searchAxios() {
        this.listdata = []
        axios({
          url: '/api/search',
          method: 'post',
          data: {
            key: this.$store.state.searched.content
          },
          transformRequest: [function (data) {
            // Do whatever you want to transform the data
            let ret = ''
            for (let it in data) {
              ret += encodeURIComponent(it) + '=' + encodeURIComponent(data[it]) + '&'
            }
            return ret
          }],
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
          }
        })
          .then((response) => {
            console.log(response);
            this.listdata = response.data
          })
        this.$store.state.searched.state = false
      },
      previousPage() {
        this.pagenum--
      },
      nextPage() {
        this.pagenum++
      }
    },
    data() {
      return {
        listdata: [],
        //判断是否有2+次搜索的监视条件
        searched: this.$store.state.searched,
        pagesize: 10,
        pagenum: 1,
      }
    },
    computed: {
      //判断侧边栏的是否打开,是否将视图类名样式改变
      ismove() {
        return this.$store.state.isopen
      }
    },
    watch: {
      //监视判断是否有2+次搜索
      searched: {
        handler: function (val, oldVal) {
          if (val.state) {
            this.searchAxios()
          }
        },
        deep: true
      }
    }
  }
</script>
<style>
  .movieListBox {
    width: 100%;
    padding-top: 0.66rem;
    transform: translateZ(0);
    transition: 0.5s;
    overflow: hidden;
  }

  .movieMoveBox {
    padding-top: 0.66rem;
    max-width: none;
    transform: translateZ(0);
    padding-left: 2.4rem;
    padding-right: 0;
    overflow: hidden;
    box-sizing: border-box;
  }

  .movieList {
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
  }

  @media screen  and (max-width: 768px) {
    .movieListBox {
      padding-top: 66px;
      padding-left: 0;
      padding-right: 0;
    }

    .movieMoveBox {
      padding-top: 66px;
      max-width: none;
      transform: translateZ(0);
      padding-left: 0;
      padding-right: 0;
    }
  }

  .mdui-col {
    margin: 0 0.10rem !important;
  }

  .moveMessage {
    text-align: center;
    overflow: hidden;
    text-overflow: ellipsis;
    word-break: keep-all;
    white-space: nowrap;
  }

  .detailLink {
    color: #4c4c4c;
    margin-bottom: 0.4rem !important;
    overflow: hidden;
  }

  .pageItemBox {
    text-align: center;
    padding-bottom:0.40rem;
  }
</style>
