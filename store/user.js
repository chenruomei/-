//搭建仓库，用来存储用户的数据
    //export const state={}固定格式
//获取仓库中已有的数据
    //this.$store.state可以获取所有的仓库下的数据
//存储修改仓库中的数据

export const state=function(){
  return {
    userInfo:{},
  }
};

//使用这个来修改state数据
//第一个参数固定，第二个参数不固定(可传可不传)，同步修改
export const mutations={
  setUserInfo(state,data){
    state.userInfo=data;
  //  console.log(" state.userInfo", state.userInfo); 
  },
};

//actions可以用来存放一些公共的方法，多个组件或者项目通用的方法
//也可以调用mutations来修改state
export const actions={
  //登录
  login(store,data){
   //请求登录接口
  return this.$axios({
    url:"/accounts/login",
    method:"POST",
   data:data,
  }).then(res=>{
    const {data}=res
    store.commit('setUserInfo', data);
    return data;
  });
  },

//，，，发送手机验证
SendCaptcha(store,tel) {
  return this.$axios({
    url:'/captchas',
    method:"POST",
    data:{
      tel
    },
  }).then(res=>{
    const {code}=res.data;
    return code;
  });
},

//注册

RegSubmit(store,data){
  this.$axios({
    url:'/accounts/register',
     method:"POST",
     data
  }).then(res=>{
    const {data}=res
    store.commit('setUserInfo', data);
    return data;
  });
},

};