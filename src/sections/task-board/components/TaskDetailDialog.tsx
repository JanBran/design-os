import { useState } from 'react'
import { X, Trash2 } from 'lucide-react'
import type { Task, Label, User, Column } from '@/../product/sections/task-board/types'

interface TaskDetailDialogProps {
  task: Task
  columns: Column[]
  labels: Label[]
  users: User[]
  onClose: () => void
  onEdit?: (taskId: string, updates: Partial<Task>) => void
  onDelete?: (taskId: string) => void
}

const labelColorMap: Record<string, { bg: string; text: string; ring: string }> = {
  sky: { bg: 'bg-sky-100 dark:bg-sky-900/30', text: 'text-sky-700 dark:text-sky-400', ring: 'ring-sky-300 dark:ring-sky-700' },
  emerald: { bg: 'bg-emerald-100 dark:bg-emerald-900/30', text: 'text-emerald-700 dark:text-emerald-400', ring: 'ring-emerald-300 dark:ring-emerald-700' },
  violet: { bg: 'bg-violet-100 dark:bg-violet-900/30', text: 'text-violet-700 dark:text-violet-400', ring: 'ring-violet-300 dark:ring-violet-700' },
  blue: { bg: 'bg-blue-100 dark:bg-blue-900/30', text: 'text-blue-700 dark:text-blue-400', ring: 'ring-blue-300 dark:ring-blue-700' },
  amber: { bg: 'bg-amber-100 dark:bg-amber-900/30', text: 'text-amber-700 dark:text-amber-400', ring: 'ring-amber-300 dark:ring-amber-700' },
  red: { bg: 'bg-red-100 dark:bg-red-900/30', text: 'text-red-700 dark:text-red-400', ring: 'ring-red-300 dark:ring-red-700' },
}

