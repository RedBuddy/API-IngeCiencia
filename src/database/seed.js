import Role from "./models/Roles.js";
import Category from "./models/Categories.js";
import User from "./models/Users.js";
import Profile from "./models/Profile.js";
import Article from "./models/Articles.js";
import ArticleCategory from "./models/ArticleCategoriesMap.js";
import Question from "./models/Questions.js";
import Resource from "./models/Resources.js";
import bcrypt from "bcrypt";

/**
 * Seed inicial de la base de datos
 * Crea datos de ejemplo si la BD está vacía
 */
export async function seedDatabase() {
  try {
    console.log("↳ Verificando datos iniciales...");

    // Verificar si ya existen datos
    const rolesCount = await Role.count();
    if (rolesCount > 0) {
      console.log("↳ Los datos ya existen en la base de datos");
      return;
    }

    console.log("↳ Creando datos de prueba...");

    // 1. Crear Roles
    await seedRoles();

    // 2. Crear Categorías
    await seedCategories();

    // 3. Crear Usuarios
    const authors = await seedUsers();

    // 4. Crear Artículos
    if (authors && authors.length > 0) {
      await seedArticles(authors);
    }

    // 5. Crear Preguntas
    if (authors && authors.length > 0) {
      await seedQuestions(authors);
    }

    // 6. Crear Recursos
    if (authors && authors.length > 0) {
      await seedResources(authors);
    }

    console.log("✓ Seed completado correctamente");
  } catch (error) {
    console.error("✗ Error en seed:", error.message);
    throw error;
  }
}

/**
 * Crea los roles iniciales
 */
async function seedRoles() {
  try {
    const roles = [{ role_name: "lector" }, { role_name: "autor" }, { role_name: "editor" }, { role_name: "admin" }];

    await Role.bulkCreate(roles);
    console.log(`  ✓ ${roles.length} roles creados`);
  } catch (error) {
    console.error("✗ Error creando roles:", error.message);
    throw error;
  }
}

/**
 * Crea las categorías iniciales
 */
async function seedCategories() {
  try {
    const categories = [
      { category_name: "Ingeniería Metalúrgica" },
      { category_name: "Ciencia de Materiales" },
      { category_name: "Procesamiento de Minerales" },
      { category_name: "Metalurgia Física" },
      { category_name: "Metalurgia Extractiva" },
      { category_name: "Control de Calidad" },
      { category_name: "Innovación Tecnológica" },
      { category_name: "Sostenibilidad Ambiental" },
      { category_name: "Aleaciones Especiales" },
      { category_name: "Investigación" },
      { category_name: "Tecnología Industrial" },
      { category_name: "Recursos Minerales" },
    ];

    await Category.bulkCreate(categories);
    console.log(`  ✓ ${categories.length} categorías creadas`);
  } catch (error) {
    console.error("✗ Error creando categorías:", error.message);
    throw error;
  }
}

/**
 * Crea usuarios de ejemplo
 */
