import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import type { Course, SemesterPlan, PlannerState } from '@/types/course'
import { COURSES_DATA } from '@/data/courses'
import { arePrerequisitesMet, getPrerequisitesDescription } from '@/utils/prerequisites'

const STORAGE_KEY = 'planner-bonita-state-v4' // v4: Asignaturas en semestres originales
const STORAGE_VERSION = 4

// Semestre actual: 2025-2 (semestre 4)
const CURRENT_SEMESTER = 4
const CURRENT_YEAR = 2025
const CURRENT_PERIOD = 2

export const usePlannerStore = defineStore('planner', () => {
  // State
  const availableCourses = ref<Course[]>([])
  const semesters = ref<SemesterPlan[]>([])

  // Computed
  const totalPlannedCredits = computed(() => {
    return semesters.value.reduce((total, semester) => {
      const semesterCredits = semester.courses.reduce((sum, course) => sum + course.credits, 0)
      return total + semesterCredits
    }, 0)
  })

  const totalCredits = computed(() => {
    return COURSES_DATA.reduce((sum, course) => sum + course.credits, 0)
  })

  // Helper function to calculate year and period
  function calculateYearAndPeriod(semesterNumber: number): { year: number; period: number } {
    // Semestre 4 es 2025-2
    // Calcular cuántos semestres hay de diferencia
    const diff = semesterNumber - CURRENT_SEMESTER

    let year = CURRENT_YEAR
    let period = CURRENT_PERIOD

    // Avanzar o retroceder semestres
    for (let i = 0; i < Math.abs(diff); i++) {
      if (diff > 0) {
        // Avanzar
        period++
        if (period > 2) {
          period = 1
          year++
        }
      } else {
        // Retroceder
        period--
        if (period < 1) {
          period = 2
          year--
        }
      }
    }

    return { year, period }
  }

  // Actions
  function initializePlanner() {
    // Intentar cargar desde localStorage
    const savedState = loadFromStorage()

    if (savedState) {
      availableCourses.value = savedState.availableCourses

      // Migrar datos antiguos: agregar year, period, isCurrent si no existen
      semesters.value = savedState.semesters.map((sem) => {
        const { year, period } = calculateYearAndPeriod(sem.number)
        return {
          ...sem,
          year: sem.year ?? year,
          period: sem.period ?? period,
          isCurrent: sem.isCurrent ?? (sem.number === CURRENT_SEMESTER),
          maxCredits: sem.maxCredits ?? 50
        }
      })

      // Guardar datos migrados
      saveToStorage()
    } else {
      // Crear 10 semestres iniciales (carrera completa)
      semesters.value = Array.from({ length: 10 }, (_, i) => {
        const semesterNumber = i + 1
        const { year, period } = calculateYearAndPeriod(semesterNumber)
        return {
          number: semesterNumber,
          type: semesterNumber % 2 === 0 ? 'par' : 'impar',
          year,
          period,
          courses: [],
          maxCredits: 50,
          isCurrent: semesterNumber === CURRENT_SEMESTER
        }
      })

      // Asignar cada curso a su semestre original
      COURSES_DATA.forEach((course) => {
        const semester = semesters.value.find((s) => s.number === course.originalSemester)
        if (semester) {
          semester.courses.push({ ...course })
        }
      })

      // availableCourses empieza vacío (todos están en sus semestres)
      availableCourses.value = []
    }
  }

  function addCourseToSemester(courseId: string, semesterNumber: number): boolean {
    const course = availableCourses.value.find((c) => c.id === courseId)
    if (!course) return false

    const semester = semesters.value.find((s) => s.number === semesterNumber)
    if (!semester) return false

    // Validar que el curso se puede dictar en este tipo de semestre
    if (!canCourseBeInSemester(course, semester)) {
      return false
    }

    // Remover de disponibles y agregar al semestre
    availableCourses.value = availableCourses.value.filter((c) => c.id !== courseId)
    semester.courses.push(course)

    saveToStorage()
    return true
  }

  function removeCourseFromSemester(courseId: string, semesterNumber: number): boolean {
    const semester = semesters.value.find((s) => s.number === semesterNumber)
    if (!semester) return false

    const courseIndex = semester.courses.findIndex((c) => c.id === courseId)
    if (courseIndex === -1) return false

    const [course] = semester.courses.splice(courseIndex, 1)
    availableCourses.value.push(course)

    saveToStorage()
    return true
  }

  function moveCourse(
    courseId: string,
    fromSemester: number,
    toSemester: number
  ): boolean {
    const sourceSemester = semesters.value.find((s) => s.number === fromSemester)
    const targetSemester = semesters.value.find((s) => s.number === toSemester)

    if (!sourceSemester || !targetSemester) return false

    const courseIndex = sourceSemester.courses.findIndex((c) => c.id === courseId)
    if (courseIndex === -1) return false

    const course = sourceSemester.courses[courseIndex]

    // Validar que el curso se puede dictar en el semestre destino
    if (!canCourseBeInSemester(course, targetSemester)) {
      return false
    }

    sourceSemester.courses.splice(courseIndex, 1)
    targetSemester.courses.push(course)

    saveToStorage()
    return true
  }

  function canCourseBeInSemester(course: Course, semester: SemesterPlan): boolean {
    // Si el curso se dicta en ambos semestres, siempre puede
    if (course.semester === 'ambos') return true

    // Si no, debe coincidir el tipo de semestre
    return course.semester === semester.type
  }

  function addNewSemester() {
    const newNumber = semesters.value.length + 1
    const newType = newNumber % 2 === 0 ? 'par' : 'impar'
    const { year, period } = calculateYearAndPeriod(newNumber)

    semesters.value.push({
      number: newNumber,
      type: newType,
      year,
      period,
      courses: [],
      maxCredits: 30,
      isCurrent: newNumber === CURRENT_SEMESTER
    })

    saveToStorage()
  }

  function removeSemester(semesterNumber: number) {
    const semester = semesters.value.find((s) => s.number === semesterNumber)
    if (!semester) return

    // Devolver todos los cursos a disponibles
    availableCourses.value.push(...semester.courses)

    // Remover el semestre
    semesters.value = semesters.value.filter((s) => s.number !== semesterNumber)

    // Renumerar semestres y recalcular year/period
    semesters.value.forEach((s, index) => {
      const newNumber = index + 1
      const { year, period } = calculateYearAndPeriod(newNumber)
      s.number = newNumber
      s.type = newNumber % 2 === 0 ? 'par' : 'impar'
      s.year = year
      s.period = period
      s.isCurrent = newNumber === CURRENT_SEMESTER
    })

    saveToStorage()
  }

  function resetPlanner() {
    // Crear 10 semestres vacíos
    semesters.value = Array.from({ length: 10 }, (_, i) => {
      const semesterNumber = i + 1
      const { year, period } = calculateYearAndPeriod(semesterNumber)
      return {
        number: semesterNumber,
        type: semesterNumber % 2 === 0 ? 'par' : 'impar',
        year,
        period,
        courses: [],
        maxCredits: 50,
        isCurrent: semesterNumber === CURRENT_SEMESTER
      }
    })

    // Asignar cada curso a su semestre original
    COURSES_DATA.forEach((course) => {
      const semester = semesters.value.find((s) => s.number === course.originalSemester)
      if (semester) {
        semester.courses.push({ ...course })
      }
    })

    // availableCourses empieza vacío
    availableCourses.value = []

    saveToStorage()
  }

  function getSemesterCredits(semesterNumber: number): number {
    const semester = semesters.value.find((s) => s.number === semesterNumber)
    if (!semester) return 0
    return semester.courses.reduce((sum, course) => sum + course.credits, 0)
  }

  /**
   * Obtiene los IDs de todos los cursos en semestres anteriores al especificado
   * (asumimos que estos cursos ya fueron completados)
   */
  function getCompletedCourseIds(beforeSemester: number): string[] {
    return semesters.value
      .filter((s) => s.number < beforeSemester)
      .flatMap((s) => s.courses.map((c) => c.id))
  }

  /**
   * Verifica si un curso cumple con sus prerequisitos dado un semestre específico
   */
  function checkPrerequisites(course: Course, semesterNumber: number): {
    met: boolean
    description: string
  } {
    const completedIds = getCompletedCourseIds(semesterNumber)
    const met = arePrerequisitesMet(course, completedIds)
    const description = getPrerequisitesDescription(course)

    return { met, description }
  }

  // Storage functions
  function saveToStorage() {
    const state: PlannerState = {
      availableCourses: availableCourses.value,
      semesters: semesters.value
    }
    localStorage.setItem(STORAGE_KEY, JSON.stringify(state))
  }

  function loadFromStorage(): PlannerState | null {
    const saved = localStorage.getItem(STORAGE_KEY)
    if (!saved) return null

    try {
      return JSON.parse(saved)
    } catch {
      return null
    }
  }

  return {
    // State
    availableCourses,
    semesters,
    // Computed
    totalPlannedCredits,
    totalCredits,
    // Actions
    initializePlanner,
    addCourseToSemester,
    removeCourseFromSemester,
    moveCourse,
    canCourseBeInSemester,
    addNewSemester,
    removeSemester,
    resetPlanner,
    getSemesterCredits,
    getCompletedCourseIds,
    checkPrerequisites
  }
})
