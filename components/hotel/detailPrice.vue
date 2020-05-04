<template>
  <!-- 酒店价格表格 -->
  <div class="table">
    <el-table :data="tableData" style="width: 1000px">
      <el-table-column label="价格来源">
        <template slot-scope="scope">
          <span style="margin-left: 10px">{{ scope.row.source }}</span>
        </template>
      </el-table-column>
      <el-table-column label="低价房型">
        <template slot-scope="scope">
          <span style="margin-left: 10px">{{ scope.row.type }}</span>
        </template>
      </el-table-column>
      <el-table-column label="最低价格/每晚">
        <template slot-scope="scope" class="price">
          <span style="color:#f90; font-size:20px
            ;">
            ￥{{ scope.row.LowPrice }}
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
  data() {
    return {
      // 表格
      tableData: [
        {
          source: "携程",
          type: "高级大床房",
          LowPrice: "103"
        },
        {
          source: "携程",
          type: "高级大床房",
          LowPrice: "103"
        },
        {
          source: "携程",
          type: "高级大床房",
          LowPrice: "103"
        }
      ]
    };
  }
};
</script>

<style>
</style>