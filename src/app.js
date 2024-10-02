import express from 'express'
import config from './config'
import users_routes from './routes/users.routes'
import articles_routes from './routes/articles.routes'
import answers_routes from './routes/answers.routes'
import article_categories_routes from './routes/article_categories.routes'
import article_coauthors_routes from './routes/article_coauthors.routes'
import article_views_routes from './routes/article_views.routes'
import categories_routes from './routes/categories.routes'
import project_categories_routes from './routes/project_categories.routes'
import questions_routes from './routes/questions.routes'
import research_projects_routes from './routes/research_projects.routes'
import resource_categories_routes from './routes/resource_categories.routes'
import resource_categories_map_routes from './routes/resource_categories_map.routes'
import resource_coauthors_routes from './routes/resource_coauthors.routes'
import resources_routes from './routes/resources.routes'
import roles_routes from './routes/roles.routes'


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

app.use(users_routes)
app.use(articles_routes)
app.use(answers_routes)
app.use(article_categories_routes)
app.use(article_coauthors_routes)
app.use(article_views_routes)
app.use(categories_routes)
app.use(project_categories_routes)
app.use(questions_routes)
app.use(research_projects_routes)
app.use(resource_categories_routes)
app.use(resource_categories_map_routes)
app.use(resource_coauthors_routes)
app.use(resources_routes)
app.use(roles_routes)

export default app