const cds = require('@sap/cds');

module.exports = cds.service.impl(async function () {
    const { Product } = this.entities;

    // CREATE Product
    this.before("CREATE", Product, async (req) => {
        const query2 = SELECT.from(Product).where({ product_id: req.data.product_id });
        const result1 = await cds.run(query2);
        if (result1.length > 0) {
            req.error({
                code: "PRODUCTIDEXISTS",
                message: "Product id already exists",
                target: "product_id",
            });
        }

        const { product_cost, product_sell } = req.data;
        if (product_sell <= product_cost) {
            req.error({
                code: "INVALIDSELL",
                message: "Selling price cannot be less than or equal to cost price",
                target: "product_sell",
            });
        }
    });

    

    



});