let url

if (process.env.NODE_ENV == "development") {
    // 开发环境中
    url = "http://192.168.4.30/api/"
} else {
    // 生产环境中
    url = "http://47.245.30.4:8086/api/"
}

export default {
    url
}
