<template>
  <section class="contianer">
    <el-row type="flex" justify="space-between">
      <!-- 顶部过滤列表 -->
      <div class="flights-content">
        <!-- 过滤条件 -->
        <FlightsFilters :data="flightDataCache" @getData="getData" />

        <!-- 航班头部布局 -->
        <FlightsListHead />

        <!-- 航班信息 -->
        <div v-if="flightsData.flights.length">
          <!-- :key：这样写是为了每个分页列表里面的key的值不一样 -->
          <FlightsItem
            v-for="(item,index) in dataList"
            :key="`${pageIndex}-` + index"
            :data="item"
          />
          <!-- size-change: 切换条数时候触发的事件 -->
          <!-- current-change：切换页数时候触发的事件 -->
          <!-- current-page：当前的页数 -->
          <!-- page-size: 当前的条数 -->
          <!-- total: 总条数 -->
          <el-pagination
            @size-change="handleSizeChange"
            @current-change="handleCurrentChange"
            :current-page="pageIndex"
            :page-sizes="[5, 10, 15, 20]"
            :page-size="pageSize"
            layout="total, sizes, prev, pager, next, jumper"
            :total="total"
          ></el-pagination>
        </div>
        <div v-else class="empty">当前没有适合的航班列表。</div>
      </div>
      <!-- // -->
      <!-- 侧边栏 -->
      <FlightsAside />
    </el-row>
  </section>
</template>

<script>
import FlightsListHead from "@/components/air/flightsListHead.vue";
import FlightsItem from "@/components/air/flightsItem.vue";
import FlightsFilters from "@/components/air/flightsFilters.vue";
import FlightsAside from "@/components/air/flightsAside.vue";
export default {
  data() {
    return {
      flightsData: {
        info: {},
        flights: [],
        options: {}
      }, // 航班总数据
      // 备份一个数据，这个数据一旦被赋值后永远都不能被修改（原图）
      flightDataCache: {
        info: {},
        flights: [],
        options: {}
      },
      // dataList: [], // 航班列表数据，用于循环flightsItem组件，单独出来是因为要分页
      // 当前的页数
      pageIndex: 1,
      // 当前显示的条数
      pageSize: 5,
      // 总条数
      total: 0
    };
  }, ///
  mounted() {
    this.fetchList();
  }, ////

  computed: {
    //计算属性，会监听函数内部所有引用实例(this)属性的变化
    dataList() {
      //会报一个slice未定义的错误，因为页面进来要先加载数据，需要时间
      const arr = this.flightsData.flights.slice(
        (this.pageIndex - 1) * this.pageSize,
        this.pageIndex * this.pageSize
      );
      return arr;
    }
  }, ////
  // 1.watch可以监听路由的变化
  // watch: {
  //     // 监听路由的变化
  //     $route(){
  //         // 一旦路由发生了重新请求数据
  //         this.fetchList();
  //     }
  // },

  // 2.可以通过组件内的导航守卫来监听路由的变化
  // 文档地址 https://router.vuejs.org/zh/guide/advanced/navigation-guards.html#组件内的守卫
  beforeRouteUpdate(to, from, next) {
    // next必须要执行的函数
    next();
    // 一定要先跳转了再获取数据
    this.fetchList();
  },

  methods: {
    // 请求机票列表
    fetchList() {
      // 请求机票列表
      this.$axios({
        url: "/airs",
        params: this.$route.query
      }).then(res => {
        // 总的数据，里面包含了info,flights,total,options属性
        this.flightsData = res.data;
        // 备份一份起来, 这份不能被修改, 因为是引用类型内存地址是一样的所以需要拷贝一份
        this.flightDataCache = { ...res.data };

        // 总条数
        this.total = this.flightsData.total;
      });
    },
    // 这个事件时传递给过滤的子组件用于获取过滤后的数组
    getData(arr) {
      //arr是当前符合条件的航班
      this.flightsData.flights = arr;
      //重置总条数
      this.total = arr.length;
    },

    //页面显示的大小数据变化时
    handleSizeChange(val) {
      // 显示条数
      this.pageSize = val;
      // 一般条数发生了变化会回到第一页
      this.pageIndex = 1;
      // 重新切割数组
      // this.dataList = this.flightsData.flights.slice(
      //   (this.pageIndex - 1) * this.pageSize,
      //   this.pageIndex * this.pageSize
      // );
    },

    //切换第几页时
    handleCurrentChange(val) {
      // 修改页数
      this.pageIndex = val;
      // 重新切割数组
      // this.dataList = this.flightsData.flights.slice(
      //   (this.pageIndex - 1) * this.pageSize,
      //   this.pageIndex * this.pageSize
      // );
    }
  },
  components: {
    FlightsListHead,
    FlightsItem,
    FlightsFilters,
    FlightsAside
  }
}; ///
</script>

<style scoped lang="less">
.contianer {
  width: 1000px;
  margin: 20px auto;
}

.flights-content {
  width: 745px;
  font-size: 14px;
}

.aside {
  width: 240px;
}
</style>