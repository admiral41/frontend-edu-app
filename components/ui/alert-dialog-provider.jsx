"use client";

import { createContext, useContext, useState } from "react";
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

  const hideAlert = () => {
    setDialog(null);
  };

  const handleConfirm = () => {
    dialog?.onConfirm?.();
    hideAlert();
  };

  const handleCancel = () => {
    dialog?.onCancel?.();
    hideAlert();
  };

  return (
    <AlertDialogContext.Provider value={{ showAlert, hideAlert }}>
      {children}

      <AlertDialog open={!!dialog} onOpenChange={hideAlert}>
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
