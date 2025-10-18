<template>
  <div
    class="course-card"
    :class="cardClasses"
    draggable="true"
    @dragstart="handleDragStart"
    @dragend="handleDragEnd"
  >
    <button
      v-if="showRemoveButton"
      class="remove-course-button"
      @click.stop="handleRemove"
      title="Devolver a asignaturas disponibles"
    >
      ×
    </button>
    <div class="course-header">
      <span class="course-code">{{ course.code }}</span>
      <span class="course-credits">{{ course.credits }} cr</span>
    </div>
    <div class="course-name">{{ course.name }}</div>
    <div class="course-footer">
      <span class="course-semester-badge" :class="semesterBadgeClass">
        {{ semesterLabel }}
      </span>
      <span class="course-area">{{ course.area }}</span>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import type { Course } from '@/types/course'

interface Props {
  course: Course
  isDragging?: boolean
  isInvalid?: boolean
  showRemoveButton?: boolean
}

const props = withDefaults(defineProps<Props>(), {
  isDragging: false,
  isInvalid: false,
  showRemoveButton: false
})

const emit = defineEmits<{
  dragstart: [course: Course]
  dragend: []
  remove: [course: Course]
}>()

const semesterLabel = computed(() => {
  switch (props.course.semester) {
    case 'par':
      return 'Sem. Par'
    case 'impar':
      return 'Sem. Impar'
    case 'ambos':
      return 'Ambos'
    default:
      return ''
  }
})

const semesterBadgeClass = computed(() => {
  return `semester-${props.course.semester}`
})

const cardClasses = computed(() => {
  return {
    'is-dragging': props.isDragging,
    'is-invalid': props.isInvalid,
    [`area-${props.course.area.toLowerCase().replace(/\s+/g, '-')}`]: true
  }
})

function handleDragStart(event: DragEvent) {
  if (!event.dataTransfer) return

  event.dataTransfer.effectAllowed = 'move'
  event.dataTransfer.setData('courseId', props.course.id)
  event.dataTransfer.setData('type', 'course')

  // Hacer el elemento semi-transparente durante el arrastre
  if (event.target instanceof HTMLElement) {
    event.target.style.opacity = '0.5'
  }

  emit('dragstart', props.course)
}

function handleDragEnd(event: DragEvent) {
  if (event.target instanceof HTMLElement) {
    event.target.style.opacity = '1'
  }
  emit('dragend')
}

function handleRemove() {
  emit('remove', props.course)
}
</script>

<style scoped>
.course-card {
  background: white;
  border: 2px solid #e2e8f0;
  border-radius: 8px;
  padding: 12px;
  cursor: grab;
  transition: all 0.2s ease;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  user-select: none;
  position: relative;
}

.remove-course-button {
  position: absolute;
  top: 4px;
  right: 4px;
  background: #ef4444;
  color: white;
  border: none;
  border-radius: 50%;
  width: 20px;
  height: 20px;
  font-size: 16px;
  line-height: 1;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 0;
  transition: all 0.2s;
  opacity: 0.7;
  z-index: 10;
}

.remove-course-button:hover {
  opacity: 1;
  background: #dc2626;
  transform: scale(1.1);
}

.course-card:hover .remove-course-button {
  opacity: 1;
}

.course-card:hover {
  border-color: #3b82f6;
  box-shadow: 0 4px 8px rgba(59, 130, 246, 0.2);
  transform: translateY(-2px);
}

.course-card:active {
  cursor: grabbing;
}

.course-card.is-dragging {
  opacity: 0.5;
}

.course-card.is-invalid {
  border-color: #ef4444;
  background-color: #fee;
}

.course-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 8px;
}

.course-code {
  font-weight: 700;
  font-size: 13px;
  color: #1e40af;
  letter-spacing: 0.5px;
}

.course-credits {
  font-weight: 600;
  font-size: 12px;
  color: #64748b;
  background: #f1f5f9;
  padding: 2px 8px;
  border-radius: 12px;
}

.course-name {
  font-size: 14px;
  font-weight: 500;
  color: #334155;
  margin-bottom: 8px;
  line-height: 1.4;
  min-height: 40px;
}

.course-footer {
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 8px;
  margin-top: auto;
}

.course-semester-badge {
  font-size: 11px;
  font-weight: 600;
  padding: 3px 8px;
  border-radius: 12px;
  text-transform: uppercase;
  letter-spacing: 0.3px;
}

.course-semester-badge.semester-par {
  background: #dbeafe;
  color: #1e40af;
}

.course-semester-badge.semester-impar {
  background: #fef3c7;
  color: #92400e;
}

.course-semester-badge.semester-ambos {
  background: #d1fae5;
  color: #065f46;
}

.course-area {
  font-size: 10px;
  color: #94a3b8;
  font-weight: 500;
  text-align: right;
  flex: 1;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

/* Estilos por área */
.course-card.area-ciencias-básicas {
  border-left: 4px solid #3b82f6;
}

.course-card.area-farmacia {
  border-left: 4px solid #8b5cf6;
}

.course-card.area-plan-común {
  border-left: 4px solid #10b981;
}

.course-card.area-título {
  border-left: 4px solid #f59e0b;
}

.course-card.area-práctica-profesional {
  border-left: 4px solid #ef4444;
}
</style>
