interface TechBadgeProps {
  name: string;
  size?: 'sm' | 'md';
}

const colorMap: Record<string, { bg: string; text: string; border: string }> = {
  kotlin: { bg: 'rgba(169, 123, 255, 0.12)', text: '#a855f7', border: 'rgba(169, 123, 255, 0.25)' },
  compose: { bg: 'rgba(56, 189, 248, 0.12)', text: '#0284c7', border: 'rgba(56, 189, 248, 0.25)' },
  android: { bg: 'rgba(52, 211, 153, 0.12)', text: '#059669', border: 'rgba(52, 211, 153, 0.25)' },
  react: { bg: 'rgba(14, 165, 233, 0.12)', text: '#0284c7', border: 'rgba(14, 165, 233, 0.25)' },
  typescript: { bg: 'rgba(59, 130, 246, 0.12)', text: '#2563eb', border: 'rgba(59, 130, 246, 0.25)' },
  python: { bg: 'rgba(234, 179, 8, 0.12)', text: '#ca8a04', border: 'rgba(234, 179, 8, 0.25)' },
  room: { bg: 'rgba(244, 63, 94, 0.12)', text: '#e11d48', border: 'rgba(244, 63, 94, 0.25)' },
};

export function TechBadge({ name, size = 'sm' }: TechBadgeProps) {
  const lower = name.toLowerCase();
  const matched = Object.keys(colorMap).find((k) => lower.includes(k));
  const style = matched
    ? colorMap[matched]
    : { bg: 'var(--bg-subtle)', text: 'var(--text-secondary)', border: 'var(--border-subtle)' };

  return (
    <span
      className={`inline-flex items-center font-mono font-medium rounded-md ${
        size === 'sm' ? 'px-2 py-0.5 text-[11px]' : 'px-2.5 py-1 text-xs'
      }`}
      style={{
        backgroundColor: style.bg,
        color: style.text,
        border: `1px solid ${style.border}`,
      }}
    >
      {name}
    </span>
  );
}
