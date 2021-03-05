import express from 'express';
import bodyParser from 'body-parser';
import cookieParser from 'cookie-parser';
import compress from 'compression';
import cors from 'cors'
import helmet from 'helmet'
import Template from '../template';
import userRoutes from './routes/user.routes'
import authRoutes from './routes/auth.routes'

/**
 * Express application
 */
const app = express();
// configure express

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(compress());
app.use(helmet());
app.use(cors());
// Mount Routes
app.use('/', userRoutes);
app.use('/', authRoutes);
app.get('/', (req, res) => {
    res.status(200).send(Template())
})

/**
 * @name ErrorHandler
 * @function ErrorHandler
 * Handles authentication errors for JWT.
 * @private
 */
app.use((err, req, res, next) => {
    if (err.name === 'UnauthorizedError') {
        res.status(401).json({ "error": err.name + ":" + err.message })

    } else if (err) {
        res.status(400).json({ "error": err.name + ":" + err.message })
        console.log(err)

    }
})
export default app