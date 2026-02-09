# Application Shell Specification

## Overview
TestTakify uses a minimal header layout to maximize screen real estate for the task board and chat panel. A slim top bar provides branding, a chat toggle, and user menu. The main content area is split between a resizable chat panel on the left and the task board on the right.

## Navigation Structure
- Logo / Product Name → Home
- Chat Toggle → Show/hide the chat panel
- User Menu → Avatar, name, logout

## User Menu
Located in the top-right corner of the header. Contains the user's avatar, display name, and a dropdown with logout.

## Layout Pattern
Minimal header with a two-panel content area:
- **Header**: Slim top bar with logo (left), chat toggle button (center-left), and user menu (right)
- **Left Panel**: Resizable chat panel with a drag handle on its right edge
- **Right Panel**: Task board content area where view tabs, kanban/list views, and filters render

The chat panel and task board share the full height below the header. A drag handle between the two panels allows resizing.

## Responsive Behavior
- **Desktop:** Chat panel and task board side-by-side with resizable divider
- **Tablet:** Chat panel collapses into an overlay/drawer triggered by the chat toggle button
- **Mobile:** Chat becomes a full-screen overlay toggled from the header button

## Design Notes
- Design tokens: zinc palette (primary/neutral), blue (secondary accent), Geist typography
- The chat panel default width is approximately 320px
- Minimum chat panel width: 280px
- The chat toggle button uses a message icon and indicates unread state
- The header height is kept minimal (~48px) to preserve vertical space
