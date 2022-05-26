class Api {
    constructor(products) {
        this.products = products;
    }

    getAll(req, res) {
        res.json({products: this.products});
        console.log(this.products.length);
    }

    getProduct(req, res) {
        const product = this.products.find(elem => elem.id === Number(req.params.id))
        const productIndex = this.products.findIndex(elem => elem.id === Number(req.params.id))
        console.log(productIndex);

        if (product) {
            res.json({product})
        } else {
            res.status(404).json({error: "Not found"})
        }
    }

    postProduct(req, res) {
        const newProduct = req.body;

        if (newProduct.title && newProduct.price && newProduct.thumbnail && Object.keys(newProduct).length === 3) {
            const longitud = this.products.length;
            longitud ? newProduct.id = this.products[longitud - 1].id + 1 : newProduct.id = 1 ;
            this.products.push(newProduct);
            res.redirect(301, '/api/products')
        } else {
            return res.status(400).send({ error: "Not found" });
        }
    }

    putProduct(req, res) {
        const prodMod = req.body;

        const format = prodMod.title && prodMod.price && prodMod.thumbnail && 
        Object.keys(prodMod).length === 3 ? true : null;

        const prodIndex = this.products.findIndex(elem => elem.id === Number(req.params.id))
        const product = this.products.find(elem => elem.id === Number(req.params.id));

        if (format && product) {
            prodMod.id = this.products[prodIndex].id;
            this.products[prodIndex] = prodMod;
            return res.send("Product modified");
        } 
    
        if (!product) {
            return res.status(404).send({error: "Not found"})
        }

        if (!format) {
            res.send({error: "Something go wrong, please try again"})
        }
    }

    deleteProduct(req, res) {
        const prodIndex = this.productos.findIndex(elem => elem.id === Number(req.params.id));

        if (prodIndex < 0) {
            return res.status(404).send({error: "Not found"})
        }

        this.products.splice(prodIndex, 1);
        res.send("Product deleted");
    }
}

module.exports = Api;
