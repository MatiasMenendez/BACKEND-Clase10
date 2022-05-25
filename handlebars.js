const express = require('express')
const { Router } = express;
const app = express()
const router = Router()
const Api = require("./api.js");

const { engine } = require('express-handlebars')

const engineFn = engine({
    extname: '.hbs',
    defaultLayout: `${__dirname}/views/index.hbs`,
    layoutsDir: `${__dirname}/views/layouts`,
})

app.engine('hbs', engineFn)
app.set('views', './views')
app.set('view engine', 'hbs')

let products = [
    {
        title: "Yerba mate",
        price: 100,
        thumbnail: "https://http2.mlstatic.com/D_NQ_NP_2X_813618-MLA46121646793_052021-F.webp",
        id: 1
    }, 
    {
        title: "Mate de calabaza",
        price: 300,
        thumbnail: "https://http2.mlstatic.com/D_NQ_NP_702437-MLA48733352973_012022-O.webp",
        id: 2
    },
    {
        title: "Bombilla",
        price: 50,
        thumbnail: "https://http2.mlstatic.com/D_NQ_NP_898479-MLA45731292464_042021-O.webp",
        id: 3
    },
    {
        title: "Mate de plastico",
        price: 200,
        thumbnail: "https://http2.mlstatic.com/D_NQ_NP_796640-MLA43965840273_112020-O.webp",
        id: 4
    },
];


const PORT = 8080

const server = app.listen(PORT, () => {
    console.log(`Server listening in ${PORT}`)
})

server.on('error', error => console.log(`Error in server: ${error}`))

const productsApi = new Api(products);

app.get('', (req, res) =>{
    const data ={products}
    return res.render('layouts/main', data)
})

router.get('/products', (req, res) => {
    res.render("products", { products: products })
 })


router.post('/products', (req, res) => {
    return productsApi.postProduct(req, res)
 })


app.get("/", (req, res) => {
    res.sendFile(__dirname + "/index.html");
});










app.use('/api', router);