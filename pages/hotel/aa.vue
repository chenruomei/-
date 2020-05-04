<template>
  <div class="con">
    <!-- 条件选中和地图 -->
    <hoteHeaderFilter/>
   
   <!-- 下面 -->
    <hotelHomeBtn/>
  </div>
</template>

<script>
import hoteHeaderFilter from '@/components/hotel/hoteHeaderFilter.vue'
import hotelHomeBtn from '@/components/hotel/hotelHomeBtn.vue'
export default {
  data() {
    return {
    };
  }, //data
  methods: {
   
  }, //methods
  
components:{
hoteHeaderFilter,
hotelHomeBtn
},//components
 
}; ////
</script>

<style scoped lang="less">
.con {
  width: 1000px;
  margin: 0 auto;
}
//面包屑


//进度条
.fliter {
  border: 1px solid #000;
  padding: 10px;
  margin: 20px 0;
  display: flex;
  justify-content: space-around;
  .price {
    .price_top {
      display: flex;
      justify-content: space-between;
    }
  }
  .aa {
    width: 33%;
    padding: 10px;
    border-right: 1px solid #000;
    .el-dropdown {
      width: 100%;
      height: 38px;
      line-height: 38px;
      cursor: pointer;
    }
    .el-dropdown-link {
      font-size: 13px;
      display: flex;
      justify-content: space-between;
      align-items: center;
    }
    &:last-child {
      border-right: none;
    }
  }
}

//酒店详情的列表
.detail {
  padding: 15px;
  display: flex;
  //左边图片
  a {
    width: 30%;
    margin-right: 9px;
    img {
      width: 100%;
    }
  }
  //右边文字
  .detail_right {
    .detail_right_btn {
      display: flex;
      position: relative;
    }
    .detail_right_left {
      //标题下面的文字
      .biaoxia {
        color: #999;
        margin: 5px 0;
      }
      //星星
      #star {
        i {
          color: orangered;
        }
      }
      //评价
      .pingjia {
        display: flex;
        .ping {
          margin-left: 24px;
          i {
            color: orangered;
            margin: 0 5px;
          }
        }
      }
    }

    ///上面是右边文字的左边，下面是右边文字的右边
    .detail_right_right {
      position: absolute;
      right: -240px;
      top: 0px;
      p {
          display: flex;
          justify-content: space-between;
          width: 200px;
          padding: 10px;
          border-bottom: 1px solid #000;
        em{
            color: orangered;
            font-size: 17px;
        }
      }
    }
  }
}
</style>