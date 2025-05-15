
import { useState, useEffect, useRef } from "react";
import type { ToastActionElement, ToastProps } from "@/components/ui/toast";

const TOAST_LIMIT = 5;
const TOAST_REMOVE_DELAY = 1000000;

type ToasterToast = ToastProps & {
  id: string;
  title?: React.ReactNode;
  description?: React.ReactNode;
  action?: ToastActionElement;
};

const actionTypes = {
  ADD_TOAST: "ADD_TOAST",
  UPDATE_TOAST: "UPDATE_TOAST",
  DISMISS_TOAST: "DISMISS_TOAST",
  REMOVE_TOAST: "REMOVE_TOAST",
} as const;

let count = 0;

function generateId() {
  return (++count).toString();
}

export function useToast() {
  const toastsRef = useRef<ToasterToast[]>([]);
  const [toasts, setToasts] = useState<ToasterToast[]>([]);

  useEffect(() => {
    toastsRef.current = toasts;
  }, [toasts]);

  function addToast(props: Omit<ToasterToast, "id">) {
    const id = generateId();

    const newToast = {
      ...props,
      id,
    };

    setToasts((prevToasts) => {
      const newToasts = [...prevToasts, newToast];
      if (newToasts.length > TOAST_LIMIT) {
        newToasts.shift();
      }
      return newToasts;
    });

    return newToast.id;
  }

  function updateToast(id: string, props: Partial<ToasterToast>) {
    setToasts((prevToasts) => {
      const toast = prevToasts.find((toast) => toast.id === id);
      if (!toast) return prevToasts;

      return prevToasts.map((toast) => {
        if (toast.id !== id) return toast;
        return { ...toast, ...props };
      });
    });
  }

  function dismissToast(id: string) {
    setToasts((prevToasts) => {
      const updatedToasts = prevToasts.map((toast) => {
        if (toast.id === id) {
          return {
            ...toast,
            open: false,
          };
        }
        return toast;
      });

      setTimeout(() => {
        setToasts((prev) => prev.filter((toast) => toast.id !== id));
      }, TOAST_REMOVE_DELAY);

      return updatedToasts;
    });
  }

  return {
    toasts,
    addToast,
    updateToast,
    dismissToast,
    toast: addToast,
  };
}

export const toast = (props: Omit<ToasterToast, "id">) => {
  // This function is meant to be used outside of components
  // and simply throws a console error since we need React context
  console.error(
    "Toast function called outside of component context. Please use useToast hook instead."
  );
};
