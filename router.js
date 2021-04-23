module.exports = (app) => {
    app.use((req, res, next) => {
        console.log('log middleware');
        req['NuynObject'] = true;
        next();
    });
    app.use('/auth', require('./routers/auth'));
    app.use('/news', require('./routers/news'));
    app.use('/categories', require('./routers/categories'));
    app.use('/users', require('./routers/users'));
    app.use('/posts', require('./routers/posts'));
    app.use('/upload', require('./routers/upload'));
    app.use('/', require('./routers/index'));
    app.use((req, res) => {
        res.end('route not found');
    });
}
