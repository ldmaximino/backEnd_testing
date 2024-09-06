//Third party imports
import express from "express";
import handlebars from "express-handlebars";
import cookieParser from "cookie-parser";
import session from "express-session";
import MongoStore from "connect-mongo";
import swaggerJSDoc from "swagger-jsdoc"; //swaggerJSDoc allows you to document in nodejs
import swaggerUI from "swagger-ui-express"; //swaggerUI manages the graphical interface of the documentation

//Local imports
import { errorHandler } from "./middlewares/error_handler.js";
import { __dirname } from "./utils/utils.js";
import { initSocketServer } from "./socket_server.js";
import { PORT, URI_MONGODB_ATLAS, URI_MONGODB_LOCAL, SECRET_KEY } from './config/config.js';
import passport from 'passport';
import './passport/local_strategy.js';
import './passport/github_strategy.js';
import './passport/current_strategy.js';
import MainRouter from './routes/index_router.js';
import { logger } from "./utils/logger.js";
import { info } from './docs/info.js';
const mainRouter = new MainRouter();

const specs = swaggerJSDoc(info);

//Store Config definition
const storeConfig = {
  store: MongoStore.create({
    mongoUrl: URI_MONGODB_ATLAS || URI_MONGODB_LOCAL,
    crypto: { secret: SECRET_KEY },
    ttl: 180,
    autoRemove: "interval",
    autoRemoveInterval: 5, //delete expired sessions in mongodb every 5 minutes
  }),
  secret: SECRET_KEY,
  resave: true,
  saveUninitialized: true,
  cookie: { maxAge: 180000 },
};

//app express
const app = express();

//Middlewares
app.use('/docs', swaggerUI.serve, swaggerUI.setup(specs));
app.use(express.static(__dirname + "/public"));
app.use('/cart', express.static(__dirname + '/public')); // I had to add this middleware so that the /cart/:cid path takes the css file. If you comment on this line you will see that the cart css does not work
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(session(storeConfig));


//Handlebars Engine Definition
app.engine("hbs", handlebars.engine({ extname: "hbs" }));
app.set("views", __dirname + "/views");
app.set("view engine", "hbs");

//Passport Initialize
app.use(passport.initialize());
app.use(passport.session());

//Routers
app.use("/", mainRouter.getRouter());

//Manage Errors
app.use(errorHandler);

const httpServer = app.listen(PORT, () => {
  logger.info(`Server running on http://localhost:${PORT} 🚀🚀🚀🚀`);
});

// Initialize socket server
initSocketServer(httpServer);
