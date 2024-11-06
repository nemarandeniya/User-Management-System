const Customer = require("../models/customer");
const mongoose = require("mongoose");


//GET home page
exports.homepage = async (req, res) => {

    const messages = await req.flash("info");

    const locals = {
        title: 'Node crud oparetions',
        description: 'CRUD operations using Node and express'
    }
    let perPage = 12;
    let page = req.query.page || 1;

    try {
        const customers = await Customer.aggregate([{ $sort: { createdAt: -1 } }])
            .skip(perPage * page - perPage)
            .limit(perPage)
            .exec();
        // Count is deprecated. Use countDocuments({}) or estimatedDocumentCount()
        // const count = await Customer.count();
        const count = await Customer.countDocuments({});

        res.render("index", {
            locals,
            customers,
            current: page,
            pages: Math.ceil(count / perPage),
            messages,
        });
    } catch (error) {
        console.log(error);
    }

}

//GET about page
exports.about = async (req, res) => {
    const locals = {
        title: 'About',
        description: 'CRUD operations using Node and express'
    }
    try {
        res.render('about', locals)
    } catch (error) {
        console.log(error);
    }
};



//GET add customer
exports.addcustomer = async (req, res) => {
    const locals = {
        title: 'Add New Customer',
        description: 'Add New Customer'
    }


    res.render('customer/add', locals)
}

//POST Create New Customer
exports.postcustomer = async (req, res) => {
    console.log(req.body);

    const newCustomer = new Customer({
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        details: req.body.details,
        tel: req.body.tel,
        email: req.body.email,
    });


    try {
        await Customer.create(newCustomer);
        await req.flash("info", "New customer has been added.");

        res.redirect("/");
    } catch (error) {
        console.log(error);
    }
}

//GET Customer data
exports.view = async (req, res) => {
    try {
        const customer = await Customer.findOne({ _id: req.params.id });

        const locals = {
            title: "View Customer Data",
            description: "Free NodeJs User Management System",
        };

        res.render("customer/view", {
            locals,
            customer,
        });
    } catch (error) {
        console.log(error);
    }
};

//GET Edit customer data
exports.edit = async (req, res) => {
    try {
        const customer = await Customer.findOne({ _id: req.params.id });

        const locals = {
            title: "Edit Customer Data",
            description: "Free NodeJs User Management System",
        };

        res.render("customer/edit", {
            locals,
            customer,
        });
    } catch (error) {
        console.log(error);
    }
};

//PUT Update Customer data
exports.editPost = async (req, res) => {
    try {
        await Customer.findByIdAndUpdate(req.params.id, {
            firstName: req.body.firstName,
            lastName: req.body.lastName,
            tel: req.body.tel,
            email: req.body.email,
            details: req.body.details,
            updatedAt: Date.now(),
        });
        await res.redirect(`/edit/${req.params.id}`);

        console.log("redirected");
    } catch (error) {
        console.log(error);
    }
};

//Delete Customer data
exports.deleteCustomer = async (req, res) => {
    try {
        await Customer.deleteOne({ _id: req.params.id });
        res.redirect("/");
    } catch (error) {
        console.log(error);
    }
};