async function seedUsers() {
  try {
    const adminRole = await Role.findOne({ where: { role_name: "admin" } });
    const authorRole = await Role.findOne({ where: { role_name: "autor" } });
    const editorRole = await Role.findOne({ where: { role_name: "editor" } });

    const users = [];

    // Crear usuario admin
    const hashedPasswordAdmin = await bcrypt.hash("admin123", 10);
    const adminUser = await User.create({
      username: "admin",
      email: "admin@ingeciencia.com",
      password: hashedPasswordAdmin,
      first_name: "Administrador",
      last_name: "Sistema",
      verified: true,
      role_id: adminRole.id,
      status: "active",
    });

    // Crear perfil para admin
    await Profile.create({
      id_user: adminUser.id,
      university: "Universidad Autónoma de Sinaloa",
      faculty: "Facultad de Ingeniería Metalúrgica",
      department: "Dirección",
      biography: "Administrador del sistema de divulgación científica. Coordinador de iniciativas académicas y de investigación.",
    });

    users.push(adminUser);

    // Crear múltiples autores
    const authorsData = [
      {
        username: "jperez",
        email: "juan.perez@uas.edu.mx",
        first_name: "Juan",
        last_name: "Pérez García",
        password: "author123",
        orcid: "0000-0001-2345-6789",
        biography: "Investigador en ciencia de materiales y metalurgia física. Especialista en análisis microestructural.",
        university: "Universidad Autónoma de Sinaloa",
        faculty: "Facultad de Ingeniería Metalúrgica",
        department: "Laboratorio de Metalurgia Física",
        google_scholar: "https://scholar.google.com/citations?user=jperez",
        research_gate: "https://www.researchgate.net/profile/Juan-Perez",
      },
      {
        username: "mlopez",
        email: "maria.lopez@uas.edu.mx",
        first_name: "María",
        last_name: "López Rodríguez",
        password: "author123",
        orcid: "0000-0002-3456-7890",
        biography: "Doctora en Ingeniería Metalúrgica. Especialista en procesamiento de minerales y tecnologías limpias.",
        university: "Universidad Autónoma de Sinaloa",
        faculty: "Facultad de Ingeniería Metalúrgica",
        department: "Departamento de Procesamiento de Minerales",
        google_scholar: "https://scholar.google.com/citations?user=mlopez",
        research_gate: "https://www.researchgate.net/profile/Maria-Lopez",
      },
      {
        username: "cgarcia",
        email: "carlos.garcia@uas.edu.mx",
        first_name: "Carlos",
        last_name: "García Martínez",
        password: "author123",
        orcid: "0000-0003-4567-8901",
        biography: "Profesor investigador en aleaciones especiales y metalurgia extractiva. Más de 15 años de experiencia.",
        university: "Universidad Autónoma de Sinaloa",
        faculty: "Facultad de Ingeniería Metalúrgica",
        department: "Departamento de Metalurgia Extractiva",
        google_scholar: "https://scholar.google.com/citations?user=cgarcia",
        research_gate: "https://www.researchgate.net/profile/Carlos-Garcia",
      },
      {
        username: "amorales",
        email: "ana.morales@uas.edu.mx",
        first_name: "Ana",
        last_name: "Morales Sandoval",
        password: "author123",
        orcid: "0000-0004-5678-9012",
        biography: "Investigadora en sostenibilidad ambiental y procesos metalúrgicos ecológicos.",
        university: "Universidad Autónoma de Sinaloa",
        faculty: "Facultad de Ingeniería Metalúrgica",
        department: "Centro de Investigación en Tecnologías Limpias",
        google_scholar: "https://scholar.google.com/citations?user=amorales",
        research_gate: "https://www.researchgate.net/profile/Ana-Morales",
      },
    ];

    for (const authorData of authorsData) {
      const hashedPassword = await bcrypt.hash(authorData.password, 10);
      const author = await User.create({
        username: authorData.username,
        email: authorData.email,
        password: hashedPassword,
        first_name: authorData.first_name,
        last_name: authorData.last_name,
        verified: true,
        role_id: authorRole.id,
        status: "active",
      });

      await Profile.create({
        id_user: author.id,
        university: authorData.university,
        faculty: authorData.faculty,
        department: authorData.department,
        orcid: authorData.orcid,
        biography: authorData.biography,
        google_scholar_link: authorData.google_scholar,
        research_gate_link: authorData.research_gate,
      });

      users.push(author);
    }

    // Crear un editor
    const hashedPasswordEditor = await bcrypt.hash("editor123", 10);
    const editorUser = await User.create({
      username: "redactor",
      email: "redactor@ingeciencia.com",
      password: hashedPasswordEditor,
      first_name: "Redactor",
      last_name: "Editorial",
      verified: true,
      role_id: editorRole.id,
      status: "active",
    });

    await Profile.create({
      id_user: editorUser.id,
      university: "Universidad Autónoma de Sinaloa",
      faculty: "Facultad de Ingeniería Metalúrgica",
      department: "Departamento Editorial",
      biography: "Responsable de la edición y revisión del contenido de divulgación científica.",
    });

    console.log(`  ✓ ${users.length + 1} usuarios creados con perfiles`);
    return users;
  } catch (error) {
    console.error("✗ Error creando usuarios:", error.message);
    throw error;
  }
}

