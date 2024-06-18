export default {
    base:
        process.env.NODE_ENV === 'development'
            ? '/'
            : '/highcharts-reproduction/',
    root: 'src',
    build: {
        outDir: '../dist',
    },
}
