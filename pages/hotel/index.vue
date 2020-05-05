<template>
  <section class="container">
    <div class="breadcrumb">
      <el-breadcrumb separator-class="el-icon-arrow-right">
        <el-breadcrumb-item>酒店</el-breadcrumb-item>
        <el-breadcrumb-item>
          <span v-if="form.city">{{form.city}}</span>
          <span v-else>南京市</span>酒店预订
        </el-breadcrumb-item>
      </el-breadcrumb>
    </div>
    <el-form :inline="true" v-model="form">
      <el-form-item>
        <el-autocomplete
          v-model="form.city"
          :fetch-suggestions="querySearch"
          placeholder="目的地"
          @select="handleSelect"
        ></el-autocomplete>
      </el-form-item>
      <el-form-item>
        <!-- type显示类型 datetimerange时间选着范围-->
        <el-date-picker
          v-model="form.time"
          type="daterange"
          range-separator="至"
          start-placeholder="入住日期"
          end-placeholder="离店日期"
          value-format="yyyy-MM-dd"
          @change="setDate"
        ></el-date-picker>
      </el-form-item>
      <el-form-item>
        <el-cascader
          expand-trigger="hover"
          v-model="form.people"
          @change="handleChange"
          :options="options"
        ></el-cascader>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="handleClickFliter">查看价格</el-button>
      </el-form-item>
    </el-form>
    <!-- {{cityData}} -->
    <HotelDescription
      v-if="cityData.id &&hotelsList"
      :city="cityData"
      :hotelDetails="hotelsList.data"
    />
    <!-- 高德地图 -->
    <!-- <AMap/> -->
    <!--  酒店筛选部分 -->
    <HotelType @xjFiltrate="xjFiltrate" @lxFiltrate="lxFiltrate" @ssFiltrate="ssFiltrate" />
    <!-- 酒店详情 -->
    <div v-if="hotelsList.data[0]">
      <div
        class="hotelDetails"
        v-for="(item,index) in hotelsList.data"
        :key="index"
        @click="$router.push(`/hotel/detail?id=${item.id}`)"
      >
        <a href="#">
          <img :src="item.photos" alt />
        </a>
        <div class="middle">
          <h2>{{item.name}}</h2>
          <div>
            <div class="spell">
              <span class="alias">{{item.alias}}</span>
              <i v-if="item.hotellevel">
                <i class="el-icon-star-on" v-for="(v,i) in item.hotellevel.level" :key="i"></i>
              </i>
              {{item.hoteltype.name}}
            </div>
          </div>
          <div class="grade">
            <!-- 用element的评分 -->
            <el-rate v-model="item.stars" disabled text-color="#ff9900"></el-rate>
            <span class="grade_1">{{item.stars}}分</span>
            <span>{{item.all_remarks}}</span>
            <i class="pd_r">条评价</i>
            <span>{{item.num_collected}}</span>
            <i class="pd_r">篇游记</i>
          </div>
          <div class="place">
            <i class="el-icon-location-outline"></i>
            {{item.address}}
          </div>
        </div>

        <div class="right">
          <div
            @click="$router.push()"
            class="onlineShopping"
            v-for="(product,index) in item.products"
            :key="index"
          >
            <span>{{product.name}}</span>
            <span>
              <i>{{product.price}}</i>起 >
            </span>
          </div>
        </div>
      </div>
    </div>
    <div v-else class="notHotel">暂无符合条件的酒店</div>
    <div v-if="hotelsList.total">
      <el-pagination
        background
        layout="prev, pager, next"
        :total="hotelsList.total"
        @current-change="handleCurrentChange"
        class="paging"
      ></el-pagination>
    </div>
  </section>
</template>

