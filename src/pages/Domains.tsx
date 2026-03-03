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
  MenuItem,
  Select,
  FormControl,
  InputLabel,
  InputAdornment,
  IconButton,
} from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import SearchIcon from '@mui/icons-material/Search';
import LanguageOutlinedIcon from '@mui/icons-material/LanguageOutlined';
import CloseIcon from '@mui/icons-material/Close';
import { useDomains, useAddDomain, useOrganizations } from '../hooks/useAdminData';

const Domains = () => {
  const { data: domains, isLoading } = useDomains();
  const { data: orgs, isLoading: loadingOrgs } = useOrganizations();
  const { mutate: addDomain, isPending } = useAddDomain();

  const [open, setOpen] = useState(false);
  const [organizationId, setOrganizationId] = useState('');
  const [domain, setDomain] = useState('');
  const [search, setSearch] = useState('');

  const handleAdd = (e: React.FormEvent) => {
    e.preventDefault();
    addDomain({ organizationId, domain }, {
      onSuccess: () => {
        setOpen(false);
        setDomain('');
        setOrganizationId('');
      },
    });
  };

  const filtered = domains?.filter((d: any) =>
    d.domain?.toLowerCase().includes(search.toLowerCase()) ||
    d.organizationId?.name?.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <Box>
      {/* Page Header */}
      <Box display="flex" justifyContent="space-between" alignItems="flex-start" mb={3}>
        <Box>
          <Typography variant="h5" fontWeight={700} color="text.primary" gutterBottom>
            Organization Domains
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Manage allowed domains for organizations
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
          Add Domain
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
              bgcolor: 'info.50',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <LanguageOutlinedIcon sx={{ color: 'info.main', fontSize: 24 }} />
          </Box>
          <Box>
            <Typography variant="h5" fontWeight={700} color="text.primary">
              {isLoading ? '—' : domains?.length ?? 0}
            </Typography>
            <Typography variant="caption" color="text.secondary">
              Total Domains
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
            placeholder="Search domains or organizations..."
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
            sx={{ width: 320 }}
          />
        </Box>

        <TableContainer>
          <Table>
            <TableHead>
              <TableRow sx={{ bgcolor: 'grey.50' }}>
                <TableCell sx={{ fontWeight: 600, color: 'text.secondary', fontSize: '0.78rem', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                  Domain
                </TableCell>
                <TableCell sx={{ fontWeight: 600, color: 'text.secondary', fontSize: '0.78rem', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                  Organization
                </TableCell>
                <TableCell sx={{ fontWeight: 600, color: 'text.secondary', fontSize: '0.78rem', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                  Created At
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {isLoading || loadingOrgs
                ? Array.from({ length: 4 }).map((_, i) => (
                    <TableRow key={i}>
                      <TableCell><Skeleton variant="text" width={180} /></TableCell>
                      <TableCell><Skeleton variant="text" width={120} /></TableCell>
                      <TableCell><Skeleton variant="text" width={100} /></TableCell>
                    </TableRow>
                  ))
                : filtered?.map((d: any) => (
                    <TableRow key={d._id} hover sx={{ '&:last-child td': { border: 0 } }}>
                      <TableCell>
                        <Box display="flex" alignItems="center" gap={1.5}>
                          <Avatar
                            sx={{
                              width: 34,
                              height: 34,
                              bgcolor: 'info.50',
                              color: 'info.main',
                              fontSize: '0.75rem',
                              fontWeight: 700,
                            }}
                          >
                            <LanguageOutlinedIcon sx={{ fontSize: 18 }} />
                          </Avatar>
                          <Box>
                            <Typography variant="body2" fontWeight={600}>
                              {d.domain}
                            </Typography>
                          </Box>
                        </Box>
                      </TableCell>
                      <TableCell>
                        <Chip
                          label={d.organizationId?.name || 'Unknown'}
                          size="small"
                          variant="outlined"
                          color="primary"
                          sx={{ fontWeight: 500, fontSize: '0.75rem' }}
                        />
                      </TableCell>
                      <TableCell>
                        <Typography variant="body2" color="text.secondary">
                          {new Date(d.createdAt).toLocaleDateString('en-US', {
                            year: 'numeric',
                            month: 'short',
                            day: 'numeric',
                          })}
                        </Typography>
                      </TableCell>
                    </TableRow>
                  ))}

              {!isLoading && !loadingOrgs && filtered?.length === 0 && (
                <TableRow>
                  <TableCell colSpan={3} align="center" sx={{ py: 6 }}>
                    <Typography color="text.disabled">No domains found</Typography>
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </TableContainer>
      </Paper>

      {/* Add Domain Dialog */}
      <Dialog
        open={open}
        onClose={() => setOpen(false)}
        maxWidth="sm"
        fullWidth
        PaperProps={{ sx: { borderRadius: '16px', p: 1 } }}
      >
        <form onSubmit={handleAdd}>
          <DialogTitle sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <Typography variant="h6" fontWeight={700}>Add New Domain</Typography>
            <IconButton size="small" onClick={() => setOpen(false)}>
              <CloseIcon fontSize="small" />
            </IconButton>
          </DialogTitle>
          <DialogContent sx={{ pt: 1, display: 'flex', flexDirection: 'column', gap: 2 }}>
            <Typography variant="body2" color="text.secondary">
              Select the organization and enter the domain name to allow for login.
            </Typography>
            <FormControl fullWidth>
              <InputLabel id="org-label">Organization</InputLabel>
              <Select
                labelId="org-label"
                value={organizationId}
                label="Organization"
                onChange={(e) => setOrganizationId(e.target.value)}
                required
                sx={{ borderRadius: '10px' }}
              >
                {orgs?.map((org: any) => (
                  <MenuItem key={org._id} value={org._id}>
                    {org.name}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
            <TextField
              label="Domain (e.g. companya.com)"
              type="text"
              fullWidth
              variant="outlined"
              required
              value={domain}
              onChange={(e) => setDomain(e.target.value)}
              InputProps={{ sx: { borderRadius: '10px' } }}
              helperText="Enter the root domain without http:// or www"
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
              disabled={!domain || !organizationId || isPending}
              sx={{ borderRadius: '10px', textTransform: 'none', fontWeight: 600, px: 3 }}
            >
              {isPending ? <CircularProgress size={20} color="inherit" /> : 'Add Domain'}
            </Button>
          </DialogActions>
        </form>
      </Dialog>
    </Box>
  );
};

export default Domains;
