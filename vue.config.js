module.exports = {
    devServer: {
        // local blockchain node
        proxy: {
            '/get/*': {
                target: 'http://localhost:8080',
                changeOrigin: true,
            },
            '/run/*': {
                target: 'http://localhost:8080',
                changeOrigin: true,
            },
            '/add/*': {
                target: 'http://localhost:8080',
                changeOrigin: true,
            },
            '/post/*': {
                target: 'http://localhost:8080',
                changeOrigin: true,
            }
        },
        port: 4001
    }
}