<script>
import HotelType from "@/components/hotel/hotelType.vue";
import HotelDescription from "@/components/hotel/hotelDescription.vue";
export default {
  components: {
    HotelType,
    HotelDescription
  },
  data() {
    return {
      form: {
        city: "广州市",
        time: "",
        people: ""
      },
      par: { city: this.$route.query.city }, //头部筛选的参数
      hotelsList: {
        data: []
      }, //酒店的信息
      // 存储 城市的相关数据
      cityData: {},
      pageIndex: 1, //开始的页码数
      options: [
        {
          value: "成人",
          label: "成人",
          children: [
            {
              value: "1",
              label: "1人",
              children: [
                {
                  value: "0",
                  label: "0儿童"
                },
                {
                  value: "1",
                  label: "1儿童"
                },
                {
                  value: "2",
                  label: "2儿童"
                },
                {
                  value: "3",
                  label: "3儿童"
                }
              ]
            }, ///

            {
              value: "2",
              label: "2人",
              children: [
                {
                  value: "0",
                  label: "0儿童"
                },
                {
                  value: "1",
                  label: "1儿童"
                },
                {
                  value: "2",
                  label: "2儿童"
                },
                {
                  value: "3",
                  label: "3儿童"
                }
              ]
            }, //

            {
              value: "3",
              label: "3人",
              children: [
                {
                  value: "0",
                  label: "0儿童"
                },
                {
                  value: "1",
                  label: "1儿童"
                },
                {
                  value: "2",
                  label: "2儿童"
                },
                {
                  value: "3",
                  label: "3儿童"
                }
              ]
            }, //

            {
              value: "4",
              label: "4人",
              children: [
                {
                  value: "0",
                  label: "0儿童"
                },
                {
                  value: "1",
                  label: "1儿童"
                },
                {
                  value: "2",
                  label: "2儿童"
                },
                {
                  value: "3",
                  label: "3儿童"
                }
              ]
            } //
            //
          ]
        }
      ]
    };
  },
  mounted() {
    // 页面挂载完毕获取城市酒店信息
    this.getHotels(this.pageIndex);
    this.$axios({
      url: "/cities",
      params: {
        name: this.form.city
      }
    }).then(res => {
      this.cityData = res.data.data[0];
    });
  },
  methods: {
    // 删选城市
    querySearch(queryString, cb) {
      // queryString输入框输入的内容cb(返回下拉菜单数据的数组)数组中的对象必须有value属性
      if (!queryString.trim()) {
        return cb([]);
      }
      this.$axios({
        url: "/cities",
        params: {
          name: queryString
        }
      }).then(res => {
        const { data } = res.data;
        // console.log(res.data);
        let arr = data.map(v => {
          return {
            ...v,
            value: v.name
          };
        });
        // console.log(arr)
        cb(arr);
      });
    },
    //筛选城市后刷新页面
    handleSelect(item) {
      // 点击下拉菜单选中的那个元素
      this.cityData = item;
      this.par.city = item.id;
      this.$router.push({ path: "/hotel", query: { city: item.id } });
      // console.log(item)
    },
    // 设置时间
    setDate() {
      let enterTime = this.form.time[0];
      let leftTime = this.form.time[1];
      this.par.enterTime = enterTime;
      this.par.leftTime = leftTime;
      // this.filtrate({enterTime})
    },
    // 筛选人数
    handleChange(item) {
      // console.log(item);
      let cr = +item[1];
      let et = +item[2];
      this.par.person = cr + et;
    },
    // 头部删选
    handleClickFliter() {
      this.$axios({
        url: "/hotels",
        params: this.par
      }).then(res => {
        this.hotelsList = res.data;
      });
    },
    //分页删选
    handleCurrentChange(pageIndex) {
      this.getHotels(pageIndex);
    },
    // 获取酒店信息
    getHotels(pageIndex) {
      this.$axios({
        url: "hotels",
        params: {
          city: this.$route.query.city,
          _start: 5 * (pageIndex - 1)
        }
      }).then(res => {
        console.log(res.data);
        this.hotelsList = res.data;
        this.cityData = res.data.data;
      });
    },
    //底部酒店筛选筛选
    filtrate(data) {
      this.$axios({
        url: "/hotels",
        params: { ...data, city: this.$route.query.city }
      }).then(res => {
        this.hotelsList = res.data;
      });
    },
    // 等级筛选
    xjFiltrate(data) {
      // console.log(data)
      this.filtrate(data);
    },
    // 类型筛选
    lxFiltrate(data) {
      this.filtrate(data);
    },
    // 酒店设施筛选
    ssFiltrate(data) {
      this.filtrate(data);
    }
  }
};
</script>

<style lang="less" scoped>
.container {
  width: 1000px;
  margin: 0 auto;
  .paging {
    position: relative;
    left: 705px;
    margin-bottom: 50px;
  }
  .hotelDetails {
    border-bottom: 1px solid #eee;
    padding-bottom: 60px;
    margin-bottom: 20px;
    h2 {
      font-weight: normal;
      margin-bottom: 5px;
    }
    a {
      float: left;
      margin-right: 15px;
      img {
        width: 320px;
        height: 210px;
      }
    }
    .spell {
      color: #999;
      // display: flex;
      width: 378px;
      .el-icon-star-on {
        color: #ff9900;
      }
    }
    .grade {
      display: flex;
      .el-icon-star-on {
        padding-top: 10px;
        font-size: 20px;
        color: #f7ba2a;
      }
      .grade_1 {
        font-size: 14px;
        padding-right: 20px;
      }
      .pd_r {
        padding-right: 35px;
      }
      span {
        color: #f7ba2a;
      }
    }
  }
  .place {
    font-size: 14px;
    color: #666666;
    padding-top: 10px;
  }
  .middle {
    float: left;
    margin-right: 20px;
    padding-bottom: 90px;
  }
  .onlineShopping {
    // float: left;
    padding-bottom: 10px;
    border-bottom: 1px solid #ebeef5;
    display: flex;
    justify-content: space-between;
    padding: 10px;
    span {
      color: #60627e;
      font-size: 14px;
      padding: 10px 0;
    }
    i {
      color: #f7ba2a;
    }
  }
}
.notHotel {
  width: 100%;
  display: flex;
  font-size: 16px;
  color: #333;
  justify-content: center;
  padding-bottom: 300px;
}
.el-breadcrumb {
  padding: 20px 0;
}
.left {
  color: #666;
  font-size: 14px;
  width: 590px;
  margin-right: 10px;
  float: left;

  .area {
    margin-bottom: 20px;
    .subtitle {
      float: left;
      padding-right: 20px;
      padding-bottom: 20px;
    }

    .all {
      background: #eeeeee;
      padding: 1px 3px;
      margin-right: 15px;
      border-radius: 5px;
    }
  }
  .strategy {
    padding-bottom: 20px;
    .subtitle {
      float: left;
      padding-right: 20px;
      padding-bottom: 20px;
    }
  }
  .price {
    margin-bottom: 50px;
    .subtitle {
      .el-icon-question {
        color: #ccc;
        font-size: 16px;
      }
      float: left;
    }

    .item {
      padding-right: 60px;
      .el-icon-star-on {
        color: #ff9900;
      }
    }
  }
}
</style>