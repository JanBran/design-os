import { useState, useMemo } from 'react'
import { Plus } from 'lucide-react'
import type { TaskBoardProps, Task } from '@/../product/sections/task-board/types'
import { KanbanColumn } from './KanbanColumn'
import { TaskDetailDialog } from './TaskDetailDialog'

export function KanbanBoard({
  tasks,
  columns,
  labels,
  users,
  onMoveTask,
  onReorderTask,
  onViewTask,
  onEditTask,
  onDeleteTask,
  onQuickAddTask,
  onCreateTask,
}: TaskBoardProps) {
  const [selectedTaskId, setSelectedTaskId] = useState<string | null>(null)

  const sortedColumns = useMemo(
    () => [...columns].sort((a, b) => a.order - b.order),
    [columns]
  )

  const tasksByColumn = useMemo(() => {
    const map: Record<string, Task[]> = {}
    for (const col of columns) {
      map[col.id] = tasks
        .filter((t) => t.columnId === col.id)
        .sort((a, b) => a.rank - b.rank)
    }
    return map
  }, [tasks, columns])

  const selectedTask = selectedTaskId ? tasks.find((t) => t.id === selectedTaskId) : null

  const handleViewTask = (taskId: string) => {
    setSelectedTaskId(taskId)
    onViewTask?.(taskId)
  }

  return (
    <div className="h-full flex flex-col" style={{ fontFamily: '"Geist", system-ui, sans-serif' }}>
      {/* Toolbar */}
      <div className="flex items-center justify-between px-5 py-3 border-b border-zinc-100 dark:border-zinc-800/50">
        <div className="flex items-center gap-2">
          <span className="text-[11px] font-medium text-zinc-400 dark:text-zinc-500 uppercase tracking-wider">
            {tasks.length} tasks
          </span>
        </div>
        <button
          onClick={() => onCreateTask?.()}
          className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-white bg-zinc-900 dark:bg-zinc-100 dark:text-zinc-900 rounded-md hover:bg-zinc-800 dark:hover:bg-zinc-200 transition-colors"
        >
          <Plus className="w-3.5 h-3.5" strokeWidth={2} />
          New Task
        </button>
      </div>

      {/* Board */}
      <div className="flex-1 overflow-x-auto overflow-y-hidden">
        <div className="flex gap-5 p-5 h-full min-w-max">
          {sortedColumns.map((column) => (
            <KanbanColumn
              key={column.id}
              column={column}
              tasks={tasksByColumn[column.id] || []}
              labels={labels}
              users={users}
              onViewTask={handleViewTask}
              onQuickAddTask={onQuickAddTask}
            />
          ))}
        </div>
      </div>

      {/* Task detail dialog */}
      {selectedTask && (
        <TaskDetailDialog
          task={selectedTask}
          columns={columns}
          labels={labels}
          users={users}
          onClose={() => setSelectedTaskId(null)}
          onEdit={onEditTask}
          onDelete={(id) => {
            onDeleteTask?.(id)
            setSelectedTaskId(null)
          }}
        />
      )}
    </div>
  )
}
