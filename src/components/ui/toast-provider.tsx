'use client';

import { Toaster } from 'sonner';

export function ToastProvider() {
  return (
    <Toaster
      position="bottom-right"
      toastOptions={{
        style: {
          background: '#18181b',
          border: '1px solid #27272a',
          color: '#fff',
        },
        className: 'font-sans',
        duration: 4000,
      }}
      theme="dark"
      richColors
      closeButton
    />
  );
}

// Re-export toast for easy usage
export { toast } from 'sonner';
