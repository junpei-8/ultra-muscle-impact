import MenuIcon from '@suid/icons-material/Menu';
import AppBar from '@suid/material/AppBar';
import Box from '@suid/material/Box';
import IconButton from '@suid/material/IconButton';
import Toolbar from '@suid/material/Toolbar';
import Typography from '@suid/material/Typography';

const AppHeader = () => {
  return (
    <header>
      <Box sx={{ flexGrow: 1 }}>
        <AppBar position="static">
          <Toolbar>
            <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
              Muscle Impact
            </Typography>
          </Toolbar>
        </AppBar>
      </Box>
    </header>
  );
};

export default AppHeader;
