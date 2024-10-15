const express = require("express")
const errorMiddleware = require("./middlewares/error-middleware")
const notFound = require("./middlewares/not-found")
const userRoute = require("./routes/user-route")
const productRoute = require("./routes/product-route")
const cors =require("cors")
const cartRoute = require("./routes/cart-route")
const orderRoute = require("./routes/order-route")
const app = express()
app.use(express.json())
app.use(cors())

//Import From .env
require("dotenv").config()

app.use("/", userRoute)

app.use("/user", productRoute)

app.use("/cart", cartRoute)

app.use("/order", orderRoute)

app.use("*",notFound)
app.use(errorMiddleware)

const port = process.env.PORT
app.listen(port,()=>console.log(`Server is running on ${port}`))
