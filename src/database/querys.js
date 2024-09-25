export const query = {
    // Table Users
    select_users: 'SELECT * FROM users',
    insert_users: 'INSERT INTO users (username, email, password, first_name, last_name, profile_img_path) VALUES (?, ?, ?, ?, ?, ?)',
    select_users_byid: 'SELECT * FROM users WHERE id = ?',
    select_users_byname: 'SELECT * FROM users WHERE nombre = ?',
    delete_users_byid: 'DELETE FROM users WHERE id = ?',
    update_users_byid: 'UPDATE users SET username = ?, email = ?, first_name = ?, last_name = ?, profile_img_path = ? WHERE id = ?',
    // return_users_id: 'SELECT id FROM users ORDER BY id DESC LIMIT 1',

    // Obtener todos los artículos
    select_articles: 'SELECT * FROM articles',
    insert_articles: 'INSERT INTO articles (id_author, title, abstract, publication_date, link, pdf_path, preview_path) VALUES (?, ?, ?, ?, ?, ?, ?)',
    select_articles_byid: 'SELECT * FROM articles WHERE id = ?',
    delete_articles_byid: 'DELETE FROM articles WHERE id = ?',
    update_articles_byid: 'UPDATE articles SET id_author = ?, title = ?, abstract = ?, publication_date = ?, link = ?, pdf_path = ?, preview_path = ? WHERE id = ?',

    // Tabla Categorías
    select_categorias: 'SELECT * FROM CATEGORIAS',

    // Tabla Comentarios
    select_comentarios: 'SELECT * FROM COMENTARIOS',

    // Tabla Recursos
    select_recursos: 'SELECT * FROM RECURSOS',

    // Tabla Vistas Artículos
    select_vistas_articulos: 'SELECT * FROM VISTAS_ARTICULOS',
};
