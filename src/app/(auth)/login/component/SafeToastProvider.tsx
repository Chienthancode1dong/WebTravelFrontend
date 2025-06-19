'use client'
import { useContext } from 'react';
import { createContext, ReactNode } from 'react';

// Create a simple safe toast context
interface SafeToastContextType {
  showToast: (toast: any) => void;
  showSuccess: (title: string, message?: string) => void;
  showError: (title: string, message?: string) => void;
  showWarning: (title: string, message?: string) => void;
  showInfo: (title: string, message?: string) => void;
}

const SafeToastContext = createContext<SafeToastContextType | undefined>(undefined);

// Safe hook that doesn't throw error
export const useSafeToast = () => {
  const context = useContext(SafeToastContext);

  // Return no-op functions if not in provider
  if (!context) {
    return {
      showToast: () => { },
      showSuccess: () => { },
      showError: () => { },
      showWarning: () => { },
      showInfo: () => { }
    };
  }

  return context;
};

interface SafeToastProviderProps {
  children: ReactNode;
  toast: SafeToastContextType;
}

export const SafeToastProvider = ({ children, toast }: SafeToastProviderProps) => {
  return (
    <SafeToastContext.Provider value={toast}>
      {children}
    </SafeToastContext.Provider>
  );
};

export default SafeToastProvider;
