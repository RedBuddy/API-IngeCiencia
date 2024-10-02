export const query = {

    // Custom querys
    select_users_byemail: 'SELECT * FROM users WHERE email = ?',
    select_users_byusername: 'SELECT * FROM users WHERE username = ?',

    select_role_byid: 'SELECT role_name FROM roles WHERE id = ?',


    // // Table users

    // // return_users_id: 'SELECT id FROM users ORDER BY id DESC LIMIT 1',

    // // Obtener todos los artículos
    // select_articles: 'SELECT * FROM articles',
    // insert_articles: 'INSERT INTO articles (id_author, title, abstract, publication_date, link, pdf_path, preview_path) VALUES (?, ?, ?, ?, ?, ?, ?)',
    // select_articles_byid: 'SELECT * FROM articles WHERE id = ?',
    // delete_articles_byid: 'DELETE FROM articles WHERE id = ?',
    // update_articles_byid: 'UPDATE articles SET id_author = ?, title = ?, abstract = ?, publication_date = ?, link = ?, pdf_path = ?, preview_path = ? WHERE id = ?',

    // Tabla ROLES
    select_roles: 'SELECT * FROM roles',
    insert_roles: 'INSERT INTO roles (role_name) VALUES (?)',
    select_roles_byid: 'SELECT * FROM roles WHERE id = ?',
    delete_roles_byid: 'DELETE FROM roles WHERE id = ?',
    update_roles_byid: 'UPDATE roles SET role_name = ? WHERE id = ?',

    // Tabla USERS
    select_users: 'SELECT * FROM users',
    insert_users: 'INSERT INTO users (username, email, password, first_name, last_name, profile_img_path) VALUES (?, ?, ?, ?, ?, ?)',
    select_users_byid: 'SELECT * FROM users WHERE id = ?',
    // select_users_byname: 'SELECT * FROM users WHERE nombre = ?',
    delete_users_byid: 'DELETE FROM users WHERE id = ?',
    update_users_byid: 'UPDATE users SET username = ?, email = ?, first_name = ?, last_name = ?, profile_img_path = ? WHERE id = ?',

    // Tabla ARTICLES
    select_articles: 'SELECT * FROM articles',
    insert_articles: 'INSERT INTO articles (id_author, title, abstract, publication_date, link, pdf_path, preview_path, status) VALUES (?, ?, ?, ?, ?, ?, ?, ?)',
    select_articles_byid: 'SELECT * FROM articles WHERE id = ?',
    delete_articles_byid: 'DELETE FROM articles WHERE id = ?',
    update_articles_byid: 'UPDATE articles SET id_author = ?, title = ?, abstract = ?, publication_date = ?, link = ?, pdf_path = ?, preview_path = ?, status = ? WHERE id = ?',

    // Tabla CATEGORIES
    select_categories: 'SELECT * FROM categories',
    insert_categories: 'INSERT INTO categories (category_name) VALUES (?)',
    select_categories_byid: 'SELECT * FROM categories WHERE id = ?',
    delete_categories_byid: 'DELETE FROM categories WHERE id = ?',
    update_categories_byid: 'UPDATE categories SET category_name = ? WHERE id = ?',

    // Tabla ARTICLE_CATEGORIES
    select_article_categories: 'SELECT * FROM article_categories',
    insert_article_categories: 'INSERT INTO article_categories (id_article, id_category) VALUES (?, ?)',
    select_article_categories_byid: 'SELECT * FROM article_categories WHERE id_article = ? AND id_category = ?',
    delete_article_categories_byid: 'DELETE FROM article_categories WHERE id_article = ? AND id_category = ?',

    // Tabla ARTICLE_COAUTHORS
    select_article_coauthors: 'SELECT * FROM article_coauthors',
    insert_article_coauthors: 'INSERT INTO article_coauthors (id_article, id_coauthor) VALUES (?, ?)',
    select_article_coauthors_byid: 'SELECT * FROM article_coauthors WHERE id_article = ? AND id_coauthor = ?',
    delete_article_coauthors_byid: 'DELETE FROM article_coauthors WHERE id_article = ? AND id_coauthor = ?',

    // Tabla ARTICLE_VIEWS
    select_article_views: 'SELECT * FROM article_views',
    insert_article_views: 'INSERT INTO article_views (id_article, id_user, view_date) VALUES (?, ?, ?)',
    select_article_views_byid: 'SELECT * FROM article_views WHERE id_article = ? AND id_user = ?',
    delete_article_views_byid: 'DELETE FROM article_views WHERE id_article = ? AND id_user = ?',

    // Tabla RESEARCH_PROJECTS
    select_research_projects: 'SELECT * FROM research_projects',
    insert_research_projects: 'INSERT INTO research_projects (title, details, vacancies, preview_path, status) VALUES (?, ?, ?, ?, ?)',
    select_research_projects_byid: 'SELECT * FROM research_projects WHERE id = ?',
    delete_research_projects_byid: 'DELETE FROM research_projects WHERE id = ?',
    update_research_projects_byid: 'UPDATE research_projects SET title = ?, details = ?, vacancies = ?, preview_path = ?, status = ? WHERE id = ?',

    // Tabla PROJECT_CATEGORIES
    select_project_categories: 'SELECT * FROM project_categories',
    insert_project_categories: 'INSERT INTO project_categories (id_project, id_category) VALUES (?, ?)',
    select_project_categories_byid: 'SELECT * FROM project_categories WHERE id_project = ? AND id_category = ?',
    delete_project_categories_byid: 'DELETE FROM project_categories WHERE id_project = ? AND id_category = ?',

    // Tabla RESOURCES
    select_resources: 'SELECT * FROM resources',
    insert_resources: 'INSERT INTO resources (id_author, resource_category, title, description, link, pdf_path, publication_date) VALUES (?, ?, ?, ?, ?, ?, ?)',
    select_resources_byid: 'SELECT * FROM resources WHERE id = ?',
    delete_resources_byid: 'DELETE FROM resources WHERE id = ?',
    update_resources_byid: 'UPDATE resources SET id_author = ?, resource_category = ?, title = ?, description = ?, link = ?, pdf_path = ?, publication_date = ? WHERE id = ?',

    // Tabla RESOURCE_COAUTHORS
    select_resource_coauthors: 'SELECT * FROM resource_coauthors',
    insert_resource_coauthors: 'INSERT INTO resource_coauthors (id_resource, id_coauthor) VALUES (?, ?)',
    select_resource_coauthors_byid: 'SELECT * FROM resource_coauthors WHERE id_resource = ? AND id_coauthor = ?',
    delete_resource_coauthors_byid: 'DELETE FROM resource_coauthors WHERE id_resource = ? AND id_coauthor = ?',

    // Tabla QUESTIONS
    select_questions: 'SELECT * FROM questions',
    insert_questions: 'INSERT INTO questions (title, body, id_user) VALUES (?, ?, ?)',
    select_questions_byid: 'SELECT * FROM questions WHERE id = ?',
    delete_questions_byid: 'DELETE FROM questions WHERE id = ?',
    update_questions_byid: 'UPDATE questions SET title = ?, body = ?, id_user = ? WHERE id = ?',

    // Tabla ANSWERS
    select_answers: 'SELECT * FROM answers',
    insert_answers: 'INSERT INTO answers (id_question, body, id_user) VALUES (?, ?, ?)',
    select_answers_byid: 'SELECT * FROM answers WHERE id = ?',
    delete_answers_byid: 'DELETE FROM answers WHERE id = ?',
    update_answers_byid: 'UPDATE answers SET id_question = ?, body = ?, id_user = ? WHERE id = ?'

};
