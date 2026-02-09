import data from '@/../product/sections/task-board/data.json'
import { KanbanBoard } from './components/KanbanBoard'

export default function KanbanBoardPreview() {
  return (
    <KanbanBoard
      tasks={data.tasks}
      columns={data.columns}
      labels={data.labels}
      users={data.users}
      onMoveTask={(taskId, columnId) => console.log('Move task:', taskId, '→', columnId)}
      onReorderTask={(taskId, newRank) => console.log('Reorder task:', taskId, 'to rank:', newRank)}
      onViewTask={(taskId) => console.log('View task:', taskId)}
      onEditTask={(taskId, updates) => console.log('Edit task:', taskId, updates)}
      onDeleteTask={(taskId) => console.log('Delete task:', taskId)}
      onQuickAddTask={(title, columnId) => console.log('Quick add:', title, 'to', columnId)}
      onCreateTask={() => console.log('Create new task')}
    />
  )
}
