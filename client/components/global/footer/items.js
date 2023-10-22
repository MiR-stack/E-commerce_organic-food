import { List, ListItem, ListItemText, Typography } from "@mui/material";
import Grid from "@mui/material/Unstable_Grid2/Grid2";
import CustomLink from "../../shared/customeLink";
import { PropTypes } from "@mui/material";
import Link from "next/link";

function Items({ footer_link: { title, links } }) {
  return (
    <Grid md sm={6} xs={12} sx={{ textTransform: "capitalize" }}>
      <Typography component="h5" variant="h5" gutterBottom>
        {title}
      </Typography>
      <List disablePadding>
        {links.map((link) => (
          <Link href={link.href} passHref legacyBehavior key={link.id}>
            <ListItem disablePadding sx={{ cursor: "pointer" }}>
              <ListItemText primary={link.label} />
            </ListItem>
          </Link>
        ))}
      </List>
    </Grid>
  );
}

export default Items;

// Items.proptypes({
//   footer_link: PropTypes.shape({
//     title: PropTypes.string.isRequired,
//     links: PropTypes.arrayOf({
//       id: PropTypes.number.isRequired,
//       label: PropTypes.string.isRequired,
//       href: PropTypes.string.isRequired,
//     }),
//   }),
// });
