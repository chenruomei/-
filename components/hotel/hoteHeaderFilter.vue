<template>
  <div class="con">
    <!-- 面包屑 -->
    <div class="header">
      <el-breadcrumb separator-class="el-icon-arrow-right">
        <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
        <el-breadcrumb-item>{{destinationCity}}酒店预订</el-breadcrumb-item>
      </el-breadcrumb>
    </div>
    <!-- 引入地图 -->
    <script
      type="text/javascript"
      src="https://webapi.amap.com/maps?v=1.4.15&key=45eb53b7f3d466ebbfea135bf46cd2d2"
    ></script>
    <!-- 多选框 -->
    <div class="choice">
      <el-form ref="conditionsForm" :model="conditionsForm" label-width="80px" class="cityFrom">
        <div>
          <!-- 输入城市 -->
          <!-- fetch-suggestions 返回输入建议的方法 -->
          <!-- select 点击选中建议项时触发 -->
          <el-autocomplete
            v-model="destinationCity"
            :fetch-suggestions="getCity"
            placeholder="请输入目的城市"
            @select="SelectCity"
          ></el-autocomplete>
        </div>

        <div>
          <!-- 日期 -->
          <el-date-picker
            v-model="selDate"
            @change="getDate"
            type="daterange"
            range-separator="-"
            start-placeholder="入住日期"
            end-placeholder="离店日期"
            value-format="yyyy-MM-dd"
          ></el-date-picker>
        </div>
        <!-- 人数 -->
        <div @click="isShowperson=!isShowperson">
          <el-input
            placeholder="人数未定"
            v-model="personNo.num"
            suffix-icon="el-icon-user"
            readonly="readonly"
          ></el-input>
        </div>
        <!-- 价格 -->
        <div>
          <el-button type="primary" @click="selPrice">看价格</el-button>
        </div>
        <!-- 下拉框--选中人数 -->
        <div class="xiala" v-if="isShowperson">
          <div class="xiala_top">
            <span>每间</span>
            <el-select
              class="xuanz"
              v-model="personNo.adult"
              :value="personNo.adult"
              placeholder="请选择"
            >
              <el-option
                v-for="(item,index) in personNo.adultOp"
                :key="index"
                :label="item.label"
                :value="item.value"
              >{{ item.value }}</el-option>
            </el-select>

            <el-select
              class="xuanz"
              v-model="personNo.children"
              :value="personNo.children"
              collapse-tags
              style="margin-left: 20px;"
              placeholder="请选择"
            >
              <el-option
                v-for="(item,index) in personNo.childrenOp"
                :key="index"
                :label="item.label"
                :value="item.value"
              >{{ item.value }}</el-option>
            </el-select>
          </div>

          <el-button class="btn" type="primary" @click="getpersonNo">确定</el-button>
        </div>
      </el-form>
    </div>

    <!-- 区域 -->
    <div class="quyu">
      <!-- 区域左边 -->
      <div class="quyu_left">
        <!-- 区域左边上面 -->
        <div class="quyu_left_top">
          <span>区域：</span>
          <div class="quyu_left_top_right">
            <div :class="{hiddenAea:isareahidden}">
              <a
                v-for="(item,index) in destinationCityData.scenics"
                :key="index"
                @click="changeSin(index,item.id)"
              >{{item.name}}</a>
            </div>
            <div class="tubiao" @click="isareahidden=!isareahidden">
              <i class="el-icon-arrow-down" :class="{inp:!isareahidden}"></i>
              等{{ destinationCityData.scenics.length}}个区域
            </div>
          </div>
        </div>

        <!-- 区域左边下面 -->
        <div class="quyu_left_btn">
          <span>
            均价
            <sup>?</sup> :
          </span>
          <div class="quyu_left_btn_right">
            <div class="dengji">
              <i class="iconfont iconhuangguan" />
              <i class="iconfont iconhuangguan" />
              <i class="iconfont iconhuangguan" />
              <span>￥332</span>
            </div>
            <div class="dengji">
              <i class="iconfont iconhuangguan" />
              <i class="iconfont iconhuangguan" />
              <i class="iconfont iconhuangguan" />
              <i class="iconfont iconhuangguan" />
              <span>￥332</span>
            </div>
            <div class="dengji">
              <i class="iconfont iconhuangguan" />
              <i class="iconfont iconhuangguan" />
              <i class="iconfont iconhuangguan" />
              <i class="iconfont iconhuangguan" />
              <i class="iconfont iconhuangguan" />
              <span>￥332</span>
            </div>
          </div>
        </div>
      </div>

      <!-- 区域右边--地图 -->
      <div class="quyu_right">
        <div id="container"></div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      ismyfocus: -1, //
      destinationCity: "", //城市名字
      destinationCityData: { scenics: [] }, //城市数据
      selDate: "", //选择日期
      isareahidden: true, //隐藏显示类,区域显示完整
      isShowperson: false, //选择人数的下拉列表是否显示
      hotels: {}, //酒店数据
      start: 0, //开始页
      limit: 10, //限制数
      options: {}, //酒店选项
      mapData: [{}], //地图数据
      scenicId: "", //景点id
      //下拉列表的人数
      personNo: {
        //下拉选择人数
        adult: "2 成人",
        adultOp: [
          {
            value: "1",
            label: "1 成人"
          },
          {
            value: "2",
            label: "2 成人"
          },
          {
            value: "3",
            label: "3 成人"
          },
          {
            value: "4",
            label: "4 成人"
          },
          {
            value: "5",
            label: "5 成人"
          },
          {
            value: "6",
            label: "6 成人"
          },
          {
            value: "7",
            label: "7 成人"
          }
        ],
        children: "0 儿童",
        childrenOp: [
          {
            value: "0",
            label: "0 儿童"
          },
          {
            value: "1",
            label: "1 儿童"
          },
          {
            value: "2",
            label: "2 儿童"
          },
          {
            value: "3",
            label: "3 儿童"
          },
          {
            value: "4",
            label: "4 儿童"
          }
        ],
        num: ""
      },
      //酒店详情需要的数据
      conditionsForm: {
        city: "", //城市id
        enterTime: "", //入店时间
        leftTime: "", //离开时间
        scenic: "",
        person: 0
      }
    };
  }, //data
  methods: {
    //,城市。下拉列表选中时
    async SelectCity(value) {
      this.conditionsForm.city = value.id;
      if (this.conditionsForm.enterTime) {
        this.$router.push({
          path: "/hotel",
          query: {
            city: this.conditionsForm.city,
            enterTime: this.conditionsForm.enterTime,
            leftTime: this.conditionsForm.leftTime
          }
        });
      } else {
        this.$router.push({
          path: "/hotel",
          query: { city: this.conditionsForm.city }
        });
      }
      this.destinationCityData = value;
      await this.$axios({
        url: "/hotels",
        params: {
          city: this.conditionsForm.city
        }
      }).then(res => {
        const data = res.data;
        console.log('222',data);    
        // 上面为传送数据部分
        this.createMap(data.data);
        this.hotels = data; //酒店数据
        //  console.log('this.hotels',this.hotels);
        return data;
      });
    },

    //输入城市时
    // value 是选中的值，cb是回调函数，接收要展示的列表
    async getCity(value, cb) {
      //调用请求城市列表
      const cityList = await this.getCityList(value);
      if (!value) {
        //如果为空则不请求
        // cb([]);
        this.cityList = [];
        return;
      }
      this.conditionsForm.city = cityList[0].id;
      this.destinationCityData = cityList[0]; //把数组存储在对象
      cb(cityList);
    }, //

    //请求城市列表
    getCityList(value) {
      return this.$axios({
        url: "/cities",
        params: {
          name: value
        }
      }).then(res => {
        const { data } = res.data;
        //给数据加上一个value值
        const newData = data.map(v => {
          return {
            ...v,
            value: v.name
          };
        }); //map
        const cityList = newData.filter(element => element.id);
        // 准备建议数据,然后时候 showList 回调返回到 组件当中显示
        return cityList;
      });
    }, //

    //选择日期
    getDate() {
      this.conditionsForm.enterTime = this.selDate[0];
      this.conditionsForm.leftTime = this.selDate[1];
    }, //

    //选择人数的确定按钮
    getpersonNo() {
      this.personNo.num = "";
      //如果不包括成年人
      if (!this.personNo.adult.includes("成人")) {
        this.personNo.num = this.personNo.adult + "成人";
      } else {
        this.personNo.num = this.personNo.adult.replace(" ", "");
      }
      //如果不包含儿童
      if (!this.personNo.children.includes("0")) {
        this.personNo.num += " " + this.personNo.children + "儿童";
      }
      this.isShowperson = false;
    }, //

    //查看价格
    selPrice() {
      let personNumber = 0;
      for (let a of this.personNo.num.split(" ")) {
        personNumber += a[0] - 0;
      }
      this.conditionsForm.person = personNumber;
      if (this.conditionsForm.enterTime) {
        this.$router.push({
          path: "/hotel",
          query: {
            city: this.conditionsForm.city,
            enterTime: this.conditionsForm.enterTime,
            leftTime: this.conditionsForm.leftTime
          }
        });
      } else {
        this.$router.push({
          path: "/hotel",
          query: { city: this.conditionsForm.city }
        });
      }
      // 根据条件筛选数据渲染
      this.postsdata(this.conditionsForm);
    }, //

    // 每次筛选调用这个函数请求数据
    async postsdata(hotelsprice) {
      let res = await this.$axios({
        url: "/hotels",
        query: hotelsprice
      });
      this.hotels = res.data;
    }, //

    //酒店详情
    init() {
      this.$axios({
        url: "/hotels",
        params: {
          city: this.conditionsForm.city,
          _start: this.start,
          _limit: this.limit
        }
      }).then(res => {
        this.hotels = res.data;
        this.createMap(res.data.data);
      });
    }, //

    //创建地图
    async createMap(mapData) {
      //地图实例
      const map = new AMap.Map("container", {
        resizeEnable: true,
        center: [118.87603, 31.730244],
        zoom: 8 // 级别
      });
      
      // 添加一些分布不均的点到地图上,地图上添加三个点标记，作为参照
      mapData.forEach((item, index) => {
        // console.log(item, index)
        map.clearInfoWindow();
        const marker = new AMap.Marker({
          map,
          position: [item.location.longitude, item.location.latitude],
          title: item.address,
          content: `<span class="marker">${index + 1}</span>`
        });
        marker.content = item.address;
        marker.on("mouseout", closeInfoWindow);
        marker.emit("mouseout", { target: marker });
        marker.on("mouseover", markerClick);
        // marker.emit('mouseover', { target: marker })
      });
      function markerClick(e) {
        const infoWindow = new AMap.InfoWindow({
          offset: new AMap.Pixel(0, -30)
        });
        infoWindow.setContent(e.target.content);
        infoWindow.open(map, e.target.getPosition());
      }
      function closeInfoWindow() {
        map.clearInfoWindow();
      }
    }, //

    //改变地图
    changeSin(index, id) {
      this.scenicId = id;
      this.conditionsForm.scenic = id;
        if (this.conditionsForm.enterTime) {
           this.$router.push({
          path: '/hotel',
          query: { city: this.conditionsForm.city,
            scenic: this.scenicId,
            enterTime: this.conditionsForm.enterTime,
            leftTime: this.conditionsForm.leftTime
          }
        });
        }else{
            this.$router.push({
          path: '/hotel',
          query: { city: this.conditionsForm.city,
            scenic: this.scenicId
          }
        });
        }
         // 根据条件筛选数据渲染
       this.postsdata(this.conditionsForm)
    } //
  }, //methods

  async mounted() {
    //输入框的城市名
    await this.getCity(this.destinationCity);
    this.$router.push({
      path: "/hotel",
      query: { city: this.conditionsForm.city }
    });
    await this.init();
     this.$axios({
      url: '/hotels/options'
    }).then((res) => {
      this.options = res.data.data
    })
  } //
}; ////
</script>

