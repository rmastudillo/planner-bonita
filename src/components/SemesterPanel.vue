<template>
  <div
    class="semester-panel"
    :class="panelClasses"
    @dragover.prevent="handleDragOver"
    @dragleave="handleDragLeave"
    @drop="handleDrop"
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
        <button
          v-if="canRemove"
          class="remove-button"
          @click="handleRemoveSemester"
          title="Eliminar semestre"
        >
          ×
        </button>
      </div>
    </div>

    <div class="courses-container" :class="{ 'is-empty': semester.courses.length === 0 }">
      <transition-group name="course-list" tag="div" class="courses-list">
        <CourseCard
          v-for="course in semester.courses"
          :key="course.id"
          :course="course"
          :show-remove-button="true"
          @dragstart="handleCourseDragStart(course)"
          @dragend="handleCourseDragEnd"
          @remove="handleCourseRemove"
        />
      </transition-group>

      <div v-if="semester.courses.length === 0" class="empty-message">
        <p>Arrastra asignaturas aquí</p>
        <p class="empty-hint">{{ emptyHint }}</p>
      </div>
    </div>

    <div v-if="isOverloaded" class="warning-message">
      ⚠️ Excede el límite de créditos
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, ref } from 'vue'
import type { Course, SemesterPlan } from '@/types/course'
import CourseCard from './CourseCard.vue'

interface Props {
  semester: SemesterPlan
  canRemove?: boolean
}

const props = withDefaults(defineProps<Props>(), {
  canRemove: false
})

const emit = defineEmits<{
  drop: [courseId: string, semesterNumber: number]
  removeSemester: [semesterNumber: number]
  courseDragStart: [course: Course, fromSemester: number]
  courseDragEnd: []
  courseRemove: [course: Course, fromSemester: number]
}>()

const isDragOver = ref(false)
const draggedCourse = ref<Course | null>(null)

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

function handleRemoveSemester() {
  emit('removeSemester', props.semester.number)
}

function handleCourseRemove(course: Course) {
  emit('courseRemove', course, props.semester.number)
}
</script>

<style scoped>
.semester-panel {
  background: #f8fafc;
  border: 2px solid #e2e8f0;
  border-radius: 12px;
  padding: 20px;
  min-height: 600px;
  max-height: 600px;
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
  margin-bottom: 20px;
  flex-shrink: 0;
}

.semester-title {
  display: flex;
  flex-direction: column;
  gap: 8px;
  margin-bottom: 8px;
}

.semester-number-wrapper {
  display: flex;
  align-items: center;
  gap: 12px;
}

.semester-title h3 {
  font-size: 20px;
  font-weight: 700;
  color: #1e293b;
  margin: 0;
}

.current-badge {
  background: linear-gradient(135deg, #10b981 0%, #059669 100%);
  color: white;
  font-size: 11px;
  font-weight: 700;
  padding: 4px 10px;
  border-radius: 12px;
  text-transform: uppercase;
  letter-spacing: 0.5px;
  box-shadow: 0 2px 4px rgba(16, 185, 129, 0.3);
}

.semester-meta {
  display: flex;
  align-items: center;
  gap: 10px;
}

.semester-period {
  font-size: 14px;
  font-weight: 600;
  color: #64748b;
  background: #f1f5f9;
  padding: 4px 12px;
  border-radius: 12px;
}

.semester-type-badge {
  font-size: 12px;
  font-weight: 600;
  padding: 4px 12px;
  border-radius: 12px;
  text-transform: uppercase;
  letter-spacing: 0.5px;
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
  font-size: 14px;
  font-weight: 600;
  color: #64748b;
}

.remove-button {
  background: #ef4444;
  color: white;
  border: none;
  border-radius: 50%;
  width: 24px;
  height: 24px;
  font-size: 20px;
  line-height: 1;
  cursor: pointer;
  transition: all 0.2s;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 0;
}

.remove-button:hover {
  background: #dc2626;
  transform: scale(1.1);
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
  gap: 12px;
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
  margin-top: 12px;
  padding: 10px 12px;
  background: #fee2e2;
  border: 1px solid #fecaca;
  border-radius: 6px;
  color: #991b1b;
  font-size: 13px;
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
