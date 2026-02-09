import { MessageSquare } from 'lucide-react'

interface MainNavProps {
  productName: string
  chatOpen: boolean
  onToggleChat: () => void
}

export default function MainNav({ productName, chatOpen, onToggleChat }: MainNavProps) {
  return (
    <div className="flex items-center gap-3">
      {/* Logo / Product name */}
      <span className="text-sm font-semibold tracking-tight text-zinc-900 dark:text-zinc-100">
        {productName}
      </span>

      <div className="h-4 w-px bg-zinc-200 dark:bg-zinc-700" />

      {/* Chat toggle */}
      <button
        onClick={onToggleChat}
        className={`flex items-center gap-1.5 rounded-md px-2 py-1.5 text-sm transition-colors ${
          chatOpen
            ? 'bg-zinc-100 dark:bg-zinc-800 text-zinc-900 dark:text-zinc-100'
            : 'text-zinc-500 dark:text-zinc-400 hover:text-zinc-700 dark:hover:text-zinc-300 hover:bg-zinc-50 dark:hover:bg-zinc-800/50'
        }`}
        title={chatOpen ? 'Hide chat' : 'Show chat'}
      >
        <MessageSquare className="w-4 h-4" strokeWidth={1.5} />
        <span className="hidden sm:inline text-xs font-medium">Chat</span>
      </button>
    </div>
  )
}
