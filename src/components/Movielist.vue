<template>
  <section>
    <div class="loading"
         v-if="loading"
    >
      <div class="loadingControllerBox">
        <div data-v-b6682622="" class="mdui-spinner">
          <div class="mdui-spinner-layer ">
            <div class="mdui-spinner-circle-clipper mdui-spinner-left">
              <div class="mdui-spinner-circle"></div>
            </div>
            <div class="mdui-spinner-gap-patch">
              <div class="mdui-spinner-circle"></div>
            </div>
            <div class="mdui-spinner-circle-clipper mdui-spinner-right">
              <div class="mdui-spinner-circle"></div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="movieListBox"
         :class="{
  'movieMoveBox':!ismove
  }"
    >
      <!--<div class="mdui-row-xs-3 mdui-row-sm-4 mdui-row-md-5 mdui-row-lg-5 mdui-row-xl-7 mdui-grid-list movieList">-->
      <div class="movieList">
        <div class="movieListItem"
             v-if="index < pagenum*pagesize && index >= (pagenum-1)*pagesize"
             v-for="(value,index) in listdata">
          <router-link :to="{path:'/detail',query: {id: value.id}}" class="detailLink"
                       tag="a"

          >
            <div class="mdui-grid-tile">
              <img src="../assets/images/film.jpg"/>
            </div>
            <p class="moveMessage">{{value.name}}</p>
          </router-link>
        </div>
        <div class="notFound"
          v-if="listdata.length <= 0"
        ><img style="border-radius:0%;vertical-align: middle;border: 5px solid #000;" src="../assets/images/dog2.png"><p>陛下对不起，小的未能找到您要的内容...</p></div>

      </div>
      <div class="pageItemBox" v-if="Math.floor(listdata.length/pagesize) > 1">
        <button class="mdui-btn"
                :disabled="pagenum <= 1"
                @click="previousPage()"
        >上一页
        </button>
        <select class="mdui-select"
                v-model="pagenum"
                @change="pageChange"
        >
          <option
            v-for="(valueS,indexS) in Math.floor(listdata.length/pagesize)"
            :value="indexS+1"
          >第{{indexS+1}}页
          </option>
        </select>
        <button class="mdui-btn"
                :disabled="pagenum >= Math.floor(listdata.length/pagesize)"
                @click="nextPage()"
        >下一页
        </button>
      </div>
    </div>
  </section>

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
        this.loading=true
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
            this.loading=false
          })
        this.$store.state.searched.state = false
      },
      previousPage() {
        document.documentElement.scrollTop=0
        document.body.scrollTop=0
        this.pagenum--
      },
      nextPage() {
        document.documentElement.scrollTop=0
        document.body.scrollTop=0
        this.pagenum++
      },
      pageChange(){
        document.documentElement.scrollTop=0
      }
    },
    data() {
      return {
        listdata: [],
        //判断是否有2+次搜索的监视条件
        searched: this.$store.state.searched,
        pagesize: 10,
        pagenum: 1,
        loading: false
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
<style scoped>
  /*<style>*/
  html {
    font-size: 100px;
    height: 100%;
  }

  .movieListBox {
    /*padding-top: 0.66rem;*/
    transform: translateZ(0);
    transition: 0.5s;
    overflow: hidden;
    /*height: 100%;*/
  }

  .movieMoveBox {
    /*padding-top: 0.66rem;*/
    transform: translateZ(0);
    padding-left: 2.4rem;
    padding-right: 0;
    overflow: hidden;
    box-sizing: border-box;
    /*height: 100%;*/
  }

  .movieList {
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    box-sizing: border-box;
    padding:0 10%;
  }

  @media screen  and (max-width: 768px) {
    .movieListBox {
      padding-top: 0.6rem;
      padding-left: 0;
      padding-right: 0;
    }

    .movieMoveBox {
      padding-top: 0.6rem;
      max-width: none;
      transform: translateZ(0);
      padding-left: 0;
      padding-right: 0;
    }
    .movieListItem{
      width: 50%!important;
      box-sizing: border-box;
      padding: 0.1rem;
    }
  }

  .movieListItem{
    width: 20%;
    box-sizing: border-box;
    padding: 0.1rem;
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
    padding-bottom: 0.40rem;
  }

  .loading {
    position: fixed;
    top: 0;
    width: 100%;
    height: 100%;
    background-color: #fff;
    z-index: 1;
  }

  .loading .loadingControllerBox {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%);
  }

  .mdui-spinner {
    width: 0.5rem;
    height: 0.5rem;
  }

  .notFound{
    font-size:0.3rem;
    margin-top:0.3rem;
  }
</style>