<style scoped lang="less">
.con {
  width: 1000px;
  margin: 0 auto;
}

.header {
  margin: 20px 0;
}

//条件选中
.choice {
  .cityFrom {
    position: relative;
    display: flex;
    div {
      margin-right: 5px;
    }
  }
}
.xiala {
  position: absolute;
  z-index: 999;
  right: 110px;
  top: 35px;
  width: 300px;
  background-color: #ffffff;
  box-shadow: 0px 0px 5px #cccccc;
  margin-top: 5px;
  padding: 5px;

  .xiala_top {
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin: 10px 0;
    span {
      margin-right: 10px;
    }
    .xuanz {
      width: 100px;
    }
  }
  .btn {
    margin-left: 220px;
  }
}
//区域
.quyu {
  display: flex;
  height: 300px;
  margin: 10px 0;
  //左边
  .quyu_left {
    width: 60%;
    //左边上面
    .quyu_left_top {
      display: flex;
      span {
        margin-right: 10px;
      }
      .quyu_left_top_right {
        margin-left: 10px;

        a {
          margin: 5px;
          &:hover {
            color: #09f;
            text-decoration: underline;
          }
        }

        .tubiao {
          i {
            color: orangered;
          }
        }
      }
    }
    //左边下面
    .quyu_left_btn {
      display: flex;
      span {
        margin-right: 15px;
        sup {
          width: 15px;
          height: 15px;
          background: #ccc;
          color: #fff;
          display: inline-block;
          border-radius: 100%;
          text-align: center;
        }
      }
      .quyu_left_btn_right {
        display: flex;
        justify-content: space-between;
        .dengji {
          margin-right: 20px;
          i {
            font-size: 12px;
            color: orangered;
          }
          span {
            color: #999;
          }
        }
      }
    }
  }
  //右边--地图
  .quyu_right {
    width: 40%;
    #container {
      width: 390px;
      height: 300px;
    }
  }

  //隐藏类
  .hiddenAea {
    height: 41px;
    overflow: hidden;
  }
  //向上收起
  .inp {
    transform: rotate(180deg);
  }
}
</style>