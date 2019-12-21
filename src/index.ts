import app from './app';
import {conexionDB} from './database';

let main = async () => {
    conexionDB();
    await app.listen(app.get('port'));
    console.log('servidor en el puerto', app.get('port'));
}

main();