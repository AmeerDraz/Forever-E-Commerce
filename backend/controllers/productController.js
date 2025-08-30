
import { v2 as cloudinary } from "cloudinary";
import productModel from "../models/productModel.js";

// إضافة منتج جديد
const addProduct = async (req, res) => {
    try {
        const {
            name,
            description,
            price,
            category,
            subCategory,
            sizes,
            bestseller,
        } = req.body;

        const image1 = req.files.image1 && req.files.image1[0];
        const image2 = req.files.image2 && req.files.image2[0];
        const image3 = req.files.image3 && req.files.image3[0];
        const image4 = req.files.image4 && req.files.image4[0];

        const images = [image1, image2, image3, image4].filter(
            (item) => item !== undefined
        );

        const imagesUrl = await Promise.all(
            images.map(async (image) => {
                const result = await cloudinary.uploader.upload(image.path, {
                    resource_type: "image",
                });
                return result.secure_url;
            })
        );

        const productData = {
            name,
            description,
            price: Number(price),
            category,
            subCategory,
            bestseller: bestseller === "true",
            sizes: JSON.parse(sizes),
            images: imagesUrl,
            date: Date.now(),
        };

        const product = new productModel(productData);
        await product.save();

        res.json({
            success: true,
            message: "Product added successfully",
            product,
        });
    } catch (error) {
        console.log(error);
        res.json({ success: false, message: error.message });
    }
};

// جلب كل المنتجات
const listProducts = async (req, res) => {
    try {
        const products = await productModel.find({});
        res.json({ success: true, products });
    } catch (error) {
        console.log(error);
        res.json({ success: false, message: error.message });
    }
};

// حذف منتج
const removeProduct = async (req, res) => {
    try {
        await productModel.findByIdAndDelete(req.body.id);
        res.json({ success: true, message: "Product removed" });
    } catch (error) {
        console.log(error);
        res.json({ success: false, message: error.message });
    }
};

// جلب منتج مفرد مع التقييمات ومتوسط التقييم
const singleProduct = async (req, res) => {
    try {
        const { productId } = req.body;
        const product = await productModel.findById(productId);

        if (!product)
            return res
                .status(404)
                .json({ success: false, message: "Product not found" });

        const avgRating =
            product.reviews.length > 0
                ? product.reviews.reduce((sum, r) => sum + r.rating, 0) /
                  product.reviews.length
                : 0;

        res.json({
            success: true,
            product,
            avgRating,
            reviews: product.reviews,
        });
    } catch (error) {
        console.log(error);
        res.json({ success: false, message: error.message });
    }
};

// const addReviewToProduct = async (req, res) => {
//     try {
//         const { productId, rating, comment } = req.body;
//         console.log('amm',req.user)
//         const userId = req.user._id;


//         const product = await productModel.findById(productId);
//         if (!product)
//             return res
//                 .status(404)
//                 .json({ success: false, message: "Product not found" });

//         // إضافة التقييم داخل المصفوفة
//         product.reviews.push({ user: userId, rating, comment });
//         await product.save();

//         // حساب متوسط التقييم
//         const avgRating =
//             product.reviews.length > 0
//                 ? product.reviews.reduce((sum, r) => sum + r.rating, 0) /
//                   product.reviews.length
//                 : 0;

//         res.status(201).json({
//             success: true,
//             reviews: product.reviews,
//             avgRating,
//         });
//     } catch (error) {
//         console.log(error);
//         res.status(400).json({ success: false, message: error.message });
//     }
// };

const addReviewToProduct = async (req, res) => {
    try {
        const { productId, rating, comment, userId } = req.body; // استخدم userId من req.body

        const product = await productModel.findById(productId);
        if (!product)
            return res
                .status(404)
                .json({ success: false, message: "Product not found" });

        // إضافة التقييم
        product.reviews.push({ user: userId, rating, comment });
        await product.save();

        const avgRating =
            product.reviews.length > 0
                ? product.reviews.reduce((sum, r) => sum + r.rating, 0) /
                  product.reviews.length
                : 0;

        res.status(201).json({
            success: true,
            reviews: product.reviews,
            avgRating,
        });
    } catch (error) {
        console.log(error);
        res.status(400).json({ success: false, message: error.message });
    }
};


export {
    addProduct,
    listProducts,
    removeProduct,
    singleProduct,
    addReviewToProduct,
};
