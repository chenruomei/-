<template>
  <div>
     <!-- 头部组件 -->
    <Header/>
    <!-- 内容占位组件 -->
    <nuxt />
    <!-- 页脚组件 -->
    <Footer/>
  </div>
</template>
<script>
// 导入头部组件
import Header from "@/components/header.vue";
// 导入页脚组件
import Footer from "@/components/footer.vue";
export default {
  components:{
    Header,
    Footer
  },// components
};///
</script>
<style>
*{
  margin:0; 
  padding:0;
}
ul, li, ol{
  list-style:none;
}
a{
  text-decoration:none;
  color:inherit;
}
a:hover{
color: aliceblues;
}
em,i{
  font-style: normal;
}
</style>
