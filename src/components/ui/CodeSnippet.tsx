import { useState } from 'react';
import { Check, Copy } from 'lucide-react';

interface CodeSnippetProps {
  code: string;
  prefix?: string;
}

export function CodeSnippet({ code, prefix = '$' }: CodeSnippetProps) {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(code);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <div className="flex items-center justify-between gap-3 rounded-xl bg-subtle border border-border-subtle px-3.5 py-2 font-mono text-xs shadow-sm">
      <div className="flex items-center gap-2 overflow-x-auto text-primary no-scrollbar">
        <span className="text-accent font-semibold select-none">{prefix}</span>
        <span className="truncate">{code}</span>
      </div>
      <button
        type="button"
        onClick={handleCopy}
        className="p-1 rounded-md text-muted hover:text-primary hover:bg-card transition-colors cursor-pointer shrink-0"
        aria-label="Copy to clipboard"
        title="Copy code"
      >
        {copied ? (
          <Check className="h-3.5 w-3.5 text-mint" />
        ) : (
          <Copy className="h-3.5 w-3.5" />
        )}
      </button>
    </div>
  );
}
