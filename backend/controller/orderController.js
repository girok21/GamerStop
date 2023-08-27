import asyncHandler from "../middleware/asyncHandler.js";
import Order from "../models/orderModel.js";

//@desc Create new order
//@route POST /api/orders
//@access Private 
const addOrderItems = asyncHandler(async (req, res)=>{
    const {
        orderItems,
        shippingAddress,
        paymentMethod,
        itemsPrice,
        taxPrice,
        shippingPrice,
        totalPrice,
    } = req.body;

    if(orderItems && orderItems.length === 0){
        res.status(400);
        throw new Error('No order items found');
    }else{
        const order = new Order({
            orderItems: orderItems.map((item)=> ({
                ...item,
                product: item._id,
                _id: undefined
            })),
            shippingAddress,
            paymentMethod,
            itemsPrice,
            taxPrice,
            shippingPrice,
            totalPrice,
        });
        const createOrder = await order.save();
        res.status(201).json(createOrder);
    }

});

//@desc Get logged in user orders
//@route GET /api/orders/myorders
//@access Private 
const getMyOrders = asyncHandler(async (req, res)=>{
    const orders = await Order.find({ user: req.user._id });
    res.status(200).json(orders);
});

//@desc Get order by id
//@route POST /api/orders/:id
//@access Private 
const getOrderByID = asyncHandler(async (req, res)=>{
    const order = await Order.find({ product: req.params.id });
    // .populate('user', 'name email');
    console.log(order);
    if(order){
        res.status(200).json(order);
    }else{
        res.status(404);
        throw new Error('Order not found');
    }
});

//@desc Update order to paid
//@route PUT /api/orders/:id/pay
//@access Private 
const updateOrderToPaid = asyncHandler(async (req, res)=>{
    res.send('update order to paid');
});

//@desc Update to delivered
//@route PUT /api/orders/:id/deliver
//@access Private/Admin
const updateOrderToDelivered = asyncHandler(async (req, res)=>{
    res.send('update order to delivered');
});


//@desc Get all orders
//@route GET /api/orders
//@access Private/Admin
const getOrders = asyncHandler(async (req, res)=>{
    res.send('get all orders');
});

export {
    getOrders,
    updateOrderToDelivered,
    updateOrderToPaid,
    getMyOrders,
    getOrderByID,
    addOrderItems
};