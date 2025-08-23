import express from "express";
import adminAuth from "./../middleware/adminAuth.js";
import authUser from "../middleware/auth.js";
import {
    PlaceOrder,
    PlaceOrderStripe,
    PlaceOrderPaypal,
    allOrders,
    userOrders,
    updateStatus,
} from "../controllers/orderController.js";

const orderRouter = express.Router();

// Admin Features
orderRouter.post("/list", adminAuth, allOrders);
orderRouter.post("/status", adminAuth, updateStatus);

// Payment Features
orderRouter.post("/place", authUser, PlaceOrder);
orderRouter.post("/stripe", authUser, PlaceOrderStripe);
orderRouter.post("/paypal", authUser, PlaceOrderPaypal);

// User Features
orderRouter.post("/userorders", authUser, userOrders);

export default orderRouter;
