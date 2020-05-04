<template>
  <!-- 酒店价格表格 -->
  <div class="table">
    <el-table :data="hotelData.products" style="width: 1000px">
      <el-table-column label="价格来源">
        <template slot-scope="scope">
          <span style="margin-left: 10px">{{ scope.row.name }}</span>
        </template>
      </el-table-column>
      <el-table-column label="低价房型">
        <template slot-scope="scope">
          <span style="margin-left: 10px">{{ scope.row.bestType }}</span>
        </template>
      </el-table-column>
      <el-table-column label="最低价格/每晚">
        <template slot-scope="scope" class="price">
          <span style="color:#f90; font-size:20px
            ;">
            ￥{{ scope.row.price }}
            <span style="color:#333;font-size:16px;">起</span>
            <i class="el-icon-arrow-right" style="font-size:16px;"></i>
          </span>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
export default {
  props: ["hotelData"],
  data() {
    return {
      // 表格
      tableData: [
        {
          name: "携程",
          bestType: "高级大床房",
          price: 120
        },
        {
          name: "携程",
          bestType: "高级大床房",
          price: 120
        },
        {
          name: "携程",
          bestType: "高级大床房",
          price: 120
        }
      ]
    };
  },
  mounted() {
    // console.log(hotelData.products);
  }
};
</script>

<style>
</style>