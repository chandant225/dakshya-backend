const Category = require("../models/category_Schema");
const Product = require("../models/product_Schema");


const get_Product = (req, res) => {
  Product.find()
    .then((productData) => {
      res.status(200).json({ productData });
    })
    .catch((err) => {
      console.log(err);
    });
};

const add_Product = (req, res) => {
  let filesArray = [];
  req.files.forEach((element) => {
    const file = {
      fileName: element.filename,
      filePath: element.path,
      fileType: element.mimetype,
      // fileSize: fileSizeFormatter(element.size, 2),
    };
    filesArray.push(file);
  });
  const { mark_price, discount } = req.body;
  const Addproduct = new Product({
    category: req.body.category,
    name: req.body.name,
    mark_price: req.body.mark_price,
    discount: req.body.discount,
    price: mark_price - (discount / 100) * mark_price,
    images: filesArray,
    description:req.body.description
  });
  Addproduct.save()
    .then((issaved) => {
      res.json({ message: "new product uploaded successfully" });
    })
    .catch((err) => {
      console.log(err);
    });
};

const add_Categories = (req, res) => {
  const add_category = new Category({
    name: req.body.name,
    description: req.body.description,
  });
  add_category
    .save()
    .then((isSaved) => {
      res.status(200).json({ message: "new category inserted successfully" });
    })
    .catch((err) => {
      console.log(err);
    });
};

const get_categories = (req, res) => {
  Category.find()
    .then((isFound) => {
      res.status(200).json({ categories: isFound });
    })
    .catch((err) => {
      console.log(err);
    });
};

const get_single_product = (req, res) => {
   var {title} = req.params
  Product.findOne({ name: title})
    .then((isfound) => {
      res.status(200).json({ data: isfound });
    })
    .catch((err) => {
      console.log(err);
    });
};

const get_category_desc = (req, res) => {
  var { category_id } = req.params;
  Category.findOne({ _id: category_id })
    .then((isfound) => {
      res.status(200).json({ data: isfound });
    })
    .catch((err) => {
      console.log(err);
    });
};

const get_related_products= (req, res) => {
  var { category_id } = req.params;
  Product.find({ category: category_id })
    .then((isfound) => {
      res.status(200).json({ data: isfound });
    })
    .catch((err) => {
      console.log(err);
    });
};

module.exports = {
  add_Product,
  add_Categories,
  get_categories,
  get_Product,
  get_single_product,
  get_category_desc,
  get_related_products,
};
