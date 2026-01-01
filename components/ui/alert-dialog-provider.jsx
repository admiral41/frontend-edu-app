"use client";

import { createContext, useContext, useState, useRef } from "react";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";

const AlertDialogContext = createContext();

export function AlertDialogProvider({ children }) {
  const [dialog, setDialog] = useState(null);
  const resolveRef = useRef(null);

  const showAlert = ({
    title,
    description,
    confirmText = "Confirm",
    cancelText = "Cancel",
    onConfirm,
    onCancel,
    variant = "default",
  }) => {
    setDialog({
      title,
      description,
      confirmText,
      cancelText,
      onConfirm,
      onCancel,
      variant,
    });
  };

  const showConfirmation = ({
    title,
    description,
    confirmText = "Confirm",
    cancelText = "Cancel",
    variant = "default",
  }) => {
    return new Promise((resolve) => {
      resolveRef.current = resolve;
      setDialog({
        title,
        description,
        confirmText,
        cancelText,
        variant,
        isPromise: true,
      });
    });
  };

  const hideAlert = () => {
    setDialog(null);
  };

  const handleConfirm = () => {
    if (dialog?.isPromise) {
      resolveRef.current?.(true);
    } else {
      dialog?.onConfirm?.();
    }
    hideAlert();
  };

  const handleCancel = () => {
    if (dialog?.isPromise) {
      resolveRef.current?.(false);
    } else {
      dialog?.onCancel?.();
    }
    hideAlert();
  };

  return (
    <AlertDialogContext.Provider value={{ showAlert, showConfirmation, hideAlert }}>
      {children}

      <AlertDialog open={!!dialog} onOpenChange={handleCancel}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>{dialog?.title}</AlertDialogTitle>
            <AlertDialogDescription>
              {dialog?.description}
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel onClick={handleCancel}>
              {dialog?.cancelText}
            </AlertDialogCancel>
            <AlertDialogAction
              onClick={handleConfirm}
              className={
                dialog?.variant === "success"
                  ? "bg-success hover:bg-success/90"
                  : dialog?.variant === "destructive"
                  ? "bg-destructive hover:bg-destructive/90"
                  : ""
              }
            >
              {dialog?.confirmText}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </AlertDialogContext.Provider>
  );
}

export function useAlertDialog() {
  const context = useContext(AlertDialogContext);
  if (!context) {
    throw new Error("useAlertDialog must be used within AlertDialogProvider");
  }
  return context;
}
