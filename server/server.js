import config from './../config/config'
import mongoose from 'mongoose';
import app from './express.js'
/**
 * @file Server.js is the route file for this application.
 * @type server
 *  
 */
mongoose.Promise = global.Promise;
mongoose.connect(config.mongoUri, {
  useNewUrlParser: true,

  useCreateIndex: true, useUnifiedTopology: true,
})
mongoose.connection.on('error', () => {
  throw new Error(`unable to connect to database: ${config.mongoUri}`);
})

console.log(config.mongoUri)

app.listen(config.port, (err) => {
  if (err) {
    console.log(err)
  }
  console.info('Server started on port %s.', config.port)
})