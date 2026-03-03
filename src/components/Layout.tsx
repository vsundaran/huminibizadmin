import { useState } from 'react';
import {
  Box,
  Drawer,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Typography,
  AppBar,
  Toolbar,
  IconButton,
  Avatar,
  Chip,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
  Button,
} from '@mui/material';
import { Outlet, useNavigate, useLocation } from 'react-router-dom';
import PeopleIcon from '@mui/icons-material/People';
import BusinessIcon from '@mui/icons-material/Business';
import LanguageIcon from '@mui/icons-material/Language';
import MenuIcon from '@mui/icons-material/Menu';
import LogoutIcon from '@mui/icons-material/Logout';
import WarningAmberRoundedIcon from '@mui/icons-material/WarningAmberRounded';
import { useAuth } from '../context/AuthContext';

const drawerWidth = 260;

const Layout = () => {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [logoutDialogOpen, setLogoutDialogOpen] = useState(false);
  const { logout, admin } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const handleDrawerToggle = () => setMobileOpen(!mobileOpen);

  const handleLogoutClick = () => setLogoutDialogOpen(true);

  const handleLogoutConfirm = () => {
    logout();
    navigate('/login');
    setLogoutDialogOpen(false);
  };

  const handleLogoutCancel = () => setLogoutDialogOpen(false);

  const menuItems = [
    { text: 'Admins', icon: <PeopleIcon />, path: '/admins' },
    { text: 'Organizations', icon: <BusinessIcon />, path: '/organizations' },
    { text: 'Domains', icon: <LanguageIcon />, path: '/domains' },
  ];

  const getInitials = (email: string) => {
    return email ? email.charAt(0).toUpperCase() : 'A';
  };

  const drawer = (
    <Box sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
      {/* Logo Section */}
      <Box
        sx={{
          px: 3,
          py: 3,
          display: 'flex',
          alignItems: 'center',
          gap: 1.5,
          borderBottom: '1px solid',
          borderColor: 'divider',
        }}
      >
        <Box
          sx={{
            width: 36,
            height: 36,
            borderRadius: '10px',
            background: 'linear-gradient(135deg, #1976d2 0%, #42a5f5 100%)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            boxShadow: '0 4px 12px rgba(25,118,210,0.3)',
          }}
        >
          <BusinessIcon sx={{ color: 'white', fontSize: 20 }} />
        </Box>
        <Box>
          <Typography
            variant="subtitle1"
            fontWeight={700}
            color="primary"
            lineHeight={1.2}
            letterSpacing="-0.3px"
          >
            HuminiBiz
          </Typography>
          <Typography variant="caption" color="text.secondary" lineHeight={1}>
            Admin Panel
          </Typography>
        </Box>
      </Box>

      {/* Navigation */}
      <Box sx={{ px: 2, py: 2, flex: 1 }}>
        <Typography
          variant="overline"
          color="text.disabled"
          sx={{ px: 1, fontWeight: 600, letterSpacing: '0.08em' }}
        >
          Navigation
        </Typography>
        <List sx={{ mt: 0.5 }} disablePadding>
          {menuItems.map((item) => {
            const isActive = location.pathname === item.path;
            return (
              <ListItem key={item.text} disablePadding sx={{ mb: 0.5 }}>
                <ListItemButton
                  selected={isActive}
                  onClick={() => {
                    navigate(item.path);
                    setMobileOpen(false);
                  }}
                  sx={{
                    borderRadius: '10px',
                    px: 2,
                    py: 1.25,
                    '&.Mui-selected': {
                      bgcolor: 'primary.main',
                      color: 'white',
                      '&:hover': { bgcolor: 'primary.dark' },
                      '& .MuiListItemIcon-root': { color: 'white' },
                    },
                    '&:hover': { bgcolor: 'grey.100' },
                  }}
                >
                  <ListItemIcon
                    sx={{
                      minWidth: 36,
                      color: isActive ? 'white' : 'text.secondary',
                    }}
                  >
                    {item.icon}
                  </ListItemIcon>
                  <ListItemText
                    primary={item.text}
                    primaryTypographyProps={{
                      fontWeight: isActive ? 600 : 400,
                      fontSize: '0.875rem',
                    }}
                  />
                </ListItemButton>
              </ListItem>
            );
          })}
        </List>
      </Box>

      {/* Bottom User Section */}
      <Box
        sx={{
          p: 2,
          borderTop: '1px solid',
          borderColor: 'divider',
        }}
      >
        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
            gap: 1.5,
            p: 1.5,
            borderRadius: '10px',
            bgcolor: 'grey.50',
          }}
        >
          <Avatar
            sx={{
              width: 34,
              height: 34,
              bgcolor: 'primary.main',
              fontSize: '0.875rem',
              fontWeight: 700,
            }}
          >
            {admin?.email ? getInitials(admin.email) : 'A'}
          </Avatar>
          <Box sx={{ flex: 1, minWidth: 0 }}>
            <Typography
              variant="caption"
              fontWeight={600}
              display="block"
              noWrap
              color="text.primary"
            >
              {admin?.email || 'Admin'}
            </Typography>
            <Chip
              label="Super Admin"
              size="small"
              color="primary"
              variant="outlined"
              sx={{ height: 16, fontSize: '0.6rem', '& .MuiChip-label': { px: 0.75 } }}
            />
          </Box>
        </Box>
      </Box>
    </Box>
  );

  return (
    <Box sx={{ display: 'flex', bgcolor: '#f8f9fb', minHeight: '100vh' }}>
      {/* AppBar */}
      <AppBar
        position="fixed"
        elevation={0}
        sx={{
          width: { sm: `calc(100% - ${drawerWidth}px)` },
          ml: { sm: `${drawerWidth}px` },
          bgcolor: 'white',
          color: 'text.primary',
          borderBottom: '1px solid',
          borderColor: 'divider',
        }}
      >
        <Toolbar sx={{ minHeight: '64px !important', px: { xs: 2, sm: 3 } }}>
          <IconButton
            color="inherit"
            edge="start"
            onClick={handleDrawerToggle}
            sx={{ mr: 2, display: { sm: 'none' } }}
          >
            <MenuIcon />
          </IconButton>

          <Box sx={{ flex: 1 }}>
            <Typography variant="h6" fontWeight={600} fontSize="1rem" color="text.primary">
              {menuItems.find((m) => m.path === location.pathname)?.text || 'Dashboard'}
            </Typography>
          </Box>

          <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
            <Box sx={{ display: { xs: 'none', sm: 'flex' }, alignItems: 'center', gap: 1 }}>
              <Avatar
                sx={{
                  width: 32,
                  height: 32,
                  bgcolor: 'primary.main',
                  fontSize: '0.8rem',
                  fontWeight: 700,
                }}
              >
                {admin?.email ? getInitials(admin.email) : 'A'}
              </Avatar>
              <Typography variant="body2" fontWeight={500} color="text.secondary">
                {admin?.email}
              </Typography>
            </Box>

            <IconButton
              onClick={handleLogoutClick}
              title="Logout"
              sx={{
                color: 'error.main',
                bgcolor: 'error.50',
                borderRadius: '8px',
                p: 1,
                '&:hover': { bgcolor: 'error.100' },
              }}
            >
              <LogoutIcon fontSize="small" />
            </IconButton>
          </Box>
        </Toolbar>
      </AppBar>

      {/* Sidebar */}
      <Box component="nav" sx={{ width: { sm: drawerWidth }, flexShrink: { sm: 0 } }}>
        <Drawer
          variant="temporary"
          open={mobileOpen}
          onClose={handleDrawerToggle}
          ModalProps={{ keepMounted: true }}
          sx={{
            display: { xs: 'block', sm: 'none' },
            '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth },
          }}
        >
          {drawer}
        </Drawer>
        <Drawer
          variant="permanent"
          sx={{
            display: { xs: 'none', sm: 'block' },
            '& .MuiDrawer-paper': {
              boxSizing: 'border-box',
              width: drawerWidth,
              bgcolor: 'white',
              borderRight: '1px solid',
              borderColor: 'divider',
            },
          }}
          open
        >
          {drawer}
        </Drawer>
      </Box>

      {/* Main Content */}
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          p: { xs: 2, sm: 3 },
          width: { sm: `calc(100% - ${drawerWidth}px)` },
          bgcolor: '#f8f9fb',
          minHeight: '100vh',
        }}
      >
        <Toolbar sx={{ minHeight: '64px !important' }} />
        <Outlet />
      </Box>

      {/* Logout Confirmation Dialog */}
      <Dialog
        open={logoutDialogOpen}
        onClose={handleLogoutCancel}
        maxWidth="xs"
        fullWidth
        PaperProps={{
          sx: { borderRadius: '16px', p: 1 },
        }}
      >
        <DialogTitle sx={{ textAlign: 'center', pt: 3, pb: 1 }}>
          <Box
            sx={{
              width: 56,
              height: 56,
              borderRadius: '50%',
              bgcolor: 'error.50',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              mx: 'auto',
              mb: 2,
            }}
          >
            <WarningAmberRoundedIcon sx={{ color: 'error.main', fontSize: 28 }} />
          </Box>
          <Typography variant="h6" fontWeight={700}>
            Confirm Logout
          </Typography>
        </DialogTitle>
        <DialogContent sx={{ textAlign: 'center', pb: 1 }}>
          <DialogContentText>
            Are you sure you want to log out? You will need to log in again to access the admin panel.
          </DialogContentText>
        </DialogContent>
        <DialogActions sx={{ px: 3, pb: 3, gap: 1 }}>
          <Button
            onClick={handleLogoutCancel}
            variant="outlined"
            color="inherit"
            fullWidth
            sx={{ borderRadius: '10px', textTransform: 'none', fontWeight: 600 }}
          >
            Cancel
          </Button>
          <Button
            onClick={handleLogoutConfirm}
            variant="contained"
            color="error"
            fullWidth
            startIcon={<LogoutIcon />}
            sx={{ borderRadius: '10px', textTransform: 'none', fontWeight: 600 }}
          >
            Logout
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default Layout;
