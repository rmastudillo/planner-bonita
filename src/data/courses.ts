import type { Course } from '@/types/course'

// Datos extraídos de la Malla Curricular de Química y Farmacia
// Nota: Por ahora incluyo una muestra representativa de cada semestre
// Puedes expandir esta lista con todas las asignaturas

export const COURSES_DATA: Course[] = [
  // SEMESTRE 1
  {
    id: 'QUI110',
    code: 'QUI110',
    name: 'Química General I',
    credits: 10,
    semester: 'ambos',
    originalSemester: 1,
    area: 'Ciencias Básicas'
  },
  {
    id: 'MAT021',
    code: 'MAT021',
    name: 'Matemática I',
    credits: 10,
    semester: 'ambos',
    originalSemester: 1,
    area: 'Ciencias Básicas'
  },
  {
    id: 'IWG101',
    code: 'IWG101',
    name: 'Introducción a la Ingeniería',
    credits: 5,
    semester: 'ambos',
    originalSemester: 1,
    area: 'Plan Común'
  },
  {
    id: 'FIS110',
    code: 'FIS110',
    name: 'Física General I',
    credits: 10,
    semester: 'ambos',
    originalSemester: 1,
    area: 'Ciencias Básicas'
  },
  {
    id: 'IWM011',
    code: 'IWM011',
    name: 'Introducción a la Matemática',
    credits: 5,
    semester: 'ambos',
    originalSemester: 1,
    area: 'Plan Común'
  },

  // SEMESTRE 2
  {
    id: 'QUI120',
    code: 'QUI120',
    name: 'Química General II',
    credits: 10,
    semester: 'ambos',
    originalSemester: 2,
    area: 'Ciencias Básicas',
    prerequisites: ['QUI110']
  },
  {
    id: 'MAT022',
    code: 'MAT022',
    name: 'Matemática II',
    credits: 10,
    semester: 'ambos',
    originalSemester: 2,
    area: 'Ciencias Básicas',
    prerequisites: ['MAT021']
  },
  {
    id: 'FIS120',
    code: 'FIS120',
    name: 'Física General II',
    credits: 10,
    semester: 'ambos',
    originalSemester: 2,
    area: 'Ciencias Básicas',
    prerequisites: ['FIS110']
  },
  {
    id: 'BIO110',
    code: 'BIO110',
    name: 'Biología',
    credits: 10,
    semester: 'ambos',
    originalSemester: 2,
    area: 'Ciencias Básicas'
  },

  // SEMESTRE 3
  {
    id: 'QUI210',
    code: 'QUI210',
    name: 'Química Orgánica I',
    credits: 10,
    semester: 'ambos',
    originalSemester: 3,
    area: 'Ciencias Básicas',
    prerequisites: ['QUI120']
  },
  {
    id: 'BIO210',
    code: 'BIO210',
    name: 'Biología Celular',
    credits: 10,
    semester: 'ambos',
    originalSemester: 3,
    area: 'Ciencias Básicas',
    prerequisites: ['BIO110']
  },
  {
    id: 'QUI230',
    code: 'QUI230',
    name: 'Química Analítica I',
    credits: 10,
    semester: 'ambos',
    originalSemester: 3,
    area: 'Ciencias Básicas',
    prerequisites: ['QUI120']
  },
  {
    id: 'MAT023',
    code: 'MAT023',
    name: 'Matemática III',
    credits: 10,
    semester: 'ambos',
    originalSemester: 3,
    area: 'Ciencias Básicas',
    prerequisites: ['MAT022']
  },

  // SEMESTRE 4
  {
    id: 'QUI220',
    code: 'QUI220',
    name: 'Química Orgánica II',
    credits: 10,
    semester: 'ambos',
    originalSemester: 4,
    area: 'Ciencias Básicas',
    prerequisites: ['QUI210']
  },
  {
    id: 'BIO220',
    code: 'BIO220',
    name: 'Bioquímica I',
    credits: 10,
    semester: 'ambos',
    originalSemester: 4,
    area: 'Ciencias Básicas',
    prerequisites: ['BIO210', 'QUI210']
  },
  {
    id: 'QUI240',
    code: 'QUI240',
    name: 'Química Analítica II',
    credits: 10,
    semester: 'ambos',
    originalSemester: 4,
    area: 'Ciencias Básicas',
    prerequisites: ['QUI230']
  },
  {
    id: 'FIS230',
    code: 'FIS230',
    name: 'Termodinámica',
    credits: 10,
    semester: 'ambos',
    originalSemester: 4,
    area: 'Ciencias Básicas',
    prerequisites: ['FIS120']
  },

  // SEMESTRE 5 - Farmacia
  {
    id: 'FAR310',
    code: 'FAR310',
    name: 'Farmacología I',
    credits: 10,
    semester: 'impar',
    originalSemester: 5,
    area: 'Farmacia',
    prerequisites: ['BIO220']
  },
  {
    id: 'FAR320',
    code: 'FAR320',
    name: 'Química Farmacéutica I',
    credits: 10,
    semester: 'impar',
    originalSemester: 5,
    area: 'Farmacia',
    prerequisites: ['QUI220']
  },
  {
    id: 'BIO310',
    code: 'BIO310',
    name: 'Fisiología',
    credits: 10,
    semester: 'impar',
    originalSemester: 5,
    area: 'Ciencias Básicas',
    prerequisites: ['BIO220']
  },
  {
    id: 'FAR330',
    code: 'FAR330',
    name: 'Farmacotecnia I',
    credits: 10,
    semester: 'impar',
    originalSemester: 5,
    area: 'Farmacia'
  },

  // SEMESTRE 6
  {
    id: 'FAR410',
    code: 'FAR410',
    name: 'Farmacología II',
    credits: 10,
    semester: 'par',
    originalSemester: 6,
    area: 'Farmacia',
    prerequisites: ['FAR310']
  },
  {
    id: 'FAR420',
    code: 'FAR420',
    name: 'Química Farmacéutica II',
    credits: 10,
    semester: 'par',
    originalSemester: 6,
    area: 'Farmacia',
    prerequisites: ['FAR320']
  },
  {
    id: 'FAR430',
    code: 'FAR430',
    name: 'Farmacotecnia II',
    credits: 10,
    semester: 'par',
    originalSemester: 6,
    area: 'Farmacia',
    prerequisites: ['FAR330']
  },
  {
    id: 'BIO410',
    code: 'BIO410',
    name: 'Microbiología',
    credits: 10,
    semester: 'par',
    originalSemester: 6,
    area: 'Ciencias Básicas'
  },

  // SEMESTRE 7
  {
    id: 'FAR510',
    code: 'FAR510',
    name: 'Farmacología III',
    credits: 10,
    semester: 'impar',
    originalSemester: 7,
    area: 'Farmacia',
    prerequisites: ['FAR410']
  },
  {
    id: 'FAR520',
    code: 'FAR520',
    name: 'Bromatología',
    credits: 10,
    semester: 'impar',
    originalSemester: 7,
    area: 'Farmacia'
  },
  {
    id: 'FAR530',
    code: 'FAR530',
    name: 'Toxicología',
    credits: 10,
    semester: 'impar',
    originalSemester: 7,
    area: 'Farmacia',
    prerequisites: ['FAR410']
  },
  {
    id: 'FAR540',
    code: 'FAR540',
    name: 'Control de Calidad',
    credits: 10,
    semester: 'impar',
    originalSemester: 7,
    area: 'Farmacia'
  },

  // SEMESTRE 8
  {
    id: 'FAR610',
    code: 'FAR610',
    name: 'Farmacocinética',
    credits: 10,
    semester: 'par',
    originalSemester: 8,
    area: 'Farmacia',
    prerequisites: ['FAR510']
  },
  {
    id: 'FAR620',
    code: 'FAR620',
    name: 'Farmacia Clínica',
    credits: 10,
    semester: 'par',
    originalSemester: 8,
    area: 'Farmacia',
    prerequisites: ['FAR510']
  },
  {
    id: 'FAR630',
    code: 'FAR630',
    name: 'Legislación Farmacéutica',
    credits: 4,
    semester: 'par',
    originalSemester: 8,
    area: 'Farmacia'
  },
  {
    id: 'FAR640',
    code: 'FAR640',
    name: 'Gestión Farmacéutica',
    credits: 4,
    semester: 'par',
    originalSemester: 8,
    area: 'Farmacia'
  },

  // SEMESTRE 9
  {
    id: 'FAR710',
    code: 'FAR710',
    name: 'Farmacia Hospitalaria',
    credits: 8,
    semester: 'impar',
    originalSemester: 9,
    area: 'Farmacia',
    prerequisites: ['FAR620']
  },
  {
    id: 'FAR720',
    code: 'FAR720',
    name: 'Farmacia Comunitaria',
    credits: 8,
    semester: 'impar',
    originalSemester: 9,
    area: 'Farmacia'
  },
  {
    id: 'FAR730',
    code: 'FAR730',
    name: 'Proyecto de Título I',
    credits: 10,
    semester: 'impar',
    originalSemester: 9,
    area: 'Título'
  },

  // SEMESTRE 10
  {
    id: 'FAR810',
    code: 'FAR810',
    name: 'Internado Farmacéutico',
    credits: 15,
    semester: 'par',
    originalSemester: 10,
    area: 'Práctica Profesional',
    prerequisites: ['FAR710', 'FAR720']
  },
  {
    id: 'FAR820',
    code: 'FAR820',
    name: 'Proyecto de Título II',
    credits: 9,
    semester: 'par',
    originalSemester: 10,
    area: 'Título',
    prerequisites: ['FAR730']
  }
]
