module.exports = {
    devServer: {
        open: true,
        proxy: {
            '/postapi': {
                target: 'http://39.99.218.252:8080',
                changeOrigin: true,
                ws: true,
                pathRewrite: {
                    '^/postapi': ''
                }
            },
            // '/centerapi': {
            //     target: 'http://47.115.28.231:8091',
            //     changeOrigin: true,
            //     ws: true,
            //     pathRewrite: {
            //         '^/centerapi': ''
            //     }
            // }
        }
    }
}