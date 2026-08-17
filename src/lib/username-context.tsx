import { createContext, useContext, useState, type ReactNode } from 'react';

interface UsernameContextType {
  username: string;
  setUsername: (name: string) => void;
  activeHandle: string;
  isCustomized: boolean;
  clearUsername: () => void;
  commands: {
    clone: string;
    scaffold: string;
    preview: string;
    test: string;
    push: string;
    heroScaffold: string;
  };
}

const UsernameContext = createContext<UsernameContextType | undefined>(undefined);

const STORAGE_KEY = 'amurot_oss_username';

export function UsernameProvider({ children }: { children: ReactNode }) {
  const [username, setUsernameState] = useState<string>(() => {
    if (typeof window !== 'undefined') {
      return localStorage.getItem(STORAGE_KEY) || '';
    }
    return '';
  });

  const setUsername = (val: string) => {
    // Sanitize username: remove leading @, spaces, and invalid chars
    const clean = val.replace(/^@+/, '').replace(/\s+/g, '');
    setUsernameState(clean);
    if (typeof window !== 'undefined') {
      if (clean) {
        localStorage.setItem(STORAGE_KEY, clean);
      } else {
        localStorage.removeItem(STORAGE_KEY);
      }
    }
  };

  const clearUsername = () => {
    setUsername('');
  };

  const isCustomized = Boolean(username && username.trim().length > 0);
  const activeHandle = isCustomized ? username.trim() : 'your-username';

  const commands = {
    clone: `git clone https://github.com/${activeHandle}/opensource.git && cd opensource && npm install`,
    scaffold: `git checkout -b add-profile-${activeHandle} && npm run new-member ${activeHandle}`,
    preview: `npm run dev && npm run validate`,
    test: `http://localhost:5173/@${activeHandle}`,
    push: `git add src/content/members/${activeHandle} && git commit -m "feat(members): add ${activeHandle} profile and projects" && git push -u origin add-profile-${activeHandle}`,
    heroScaffold: `npm run new-member ${activeHandle}`,
  };

  return (
    <UsernameContext.Provider
      value={{
        username,
        setUsername,
        activeHandle,
        isCustomized,
        clearUsername,
        commands,
      }}
    >
      {children}
    </UsernameContext.Provider>
  );
}

export function useUsername() {
  const context = useContext(UsernameContext);
  if (!context) {
    throw new Error('useUsername must be used within a UsernameProvider');
  }
  return context;
}
