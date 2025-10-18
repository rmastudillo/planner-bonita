import type { Course } from '@/types/course'

// Datos extraídos de la Malla Curricular de Química y Farmacia
// Nota: Por ahora incluyo una muestra representativa de cada semestre
// Puedes expandir esta lista con todas las asignaturas

export const COURSES_DATA: Course[] = [
  // SEMESTRE 1
  {
    id: 'QIM100I',
    code: 'QIM100I',
    name: 'Química General I',
    credits: 10,
    semester: 'ambos',
    originalSemester: 1,
    area: 'Ciencias Básicas'
  },
  {
    id: 'MAT100',
    code: 'MMAT100',
    name: 'Precalculo',
    credits: 10,
    semester: 'ambos',
    originalSemester: 1,
    area: 'Ciencias Básicas'
  },
  {
    id: 'QIF100B',
    code: 'QIF100B',
    name: 'Introducción a las ciencias farmaceuticas',
    credits: 0,
    semester: 'ambos',
    originalSemester: 1,
    area: 'Plan Común'
  },
  {
    id: 'QIF117',
    code: 'QIF117',
    name: 'El mundo de los medicamentos',
    credits: 10,
    semester: 'ambos',
    originalSemester: 1,
    area: 'Ciencias Básicas'
  },
  {
    id: 'FIL2001',
    code: 'FIL2001',
    name: 'Filosofía: para qué',
    credits: 10,
    semester: 'ambos',
    originalSemester: 1,
    area: 'Ciencias Básicas'
  },
  {
    id: 'QIM101Q',
    code: 'QIM101Q',
    name: 'Laboratorio química general',
    credits: 10,
    semester: 'ambos',
    originalSemester: 1,
    area: 'Plan Común'
  },

  // SEMESTRE 2
  {
    id: 'QIM100A',
    code: 'QIM100A',
    name: 'Química General II',
    credits: 10,
    semester: 'ambos',
    originalSemester: 2,
    area: 'Ciencias Básicas',
    prerequisites: ['QIM100I']
  },
  {
    id: 'FIS109C',
    code: 'FIS109C',
    name: 'Física Para ciencias',
    credits: 10,
    semester: 'ambos',
    originalSemester: 2,
    area: 'Ciencias Básicas'
  },
  {
    id: 'MAT1100',
    code: 'MAT1100',
    name: 'Cálculo I',
    credits: 10,
    semester: 'ambos',
    originalSemester: 2,
    area: 'Ciencias Básicas'
  },
  // SEMESTRE 3
  {
    id: 'QIM102A',
    code: 'QIM102A',
    name: 'Química Orgánica I',
    credits: 10,
    semester: 'ambos',
    originalSemester: 3,
    area: 'Ciencias Básicas'
  },
  {
    id: 'EYP2310',
    code: 'EYP2310',
    name: 'Estadística para qim y farmacia',
    credits: 10,
    semester: 'ambos',
    originalSemester: 3,
    area: 'Ciencias Básicas'
  },
  {
    id: 'BIO141C',
    code: 'BIO141C',
    name: 'Biología de la célula',
    credits: 10,
    semester: 'ambos',
    originalSemester: 3,
    area: 'Ciencias Básicas'
  },
  {
    id: 'QIF115A',
    code: 'QIF115A',
    name: 'Botánica y farmacognosia',
    credits: 10,
    semester: 'ambos',
    originalSemester: 3,
    area: 'Ciencias Básicas'
  },

  // SEMESTRE 4
  {
    id: 'QIM103A',
    code: 'QIM103A',
    name: 'Química Orgánica II',
    credits: 10,
    semester: 'ambos',
    originalSemester: 4,
    area: 'Ciencias Básicas'
  },
  {
    id: 'QIM109A',
    code: 'QIM109A',
    name: 'Química Analítica I',
    credits: 10,
    semester: 'ambos',
    originalSemester: 4,
    area: 'Ciencias Básicas'
  },
  {
    id: 'BIO135C',
    code: 'BIO135C',
    name: 'Fisiología',
    credits: 10,
    semester: 'ambos',
    originalSemester: 4,
    area: 'Ciencias Básicas'
  },
  {
    id: 'TTF',
    code: 'TTF',
    name: 'Formación teológica',
    credits: 10,
    semester: 'ambos',
    originalSemester: 4,
    area: 'Ciencias Básicas'
  },
  {
    id: 'QIM103A',
    code: 'QIM103A',
    name: 'Quimica Organica II',
    credits: 10,
    semester: 'ambos',
    originalSemester: 4,
    area: 'Ciencias Básicas',
    prerequisites: [{ or: ['QIM102', 'QIM102A', 'QIM102B', 'QQO2203'] }]
  },
  // SEMESTRE 5
  {
    id: 'QIM104A',
    code: 'QIM104A',
    name: 'Laboratorio de química orgánica',
    credits: 10,
    semester: 'ambos',
    originalSemester: 5,
    area: 'Ciencias Básicas',
    prerequisites: [{ or: ['QIM103', 'QIM103A'] }]
  },
  {
    id: 'QIM117',
    code: 'QIM117',
    name: 'Bioquímica',
    credits: 10,
    semester: 'ambos',
    originalSemester: 5,
    area: 'Ciencias Básicas',
    prerequisites: [{ or: ['QIM103A', 'QIM103', 'QIM200', 'QQO2303', 'QUO1001', 'QUO1003'] }]
  },
  {
    id: 'QIM150A',
    code: 'QIM150A',
    name: 'Química-física',
    credits: 10,
    semester: 'par',
    originalSemester: 5,
    area: 'Ciencias Básicas',
    prerequisites: ['FIS109C', 'MAT1100', 'QIM100A']
  },
  {
    id: 'QIM111',
    code: 'QIM111',
    name: 'Análisis instrumental',
    credits: 10,
    semester: 'ambos',
    originalSemester: 5,
    area: 'Ciencias Básicas',
    prerequisites: [{ or: ['QIM110', 'IIQ1012', 'QIM109A'] }]
  },
  {
    id: 'MEB203B',
    code: 'MEB203B',
    name: 'Fisiopatología',
    credits: 10,
    semester: 'impar',
    originalSemester: 5,
    area: 'Ciencias Básicas',
    prerequisites: ['BIO135C']
  },
  // SEMESTRE 6
  {
    id: 'BIO145C',
    code: 'BIO145C',
    name: 'Microbología e inmunología',
    credits: 10,
    semester: 'par',
    originalSemester: 6,
    area: 'Ciencias Básicas',
    prerequisites: ['BIO135C', 'QIM117']
  },
  {
    id: 'QIF101A',
    code: 'QIF101A',
    name: 'Farmaco-química I',
    credits: 10,
    semester: 'ambos',
    originalSemester: 6,
    area: 'Ciencias Básicas',
    prerequisites: [
      { or: ['QIM104', 'QIM104A', 'QQO2401'] },
      { or: ['QIM150', 'QIM150A', 'QQF360A'] }
    ]
  },
  {
    id: 'QIF104A',
    code: 'QIF104A',
    name: 'Farmacocinética y bio-farmacia',
    credits: 10,
    semester: 'ambos',
    originalSemester: 6,
    area: 'Ciencias Básicas',
    prerequisites: [{ or: ['QIM150', 'QIM150A', 'QQF360A'] }]
  },
  {
    id: 'QIF150',
    code: 'QIF150',
    name: 'Farmacología I',
    credits: 10,
    semester: 'ambos',
    originalSemester: 6,
    area: 'Ciencias Básicas',
    prerequisites: ['MEB203B', 'QIM117']
  },
  // SEMESTRE 7
  {
    id: 'QIF102A',
    code: 'QIF102A',
    name: 'Farmaco-química II',
    credits: 10,
    semester: 'ambos',
    originalSemester: 7,
    area: 'Ciencias Básicas',
    prerequisites: ['QIF101A', 'QIF150']
  },
  {
    id: 'QIF105A',
    code: 'QIF105A',
    name: 'Tecnología farmacéutica I',
    credits: 10,
    semester: 'ambos',
    originalSemester: 7,
    area: 'Ciencias Básicas',
    prerequisites: ['QIF104A', 'QIM111']
  },
  {
    id: 'QIF116',
    code: 'QIF116',
    name: 'FARMACOLOGÍA II',
    credits: 10,
    semester: 'ambos',
    originalSemester: 7,
    area: 'Ciencias Básicas',
    prerequisites: [{ or: ['BIO264C', 'QIF150', 'QIF150'] }]
  },
  {
    id: 'QIF118A',
    code: 'QIF118A',
    name: 'Bioquimica Clinica',
    credits: 10,
    semester: 'ambos',
    originalSemester: 7,
    area: 'Ciencias Básicas',
    prerequisites: ['MEB203B', 'QIF150', 'QIM117']
  },
  // SEMESTRE 8
  {
    id: 'QIF108',
    code: 'QIF108',
    name: 'Toxicología',
    credits: 10,
    semester: 'ambos',
    originalSemester: 8,
    area: 'Ciencias Básicas',
    prerequisites: ['QIF102A', 'QIF116']
  },
  {
    id: 'QIF400',
    code: 'QIF400',
    name: 'Tesis de grado',
    credits: 40,
    semester: 'ambos',
    originalSemester: 8,
    area: 'Ciencias Básicas',
    prerequisites: ['QIF105A', 'QIF116']
  },
  // SEMESTRE 9
  {
    id: 'QIF103A',
    code: 'QIF103A',
    name: 'Fármaco-química III',
    credits: 10,
    semester: 'ambos',
    originalSemester: 9,
    area: 'Ciencias Básicas',
    prerequisites: [{ or: ['QIF102', 'QIF102A'] }]
  },
  {
    id: 'QIF110A',
    code: 'QIF110A',
    name: 'Farmacia clínica y atención farmaceutica (QIF103A(c))',
    credits: 10,
    semester: 'ambos',
    originalSemester: 9,
    area: 'Ciencias Básicas',
    prerequisites: ['QIF116']
  },
  {
    id: 'QIF111A',
    code: 'QIF111A',
    name: 'Farmacología III (QIF103A(c))',
    credits: 10,
    semester: 'ambos',
    originalSemester: 9,
    area: 'Ciencias Básicas',
    prerequisites: ['QIF116']
  },
  {
    id: 'QIF106A',
    code: 'QIF106A',
    name: 'Tecnología farmacéutica II',
    credits: 10,
    semester: 'ambos',
    originalSemester: 9,
    area: 'Ciencias Básicas',
    prerequisites: [{ or: ['QIF105', 'QIF105A'] }]
  },
  {
    id: 'OP1',
    code: 'OP1',
    name: 'Optativo de profundización',
    credits: 10,
    semester: 'ambos',
    originalSemester: 9,
    area: 'Ciencias Básicas'
  },
  {
    id: 'QIF113A',
    code: 'QIF113A',
    name: 'Práctica profesional I',
    credits: 0,
    semester: 'ambos',
    originalSemester: 9,
    area: 'Ciencias Básicas',
    prerequisites: ['QIF102A', 'QIF105A']
  },

  // SEMESTRE 10
  {
    id: 'MED231Q',
    code: 'MED231Q',
    name: 'Salud pública para química y farmacia',
    credits: 5,
    semester: 'par',
    originalSemester: 10,
    area: 'Ciencias Básicas',
    prerequisites: ['QIF150']
  },
  {
    id: 'QIF112A',
    code: 'QIF112A',
    name: 'Internado clínico',
    credits: 10,
    semester: 'ambos',
    originalSemester: 10,
    area: 'Ciencias Básicas',
    prerequisites: ['QIF111A', 'QIF110A']
  },
  {
    id: 'QIF109A',
    code: 'QIF109A',
    name: 'Farmacia privada',
    credits: 10,
    semester: 'ambos',
    originalSemester: 10,
    area: 'Ciencias Básicas',
    prerequisites: [{ or: ['QIF102', 'QIF102A'] }]
  },
  {
    id: 'QIF107',
    code: 'QIF107',
    name: 'Legislación y deontología farmacéutica',
    credits: 5,
    semester: 'ambos',
    originalSemester: 10,
    area: 'Ciencias Básicas',
    prerequisites: [{ or: ['QFF3702', 'QIF101', 'QIF101A'] }]
  },
  {
    id: 'OP2',
    code: 'OP2',
    name: 'Optativo de profundización 2',
    credits: 10,
    semester: 'ambos',
    originalSemester: 10,
    area: 'Ciencias Básicas'
  },
  {
    id: 'OP3',
    code: 'OP3',
    name: 'Optativo de profundización 3',
    credits: 10,
    semester: 'ambos',
    originalSemester: 10,
    area: 'Ciencias Básicas'
  },
  {
    id: 'QIF114A',
    code: 'QIF114A',
    name: 'Práctica profesional II',
    credits: 0,
    semester: 'ambos',
    originalSemester: 10,
    area: 'Ciencias Básicas',
    prerequisites: ['QIF102A', 'QIF105A']
  },
  {
    id: 'FG1',
    code: 'FG1',
    name: 'Formación general 1',
    credits: 10,
    semester: 'ambos',
    originalSemester: 2,
    area: 'Ciencias Básicas'
  },
  {
    id: 'FG2',
    code: 'FG2',
    name: 'Formación general 2',
    credits: 10,
    semester: 'ambos',
    originalSemester: 2,
    area: 'Ciencias Básicas'
  },
  {
    id: 'FG3',
    code: 'FG3',
    name: 'Formación general 3',
    credits: 10,
    semester: 'ambos',
    originalSemester: 3,
    area: 'Ciencias Básicas'
  },
  {
    id: 'FG4',
    code: 'FG4',
    name: 'Formación general 4',
    credits: 10,
    semester: 'ambos',
    originalSemester: 4,
    area: 'Ciencias Básicas'
  },
  {
    id: 'FG5',
    code: 'FG5',
    name: 'Formación general 5',
    credits: 10,
    semester: 'ambos',
    originalSemester: 6,
    area: 'Ciencias Básicas'
  },

  {
    id: 'FG6',
    code: 'FG6',
    name: 'Formación general 6',
    credits: 10,
    semester: 'ambos',
    originalSemester: 7,
    area: 'Ciencias Básicas'
  }
]