/**
 * Crea artículos de ejemplo
 */
async function seedArticles(authors) {
  try {
    const allCategories = await Category.findAll();

    const articles = [
      {
        title: "Avances en Metalurgia Extractiva: Nuevas Tecnologías de Lixiviación",
        abstract:
          "Este estudio presenta técnicas innovadoras de lixiviación bacteriana para la extracción de cobre. Se evaluaron diferentes tipos de bacterias y sus efectos en la recuperación de metales, logrando eficiencias del 95% en condiciones controladas.",
        doi: "10.1016/j.hydromet.2024.106.015",
        publication_date: new Date("2024-01-15"),
        link: "https://ejemplo.com/articulo/lixiviacion-bacteriana",
        id_author: authors[1]?.id,
        status: "published",
        categoryIds: [0, 4, 7], // Metalurgia Extractiva, Sostenibilidad, Recursos
      },
      {
        title: "Caracterización Microestructural de Aleaciones de Aluminio-Litio",
        abstract:
          "Se realizó un análisis detallado de la microestructura de nuevas aleaciones Al-Li utilizando microscopía electrónica de transmisión. Los resultados muestran mejoras significativas en la relación resistencia-peso, con aplicaciones en la industria aeronáutica.",
        doi: "10.1016/j.actamat.2024.119.245",
        publication_date: new Date("2024-02-20"),
        link: "https://ejemplo.com/articulo/al-li-microestructura",
        id_author: authors[0]?.id,
        status: "published",
        categoryIds: [1, 3, 8], // Ciencia de Materiales, Metalurgia Física, Aleaciones
      },
      {
        title: "Procesamiento de Minerales mediante Flotación Selectiva",
        abstract: "Investigación sobre la optimización de procesos de flotación para minerales polimetálicos. Se evaluaron diferentes reactivos y condiciones operacionales, mejorando la recuperación de cobre y zinc en un 40%.",
        doi: "10.1016/j.mineng.2024.107.342",
        publication_date: new Date("2024-03-10"),
        link: "https://ejemplo.com/articulo/flotacion-selectiva",
        id_author: authors[1]?.id,
        status: "published",
        categoryIds: [2, 5, 11], // Procesamiento, Control de Calidad, Recursos
      },
      {
        title: "Modelado Termodinámico de Sistemas Multicomponentes en Metalurgia",
        abstract: "Desarrollo de modelos termodinámicos mejorados para predecir comportamientos de aleaciones multicomponentes. Los modelos fueron validados con datos experimentales, logrando predicciones con precisión del 98%.",
        doi: "10.1016/j.calphad.2024.102.156",
        publication_date: new Date("2024-04-05"),
        link: "https://ejemplo.com/articulo/modelado-termodinamico",
        id_author: authors[2]?.id,
        status: "published",
        categoryIds: [3, 9, 10], // Metalurgia Física, Investigación, Tecnología
      },
      {
        title: "Procesos Metalúrgicos Sostenibles: Reducción de Impacto Ambiental",
        abstract:
          "Este artículo revisa las tecnologías más prometedoras para reducir la huella de carbono en procesos metalúrgicos. Se proponen modificaciones en hornos de fusión y sistemas de control de emisiones que pueden reducir emisiones hasta en 60%.",
        doi: "10.1016/j.jclepro.2024.141.205",
        publication_date: new Date("2024-05-12"),
        link: "https://ejemplo.com/articulo/metalurgia-sostenible",
        id_author: authors[3]?.id,
        status: "published",
        categoryIds: [4, 7, 0, 12], // Metalurgia Extractiva, Sostenibilidad, Ingeniería, Tecnología
      },
      {
        title: "Control de Calidad en Procesos de Fundición: Métodos No Destructivos",
        abstract:
          "Implementación de técnicas avanzadas de inspección no destructiva para garantizar la calidad en productos fundidos. Se comparan ultrasonografía, radiografía y termografía, evaluando su efectividad en la detección de defectos.",
        doi: "10.1016/j.ndteint.2024.102.867",
        publication_date: new Date("2024-06-08"),
        link: "https://ejemplo.com/articulo/control-calidad-fundicion",
        id_author: authors[2]?.id,
        status: "published",
        categoryIds: [5, 1, 10], // Control de Calidad, Ciencia de Materiales, Tecnología
      },
      {
        title: "Innovación en Recubrimientos Metálicos Resistentes a Corrosión",
        abstract:
          "Desarrollo de nuevos recubrimientos multicapa basados en composites metal-cerámica. Los recubrimientos exhiben resistencia a corrosión superior a los métodos tradicionales, con aplicaciones en industria marina y química.",
        doi: "10.1016/j.surfcoat.2024.130.456",
        publication_date: new Date("2024-07-15"),
        link: "https://ejemplo.com/articulo/recubrimientos-corrosion",
        id_author: authors[0]?.id,
        status: "published",
        categoryIds: [6, 8, 1], // Innovación, Aleaciones, Ciencia de Materiales
      },
      {
        title: "Simulación Computacional de Solidificación en Aleaciones Complejas",
        abstract: "Utilización de software de elementos finitos para simular el proceso de solidificación en fundiciones complejas. Las simulaciones permiten predecir formación de porosidades y segregación, reduciendo defectos un 35%.",
        doi: "10.1016/j.jmatprotec.2024.117.789",
        publication_date: new Date("2024-08-22"),
        link: "https://ejemplo.com/articulo/simulacion-solidificacion",
        id_author: authors[1]?.id,
        status: "published",
        categoryIds: [3, 10, 6], // Metalurgia Física, Tecnología, Innovación
      },
      {
        title: "Recuperación de Metales Preciosos desde Residuos Electrónicos",
        abstract: "Estudio de tecnologías hidrometalúrgicas para la recuperación de oro, plata y cobre de residuos electrónicos. Se logró recuperación de más del 90% de metales preciosos con un impacto ambiental mínimo.",
        doi: "10.1016/j.resconrec.2024.106.234",
        publication_date: new Date("2024-09-10"),
        link: "https://ejemplo.com/articulo/reciclaje-metales",
        id_author: authors[3]?.id,
        status: "published",
        categoryIds: [4, 7, 11, 2], // Metalurgia Extractiva, Sostenibilidad, Recursos, Procesamiento
      },
      {
        title: "Propiedades Mecánicas de Aceros de Alta Resistencia-Baja Aleación",
        abstract: "Investigación sobre la relación entre microestructura y propiedades mecánicas en aceros HSLA. Se evalúa el efecto de elementos de aleación (V, Nb, Ti) en la resistencia y tenacidad.",
        doi: "10.1016/j.matdes.2024.112.645",
        publication_date: new Date("2024-10-05"),
        link: "https://ejemplo.com/articulo/aceros-alta-resistencia",
        id_author: authors[2]?.id,
        status: "published",
        categoryIds: [1, 3, 8], // Ciencia de Materiales, Metalurgia Física, Aleaciones
      },
      {
        title: "Tecnologías de Fusión Selectiva por Láser en Metalurgia Aditiva",
        abstract: "Revisión del estado del arte en manufactura aditiva mediante fusión selectiva por láser (SLM) para aplicaciones metalúrgicas. Se discuten capacidades, limitaciones y perspectivas futuras de la tecnología.",
        doi: "10.1016/j.addma.2024.103.421",
        publication_date: new Date("2024-11-12"),
        link: "https://ejemplo.com/articulo/metalurgia-aditiva",
        id_author: authors[0]?.id,
        status: "published",
        categoryIds: [6, 10, 1, 9], // Innovación, Tecnología, Ciencia de Materiales, Investigación
      },
      {
        title: "Análisis de Precipitados en Aleaciones de Níquel Superaleaciones",
        abstract: "Estudio de la evolución de precipitados gamma en superaleaciones de Ni durante tratamientos térmicos. Se utilizaron técnicas cristalográficas avanzadas para caracterizar la cinética de precipitación.",
        doi: "10.1016/j.scriptamat.2024.115.089",
        publication_date: new Date("2024-12-01"),
        link: "https://ejemplo.com/articulo/superaleaciones-niquel",
        id_author: authors[1]?.id,
        status: "published",
        categoryIds: [1, 3, 8], // Ciencia de Materiales, Metalurgia Física, Aleaciones
      },
    ];

    for (const articleData of articles) {
      const categoryIds = articleData.categoryIds || [];
      delete articleData.categoryIds;

      const article = await Article.create(articleData);

      // Asociar categorías
      if (categoryIds.length > 0) {
        const categoriesToAdd = allCategories.filter((_, idx) => categoryIds.includes(idx));
        if (categoriesToAdd.length > 0) {
          await article.addCategories(categoriesToAdd);
        }
      }
    }

    console.log(`  ✓ ${articles.length} artículos creados con categorías`);
  } catch (error) {
    console.error("✗ Error creando artículos:", error.message);
    throw error;
  }
}

