# Data Model

## Entities

### Task
A unit of work that a team member creates, tracks, and completes. Tasks have a status, priority, and can be assigned to a user and tagged with labels. Tasks appear on Kanban boards and list views.

### View
A saved tab configuration that determines how tasks are displayed. Each view can be set to Kanban or List mode and has its own filter settings, allowing users to create multiple perspectives on the same set of tasks.

### Column
A status grouping used in Kanban boards (e.g., To Do, In Progress, Done). Columns define the workflow stages that tasks move through.

### Label
A tag that can be applied to tasks for categorization and filtering. Labels help teams organize and find tasks by topic, type, or any custom grouping.

### Message
A chat message in the global team chat panel. Messages enable real-time communication alongside the task view without switching to a separate app.

### User
A team member who can be assigned tasks, send chat messages, and configure their own views. Users are the people collaborating within the workspace.

## Relationships

- Task belongs to a Column (its current status)
- Task has many Labels
- Task is assigned to a User
- View has many Columns (defines which columns appear and their order)
- Message belongs to a User (the sender)
