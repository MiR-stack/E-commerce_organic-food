import React from "react";

function useDrawer() {
  const [open, setOpen] = React.useState(false);

  const handleDrawerToggle = () => {
    setOpen((prevState) => !prevState);
  };

  return { open, handleDrawerToggle };
}

export default useDrawer;
