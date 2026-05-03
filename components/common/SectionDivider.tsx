export function SectionDivider({ label }: { label?: string }) {
  return (
    <div className="flex items-center justify-center gap-4 py-2 opacity-40">
      <div className="flex-1 h-px bg-gradient-to-r from-transparent to-brass/60" />
      <svg width="14" height="14" viewBox="0 0 14 14" fill="none" className="text-brass shrink-0">
        <path d="M7 0L8.4 5.6L14 7L8.4 8.4L7 14L5.6 8.4L0 7L5.6 5.6L7 0Z" fill="currentColor" />
      </svg>
      {label && (
        <span className="font-mono text-[9px] tracking-[0.3em] uppercase text-brass whitespace-nowrap">
          {label}
        </span>
      )}
      <svg width="14" height="14" viewBox="0 0 14 14" fill="none" className="text-brass shrink-0">
        <path d="M7 0L8.4 5.6L14 7L8.4 8.4L7 14L5.6 8.4L0 7L5.6 5.6L7 0Z" fill="currentColor" />
      </svg>
      <div className="flex-1 h-px bg-gradient-to-l from-transparent to-brass/60" />
    </div>
  )
}
