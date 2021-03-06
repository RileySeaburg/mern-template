import express from 'express';
import path from 'path'
import bodyParser from 'body-parser';
import cookieParser from 'cookie-parser';
import compress from 'compression';
import cors from 'cors'
import helmet from 'helmet'
import Template from '../template';
import userRoutes from './routes/user.routes'
import authRoutes from './routes/auth.routes'
import devBundle from './devBundle'

/**
 * @type {middleware} for serving static files
 */
const CURRENT_WORKING_DIR = process.cwd();

/**
 * Express application
 */
const app = express();
// configure express
/******
 * @type {middleware} for development use only.
 */
devBundle.compile(app)
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(compress());
app.use(helmet());
app.use(cors());
// Mount Routes
app.use('/dist', express.static(path.join(CURRENT_WORKING_DIR, 'dist')))
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