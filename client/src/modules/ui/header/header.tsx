import { ShoppingCart } from '@mui/icons-material';
import { AppBar, Badge, Box, IconButton, List, ListItem, Switch, Toolbar, Typography } from '@mui/material'
import { CSSProperties } from '@mui/styled-engine';
import { NavLink } from 'react-router-dom';
import { ABOUT, CATALOG, CONTACT, HOME } from '../../routes';
import { LOGIN, REGISTER } from '../../routes/constants/constants';

interface Props {
  mode: boolean;
  onThemeChange: () => void
}

export default function Header({ onThemeChange, mode }: Props) {

  const navigationStyles = {
    color: "inherit",
    typography: "h6",
    "&:hover": {
      color: "grey.500"
    },
    "&.active": {
      color: "text.secondary"
    }
  } as CSSProperties


  return (
    <AppBar position="sticky" sx={{ mb: 4 }}>
      <Toolbar sx={{ display: "flex", justifyContent: "space-between" }}>
        <Box sx={{ display: "flex", alignItems: "center" }}>
          <Typography
            component={NavLink}
            to={HOME}
            variant="h6"
            sx={{ ...navigationStyles, textDecoration: "none" }}>Re-Store</Typography>
          <Box sx={{ ml: 2 }}>
            <Switch color="secondary" onClick={onThemeChange} defaultChecked />
          </Box>
          <List sx={{ display: "flex" }}>
            <ListItem sx={navigationStyles} component={NavLink} to={ABOUT}>About</ListItem>
            <ListItem sx={navigationStyles} component={NavLink} to={CONTACT}>Contact</ListItem>
            <ListItem sx={navigationStyles} component={NavLink} to={CATALOG}>Catalog</ListItem>
          </List>
        </Box>
        <Box sx={{ display: "flex", alignItem: "center" }}>
          <IconButton size="large" sx={{ color: "inherit" }}>
            <Badge badgeContent={4} color="secondary">
              <ShoppingCart />
            </Badge>
          </IconButton>
          <List sx={{ display: "flex" }}>
            <ListItem sx={navigationStyles} component={NavLink} to={REGISTER}>Register</ListItem>
            <ListItem sx={navigationStyles} component={NavLink} to={LOGIN}>Login</ListItem>
          </List>
        </Box>
      </Toolbar>
    </AppBar>
  )
}
