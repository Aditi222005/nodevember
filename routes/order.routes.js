import express from 'express'
import { placeOrder, getOrderHistory } from '../controller/order.controller.js'
import { protectRoute } from '../middleware/auth.middleware.js'


const orderRoutes = express.Router()

orderRoutes.post('/place-order',protectRoute, placeOrder)
orderRoutes.get('/history',protectRoute,getOrderHistory)

export default orderRoutes