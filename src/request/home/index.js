import http from '../http.js';

// get请求
let getvip = (params) => {
    return http({
        url: '/grade/grade',
        params
    }) 
}

// post请求
let addvip = (data) => {
    return http({
        method: 'POST',
        url: '/grade/grade',
        data
    })
}

export default {
    getvip,
    addvip
}