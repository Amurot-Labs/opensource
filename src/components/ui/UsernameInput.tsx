import { useUsername } from '@/lib/username-context';
import { Sparkles, X, Check } from 'lucide-react';
import { GithubIcon } from './Icons';

interface UsernameInputProps {
  variant?: 'hero' | 'guide';
  className?: string;
}

export function UsernameInput({ variant = 'hero', className = '' }: UsernameInputProps) {
  const { username, setUsername, activeHandle, isCustomized, clearUsername } = useUsername();

  if (variant === 'hero') {
    return (
      <div className={`w-full max-w-md mx-auto ${className}`}>
        <div className="relative flex items-center rounded-2xl bg-surface border border-border-card p-1.5 shadow-sm transition-all focus-within:border-accent focus-within:ring-2 focus-within:ring-accent/20">
          <div className="flex items-center gap-1.5 pl-3 text-muted">
            <GithubIcon size={16} />
            <span className="font-mono text-sm font-bold text-accent">@</span>
          </div>

          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            autoCapitalize="none"
            autoCorrect="off"
            spellCheck="false"
            placeholder="enter your github username..."
            aria-label="Your GitHub Username"
            className="w-full bg-transparent px-2 py-1.5 text-xs sm:text-sm font-mono text-primary placeholder:text-muted/70 focus:outline-none lowercase"
          />

          {isCustomized ? (
            <button
              type="button"
              onClick={clearUsername}
              className="p-1.5 text-muted hover:text-primary rounded-lg hover:bg-subtle transition-colors shrink-0"
              title="Reset to default placeholder"
            >
              <X className="h-4 w-4" />
            </button>
          ) : null}
        </div>

        {isCustomized && (
          <div className="mt-1.5 flex items-center justify-center gap-1 text-[11px] font-mono text-accent animate-in fade-in slide-in-from-top-1 duration-200">
            <Check className="h-3 w-3" />
            <span>Commands dynamically customized for <strong>@{activeHandle}</strong></span>
          </div>
        )}
      </div>
    );
  }

  // Guide Variant
  return (
    <div className={`p-4 rounded-2xl bg-accent-subtle/40 border border-accent/30 ${className}`}>
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div className="flex items-center gap-2">
          <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-accent text-white shrink-0">
            <Sparkles className="h-3.5 w-3.5" />
          </div>
          <div>
            <h4 className="font-display text-xs sm:text-sm font-bold text-primary">
              Personalize All Commands
            </h4>
            <p className="text-[11px] text-muted">
              Enter your GitHub handle to update all code snippets below with your username
            </p>
          </div>
        </div>

        <div className="relative flex items-center rounded-xl bg-surface border border-border-card p-1 shadow-sm sm:w-64 focus-within:border-accent focus-within:ring-2 focus-within:ring-accent/20">
          <span className="pl-2 font-mono text-xs font-bold text-accent">@</span>
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            autoCapitalize="none"
            autoCorrect="off"
            spellCheck="false"
            placeholder="your-github-handle"
            aria-label="GitHub Username"
            className="w-full bg-transparent px-1.5 py-1 text-xs font-mono text-primary placeholder:text-muted/70 focus:outline-none lowercase"
          />
          {isCustomized && (
            <button
              type="button"
              onClick={clearUsername}
              className="p-1 text-muted hover:text-primary rounded hover:bg-subtle transition-colors shrink-0"
              title="Reset"
            >
              <X className="h-3.5 w-3.5" />
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
