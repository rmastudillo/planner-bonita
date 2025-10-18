// Tipos para manejar prerequisitos con lógica booleana
export type PrerequisiteExpression =
  | string // ID de un solo curso
  | { or: string[] } // Cualquiera de estos cursos (OR)
  | { and: PrerequisiteExpression[] } // Todos estos cursos (AND)

export interface Course {
  id: string
  code: string
  name: string
  credits: number
  semester: 'par' | 'impar' | 'ambos' // Indica en qué tipo de semestre se dicta
  originalSemester: number // Semestre original en la malla (1-10)
  area: string // Ciencias Básicas, Farmacia, etc.
  prerequisites?: PrerequisiteExpression[] // Array de prerequisitos (conectados con AND)
  // Ejemplos:
  // ['QUI110'] - Requiere QUI110
  // [{ or: ['QIM104', 'QIM104A'] }] - Requiere QIM104 O QIM104A
  // [{ or: ['A', 'B'] }, { or: ['C', 'D'] }] - Requiere (A O B) Y (C O D)
}

export interface SemesterPlan {
  number: number // 1, 2, 3, etc.
  type: 'par' | 'impar' // Si es semestre par o impar
  year: number // Año del semestre (ej: 2025)
  period: number // Periodo del semestre (1 o 2)
  courses: Course[]
  maxCredits?: number // Límite de créditos (opcional)
  isCurrent?: boolean // Si es el semestre actual
}

export interface PlannerState {
  availableCourses: Course[] // Pool de asignaturas disponibles
  semesters: SemesterPlan[] // Semestres planificados
}
