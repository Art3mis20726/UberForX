import express from "express"
import cors from"cors"
import cookieParser from "cookie-parser"
import bodyParser from "body-parser"
import consolidate from "consolidate";
const app= express()
app.use(cors({
    origin:process.env.CORS_ORIGIN,
    credentials:true
}))
app.use(express.json({
    limit:"1000kb"
}))
app.use(bodyParser.urlencoded({
    extended:true,limit:"1000kb"
}))
//This is for accesstoken and  refresh token to stay in req
app.use(cookieParser())
//For routing to the user routes
app.set('views', 'views');// app to look for HTML files inside the views folder
app.use('/images/cop.png', express.static('public/images/cop.png'));app.set('view engine', 'html');//application to use the handlebars template engine to parse any html files.
app.use('/images/civilian.png', express.static('public/images/civilian.png'));app.set('view engine', 'html');//application to use the handlebars template engine to parse any html files.
app.engine('html', consolidate.handlebars);
import copRouter from "./routes/cops.routes.js"
import userRouter from "./routes/user.routes.js"
app.use("/api/v1/cops",copRouter)//For cops  
app.use("/api/v1/users",userRouter)
export default app 