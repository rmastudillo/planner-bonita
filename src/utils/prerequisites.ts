import type { Course, PrerequisiteExpression } from '@/types/course'

/**
 * Evalúa si los prerequisitos de un curso se cumplen dado un conjunto de cursos completados
 * @param course - El curso a evaluar
 * @param completedCourseIds - IDs de los cursos que el estudiante ya completó
 * @returns true si todos los prerequisitos se cumplen, false en caso contrario
 */
export function arePrerequisitesMet(
  course: Course,
  completedCourseIds: string[]
): boolean {
  // Si no hay prerequisitos, siempre están cumplidos
  if (!course.prerequisites || course.prerequisites.length === 0) {
    return true
  }

  // Todos los elementos del array de prerequisites deben cumplirse (AND implícito)
  return course.prerequisites.every((prereq) =>
    evaluatePrerequisiteExpression(prereq, completedCourseIds)
  )
}

/**
 * Evalúa una expresión de prerequisito individual
 */
function evaluatePrerequisiteExpression(
  expression: PrerequisiteExpression,
  completedCourseIds: string[]
): boolean {
  // Caso 1: Es un string (ID de un solo curso)
  if (typeof expression === 'string') {
    return completedCourseIds.includes(expression)
  }

  // Caso 2: Es un objeto con 'or' - al menos uno debe cumplirse
  if ('or' in expression) {
    return expression.or.some((courseId) => completedCourseIds.includes(courseId))
  }

  // Caso 3: Es un objeto con 'and' - todos deben cumplirse (anidado)
  if ('and' in expression) {
    return expression.and.every((subExpr) =>
      evaluatePrerequisiteExpression(subExpr, completedCourseIds)
    )
  }

  return false
}

/**
 * Obtiene una descripción legible de los prerequisitos de un curso
 * @param course - El curso
 * @returns String describiendo los prerequisitos
 */
export function getPrerequisitesDescription(course: Course): string {
  if (!course.prerequisites || course.prerequisites.length === 0) {
    return 'Sin prerequisitos'
  }

  const descriptions = course.prerequisites.map((prereq) =>
    describePrerequisiteExpression(prereq)
  )

  // Si hay múltiples grupos, conectarlos con "Y"
  if (descriptions.length > 1) {
    return descriptions.map((d) => `(${d})`).join(' Y ')
  }

  return descriptions[0]
}

/**
 * Describe una expresión de prerequisito individual
 */
function describePrerequisiteExpression(expression: PrerequisiteExpression): string {
  if (typeof expression === 'string') {
    return expression
  }

  if ('or' in expression) {
    return expression.or.join(' O ')
  }

  if ('and' in expression) {
    const parts = expression.and.map((e) => describePrerequisiteExpression(e))
    return parts.map((p) => `(${p})`).join(' Y ')
  }

  return ''
}

/**
 * Obtiene todos los IDs de cursos mencionados en los prerequisitos
 * (útil para mostrar qué cursos son prerequisitos)
 */
export function getAllPrerequisiteCourseIds(course: Course): string[] {
  if (!course.prerequisites || course.prerequisites.length === 0) {
    return []
  }

  const ids = new Set<string>()

  function extractIds(expression: PrerequisiteExpression) {
    if (typeof expression === 'string') {
      ids.add(expression)
    } else if ('or' in expression) {
      expression.or.forEach((id) => ids.add(id))
    } else if ('and' in expression) {
      expression.and.forEach((e) => extractIds(e))
    }
  }

  course.prerequisites.forEach((prereq) => extractIds(prereq))

  return Array.from(ids)
}
