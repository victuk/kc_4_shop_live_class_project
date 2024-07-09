const express = require("express");
const jwt = require("jsonwebtoken");
const { productModel } = require("../models/productModel");
const productRouter = express.Router();


function checkIfLoggedIn (req, res, next) {

    const authToken = req.headers.authorization.split(" ");
    const strategy = authToken[0];
    const tokenItself = authToken[1];

    if (!authToken) {
        res.status(403).send({
            message: "No token present"
        });
        return;
    }

    if(strategy == 'Bearer') {
        const userDetails = jwt.verify(tokenItself, process.env.AUTH_KEY);

        req.userDetails = userDetails;

        next();

    } else {
        res.status(403).send({
            message: "Invalid auth strategy"
        });
    }
}


async function checkBeforeDelete(req, res, next) {
    const product = await productModel.findById(req.params.id);

    if((req.userDetails.userId).toString() == (product.productOwner).toString()) {
        next();
    } else {
        res.status(401).send({
            message: "You can not delete this because you are not the owner of the product"
        });
    }

}

productRouter.use(checkIfLoggedIn);

productRouter.get('/products', async (req, res) => {
    const products = await productModel.find({productOwner: req.userDetails.userId});

    res.send({products});
});

productRouter.post("/product", async (req, res) => {
    const newProduct = await productModel.create({
        name: req.body.name,
        description: req.body.description,
        price: req.body.price,
        productOwner: req.userDetails.userId
    });

    res.send({newProduct});

});


productRouter.delete("/:id", checkBeforeDelete, async (req, res) => {
    await productModel.findByIdAndDelete(req.params.id);
    res.send({
        message: "Product has been deleted successfully"
    });
});

module.exports = productRouter;