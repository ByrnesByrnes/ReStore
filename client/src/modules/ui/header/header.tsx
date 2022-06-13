import { AppBar, Box, FormControlLabel, FormGroup, Switch, Toolbar, Typography } from '@mui/material'

interface Props {
  mode: boolean;
  onThemeChange: () => void
}

export default function Header({ onThemeChange, mode }: Props) {

  return (
    <AppBar position="sticky" sx={{ mb: 4 }}>
      <Toolbar>
        <Typography variant="h6">Re-Store</Typography>
        <Box sx={{ ml: 2 }}>
          <Switch color="secondary" onClick={onThemeChange} defaultChecked />
        </Box>
      </Toolbar>
    </AppBar>
  )
}