/**
 * Crea preguntas de ejemplo
 */
async function seedQuestions(authors) {
  try {
    const questions = [
      {
        title: "¿Cuáles son los principales desafíos en la lixiviación bacteriana?",
        body: "Tengo dudas sobre las limitaciones y desafíos técnicos en la implementación de procesos de lixiviación bacteriana a escala industrial. ¿Cuáles son los factores críticos a considerar?",
        id_user: authors[0]?.id,
        active: true,
      },
      {
        title: "¿Cómo se mejora la eficiencia en el procesamiento de minerales polimetálicos?",
        body: "¿Existen nuevas técnicas o tecnologías emergentes que puedan mejorar la eficiencia en la flotación de minerales complejos con múltiples valores?",
        id_user: authors[1]?.id,
        active: true,
      },
      {
        title: "¿Quéestándares internacionales rigen la metalurgia sostenible?",
        body: "¿Cuáles son los estándares ISO y regulaciones internacionales que deben cumplir los procesos metalúrgicos modernos para considerarse sostenibles?",
        id_user: authors[2]?.id,
        active: true,
      },
      {
        title: "¿Cuáles son las ventajas de la manufactura aditiva en metalurgia?",
        body: "Compare las ventajas y desventajas de la fusión selectiva por láser versus métodos tradicionales de manufactura para componentes metalúrgicos.",
        id_user: authors[3]?.id,
        active: true,
      },
      {
        title: "¿Cómo se previene la corrosión en aleaciones de aluminio-litio?",
        body: "¿Cuáles son los mecanismos de corrosión más comunes en aleaciones Al-Li y qué métodos de protección son más efectivos?",
        id_user: authors[0]?.id,
        active: true,
      },
      {
        title: "¿Qué nuevos métodos no destructivos existen para inspección de fundiciones?",
        body: "Más allá de ultrasonografía y radiografía, ¿existen técnicas emergentes de inspección no destructiva para control de calidad en fundiciones?",
        id_user: authors[1]?.id,
        active: true,
      },
    ];

    const maxAuthorIndex = Math.floor(Math.random() * authors.length);
    for (const question of questions) {
      if (!question.id_user) {
        question.id_user = authors[maxAuthorIndex]?.id;
      }
    }

    await Question.bulkCreate(questions);
    console.log(`  ✓ ${questions.length} preguntas creadas`);
  } catch (error) {
    console.error("✗ Error creando preguntas:", error.message);
    throw error;
  }
}

