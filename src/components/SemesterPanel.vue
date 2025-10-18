<template>
  <div
    class="semester-panel"
    :class="panelClasses"
    @dragover.prevent="handleDragOver"
    @dragleave="handleDragLeave"
    @drop="handleDrop"
    @touchmove.prevent="handleTouchMove"
  >
    <div class="semester-header">
      <div class="semester-title">
        <div class="semester-number-wrapper">
          <h3>Semestre {{ semester.number }}</h3>
          <span v-if="semester.isCurrent" class="current-badge">Actual</span>
        </div>
        <div class="semester-meta">
          <span class="semester-period">{{ semester.year }}-{{ semester.period }}</span>
          <span class="semester-type-badge" :class="typeBadgeClass">
            {{ typeLabel }}
          </span>
        </div>
      </div>
      <div class="semester-stats">
        <span class="credits-count">{{ totalCredits }} / {{ semester.maxCredits }} cr</span>
        <div v-if="isOverloaded" class="warning-message">⚠️ Excede el límite de créditos</div>
      </div>
    </div>

    <div class="courses-container" :class="{ 'is-empty': semester.courses.length === 0 }">
      <transition-group name="course-list" tag="div" class="courses-list">
        <CourseCard
          v-for="course in semester.courses"
          :key="course.id"
          :course="course"
          :show-remove-button="false"
          :prerequisites-met="plannerStore.checkPrerequisites(course, semester.number).met"
          :prerequisites-description="
            plannerStore.checkPrerequisites(course, semester.number).description
          "
          @dragstart="handleCourseDragStart(course)"
          @dragend="handleCourseDragEnd"
          @touchdragstart="handleCourseTouchStart"
          @touchdragend="handleCourseTouchEnd"
        />
      </transition-group>

      <div v-if="semester.courses.length === 0" class="empty-message">
        <p>Arrastra asignaturas aquí</p>
        <p class="empty-hint">{{ emptyHint }}</p>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, ref } from 'vue'
import type { Course, SemesterPlan } from '@/types/course'
import CourseCard from './CourseCard.vue'
import { usePlannerStore } from '@/stores/planner'

interface Props {
  semester: SemesterPlan
}

const props = defineProps<Props>()
const plannerStore = usePlannerStore()

const emit = defineEmits<{
  drop: [courseId: string, semesterNumber: number]
  courseDragStart: [course: Course, fromSemester: number]
  courseDragEnd: []
}>()

const isDragOver = ref(false)
const draggedCourse = ref<Course | null>(null)
const touchDraggedCourse = ref<Course | null>(null)

const typeLabel = computed(() => {
  return props.semester.type === 'par' ? 'Par' : 'Impar'
})

const typeBadgeClass = computed(() => {
  return `type-${props.semester.type}`
})

const totalCredits = computed(() => {
  return props.semester.courses.reduce((sum, course) => sum + course.credits, 0)
})

const isOverloaded = computed(() => {
  if (!props.semester.maxCredits) return false
  return totalCredits.value > props.semester.maxCredits
})

const emptyHint = computed(() => {
  return `Solo asignaturas de semestre ${typeLabel.value.toLowerCase()} o ambos`
})

const panelClasses = computed(() => {
  return {
    'is-drag-over': isDragOver.value,
    'is-overloaded': isOverloaded.value,
    [`semester-${props.semester.type}`]: true
  }
})

function handleDragOver(event: DragEvent) {
  if (!event.dataTransfer) return

  const type = event.dataTransfer.types.includes('courseid') ? 'course' : 'unknown'
  if (type !== 'course') return

  event.preventDefault()
  isDragOver.value = true
  event.dataTransfer.dropEffect = 'move'
}

function handleDragLeave() {
  isDragOver.value = false
}

function handleDrop(event: DragEvent) {
  event.preventDefault()
  isDragOver.value = false

  if (!event.dataTransfer) return

  const courseId = event.dataTransfer.getData('courseId')
  if (!courseId) return

  emit('drop', courseId, props.semester.number)
}

function handleCourseDragStart(course: Course) {
  draggedCourse.value = course
  emit('courseDragStart', course, props.semester.number)
}

function handleCourseDragEnd() {
  draggedCourse.value = null
  emit('courseDragEnd')
}

// Touch handlers for mobile
function handleCourseTouchStart(course: Course) {
  touchDraggedCourse.value = course
  emit('courseDragStart', course, props.semester.number)
}

function handleCourseTouchEnd(course: Course, touch: Touch) {
  if (!touchDraggedCourse.value) return

  // Encontrar el elemento en las coordenadas del touch
  const element = document.elementFromPoint(touch.clientX, touch.clientY)
  if (!element) {
    touchDraggedCourse.value = null
    emit('courseDragEnd')
    return
  }

  // Buscar el semestre panel más cercano
  const semesterPanel = element.closest('.semester-panel')
  if (semesterPanel) {
    const semesterNumber = parseInt(
      semesterPanel.querySelector('.semester-title h3')?.textContent?.match(/\d+/)?.[0] || '0'
    )
    if (semesterNumber > 0) {
      emit('drop', course.id, semesterNumber)
    }
  }

  touchDraggedCourse.value = null
  emit('courseDragEnd')
}

