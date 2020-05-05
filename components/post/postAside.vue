<template>
  <div @mouseleave="lisind()" class="postSearch">
    <div class="list">
      <ul>
        <li
          :class="{lisindextab:lisindextab==(index+1)}"
          v-for="(value,index) in posthotel"
          :key="index"
          @mouseover="selectStyle (index) "
        >
          <span>{{ value.type }}</span>
          <i class="el-icon-arrow-right" />
        </li>
      </ul>
    </div>
    <div class="pschildren">
      <ul>
        <li v-for="(value,index) in posthotel[pstabindex].children" :key="index">
          <span @click="citysearch(value.city)">{{ index+1 }}</span>
          <span @click="citysearch(value.city)">{{ value.city }}</span>
          <span @click="citysearch(value.city)">{{ value.desc }}</span>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
export default {
  props: ['postList'],
  data () {
    return {
      posthotel: [
        {
          type: [],
          children: []
        }
      ],
      pstabindex: 0,
      lisindextab: false,
      arrs: []
    }
  },
  async mounted () {
    // 发送请求获取列表数据
    const res = await this.$axios({
      url: '/posts/cities'
    })
    // console.log(res)
    this.posthotel = res.data.data
  },
  methods: {
    lisind () {
      this.lisindextab = false
    },
    // 点击推荐城市子项搜索对应的数据
    citysearch (name) {
      this.arrs = this.postList.filter((e) => {
        if (e.city.name.includes(name)) {
          return true
        } else {
          return false
        }
      })
      this.$emit('postlistAside', this.arrs)
    },
    selectStyle (index) {
      this.pstabindex = index
      this.lisindextab = index + 1
    }
  }
}
</script>

<style lang='less' scoped>
.postSearch {
  width: 260px;
  position: relative;
  .list {
    width: 261px;
    > ul {
      border-bottom: 1px solid #ccc;
      .lisindextab {
        border-right: 1px solid #fff;
        > i {
          color: darkorange;
        }
        color: darkorange;
        border-right: 1px solid #fff;
      }
      > li {
        box-sizing: border-box;
        padding: 0 20px;
        width: 100%;
        display: flex;
        position: relative;
        z-index: 3;
        justify-content: space-between;
        align-items: center;
        height: 40px;
        border: 1px solid #ccc;
        border-bottom: none;
        font-size: 14px;
        > i {
          font-size: 20px;
          color: #ccc;
        }
      }
    }
  }
  &:hover {
    > .pschildren {
      display: block;
    }
  }
  .pschildren {
    display: none;
    position: absolute;
    z-index: 1;
    left: 260px;
    top: 0;
    border: 1px solid #ccc;
    width: 380px;
    background-color: #fff;
    box-sizing: border-box;
    padding: 5px 15px;
    > ul {
      > li {
        height: 40px;
        line-height: 40px;
        display: flex;
        align-items: center;
        span:nth-child(1) {
          font-size: 24px;
        }
        span:nth-child(1),
        span:nth-child(2) {
          color: darkorange;
          padding-right: 15px;
        }
        span:nth-child(3) {
          color: #999;
        }
        span:nth-child(2),
        span:nth-child(3) {
          cursor: pointer;
          font-size:14px;
          &:hover {
            text-decoration: underline;
          }
        }
      }
    }
  }
}
</style>