// EJEMPLOS DE PREREQUISITOS COMPLEJOS (comentados para referencia futura):
//
// Ejemplo 1: Requiere (QIM104 O QIM104A O QQO2401) Y (QIM150 O QIM150A O QQF360A)
// {
//   id: 'QIF101A',
//   code: 'QIF101A',
//   name: 'Química Inorgánica y Analítica',
//   credits: 10,
//   semester: 'ambos',
//   originalSemester: 3,
//   area: 'Ciencias Básicas',
//   prerequisites: [
//     { or: ['QIM104', 'QIM104A', 'QQO2401'] },
//     { or: ['QIM150', 'QIM150A', 'QQF360A'] }
//   ]
// }
//
// Ejemplo 2: Requiere solo un curso de varios
// {
//   id: 'CURSO_EJEMPLO',
//   code: 'CURSO_EJEMPLO',
//   name: 'Curso de Ejemplo',
//   credits: 10,
//   semester: 'ambos',
//   originalSemester: 4,
//   area: 'Farmacia',
//   prerequisites: [{ or: ['MAT021', 'MAT022', 'MAT023'] }]
// }
//
// Ejemplo 3: Requiere múltiples cursos específicos (AND simple)
// {
//   id: 'OTRO_EJEMPLO',
//   code: 'OTRO_EJEMPLO',
//   name: 'Otro Ejemplo',
//   credits: 10,
//   semester: 'par',
//   originalSemester: 5,
//   area: 'Farmacia',
//   prerequisites: ['BIO220', 'QUI220'] // Requiere BIO220 Y QUI220
// }