/**
 * Crea recursos de ejemplo
 */
async function seedResources(authors) {
  try {
    const resources = [
      {
        id_author: authors[0]?.id,
        resource_category: "guias",
        title: "Guía Completa de Lixiviación Bacteriana",
        description: "Guía práctica step-by-step para implementar procesos de lixiviación bacteriana en operaciones mineras. Incluye mejores prácticas, cálculos y resolución de problemas comunes.",
        link: "https://ejemplo.com/guias/lixiviacion-bacteriana",
        publication_date: new Date("2024-01-10"),
      },
      {
        id_author: authors[1]?.id,
        resource_category: "guias",
        title: "Manual de Flotación de Minerales Complejos",
        description: "Manual técnico detallado sobre la flotación de minerales polimetálicos. Cubre teoría, equipos, y parámetros operacionales para optimizar recuperación.",
        link: "https://ejemplo.com/guias/flotacion-manual",
        publication_date: new Date("2024-02-15"),
      },
      {
        id_author: authors[2]?.id,
        resource_category: "talleres",
        title: "Taller Virtual: Metalurgia Aditiva Aplicada",
        description: "Taller intensivo de dos semanas sobre técnicas de fusión por láser en metalurgia. Incluye sesiones teóricas, demostraciones práctica y ejercicios.",
        link: "https://ejemplo.com/talleres/metalurgia-aditiva",
        publication_date: new Date("2024-03-20"),
      },
      {
        id_author: authors[3]?.id,
        resource_category: "talleres",
        title: "Workshop: Sostenibilidad en Procesos Metalúrgicos",
        description: "Taller sobre tecnologías limpias y reducción de huella de carbono en metalurgia. Dirigido a ingenieros y gestores de operaciones.",
        link: "https://ejemplo.com/talleres/sostenibilidad",
        publication_date: new Date("2024-04-10"),
      },
      {
        id_author: authors[0]?.id,
        resource_category: "convocatorias",
        title: "Convocatoria: Investigadores Postdoctorales 2025",
        description: "Se abre convocatoria para posiciones postdoctorales en el Laboratorio de Metalurgia Física. Áreas: ciencia de materiales, microestructura, aleaciones avanzadas.",
        link: "https://ejemplo.com/convocatorias/postdoc-2025",
        publication_date: new Date("2024-11-01"),
      },
      {
        id_author: authors[1]?.id,
        resource_category: "convocatorias",
        title: "Becas de Investigación: Tecnologías Limpias en Minería",
        description: "Programa de becas para proyectos de investigación en tecnologías ambientales para la minería y metalurgia. Presupuesto: hasta $500,000 USD.",
        link: "https://ejemplo.com/convocatorias/becas-mineria-limpia",
        publication_date: new Date("2024-10-15"),
      },
      {
        id_author: authors[2]?.id,
        resource_category: "guias",
        title: "Estándar ISO:14001 Aplicado a Operaciones Metalúrgicas",
        description: "Guía de implementación del estándar ISO 14001 en plantas metalúrgicas. Incluye checklist, procedimientos y casos de estudio.",
        link: "https://ejemplo.com/guias/iso-14001-metalurgia",
        publication_date: new Date("2024-09-05"),
      },
      {
        id_author: authors[3]?.id,
        resource_category: "talleres",
        title: "Seminario: Recuperación de Metales de Residuos Electrónicos",
        description: "Seminario sobre hidrometalurgia aplicada a e-waste. Técnicas de separación, purificación y económica de procesos. Duración: 3 días.",
        link: "https://ejemplo.com/seminarios/e-waste-recovery",
        publication_date: new Date("2024-12-10"),
      },
      {
        id_author: authors[0]?.id,
        resource_category: "convocatorias",
        title: "Premio de Investigación: Innovación en Metalurgia 2025",
        description: "Convocatoria para el Premio Anual de Investigación Innovadora en Metalurgia. Reconocimiento económico y publicación en revista especializada.",
        link: "https://ejemplo.com/convocatorias/premio-innovacion-2025",
        publication_date: new Date("2024-08-20"),
      },
    ];

    await Resource.bulkCreate(resources);
    console.log(`  ✓ ${resources.length} recursos creados`);
  } catch (error) {
    console.error("✗ Error creando recursos:", error.message);
    throw error;
  }
}

export default {
  seedDatabase,
};
