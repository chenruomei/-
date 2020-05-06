<template>
  <div class="container">
    <el-row type="flex" justify="space-between">
      <div class="main">
        <h2>发表新攻略</h2>
        <p>分享你的个人游记，让更多人看到哦！</p>
        <el-form ref="form" :model="form">
          <el-form-item>
            <el-input v-model="form.title" placeholder="请输入标题" />
          </el-form-item>
          <el-form-item>
            <VueEditor ref="vueEditor" :config="config" style="height:450px;margin-bottom:80px" />
          </el-form-item>
          <el-form-item label="出发城市">
            <!-- fetch-suggestions 返回输入建议的方法 -->
            <!-- select 点击选中建议项时触发 -->
            <el-autocomplete
              :fetch-suggestions="getCityList"
              v-model="form.city"
              @select="selectCity"
              :trigger-on-focus="false"
              :highlight-first-item="true"
              placeholder="请搜索游玩城市"
              class="el-autocomplete"
            />
          </el-form-item>
        </el-form>
        <div class="creat-button">
          <el-button @click="addPost" type="primary" style="padding:9px 15px;font-size:12px">
            发布
          </el-button>
          <span>
            或者
            <a @click="addDraft" href="javascript:;">保存到草稿</a>
          </span>
        </div>
      </div>
      <div class="aside">
        <div class="draft-box">
          <h4 class="draft-title">
            草稿箱({{ this.$store.state.history.postList.length }})
          </h4>
          <div class="draft-list">
            <div v-for="(item,index) in draftList" :key="index" class="draft-item">
              <div @click="getDraft(index)" class="draft-post-title">
                {{ item.title }}<span class="iconfont el-icon-edit" />
              </div>
              <p>{{ item.time }}</p>
            </div>
          </div>
        </div>
      </div>
    </el-row>
  </div>
</template>

<script>
import 'quill/dist/quill.snow.css'
let VueEditor

