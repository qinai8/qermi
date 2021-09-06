import Http from '@/src/router/Http.js';

const List = {
    // 列表
    goodslist:(data)=>{
        return Http({
            method:'get',  //方法
            params:{  //参数
                _gp : 'admin.category',
                _mt : 'queryCategory',
                ...data
            }
        })
    }
}

export default Goods