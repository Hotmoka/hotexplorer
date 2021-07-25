module.exports = {
    devServer: {
        // local blockchain node
        proxy: 'http://localhost:8080/api',
        port: 4001
    }
}