<template>
  <section v-dogeAnimate class="mdui-clearfix">
    <h1 class="indexTitle">Search for what you want</h1>
    <div class="indexDoge">
      <div class="dog"></div>
      <div class="ball1"></div>
      <div class="ball2"></div>
    </div>
    <div class="indexsearchBox posr">
      <input class="indexSearch" type="search"
             @focus="changeColor"
             :class="{
             'indexSearchFocus':pinked
             }"
             @blur="loseColor"
             v-model="centerSearchtext"
             @keyup.enter="searching"
      >
      <button class="mdui-textfield-icon mdui-btn mdui-btn-icon indexSearchbutton"
              @click="searching"
      >
        <i class="mdui-icon material-icons"
           :class="{
        'indexSearchbuttonFocus':pinked
        }"
        >search</i>
      </button>
    </div>
  </section>
</template>
<script>
  export default {
    directives: {
      dogeAnimate: {
        inserted: function (el) {
          var sreenwidth = window.innerWidth;
          if (sreenwidth > 768) {
            var test = el.querySelector('.indexDoge')
            var ball1 = el.querySelector('.ball1')
            var ball2 = el.querySelector('.ball2')
            var body = el.parentNode
            var offsetLeft = test.offsetLeft;
            var offsetTop = test.offsetTop;
            //声明左眼夹角a1、右眼夹角a2
            var a1, a2;
            //声明左眼圆心(X1,Y1)、右眼圆心(X2,Y2)
            var X1 = 38, Y1 = 72, X2 = 106, Y2 = 68;
            //声明半径
            var R = 3;
            body.onmousemove = function (e) {
              e = e || event;
              //获取鼠标坐标
              var x = e.clientX;
              var y = e.clientY;
              //更新夹角a1、a2
              a1 = Math.atan2(x - X1 - offsetLeft, y - Y1 - offsetTop);
              a2 = Math.atan2(x - X2 - offsetLeft, y - Y2 - offsetTop);
              //更新左眼、右眼的left、top值
              ball1.style.left = R * Math.sin(a1) + X1 - 10 + 'px';
              ball1.style.top = R * Math.cos(a1) + Y1 - 10 + 'px';
              ball2.style.left = R * Math.sin(a2) + X2 - 10 + 'px';
              ball2.style.top = R * Math.cos(a2) + Y2 - 10 + 'px';
            }
          }
        }
      }
    },
    data() {
      return {
        //center搜索框变色判断条件
        pinked: false,
        //绑定center搜索框值
        centerSearchtext: ''
      }
    },
    methods: {
      //搜索框颜色改变
      changeColor() {
        this.pinked = true;
      },
      //搜索框颜色恢复
      loseColor() {
        this.pinked = false;
      },
      searching() {
        //改变状态中acntionSearch的值,并传递搜索框值
        this.$store.commit('actionSearch', {state: true, content:this.centerSearchtext})
        //跳转list页面
        this.$router.push('/list')
      }
    }
  }
</script>
<style>
  section {
    height: 100%;
    padding-top: 0.56rem;
    box-sizing: border-box;
  }

  .indexDoge {
    position: relative;
    width: 4rem;
    left: 50%;
    top: -0.55rem;
  }

  .ball1 {
    position: absolute;
    top: 0.62rem;
    left: 0.22rem;
    transform: translateX(0.18rem) translateY(0.03rem);
    width: 0.089rem;
    height: 0.089rem;
    border-radius: 50%;
    background-color: #000;
  }

  .ball2 {
    position: absolute;
    top: 0.58rem;
    left: 0.96rem;
    transform: translateX(-0.05rem) translateY(0.04rem);
    width: 0.089rem;
    height: 0.089rem;
    border-radius: 50%;
    background-color: #000;
  }

  .dog {
    width: 4rem;
    height: 2rem;
    background: url('../assets/images/timg2.png') no-repeat 0.2rem -1.06rem;
    background-size: 4rem;
    position: absolute;
    top: -0.59rem;
    left: -2.07rem;
    z-index: 1;
  }

  .indexTitle {
    font-family: myfont;
    font-size: 0.8rem;
    text-align: center;
    font-weight: 400;
  }

  .indexSearch {
    height: 0.5rem;
    border: solid 0.02rem #333;
    text-indent: 1em;
    font-size: 0.2rem;
    border-radius: 0.10rem;
    transition: all 0.3s;
    width: 100%;
  }

  .indexsearchBox {
    margin: 1.23rem auto auto auto;
    width: 5rem;

  }

  .indexSearchbutton {
    position: absolute;
    right: 0.07rem;
    top: 0.07rem;
    width: 0.36rem;
    height: 0.36rem;
  }

  .indexSearchbutton i {
    transition: all 0.3s;
    font-size: 0.24rem;
  }

  .indexSearchbuttonFocus {
    color: hotpink;
  }

  .indexSearchFocus {
    border-color: hotpink;
  }

  @media screen  and (max-width: 768px) {
    html {
      font-size: 50px;
    }
  }
</style>