if (process.browser) {
  VueEditor = require('vue-word-editor').default
}
export default {
  components: {
    VueEditor
  },
  data () {
    return {
      form: {
        title: '',
        content: '',
        city: ''
      },
      // draftList: [],
      id: '',
      config: {
        modules: {
          // 工具栏
          toolbar: [
            ['bold', 'italic', 'underline', 'strike'],
            [{ 'header': 1 }, { 'header': 2 }],
            ['image']
          ]
        },
        // 主题
        theme: 'snow',
        // 上传图片的配置
        uploadImage: {
          // showProgress: false,
          url: `${this.$axios.defaults.baseURL}/upload`,
          name: 'files',
          hearders: {
            Authorization: 'Bearer ' + this.$store.state.user.userInfo.token
          },
          // res是结果，insert方法会把内容注入到编辑器中，res.data.url是资源地址
          uploadSuccess: (res, insert) => {
            console.log(res)
            const file = res.data[0]
            insert(this.$axios.defaults.baseURL + file.url)
          }
        }

        // 上传视频的配置
        /* uploadVideo: {
          // showProgress: false,
          url: `${this.$axios.defaults.baseURL}/upload`,
          name: 'files',
          hearders: {
            Authorization: 'Bearer ' + this.$store.state.user.userInfo.token
          },
          uploadSuccess: (res, insert) => {
            const file = res.data[0]
            insert(this.$axios.defaults.baseURL + file.url)
          }
        } */
      }
    }
  },
  computed: {
    draftList () {
      /* this.$store.state.history.postList.forEach((element) => {
        element.time = new Date()
        element.time = moment(element.time).format('YYYY-MM-DD')
      }) */
      return this.$store.state.history.postList
    }
  },
  watch: {
    draftList () {
      return this.$store.state.history.postList
    }
  },
  methods: {
    // 获取草稿
    getDraft (index) {
      this.id = index
      console.log(this.id)
      this.form = { ...this.$store.state.history.postList[index] }
      this.$refs.vueEditor.editor.root.innerHTML = this.form.content
    },
    // 保存草稿
    addDraft () {
      this.form.content = this.$refs.vueEditor.editor.root.innerHTML
      this.$store.commit('history/addDraftList', { form: this.form, id: this.id })
      // 清空输入框
      this.form = {
        title: '',
        content: '',
        city: ''
      }
      // 清空富文本框
      this.$refs.vueEditor.editor.root.innerHTML = ''
      // 消息提示
      this.$message({
        type: 'success',
        message: '保存成功'
      })
      // 每次保存草稿就把id删除
      this.id = ''
    },
    async getCityList (value, showList) {
      // 获取真正的搜索建议
      const cityList = await this.searchCity(value)
      // 准备建议数据,然后时候 showList 回调返回到 组件当中显示
      // 为了避免用户直接输入后啥都不干,直接将输入框失去焦点
      // 可以默认将城市列表第一个 name 放入 form 当中
      // if (cityList.length > 0) {
      //   this.form.city = cityList[0].name
      // }
      showList(cityList)
    },
    searchCity (value) {
      return this.$axios({
        url: '/airs/city',
        params: {
          name: value
        }
      }).then((res) => {
        // console.log(res)
        const { data } = res.data
        const citys = data.map((element) => {
          return {
            ...element,
            // 这里我们根据name生成了value
            value: element.name
          }
        })
        // 用过滤函数将所有不带 sort 的数据去掉
        // const cityList = citys.filter(element=>{
        //   // 过滤器里面,所有合法的数据应该return true
        //   // if (element.sort) {
        //   //   return true;
        //   // }
        //   return element.sort;
        // })
        const cityList = citys.filter(element => element.sort)
        // 准备建议数据,然后时候 showList 回调返回到 组件当中显示
        return cityList
      })
    },
    selectCity (item) {
      this.form.city = item.name
    },
    // 发布文章
    addPost () {
    // 获取富文本框的内容
      this.form.content = this.$refs.vueEditor.editor.root.innerHTML
      console.log(this.form)
      // 删除this.form里的time属性
      delete this.form.time
      // 获取token
      const token = this.$store.state.user.userInfo.token

      // 如果没有 token  证明用户还没有登录,直接跳转到登录页
      if (!token) {
        this.$message({
          message: '请先登录',
          type: 'error'
        })
        this.$router.push({
          path: '/user/login'
        })
        return
      }
      // 如果输入框为空，则不发送请求
      if (this.form.title === '' || this.form.city === '') {
        this.$message({
          type: 'warning',
          message: '请填写完整'
        })
        return
      }
      // 发送请求
      this.$axios({
        url: '/posts',
        method: 'post',
        data: this.form,
        headers: {
          Authorization: 'Bearer ' + token
        }
      }).then((res) => {
        console.log(res)
        this.$message({
          type: 'success',
          message: res.data.message
        })
        this.form = {
          title: '',
          content: '',
          city: ''
        }
        this.$refs.vueEditor.editor.root.innerHTML = ''
      })
    }
  }
}
</script>

<style lang="less" scoped>
.container {
  width: 1000px;
  margin: 0 auto;
  padding: 20px 0;
  .main {
    width: 750px;
    h2 {
      font-weight: 400;
      font-size: 22px;
      margin-bottom: 10px;
    }
    p {
      font-size: 12px;
      color: #999;
      margin-bottom: 10px;
    }
    .creat-button {
      span {
        margin-left: 10px;
        font-size: 14px;
        a {
          color: orange;
          &:hover{
            text-decoration: underline
          }
        }
      }
    }
  }
  .aside {
    width: 200px;
    .draft-box {
      border: 1px solid #ddd;
      padding: 10px;
    }
    .draft-title {
      margin-bottom: 10px;
      font-weight: 400;
      color: #666;
    }
    .draft-list{
      .draft-item{
        font-size: 14px;
        margin-bottom: 5px;
        .draft-post-title{
          cursor: pointer;
          overflow: hidden;
          text-overflow:ellipsis;
          white-space: nowrap;
          &:hover{
            color: orange;
            text-decoration: underline;
          }
          span{
            margin-left: 5px;
          }
        }
        p{
          color: #999;
        }
      }
    }
  }
}
</style>
