module.exports = {
    devServer: {
        proxy: {
            '/postapi': {
                target: 'http://39.99.218.252:8080',
                changeOrigin: true,
                ws: true,
                pathRewrite: {
                    '^/postapi': ''
                }
            }
        }
    }
}