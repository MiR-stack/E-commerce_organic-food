import { useState } from "react";

function useModal() {
    const [open, setOpen] = useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);
  
    return {open,handleClose,handleOpen}
}

export default useModal