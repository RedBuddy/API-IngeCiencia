import express from 'express'
import config from './config'
import usuarios_routes from './routes/usuarios.routes'
import articulos_routes from './routes/articulos.routes'
import categorias_routes from './routes/categorias.routes'
import comentarios_routes from './routes/comentarios.routes'
import recursos_routes from './routes/recursos.routes'
import vistas_articulos_routes from './routes/vistas_articulos.routes'

const app = express()

// settings 
app.set('PORT', config.PORT)

// middlewares
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
  res.header('Access-Control-Allow-Headers', 'Content-Type');
  next();
});

app.use(usuarios_routes)
app.use(articulos_routes)
app.use(categorias_routes)
app.use(comentarios_routes)
app.use(recursos_routes)
app.use(vistas_articulos_routes)

export default app