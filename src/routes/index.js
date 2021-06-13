
const productsRouter = require('./products');
const siteRouter = require('./site');

function route(app){
    //The productRouter is executed for any type of HTTP request on the /products
    app.use('/products', productsRouter);
    
    app.use('/', siteRouter);
}

module.exports = route;