<script setup lang="ts">
import { onMounted, ref, computed } from 'vue'
import { usePlannerStore } from '@/stores/planner'
import CourseCard from '@/components/CourseCard.vue'
import SemesterPanel from '@/components/SemesterPanel.vue'
import type { Course } from '@/types/course'

const plannerStore = usePlannerStore()
const draggedCourseId = ref<string | null>(null)
const draggedFromSemester = ref<number | null>(null)
const searchQuery = ref('')
const filterArea = ref('all')

onMounted(() => {
  plannerStore.initializePlanner()
})

// Computed
const filteredCourses = computed(() => {
  let courses = plannerStore.availableCourses

  // Filtrar por búsqueda
  if (searchQuery.value) {
    const query = searchQuery.value.toLowerCase()
    courses = courses.filter(
      (c) =>
        c.name.toLowerCase().includes(query) ||
        c.code.toLowerCase().includes(query) ||
        c.area.toLowerCase().includes(query)
    )
  }

  // Filtrar por área
  if (filterArea.value !== 'all') {
    courses = courses.filter((c) => c.area === filterArea.value)
  }

  return courses
})

const courseAreas = computed(() => {
  const areas = new Set(plannerStore.availableCourses.map((c) => c.area))
  return Array.from(areas).sort()
})

const progressPercentage = computed(() => {
  if (plannerStore.totalCredits === 0) return 0
  return Math.round((plannerStore.totalPlannedCredits / plannerStore.totalCredits) * 100)
})

// Handlers
function handleDrop(courseId: string, semesterNumber: number) {
  // Si viene de asignaturas disponibles
  if (draggedFromSemester.value === null) {
    const success = plannerStore.addCourseToSemester(courseId, semesterNumber)
    if (!success) {
      alert('Esta asignatura no se puede agregar a este semestre (verifica par/impar)')
    }
  }
  // Si viene de otro semestre
  else {
    const success = plannerStore.moveCourse(courseId, draggedFromSemester.value, semesterNumber)
    if (!success) {
      alert('Esta asignatura no se puede mover a este semestre (verifica par/impar)')
    }
  }

  draggedCourseId.value = null
  draggedFromSemester.value = null
}

function handleAvailableCourseDragStart(course: Course) {
  draggedCourseId.value = course.id
  draggedFromSemester.value = null
}

function handleSemesterCourseDragStart(course: Course, fromSemester: number) {
  draggedCourseId.value = course.id
  draggedFromSemester.value = fromSemester
}

function handleDragEnd() {
  draggedCourseId.value = null
  draggedFromSemester.value = null
}

function handleRemoveSemester(semesterNumber: number) {
  if (confirm(`¿Eliminar el Semestre ${semesterNumber}?`)) {
    plannerStore.removeSemester(semesterNumber)
  }
}

function handleAddSemester() {
  plannerStore.addNewSemester()
}

function handleReset() {
  if (confirm('¿Resetear toda la planificación? Esto devolverá todas las asignaturas a sus semestres originales.')) {
    plannerStore.resetPlanner()
  }
}

function handleCourseRemove(course: Course, fromSemester: number) {
  plannerStore.removeCourseFromSemester(course.id, fromSemester)
}
</script>

