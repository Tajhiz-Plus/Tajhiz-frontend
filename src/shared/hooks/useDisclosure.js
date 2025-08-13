import { useState, useCallback } from "react";

export function useDisclosure({
  open: controlledOpen,
  defaultOpen,
  onClose,
  onOpen,
} = {}) {
  const [isOpen, setIsOpen] = useState(defaultOpen || false);

  const open = controlledOpen !== undefined ? controlledOpen : isOpen;

  const handleOpen = useCallback(() => {
    if (onOpen) onOpen();
    setIsOpen(true);
  }, [onOpen]);

  const handleClose = useCallback(() => {
    if (onClose) onClose();
    setIsOpen(false);
  }, [onClose]);

  const handleToggle = useCallback(() => {
    open ? handleClose() : handleOpen();
  }, [open, handleOpen, handleClose]);

  return {
    open,
    onOpen: handleOpen,
    onClose: handleClose,
    onToggle: handleToggle,
    setOpen: setIsOpen,
  };
}