export function TaskDetailDialog({
  task,
  columns,
  labels,
  users,
  onClose,
  onEdit,
  onDelete,
}: TaskDetailDialogProps) {
  const [title, setTitle] = useState(task.title)
  const [description, setDescription] = useState(task.description)
  const [columnId, setColumnId] = useState(task.columnId)
  const [priority, setPriority] = useState(task.priority)
  const [assigneeId, setAssigneeId] = useState(task.assigneeId)
  const [selectedLabelIds, setSelectedLabelIds] = useState<string[]>(task.labelIds)

  const handleSave = () => {
    onEdit?.(task.id, {
      title,
      description,
      columnId,
      priority,
      assigneeId,
      labelIds: selectedLabelIds,
    })
    onClose()
  }

  const toggleLabel = (labelId: string) => {
    setSelectedLabelIds((prev) =>
      prev.includes(labelId) ? prev.filter((id) => id !== labelId) : [...prev, labelId]
    )
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/40 dark:bg-black/60 backdrop-blur-[2px]"
        onClick={onClose}
      />

      {/* Dialog */}
      <div className="relative w-full max-w-lg bg-white dark:bg-zinc-900 rounded-xl border border-zinc-200 dark:border-zinc-800 shadow-2xl overflow-hidden animate-fade-in">
        {/* Header */}
        <div className="flex items-start justify-between p-5 pb-0">
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="text-lg font-semibold text-zinc-900 dark:text-zinc-100 bg-transparent border-none outline-none w-full pr-8 placeholder:text-zinc-400"
            placeholder="Task title"
          />
          <button
            onClick={onClose}
            className="shrink-0 p-1 rounded-md text-zinc-400 hover:text-zinc-600 dark:hover:text-zinc-300 hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-colors"
          >
            <X className="w-4 h-4" strokeWidth={1.5} />
          </button>
        </div>

        {/* Body */}
        <div className="p-5 space-y-5">
          {/* Description */}
          <div>
            <label className="block text-[11px] font-medium text-zinc-500 dark:text-zinc-400 uppercase tracking-wider mb-1.5">
              Description
            </label>
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              rows={3}
              className="w-full rounded-md border border-zinc-200 dark:border-zinc-700 bg-zinc-50 dark:bg-zinc-800/50 text-sm text-zinc-900 dark:text-zinc-100 px-3 py-2 outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500 resize-none placeholder:text-zinc-400"
              placeholder="Add a description..."
            />
          </div>

          {/* Status and Priority row */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-[11px] font-medium text-zinc-500 dark:text-zinc-400 uppercase tracking-wider mb-1.5">
                Status
              </label>
              <select
                value={columnId}
                onChange={(e) => setColumnId(e.target.value)}
                className="w-full rounded-md border border-zinc-200 dark:border-zinc-700 bg-zinc-50 dark:bg-zinc-800/50 text-sm text-zinc-900 dark:text-zinc-100 px-3 py-2 outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
              >
                {columns.map((col) => (
                  <option key={col.id} value={col.id}>
                    {col.name}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <label className="block text-[11px] font-medium text-zinc-500 dark:text-zinc-400 uppercase tracking-wider mb-1.5">
                Priority
              </label>
              <select
                value={priority}
                onChange={(e) => setPriority(e.target.value as Task['priority'])}
                className="w-full rounded-md border border-zinc-200 dark:border-zinc-700 bg-zinc-50 dark:bg-zinc-800/50 text-sm text-zinc-900 dark:text-zinc-100 px-3 py-2 outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
              >
                <option value="high">High</option>
                <option value="medium">Medium</option>
                <option value="low">Low</option>
              </select>
            </div>
          </div>

          {/* Assignee */}
          <div>
            <label className="block text-[11px] font-medium text-zinc-500 dark:text-zinc-400 uppercase tracking-wider mb-1.5">
              Assignee
            </label>
            <select
              value={assigneeId}
              onChange={(e) => setAssigneeId(e.target.value)}
              className="w-full rounded-md border border-zinc-200 dark:border-zinc-700 bg-zinc-50 dark:bg-zinc-800/50 text-sm text-zinc-900 dark:text-zinc-100 px-3 py-2 outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
            >
              {users.map((user) => (
                <option key={user.id} value={user.id}>
                  {user.name}
                </option>
              ))}
            </select>
          </div>

          {/* Labels */}
          <div>
            <label className="block text-[11px] font-medium text-zinc-500 dark:text-zinc-400 uppercase tracking-wider mb-1.5">
              Labels
            </label>
            <div className="flex flex-wrap gap-1.5">
              {labels.map((label) => {
                const isSelected = selectedLabelIds.includes(label.id)
                const colors = labelColorMap[label.color] || labelColorMap.blue
                return (
                  <button
                    key={label.id}
                    onClick={() => toggleLabel(label.id)}
                    className={`inline-flex items-center text-[11px] font-medium px-2 py-1 rounded-md transition-all ${
                      isSelected
                        ? `${colors.bg} ${colors.text} ring-1 ${colors.ring}`
                        : 'bg-zinc-100 dark:bg-zinc-800 text-zinc-500 dark:text-zinc-400 hover:bg-zinc-200 dark:hover:bg-zinc-700'
                    }`}
                  >
                    {label.name}
                  </button>
                )
              })}
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="flex items-center justify-between px-5 py-4 border-t border-zinc-100 dark:border-zinc-800">
          <button
            onClick={() => {
              onDelete?.(task.id)
              onClose()
            }}
            className="flex items-center gap-1.5 text-xs text-red-500 hover:text-red-600 dark:text-red-400 dark:hover:text-red-300 transition-colors"
          >
            <Trash2 className="w-3.5 h-3.5" strokeWidth={1.5} />
            Delete task
          </button>
          <div className="flex items-center gap-2">
            <button
              onClick={onClose}
              className="px-3 py-1.5 text-xs font-medium text-zinc-600 dark:text-zinc-400 hover:bg-zinc-100 dark:hover:bg-zinc-800 rounded-md transition-colors"
            >
              Cancel
            </button>
            <button
              onClick={handleSave}
              className="px-3 py-1.5 text-xs font-medium text-white bg-zinc-900 dark:bg-zinc-100 dark:text-zinc-900 rounded-md hover:bg-zinc-800 dark:hover:bg-zinc-200 transition-colors"
            >
              Save changes
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
