
-- Tabla ROLES
CREATE TABLE ROLES (
    id INT PRIMARY KEY AUTO_INCREMENT,
    role_name VARCHAR(50) UNIQUE NOT NULL
);

-- Tabla USERS
CREATE TABLE USERS (
    id INT PRIMARY KEY AUTO_INCREMENT,
    username VARCHAR(50) UNIQUE NOT NULL,
    email VARCHAR(100) UNIQUE NOT NULL,
    password VARCHAR(255) NOT NULL,
    first_name VARCHAR(50) NOT NULL,
    last_name VARCHAR(50) NOT NULL,
    registration_date DATETIME DEFAULT CURRENT_TIMESTAMP,
    profile_img_path VARCHAR(255),
    verified BOOLEAN DEFAULT 0,
    role_id INT DEFAULT 1,
    status ENUM('active', 'inactive') DEFAULT 'active',
    FOREIGN KEY (role_id) REFERENCES ROLES(id)
);

CREATE TABLE PROFILE (
    id_user INT PRIMARY KEY,
    biography TEXT,
    experience TEXT,
    FOREIGN KEY (id_user) REFERENCES USERS(id)
);

CREATE TABLE USER_DISCIPLINES (
    id_user INT,
    id_category INT,
    PRIMARY KEY (id_user, id_category),
    FOREIGN KEY (id_user) REFERENCES USERS(id),
    FOREIGN KEY (id_category) REFERENCES CATEGORIES(id)
);

-- Tabla ARTICLES
CREATE TABLE ARTICLES (
    id INT PRIMARY KEY AUTO_INCREMENT,
    id_author INT,
    title VARCHAR(255) NOT NULL,
    abstract TEXT,
    publication_date DATETIME,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    updated_at DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    link VARCHAR(255),
    pdf_path VARCHAR(255),
    preview_path VARCHAR(255),
    status ENUM('published', 'archived') DEFAULT 'published',
    FOREIGN KEY (id_author) REFERENCES USERS(id)
);

-- Tabla CATEGORIES
CREATE TABLE CATEGORIES (
    id INT PRIMARY KEY AUTO_INCREMENT,
    category_name VARCHAR(100) UNIQUE NOT NULL
);

-- Tabla ARTICLE_CATEGORIES
CREATE TABLE ARTICLE_CATEGORIES_MAP (
    id_article INT,
    id_category INT,
    PRIMARY KEY (id_article, id_category),
    FOREIGN KEY (id_article) REFERENCES ARTICLES(id),
    FOREIGN KEY (id_category) REFERENCES CATEGORIES(id)
);

-- Tabla ARTICLE_COAUTHORS
CREATE TABLE ARTICLE_COAUTHORS_MAP (
    id_article INT,
    id_coauthor INT,
    PRIMARY KEY (id_article, id_coauthor),
    FOREIGN KEY (id_article) REFERENCES ARTICLES(id),
    FOREIGN KEY (id_coauthor) REFERENCES USERS(id)
);

-- Tabla ARTICLE_VIEWS
CREATE TABLE ARTICLE_VIEWS (
    id_article INT,
    id_user INT,
    view_date DATETIME DEFAULT CURRENT_TIMESTAMP,
    PRIMARY KEY (id_article, id_user),
    FOREIGN KEY (id_article) REFERENCES ARTICLES(id),
    FOREIGN KEY (id_user) REFERENCES USERS(id)
);

-- Tabla RESEARCH_PROJECTS
CREATE TABLE RESEARCH_PROJECTS (
    id INT PRIMARY KEY AUTO_INCREMENT,
    title VARCHAR(255) NOT NULL,
    details TEXT,
    vacancies INT,
    preview_path VARCHAR(255),
    status ENUM('active', 'inactive') DEFAULT 'active'
);

-- Tabla PROJECT_CATEGORIES
CREATE TABLE PROJECT_CATEGORIES_MAP (
    id_project INT,
    id_category INT,
    PRIMARY KEY (id_project, id_category),
    FOREIGN KEY (id_project) REFERENCES RESEARCH_PROJECTS(id),
    FOREIGN KEY (id_category) REFERENCES CATEGORIES(id)
);

-- Tabla RESOURCES
CREATE TABLE RESOURCES (
    id INT PRIMARY KEY AUTO_INCREMENT,
    id_author INT,
    resource_category ENUM('guias', 'talleres', 'convocatorias') NOT NULL,
    title VARCHAR(255) NOT NULL,
    description TEXT,
    link VARCHAR(255),
    pdf_path VARCHAR(255),
    publication_date DATETIME DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (id_author) REFERENCES USERS(id)
);

-- Tabla RESOURCE_COAUTHORS
CREATE TABLE RESOURCE_COAUTHORS_MAP (
    id_resource INT,
    id_coauthor INT,
    PRIMARY KEY (id_resource, id_coauthor),
    FOREIGN KEY (id_resource) REFERENCES RESOURCES(id),
    FOREIGN KEY (id_coauthor) REFERENCES USERS(id)
);

-- Tabla RESOURCE_CATEGORIES
-- CREATE TABLE RESOURCE_CATEGORIES (
--     id INT AUTO_INCREMENT PRIMARY KEY,
--     category_name VARCHAR(100) UNIQUE NOT NULL
-- );

-- -- Tabla RESOURCE_CATEGORIES_MAP
-- CREATE TABLE RESOURCE_CATEGORIES_MAP (
--     id_resource INT,
--     id_category INT,
--     PRIMARY KEY (id_resource, id_category),
--     FOREIGN KEY (id_resource) REFERENCES RESOURCES(id),
--     FOREIGN KEY (id_category) REFERENCES RESOURCE_CATEGORIES(id)
-- );

-- Tabla QUESTIONS
CREATE TABLE QUESTIONS (
    id INT PRIMARY KEY AUTO_INCREMENT,
    title VARCHAR(255) NOT NULL,
    body TEXT NOT NULL,
    id_user INT,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    updated_at DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (id_user) REFERENCES USERS(id)
);

CREATE TABLE QUESTION_CATEGORIES_MAP (
    id_question INT,
    id_category INT,
    PRIMARY KEY (id_question, id_category),
    FOREIGN KEY (id_question) REFERENCES QUESTIONS(id),
    FOREIGN KEY (id_category) REFERENCES CATEGORIES(id)
);

-- Tabla ANSWERS
CREATE TABLE ANSWERS (
    id INT PRIMARY KEY AUTO_INCREMENT,
    id_question INT,
    body TEXT NOT NULL,
    id_user INT,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    updated_at DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (id_question) REFERENCES QUESTIONS(id),
    FOREIGN KEY (id_user) REFERENCES USERS(id)
);
