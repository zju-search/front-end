module.exports = {
    devServer: {
        proxy: {
            '/api': {
                target: '39.99.218.252:7000',
                changeOrigin: true,
                ws: true,
                pathRewrite: {
                    '^/api': ''
                }
            }
        }
    }
}