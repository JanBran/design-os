// =============================================================================
// Data Types
// =============================================================================

export interface User {
  id: string
  name: string
  avatarUrl: string | null
}

export interface Label {
  id: string
  name: string
  color: 'sky' | 'emerald' | 'violet' | 'blue' | 'amber' | 'red'
}

export interface Column {
  id: string
  name: string
  order: number
}

export interface Task {
  id: string
  title: string
  description: string
  columnId: string
  priority: 'high' | 'medium' | 'low'
  assigneeId: string
  labelIds: string[]
  dueDate: string | null
  rank: number
}

// =============================================================================
// Component Props
// =============================================================================

export interface TaskBoardProps {
  /** The list of tasks to display */
  tasks: Task[]
  /** The columns (status groupings) for the Kanban board */
  columns: Column[]
  /** Available labels for tagging tasks */
  labels: Label[]
  /** Team members who can be assigned to tasks */
  users: User[]
  /** Called when a task is moved to a different column (status change) */
  onMoveTask?: (taskId: string, targetColumnId: string) => void
  /** Called when a task's global rank is updated via drag-and-drop reorder */
  onReorderTask?: (taskId: string, newRank: number) => void
  /** Called when the user opens a task's detail popup */
  onViewTask?: (taskId: string) => void
  /** Called when the user saves edits to a task from the detail popup */
  onEditTask?: (taskId: string, updates: Partial<Task>) => void
  /** Called when the user deletes a task */
  onDeleteTask?: (taskId: string) => void
  /** Called when the user creates a new task via quick-add (title only) */
  onQuickAddTask?: (title: string, columnId: string) => void
  /** Called when the user creates a new task via the full detail popup */
  onCreateTask?: () => void
}