function handleTouchMove(event: TouchEvent) {
  if (!touchDraggedCourse.value) return

  const touch = event.touches[0]
  if (!touch) return

  // Verificar si el touch está sobre este semestre
  const element = document.elementFromPoint(touch.clientX, touch.clientY)
  const isOverThisSemester = element?.closest('.semester-panel') === event.currentTarget

  isDragOver.value = isOverThisSemester
}
</script>

<style scoped>
.semester-panel {
  background: #f8fafc;
  border: 2px solid #e2e8f0;
  border-radius: 12px;
  padding: 16px;
  min-height: 700px;
  max-height: 700px;
  display: flex;
  flex-direction: column;
  transition: all 0.3s ease;
  position: relative;
}

.semester-panel.semester-par {
  background: #eff6ff;
  border-color: #bfdbfe;
}

.semester-panel.semester-impar {
  background: #fefce8;
  border-color: #fde68a;
}

.semester-panel.is-drag-over {
  border-color: #3b82f6;
  background: #dbeafe;
  box-shadow: 0 0 0 4px rgba(59, 130, 246, 0.1);
}

.semester-panel.is-overloaded {
  border-color: #ef4444;
}

/* Efecto de brillo para el semestre actual */
.semester-panel:has(.current-badge) {
  border-color: #10b981;
  box-shadow: 0 0 0 3px rgba(16, 185, 129, 0.1);
}

.semester-header {
  margin-bottom: 12px;
  flex-shrink: 0;
}

.semester-title {
  display: flex;
  flex-direction: column;
  gap: 6px;
  margin-bottom: 6px;
}

.semester-number-wrapper {
  display: flex;
  align-items: center;
  gap: 8px;
}

.semester-title h3 {
  font-size: 16px;
  font-weight: 700;
  color: #1e293b;
  margin: 0;
}

.current-badge {
  background: linear-gradient(135deg, #10b981 0%, #059669 100%);
  color: white;
  font-size: 9px;
  font-weight: 700;
  padding: 3px 8px;
  border-radius: 10px;
  text-transform: uppercase;
  letter-spacing: 0.3px;
  box-shadow: 0 1px 3px rgba(16, 185, 129, 0.3);
}

.semester-meta {
  display: flex;
  align-items: center;
  gap: 8px;
}

.semester-period {
  font-size: 12px;
  font-weight: 600;
  color: #64748b;
  background: #f1f5f9;
  padding: 3px 10px;
  border-radius: 10px;
}

.semester-type-badge {
  font-size: 10px;
  font-weight: 600;
  padding: 3px 10px;
  border-radius: 10px;
  text-transform: uppercase;
  letter-spacing: 0.3px;
}

.semester-type-badge.type-par {
  background: #3b82f6;
  color: white;
}

.semester-type-badge.type-impar {
  background: #eab308;
  color: white;
}

.semester-stats {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.credits-count {
  font-size: 12px;
  font-weight: 600;
  color: #64748b;
}

.courses-container {
  flex: 1;
  position: relative;
  overflow-y: auto;
  overflow-x: hidden;
}

.courses-container::-webkit-scrollbar {
  width: 6px;
}

.courses-container::-webkit-scrollbar-track {
  background: transparent;
}

.courses-container::-webkit-scrollbar-thumb {
  background: #cbd5e1;
  border-radius: 3px;
}

.courses-container::-webkit-scrollbar-thumb:hover {
  background: #94a3b8;
}

.courses-list {
  display: flex;
  flex-direction: column;
  gap: 8px;
  padding-right: 4px;
}

.empty-message {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  text-align: center;
  color: #94a3b8;
  pointer-events: none;
}

.empty-message p {
  margin: 4px 0;
  font-size: 14px;
  font-weight: 500;
}

.empty-hint {
  font-size: 12px;
  font-style: italic;
}

.warning-message {
  padding: 5px 5px;
  background: #fee2e2;
  border: 1px solid #fecaca;
  border-radius: 6px;
  color: #991b1b;
  font-size: 10px;
  font-weight: 600;
  text-align: center;
  flex-shrink: 0;
}

/* Animaciones de transición */
.course-list-move {
  transition: transform 0.3s ease;
}

.course-list-enter-active,
.course-list-leave-active {
  transition: all 0.3s ease;
}

.course-list-enter-from {
  opacity: 0;
  transform: translateX(-20px);
}

.course-list-leave-to {
  opacity: 0;
  transform: translateX(20px);
}
</style>
