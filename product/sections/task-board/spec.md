# Task Board Specification

## Overview
The core task management interface where users view, create, and manage tasks. Supports both Kanban board and List views with full drag-and-drop. Task ordering is globally ranked and persists across the entire app.

## User Flows
- View tasks in Kanban columns (To Do, In Progress, Done, etc.) with cards showing title, label, priority, assignee, and due date
- View tasks in a List view with the same card information in a compact row format
- Drag and drop cards between Kanban columns to change status
- Drag and drop cards up/down within a column or list to reorder (global rank)
- Click a task card to open a detail popup with title, description, status, priority, assignee, and labels — all editable
- Quick-add a task inline at the bottom of a column or list (title only)
- Click a "+ New Task" button to open the full detail popup for creating a new task

## UI Requirements
- Kanban board with horizontally scrollable columns
- List view with vertically sortable rows
- Drag-and-drop in both views updates a single global task rank
- Task detail popup (modal/dialog) with editable fields
- Inline quick-add input at bottom of each column/list
- Task cards show: title, label tag, priority indicator, assignee avatar, due date

## Configuration
- shell: true
