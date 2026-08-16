import { useState } from 'react';
import { Sun, Moon, Menu, X, GitPullRequest, Layers, Users, BookOpen } from 'lucide-react';
import { GithubIcon } from '@/components/ui/Icons';
import { AmurotLogo } from '@/components/ui/AmurotLogo';
import { useTheme } from '@/lib/theme-context';

interface NavbarProps {
  currentPath: string;
}

export function Navbar({ currentPath }: NavbarProps) {
  const { theme, toggleTheme } = useTheme();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navLinks = [
    { label: 'Projects', href: '#/projects', icon: Layers },
    { label: 'Members', href: '#/members', icon: Users },
    { label: 'Guide', href: '#/guide', icon: BookOpen },
  ];

  return (
    <header className="fixed top-0 inset-x-0 z-40 px-4 sm:px-6 pt-3 pointer-events-none">
      <nav className="pointer-events-auto mx-auto max-w-6xl rounded-2xl glass-nav px-4 sm:px-5 h-14 flex items-center justify-between gap-3 shadow-sm border border-border-card">
        {/* Brand Logo with red-tinted Amurot emblem */}
        <a
          href="#/"
          className="flex items-center gap-2.5 group hover:opacity-90 transition-opacity shrink-0"
          aria-label="Amurot Open Source Home"
        >
          <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-accent/10 border border-accent/20 group-hover:scale-105 transition-transform">
            <AmurotLogo size={18} color="#FF2056" />
          </div>
          <span className="font-display font-bold text-base tracking-tight text-primary">
            amurot<span className="text-accent">.oss</span>
          </span>
        </a>

        {/* Desktop Nav Links */}
        <div className="hidden md:flex items-center gap-1">
          {navLinks.map(({ label, href, icon: Icon }) => {
            const isActive =
              (href === '#/' && currentPath === '/') ||
              (href !== '#/' && currentPath.startsWith(href.replace('#', '')));
            return (
              <a
                key={label}
                href={href}
                className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-medium transition-colors ${
                  isActive
                    ? 'bg-subtle text-accent font-semibold'
                    : 'text-secondary hover:text-primary hover:bg-subtle/70'
                }`}
              >
                <Icon className="h-3.5 w-3.5" />
                <span>{label}</span>
              </a>
            );
          })}
        </div>

        {/* Actions: Theme Toggle + Submit PR + GitHub */}
        <div className="flex items-center gap-2">
          <a
            href="https://github.com/amurot-labs/opensource/pulls"
            target="_blank"
            rel="noreferrer noopener"
            className="hidden sm:inline-flex items-center gap-1.5 btn-accent text-xs py-1.5 px-3.5"
          >
            <GitPullRequest className="h-3.5 w-3.5" />
            <span>Add Project (+PR)</span>
          </a>

          <button
            type="button"
            onClick={toggleTheme}
            className="p-2 rounded-xl text-muted hover:text-primary hover:bg-subtle transition-colors cursor-pointer"
            aria-label="Toggle Theme"
            title={`Switch to ${theme === 'dark' ? 'Light' : 'Dark'} Mode`}
          >
            {theme === 'dark' ? (
              <Sun className="h-4 w-4 text-amber-400" />
            ) : (
              <Moon className="h-4 w-4 text-slate-700" />
            )}
          </button>

          <a
            href="https://github.com/amurot-labs/opensource"
            target="_blank"
            rel="noreferrer noopener"
            className="p-2 rounded-xl text-muted hover:text-primary hover:bg-subtle transition-colors"
            aria-label="GitHub Repository"
            title="GitHub Repository"
          >
            <GithubIcon size={16} />
          </a>

          {/* Mobile Menu Toggle */}
          <button
            type="button"
            onClick={() => setMobileMenuOpen((prev) => !prev)}
            className="md:hidden p-2 rounded-xl text-muted hover:text-primary hover:bg-subtle transition-colors"
            aria-label="Toggle Mobile Menu"
          >
            {mobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </nav>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="pointer-events-auto md:hidden mx-auto mt-2 max-w-6xl rounded-2xl glass-nav p-3 shadow-xl border border-border-card">
          <div className="flex flex-col gap-1">
            {navLinks.map(({ label, href, icon: Icon }) => (
              <a
                key={label}
                href={href}
                onClick={() => setMobileMenuOpen(false)}
                className="flex items-center gap-2.5 px-3 py-2 rounded-xl text-sm font-medium text-primary hover:bg-subtle transition-colors"
              >
                <Icon className="h-4 w-4 text-accent" />
                <span>{label}</span>
              </a>
            ))}

            <a
              href="https://github.com/amurot-labs/opensource/pulls"
              target="_blank"
              rel="noreferrer noopener"
              className="mt-1 flex items-center justify-center gap-2 btn-accent text-xs py-2"
              onClick={() => setMobileMenuOpen(false)}
            >
              <GitPullRequest className="h-3.5 w-3.5" />
              <span>Submit Project (+PR)</span>
            </a>
          </div>
        </div>
      )}
    </header>
  );
}
