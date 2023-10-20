import Drawer from "@mui/material/Drawer";
import { Box } from "@mui/material";

function DrawerLayout({ window, open, handleDrawerToggle, children, config }) {
  const container =
    window !== undefined ? () => window().document.body : undefined;

  return (
    <Box component="nav">
      <Drawer
        container={container}
        variant="temporary"
        open={open}
        onClose={handleDrawerToggle}
        ModalProps={{
          keepMounted: true, // Better open performance on mobile.
        }}
        {...config}
      >
        {children}
      </Drawer>
    </Box>
  );
}

export default DrawerLayout;
