<template>
  <div class="mdui-container movieListBox"
       :class="{
  'movieMoveBox':!ismove
  }">
    <div class="detailContnet">
      <img src="../assets/images/conan.jpg" alt="">
      <table class="detailMessage">
        <tr>
          <th>
            电影名称
          </th>
          <th>
            类型
          </th>
          <th>
            主演
          </th>
        </tr>
        <tr>
          <td>
            {{detailData.name}}
          </td>
          <td>
            {{detailData.category}}
          </td>
          <td>
            {{detailData.zhuyan}}
          </td>
        </tr>
      </table>
      <div class="mdui-row-xs-2">
        <div class="loadBox">
          <p class="loadTitle">下载链接:</p>
          <div class="loadItem" v-for="value in detailData.detail">
            <p>{{value.description}}</p>
            <span v-if="value.size">大小:{{value.size}}</span>
            <a class="mdui-btn mdui-btn-block mdui-color-theme-accent mdui-ripple loadColor"
               :href="value.downloadUrl"
               :thurl="value.downloadUrl">
              <i class="mdui-icon material-icons">&#xe157;</i>
              {{value.description}}
            </a>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
  import axios from 'axios'
  export default {
    created() {
      axios({
        url: '/api/d',
        method: 'post',
        data: {
          movieId: this.$route.query.id
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
          this.detailData = response.data
        })
    },
    data() {
      return {
        detailData: {}
      }

    },
    computed: {
      ismove() {
        return this.$store.state.isopen
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

    .loadBox {
      padding: 0 0 !important;
    }

    .detailMessage {
      width: 100%;
      padding: 0.2rem 0rem !important;
      margin: 0 auto;
      text-align: center;
    }
  }

  .loadItem {
    margin-bottom:0.25rem;
    margin-top:0.25rem;
    border: 1px solid #ccc;
    overflow: hidden;
  }

  .loadBox {
    padding: 0 1rem;
  }

  .loadColor {
    background-color: #333;
    color: #fff;
    margin-top: 0.1rem;
  }

  .loadColor:hover {
    background-color: #333;
  }

  .detailContnet {
    padding: 0 0.30rem;
    box-sizing: border-box;
    text-align: center;
  }

  .detailMessage {
    width: 100%;
    padding: 0.2rem 1rem;
    margin: 0 auto;
    text-align: center;
  }

  .detailMessage tr td {
    width: 33.33%;
    padding: 0.1rem 0;
  }

  .detailMessage tr th {
    background-color: #333;
    color: #fff;
  }

  .loadTitle {
    border-top: 1px solid #ccc;
    text-align: left;
    text-indent: 2em;
    height: 0.4rem;
    line-height: 0.4rem;
  }
</style>
