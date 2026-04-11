import { createContext, useContext, useMemo, useState } from "react";
import { CheckCircle2, CircleAlert, X } from "lucide-react";

const ToastContext = createContext(null);

export function ToastProvider({ children }) {
  const [toasts, setToasts] = useState([]);

  const removeToast = (id) => {
    setToasts((items) => items.filter((item) => item.id !== id));
  };

  const pushToast = ({ type = "success", title, message, duration = 4500 }) => {
    const id = crypto.randomUUID();
    setToasts((items) => [...items, { id, type, title, message }]);

    window.setTimeout(() => {
      removeToast(id);
    }, duration);
  };

  const value = useMemo(
    () => ({
      success: (payload) => pushToast({ ...payload, type: "success" }),
      error: (payload) => pushToast({ ...payload, type: "error" }),
    }),
    []
  );

  return (
    <ToastContext.Provider value={value}>
      {children}
      <div aria-live="polite" aria-atomic="true" className="pointer-events-none fixed bottom-4 right-4 z-[120] flex w-[min(92vw,420px)] flex-col gap-3">
        {toasts.map((toast) => {
          const isSuccess = toast.type === "success";

          return (
            <div
              key={toast.id}
              className="pointer-events-auto rounded-2xl border border-black/15 bg-white/90 p-4 shadow-[0_16px_40px_rgba(0,0,0,0.14)] backdrop-blur-md dark:border-white/15 dark:bg-[#121826]/92"
              role="status"
            >
              <div className="flex items-start gap-3">
                {isSuccess ? (
                  <CheckCircle2 className="mt-0.5 size-5 shrink-0 text-emerald-600" aria-hidden="true" />
                ) : (
                  <CircleAlert className="mt-0.5 size-5 shrink-0 text-rose-500" aria-hidden="true" />
                )}
                <div className="min-w-0 flex-1">
                  <p className="text-sm font-semibold text-black dark:text-white">{toast.title}</p>
                  {toast.message ? <p className="mt-1 text-sm text-black/70 dark:text-white/70">{toast.message}</p> : null}
                </div>
                <button
                  className="rounded-full p-1 text-black/60 transition-colors hover:bg-black/10 hover:text-black dark:text-white/60 dark:hover:bg-white/10 dark:hover:text-white"
                  onClick={() => removeToast(toast.id)}
                  type="button"
                  aria-label="Close notification"
                >
                  <X className="size-4" aria-hidden="true" />
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </ToastContext.Provider>
  );
}

export function useToast() {
  const context = useContext(ToastContext);
  if (!context) {
    throw new Error("useToast must be used within ToastProvider");
  }

  return context;
}
