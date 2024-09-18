import app from './app'
//import con from './database/connection'

app.listen(app.get('PORT'))

console.log('Servidor en puerto', app.get('PORT'))