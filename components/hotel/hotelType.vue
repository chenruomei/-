<template>
  <!-- 酒店筛选 -->
  <div class="hotelFiltrate">
    <div>
      <span class="demonstration">
        价格
        <span>0-4000</span>
      </span>
      <el-slider v-model="value" :max="maxLength"></el-slider>
    </div>
    <div class="zsdj">
      住宿等级
      <!-- multiple多选 设置collapse-tags属性将它们合并为一段文字。-->
      <el-select
        v-model="totels.totellevel.value"
        multiple
        collapse-tags
        style="margin-left: 20px;"
        placeholder="不限"
        class="xl"
        @change="getTotellevel"
      >
        <el-option
          v-for="item in totels.totellevel"
          :key="item.value"
          :label="item.label"
          :value="item.value"
          class="xl"
        ></el-option>
      </el-select>
    </div>
    <div class="zslx">
      住宿类型
      <el-select
        v-model="totels.toteltype.value"
        multiple
        collapse-tags
        style="margin-left: 20px;"
        placeholder="不限"
        class="xl"
        @change="getToteltype"
      >
        <el-option
          v-for="item in totels.toteltype"
          :key="item.value"
          :label="item.label"
          :value="item.value"
          class="xl"
        ></el-option>
      </el-select>
    </div>
    <div class="jdss">
      酒店设施
      <el-select
        v-model="totels.totelasset.value"
        multiple
        collapse-tags
        style="margin-left: 20px;"
        placeholder="不限"
        class="xl"
        @change="getTotelasset"
      >
        <el-option
          v-for="item in totels.totelasset"
          :key="item.value"
          :label="item.label"
          :value="item.value"
          class="xl"
        ></el-option>
      </el-select>
    </div>
    <div class="jdpb">
      酒店品牌
      <el-select
        v-model="totels.totelbrand.value"
        multiple
        collapse-tags
        style="margin-left: 20px;"
        placeholder="不限"
        class="xl"
        @change="getTotelbrand"
      >
        <el-option
          v-for="item in totels.totelbrand"
          :key="item.value"
          :label="item.label"
          :value="item.value"
          class="xl"
        ></el-option>
      </el-select>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      value: 300,
      maxLength: 2010,
      totels: {
        // 酒店设施
        totelasset: [],
        // 品牌
        totelbrand: [],
        // 星级
        totellevel: [],
        // 住宿类型
        toteltype: []
      }
    };
  },
  methods: {
    // 品牌筛选
    getTotelbrand() {
      console.log(this.totels.totelbrand.value);
      
      let brands=this.totels.totelbrand.value;
      this.$emit('ppFiltrate',{brands})
    },
    // 等级筛选
    getTotellevel(item) {
      // console.log(item)
      console.log(this.totels.totellevel.value);
      let hotellevel = this.totels.totellevel.value[0];
      // let hotellevel = item[0];

      this.$emit("xjFiltrate", { hotellevel });
    },
    // 类型筛选
    getToteltype() {
      console.log(this.totels.toteltype.value);
      let hoteltype = this.totels.toteltype.value[0];
      this.$emit("lxFiltrate", { hoteltype });
    },
    // 酒店设施筛选
    getTotelasset() {
      console.log(this.totels.totelasset.value);
      let hotelasset = this.totels.totelasset.value[0];
      this.$emit("ssFiltrate", { hotelasset });
    }
  },
  mounted() {
    //请求获取删选的数据
    this.$axios.get("/hotels/options").then(res => {
      // console.log(res);

      let totelasset = res.data.data.assets;
      let totelbrand = res.data.data.brands;
      let totellevel = res.data.data.levels;
      let toteltype = res.data.data.types;
      totelasset.forEach(v => {
        this.totels.totelasset.push({
          value: v.id,
          label: v.name
        });
      });
      totelbrand.forEach(v => {
        this.totels.totelbrand.push({
          value: v.id,
          label: v.name
        });
      });
      totellevel.forEach(v => {
        this.totels.totellevel.push({
          value: v.id,
          label: v.name
        });
      });
      toteltype.forEach(v => {
        this.totels.toteltype.push({
          value: v.id,
          label: v.name
        });
      });

      //
    });
  }
};
</script>

<style lang="less" scoped>
.hotelFiltrate {
  margin: 10px;
  display: flex;
  // padding: 10px;
  color: #999;
  font-size: 14px;
  border: 1px solid #999;
  margin-top: 20px;
  > div {
    flex: 1;
    padding: 6px 10px;
    border-right: 1px solid #999;
    &:nth-child(5) {
      border-right: none;
    }
    .demonstration {
      display: flex;
      justify-content: space-between;
    }
  }
  .zsdj,
  .zslx,
  .jdss,
  .jdpb {
    text-align: center;
    /deep/.el-input__inner {
      border: none !important;
    }
  }
}
</style>    