<template>
  <div class="planner-view">
    <!-- Header -->
    <header class="planner-header">
      <div class="header-content">
        <div class="title-section">
          <h1>Planificador Académico</h1>
          <p class="subtitle">Química y Farmacia - USM</p>
        </div>
        <div class="progress-section">
          <div class="progress-info">
            <span class="progress-label">Progreso</span>
            <span class="progress-stats">
              {{ plannerStore.totalPlannedCredits }} / {{ plannerStore.totalCredits }} créditos
            </span>
          </div>
          <div class="progress-bar">
            <div class="progress-fill" :style="{ width: `${progressPercentage}%` }"></div>
          </div>
          <span class="progress-percentage">{{ progressPercentage }}%</span>
        </div>
      </div>
    </header>

    <div class="planner-container">
      <!-- Sidebar: Asignaturas disponibles -->
      <aside class="courses-sidebar">
        <div class="sidebar-header">
          <h2>Asignaturas Disponibles</h2>
          <span class="courses-count">{{ filteredCourses.length }}</span>
        </div>

        <div class="sidebar-filters">
          <input
            v-model="searchQuery"
            type="text"
            placeholder="Buscar por código o nombre..."
            class="search-input"
          />

          <select v-model="filterArea" class="filter-select">
            <option value="all">Todas las áreas</option>
            <option v-for="area in courseAreas" :key="area" :value="area">
              {{ area }}
            </option>
          </select>
        </div>

        <div class="courses-list">
          <CourseCard
            v-for="course in filteredCourses"
            :key="course.id"
            :course="course"
            :is-dragging="draggedCourseId === course.id"
            @dragstart="handleAvailableCourseDragStart(course)"
            @dragend="handleDragEnd"
          />

          <div v-if="filteredCourses.length === 0" class="no-courses">
            <p>No hay asignaturas disponibles</p>
          </div>
        </div>
      </aside>

      <!-- Main: Planificación de semestres -->
      <main class="semesters-main">
        <div class="semesters-header">
          <h2>Tu Planificación</h2>
          <div class="header-actions">
            <button class="btn btn-secondary" @click="handleReset">Resetear</button>
            <button class="btn btn-primary" @click="handleAddSemester">+ Agregar Semestre</button>
          </div>
        </div>

        <div class="semesters-grid">
          <SemesterPanel
            v-for="semester in plannerStore.semesters"
            :key="semester.number"
            :semester="semester"
            :can-remove="plannerStore.semesters.length > 1"
            @drop="handleDrop"
            @remove-semester="handleRemoveSemester"
            @course-drag-start="handleSemesterCourseDragStart"
            @course-drag-end="handleDragEnd"
            @course-remove="handleCourseRemove"
          />
        </div>

        <div v-if="plannerStore.semesters.length === 0" class="no-semesters">
          <p>No hay semestres planificados</p>
          <button class="btn btn-primary" @click="handleAddSemester">
            Crear primer semestre
          </button>
        </div>
      </main>
    </div>
  </div>
</template>

<style scoped>
.planner-view {
  min-height: 100vh;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  padding: 24px;
}

.planner-header {
  background: white;
  border-radius: 16px;
  padding: 24px;
  margin-bottom: 24px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
}

.header-content {
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 32px;
  flex-wrap: wrap;
}

.title-section h1 {
  font-size: 28px;
  font-weight: 800;
  color: #1e293b;
  margin: 0 0 4px 0;
}

.subtitle {
  font-size: 16px;
  color: #64748b;
  margin: 0;
}

.progress-section {
  display: flex;
  align-items: center;
  gap: 16px;
  min-width: 300px;
}

.progress-info {
  display: flex;
  flex-direction: column;
  gap: 4px;
}

.progress-label {
  font-size: 12px;
  font-weight: 600;
  color: #64748b;
  text-transform: uppercase;
  letter-spacing: 0.5px;
}

.progress-stats {
  font-size: 14px;
  font-weight: 700;
  color: #1e293b;
}

.progress-bar {
  flex: 1;
  height: 12px;
  background: #e2e8f0;
  border-radius: 12px;
  overflow: hidden;
}

.progress-fill {
  height: 100%;
  background: linear-gradient(90deg, #3b82f6 0%, #8b5cf6 100%);
  transition: width 0.5s ease;
  border-radius: 12px;
}

.progress-percentage {
  font-size: 16px;
  font-weight: 700;
  color: #1e293b;
  min-width: 50px;
  text-align: right;
}

.planner-container {
  display: flex;
  flex-direction: column;
  gap: 24px;
}

/* Sidebar */
.courses-sidebar {
  background: white;
  border-radius: 16px;
  padding: 20px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  max-height: 500px;
  display: flex;
  flex-direction: column;
}

.sidebar-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 16px;
}

