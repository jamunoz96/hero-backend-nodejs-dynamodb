import { port } from './config';
const app = require('./app');
import {migrations} from './db/migrations';

app
  .listen(port, () => {
    console.info(`server running on port : ${port}`);
    migrations.run();
  })
  .on('error', (e: any) => console.error(e));