import { useState } from 'react';
import {
  Box,
  Typography,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Button,
  TextField,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  CircularProgress,
  Chip,
  Avatar,
  Skeleton,
  InputAdornment,
  IconButton,
} from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import SearchIcon from '@mui/icons-material/Search';
import PeopleAltOutlinedIcon from '@mui/icons-material/PeopleAltOutlined';
import CloseIcon from '@mui/icons-material/Close';
import { useAdmins, useAddAdmin } from '../hooks/useAdminData';

const Admins = () => {
  const { data: admins, isLoading } = useAdmins();
  const { mutate: addAdmin, isPending } = useAddAdmin();
  const [open, setOpen] = useState(false);
  const [email, setEmail] = useState('');
  const [search, setSearch] = useState('');

  const handleAdd = (e: React.FormEvent) => {
    e.preventDefault();
    addAdmin(email, {
      onSuccess: () => {
        setOpen(false);
        setEmail('');
      },
    });
  };

  const filtered = admins?.filter((a: any) =>
    a.email?.toLowerCase().includes(search.toLowerCase())
  );

  const getInitials = (email: string) => email?.charAt(0).toUpperCase() || 'A';

  return (
    <Box>
      {/* Page Header */}
      <Box display="flex" justifyContent="space-between" alignItems="flex-start" mb={3}>
        <Box>
          <Typography variant="h5" fontWeight={700} color="text.primary" gutterBottom>
            Admins
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Manage administrator accounts and access
          </Typography>
        </Box>
        <Button
          variant="contained"
          startIcon={<AddIcon />}
          onClick={() => setOpen(true)}
          sx={{
            borderRadius: '10px',
            textTransform: 'none',
            fontWeight: 600,
            px: 2.5,
            py: 1.25,
            boxShadow: '0 4px 12px rgba(25,118,210,0.25)',
          }}
        >
          Add Admin
        </Button>
      </Box>

      {/* Stats Card */}
      <Box
        sx={{
          display: 'flex',
          gap: 2,
          mb: 3,
        }}
      >
        <Paper
          elevation={0}
          sx={{
            p: 2.5,
            borderRadius: '14px',
            border: '1px solid',
            borderColor: 'divider',
            display: 'flex',
            alignItems: 'center',
            gap: 2,
            minWidth: 200,
          }}
        >
          <Box
            sx={{
              width: 48,
              height: 48,
              borderRadius: '12px',
              bgcolor: 'primary.50',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <PeopleAltOutlinedIcon sx={{ color: 'primary.main', fontSize: 24 }} />
          </Box>
          <Box>
            <Typography variant="h5" fontWeight={700} color="text.primary">
              {isLoading ? '—' : admins?.length ?? 0}
            </Typography>
            <Typography variant="caption" color="text.secondary">
              Total Admins
            </Typography>
          </Box>
        </Paper>
      </Box>

      {/* Table Card */}
      <Paper
        elevation={0}
        sx={{ borderRadius: '14px', border: '1px solid', borderColor: 'divider', overflow: 'hidden' }}
      >
        {/* Search Bar */}
        <Box sx={{ p: 2, borderBottom: '1px solid', borderColor: 'divider' }}>
          <TextField
            placeholder="Search admins..."
            size="small"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <SearchIcon fontSize="small" sx={{ color: 'text.disabled' }} />
                </InputAdornment>
              ),
              sx: { borderRadius: '8px' },
            }}
            sx={{ width: 280 }}
          />
        </Box>

        <TableContainer>
          <Table>
            <TableHead>
              <TableRow sx={{ bgcolor: 'grey.50' }}>
                <TableCell sx={{ fontWeight: 600, color: 'text.secondary', fontSize: '0.78rem', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                  Admin
                </TableCell>
                <TableCell sx={{ fontWeight: 600, color: 'text.secondary', fontSize: '0.78rem', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                  Status
                </TableCell>
                <TableCell sx={{ fontWeight: 600, color: 'text.secondary', fontSize: '0.78rem', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                  Last Login
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {isLoading
                ? Array.from({ length: 4 }).map((_, i) => (
                    <TableRow key={i}>
                      <TableCell><Skeleton variant="text" width={200} /></TableCell>
                      <TableCell><Skeleton variant="rounded" width={60} height={24} /></TableCell>
                      <TableCell><Skeleton variant="text" width={120} /></TableCell>
                    </TableRow>
                  ))
                : filtered?.map((admin: any) => (
                    <TableRow
                      key={admin._id}
                      hover
                      sx={{ '&:last-child td': { border: 0 }, cursor: 'default' }}
                    >
                      <TableCell>
                        <Box display="flex" alignItems="center" gap={1.5}>
                          <Avatar sx={{ width: 34, height: 34, bgcolor: 'primary.light', fontSize: '0.8rem', fontWeight: 700 }}>
                            {getInitials(admin.email)}
                          </Avatar>
                          <Typography variant="body2" fontWeight={500}>
                            {admin.email}
                          </Typography>
                        </Box>
                      </TableCell>
                      <TableCell>
                        <Chip
                          label={admin.status || 'Active'}
                          size="small"
                          color={admin.status === 'active' || !admin.status ? 'success' : 'default'}
                          variant="outlined"
                          sx={{ fontWeight: 600, textTransform: 'capitalize', fontSize: '0.75rem' }}
                        />
                      </TableCell>
                      <TableCell>
                        <Typography variant="body2" color="text.secondary">
                          {admin.lastLoginAt
                            ? new Date(admin.lastLoginAt).toLocaleString()
                            : 'Never'}
                        </Typography>
                      </TableCell>
                    </TableRow>
                  ))}

              {!isLoading && filtered?.length === 0 && (
                <TableRow>
                  <TableCell colSpan={3} align="center" sx={{ py: 6 }}>
                    <Typography color="text.disabled">No admins found</Typography>
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </TableContainer>
      </Paper>

      {/* Add Admin Dialog */}
      <Dialog
        open={open}
        onClose={() => setOpen(false)}
        maxWidth="sm"
        fullWidth
        PaperProps={{ sx: { borderRadius: '16px', p: 1 } }}
      >
        <form onSubmit={handleAdd}>
          <DialogTitle sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <Typography variant="h6" fontWeight={700}>Add New Admin</Typography>
            <IconButton size="small" onClick={() => setOpen(false)}>
              <CloseIcon fontSize="small" />
            </IconButton>
          </DialogTitle>
          <DialogContent sx={{ pt: 1 }}>
            <Typography variant="body2" color="text.secondary" mb={2}>
              Enter the email address of the new administrator.
            </Typography>
            <TextField
              autoFocus
              label="Admin Email"
              type="email"
              fullWidth
              variant="outlined"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              InputProps={{ sx: { borderRadius: '10px' } }}
            />
          </DialogContent>
          <DialogActions sx={{ px: 3, pb: 3, gap: 1 }}>
            <Button
              onClick={() => setOpen(false)}
              color="inherit"
              variant="outlined"
              sx={{ borderRadius: '10px', textTransform: 'none', fontWeight: 600 }}
            >
              Cancel
            </Button>
            <Button
              type="submit"
              variant="contained"
              disabled={!email || isPending}
              sx={{ borderRadius: '10px', textTransform: 'none', fontWeight: 600, px: 3 }}
            >
              {isPending ? <CircularProgress size={20} color="inherit" /> : 'Add Admin'}
            </Button>
          </DialogActions>
        </form>
      </Dialog>
    </Box>
  );
};

export default Admins;