.sidebar-header h2 {
  font-size: 18px;
  font-weight: 700;
  color: #1e293b;
  margin: 0;
}

.courses-count {
  background: #f1f5f9;
  color: #64748b;
  font-weight: 700;
  font-size: 14px;
  padding: 4px 12px;
  border-radius: 12px;
}

.sidebar-filters {
  display: flex;
  flex-direction: column;
  gap: 12px;
  margin-bottom: 16px;
}

.search-input,
.filter-select {
  width: 100%;
  padding: 10px 12px;
  border: 2px solid #e2e8f0;
  border-radius: 8px;
  font-size: 14px;
  transition: all 0.2s;
}

.search-input:focus,
.filter-select:focus {
  outline: none;
  border-color: #3b82f6;
}

.courses-list {
  flex: 1;
  overflow-y: auto;
  display: flex;
  flex-direction: column;
  gap: 12px;
  padding-right: 8px;
}

.courses-list::-webkit-scrollbar {
  width: 6px;
}

.courses-list::-webkit-scrollbar-track {
  background: #f1f5f9;
  border-radius: 3px;
}

.courses-list::-webkit-scrollbar-thumb {
  background: #cbd5e1;
  border-radius: 3px;
}

.courses-list::-webkit-scrollbar-thumb:hover {
  background: #94a3b8;
}

.no-courses {
  text-align: center;
  padding: 40px 20px;
  color: #94a3b8;
}

/* Main content */
.semesters-main {
  background: white;
  border-radius: 16px;
  padding: 24px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  min-height: 500px;
}

.semesters-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 24px;
  flex-wrap: wrap;
  gap: 16px;
}

.semesters-header h2 {
  font-size: 20px;
  font-weight: 700;
  color: #1e293b;
  margin: 0;
}

.header-actions {
  display: flex;
  gap: 12px;
}

.btn {
  padding: 10px 20px;
  border: none;
  border-radius: 8px;
  font-size: 14px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s;
}

.btn-primary {
  background: linear-gradient(135deg, #3b82f6 0%, #8b5cf6 100%);
  color: white;
}

.btn-primary:hover {
  transform: translateY(-2px);
  box-shadow: 0 4px 12px rgba(59, 130, 246, 0.4);
}

.btn-secondary {
  background: #f1f5f9;
  color: #64748b;
}

.btn-secondary:hover {
  background: #e2e8f0;
}

.semesters-grid {
  display: flex;
  gap: 24px;
  overflow-x: auto;
  padding-bottom: 20px;
  scroll-behavior: smooth;
}

.semesters-grid::-webkit-scrollbar {
  height: 10px;
}

.semesters-grid::-webkit-scrollbar-track {
  background: #f1f5f9;
  border-radius: 5px;
}

.semesters-grid::-webkit-scrollbar-thumb {
  background: linear-gradient(90deg, #3b82f6 0%, #8b5cf6 100%);
  border-radius: 5px;
}

.semesters-grid::-webkit-scrollbar-thumb:hover {
  background: linear-gradient(90deg, #2563eb 0%, #7c3aed 100%);
}

/* Hacer que cada semestre tenga un ancho fijo para la línea temporal */
.semesters-grid > * {
  min-width: 380px;
  max-width: 380px;
  flex-shrink: 0;
}

.no-semesters {
  text-align: center;
  padding: 60px 20px;
  color: #94a3b8;
}

.no-semesters p {
  margin-bottom: 20px;
  font-size: 16px;
}

/* Responsive */
@media (max-width: 1024px) {
  .courses-sidebar {
    max-height: 350px;
  }

  .semesters-grid > * {
    min-width: 320px;
    max-width: 320px;
  }
}

@media (max-width: 640px) {
  .planner-view {
    padding: 16px;
  }

  .header-content {
    flex-direction: column;
    align-items: stretch;
  }

  .progress-section {
    min-width: auto;
  }

  .semesters-grid > * {
    min-width: 280px;
    max-width: 280px;
  }

  .courses-sidebar {
    max-height: 300px;
  }
}
</style>
