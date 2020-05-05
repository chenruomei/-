<template>
  <div class="postSerach">
    <div class="serach">
      <input ref="inpi" type="text" placeholder="请输入想去的地方，比如：'广州'">
      <i @click="postsearch" class="el-icon-search" />
    </div>
    <div class="serachtuijian">
      <span>推荐：</span>
      <a @click="postListA('广州')" href="#">广州</a>
      <a @click="postListA('上海')" href="#">上海</a>
      <a @click="postListA('北京')" href="#">北京</a>
    </div>
  </div>
</template>

<script>
export default {
  props: ['postList'],
  data () {
    return {
      arrs: []
    }
  },
  mounted () {
    console.log(this.postList)
  },
  methods: {
    // 点击搜索图标
    postsearch () {
      // console.log(this.$refs.inpi.value)
      if (this.$refs.inpi.value) {
        this.arrs = this.postList.filter((e) => {
          if (e.city.name.includes(this.$refs.inpi.value)) {
            return true
          } else {
            return false
          }
        })
        this.$emit('postlistsearch', this.arrs)
        // console.log(this.arrs)
      } else {
        this.$emit('postlistsearch', this.postList)
      }
    },
    // 点击推荐城市
    postListA (name) {
      // console.log(this.postList)
      this.arrs = this.postList.filter((e) => {
        if (e.city.name.includes(name)) {
          return true
        } else {
          return false
        }
      })
      console.log(this.arrs)
      this.$emit('postlistsearch', this.arrs)
    }
  }
}
</script>

<style lang='less' scoped>
.postSerach {
  width: 100%;
  .serach {
    width: 100%;
    position: relative;
    color: rgb(255, 165, 0);
    margin-bottom: 5px;
    > i {
      position: absolute;
      top: 5px;
      right: 10px;
      font-size: 28px;
      cursor: pointer;
    }
    input {
      width: 100%;
      padding-left: 20px;
      display: block;
      outline: none;
      border: none;
      border: 3px solid rgb(255, 165, 0);
      height: 40px;
      box-sizing: border-box;
    }
  }
  .serachtuijian {
    color: #666;
    font-size: 13px;
    padding: 5px 0 10px 0;
    a {
      &:hover {
        color: rgb(255, 165, 0);
        text-decoration: underline;
      }
    }
  }
}
</style>
