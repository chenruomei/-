//机票的数据
export const state=function(){
  return {
  searchList:[],//历史查询
  flightData:{
    seat_infos: {}
  },//选中机票的数据
  allPrice:'',//总价格
  }
}

//同步修改state的数据
export const mutations={
  //存储历史查询的数据
  setSearchList(state,data){
    //把新查询的数据追加到第一个
    state.searchList.unshift(data);
    //如果历史记录长度大于5
    if(state.searchList.length>5){
      state.searchList.length=5;//把第5条之后的数据都删除了，保存前5位
    }
  },
  //存储选中机票的数据
  setFlightData(state,data){
    state.flightData = data;
  },
  //存储总价格
  setAllPrice(state,data){
state.allPrice=data;
  }
}
