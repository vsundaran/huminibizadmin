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
import BusinessOutlinedIcon from '@mui/icons-material/BusinessOutlined';
import CloseIcon from '@mui/icons-material/Close';
import { useOrganizations, useAddOrganization } from '../hooks/useAdminData';

const Organizations = () => {
  const { data: orgs, isLoading } = useOrganizations();
  const { mutate: addOrganization, isPending } = useAddOrganization();
  const [open, setOpen] = useState(false);
  const [name, setName] = useState('');
  const [search, setSearch] = useState('');

  const handleAdd = (e: React.FormEvent) => {
    e.preventDefault();
    addOrganization(name, {
      onSuccess: () => {
        setOpen(false);
        setName('');
      },
    });
  };

  const filtered = orgs?.filter((o: any) =>
    o.name?.toLowerCase().includes(search.toLowerCase())
  );

  const getOrgInitials = (name: string) => name?.charAt(0).toUpperCase() || 'O';

  const statusColor = (status: string) => {
    if (status === 'active') return 'success';
    if (status === 'inactive') return 'error';
    return 'default';
  };

  return (
    <Box>
      {/* Page Header */}
      <Box display="flex" justifyContent="space-between" alignItems="flex-start" mb={3}>
        <Box>
          <Typography variant="h5" fontWeight={700} color="text.primary" gutterBottom>
            Organizations
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Manage registered organizations on the platform
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
          Add Organization
        </Button>
      </Box>

      {/* Stats Card */}
      <Box sx={{ display: 'flex', gap: 2, mb: 3 }}>
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
              bgcolor: 'success.50',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <BusinessOutlinedIcon sx={{ color: 'success.main', fontSize: 24 }} />
          </Box>
          <Box>
            <Typography variant="h5" fontWeight={700} color="text.primary">
              {isLoading ? '—' : orgs?.length ?? 0}
            </Typography>
            <Typography variant="caption" color="text.secondary">
              Total Organizations
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
            placeholder="Search organizations..."
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
                  Organization
                </TableCell>
                <TableCell sx={{ fontWeight: 600, color: 'text.secondary', fontSize: '0.78rem', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                  Status
                </TableCell>
                <TableCell sx={{ fontWeight: 600, color: 'text.secondary', fontSize: '0.78rem', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                  Created At
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {isLoading
                ? Array.from({ length: 4 }).map((_, i) => (
                    <TableRow key={i}>
                      <TableCell><Skeleton variant="text" width={200} /></TableCell>
                      <TableCell><Skeleton variant="rounded" width={60} height={24} /></TableCell>
                      <TableCell><Skeleton variant="text" width={100} /></TableCell>
                    </TableRow>
                  ))
                : filtered?.map((org: any) => (
                    <TableRow key={org._id} hover sx={{ '&:last-child td': { border: 0 } }}>
                      <TableCell>
                        <Box display="flex" alignItems="center" gap={1.5}>
                          <Avatar
                            sx={{
                              width: 34,
                              height: 34,
                              bgcolor: 'success.light',
                              color: 'success.dark',
                              fontSize: '0.8rem',
                              fontWeight: 700,
                            }}
                          >
                            {getOrgInitials(org.name)}
                          </Avatar>
                          <Typography variant="body2" fontWeight={500}>
                            {org.name}
                          </Typography>
                        </Box>
                      </TableCell>
                      <TableCell>
                        <Chip
                          label={org.status || 'Active'}
                          size="small"
                          color={statusColor(org.status) as any}
                          variant="outlined"
                          sx={{ fontWeight: 600, textTransform: 'capitalize', fontSize: '0.75rem' }}
                        />
                      </TableCell>
                      <TableCell>
                        <Typography variant="body2" color="text.secondary">
                          {new Date(org.createdAt).toLocaleDateString('en-US', {
                            year: 'numeric',
                            month: 'short',
                            day: 'numeric',
                          })}
                        </Typography>
                      </TableCell>
                    </TableRow>
                  ))}

              {!isLoading && filtered?.length === 0 && (
                <TableRow>
                  <TableCell colSpan={3} align="center" sx={{ py: 6 }}>
                    <Typography color="text.disabled">No organizations found</Typography>
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </TableContainer>
      </Paper>

      {/* Add Organization Dialog */}
      <Dialog
        open={open}
        onClose={() => setOpen(false)}
        maxWidth="sm"
        fullWidth
        PaperProps={{ sx: { borderRadius: '16px', p: 1 } }}
      >
        <form onSubmit={handleAdd}>
          <DialogTitle sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <Typography variant="h6" fontWeight={700}>Add New Organization</Typography>
            <IconButton size="small" onClick={() => setOpen(false)}>
              <CloseIcon fontSize="small" />
            </IconButton>
          </DialogTitle>
          <DialogContent sx={{ pt: 1 }}>
            <Typography variant="body2" color="text.secondary" mb={2}>
              Enter the name of the new organization to add to the platform.
            </Typography>
            <TextField
              autoFocus
              label="Organization Name"
              type="text"
              fullWidth
              variant="outlined"
              required
              value={name}
              onChange={(e) => setName(e.target.value)}
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
              disabled={!name || isPending}
              sx={{ borderRadius: '10px', textTransform: 'none', fontWeight: 600, px: 3 }}
            >
              {isPending ? <CircularProgress size={20} color="inherit" /> : 'Add Organization'}
            </Button>
          </DialogActions>
        </form>
      </Dialog>
    </Box>
  );
};

export default Organizations;
