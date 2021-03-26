module.exports = (app) => {
    app.use((req, res, next) => {
        console.log('log middleware');
        req['NuynObject'] = true;
        next();
    });
    app.use('/users', require('./routers/users'));
    app.use('/posts', require('./routers/posts'));
    app.use('/', require('./routers/index'));
    app.use((req, res) => {
        res.end('route not found');
    });
}
