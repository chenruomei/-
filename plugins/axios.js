import {Message} from "element-ui";

export default function(nuxt){
   nuxt.$axios.onError(err => {
        const {statusCode, message} = err.response.data;
        
        // 还未使用
        // if(statusCode === 401 || statusCode === 403){
        //     Message.warning({message: "请先登录"});
        //     redirect("/user/login");
        // }

        if(statusCode === 400){
            Message.warning({message});
        }
        if(statusCode === 403){
            Message.error("当前没用登录，请重新登录");
            nuxt.redirect("/user/login");
        }
    })
}