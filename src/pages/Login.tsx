import { useState } from 'react';
import {
  Box,
  Card,
  CardContent,
  Typography,
  TextField,
  Button,
  CircularProgress,
  InputAdornment,
  Divider,
} from '@mui/material';
import EmailOutlinedIcon from '@mui/icons-material/EmailOutlined';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import BusinessIcon from '@mui/icons-material/Business';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { useRequestOtp, useVerifyOtp } from '../hooks/useAdminAuth';

const Login = () => {
  const [email, setEmail] = useState('');
  const [otp, setOtp] = useState('');
  const [step, setStep] = useState<1 | 2>(1);

  const { mutate: requestOtp, isPending: isRequesting } = useRequestOtp();
  const { mutate: verifyOtp, isPending: isVerifying } = useVerifyOtp();

  const handleRequestOtp = (e: React.FormEvent) => {
    e.preventDefault();
    requestOtp(email, {
      onSuccess: () => setStep(2),
    });
  };

  const handleVerifyOtp = (e: React.FormEvent) => {
    e.preventDefault();
    verifyOtp({ email, otp });
  };

  return (
    <Box
      sx={{
        width: '100vw',
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        background: 'linear-gradient(135deg, #f0f4ff 0%, #fafafa 50%, #f0f9ff 100%)',
        p: 2,
      }}
    >
      {/* Background accent */}
      <Box
        sx={{
          position: 'fixed',
          top: -200,
          right: -200,
          width: 600,
          height: 600,
          borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(25,118,210,0.06) 0%, transparent 70%)',
          pointerEvents: 'none',
        }}
      />
      <Box
        sx={{
          position: 'fixed',
          bottom: -200,
          left: -200,
          width: 500,
          height: 500,
          borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(66,165,245,0.06) 0%, transparent 70%)',
          pointerEvents: 'none',
        }}
      />

      <Card
        elevation={0}
        sx={{
          maxWidth: 440,
          width: '100%',
          borderRadius: '20px',
          border: '1px solid',
          borderColor: 'divider',
          boxShadow: '0 8px 40px rgba(0,0,0,0.08)',
          overflow: 'visible',
        }}
      >
        <CardContent sx={{ p: 4 }}>
          {/* Logo */}
          <Box display="flex" flexDirection="column" alignItems="center" mb={4}>
            <Box
              sx={{
                width: 60,
                height: 60,
                borderRadius: '16px',
                background: 'linear-gradient(135deg, #1976d2 0%, #42a5f5 100%)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                boxShadow: '0 6px 20px rgba(25,118,210,0.35)',
                mb: 2.5,
              }}
            >
              <BusinessIcon sx={{ color: 'white', fontSize: 30 }} />
            </Box>
            <Typography
              variant="h5"
              fontWeight={700}
              color="text.primary"
              textAlign="center"
              letterSpacing="-0.5px"
            >
              HuminiBiz Admin
            </Typography>
            <Typography
              variant="body2"
              color="text.secondary"
              textAlign="center"
              mt={0.5}
            >
              {step === 1
                ? 'Sign in to access your admin panel'
                : `Enter the OTP sent to ${email}`}
            </Typography>
          </Box>

          {/* Step indicator */}
          <Box display="flex" alignItems="center" gap={1} mb={3}>
            <Box
              sx={{
                flex: 1,
                height: 3,
                borderRadius: 2,
                bgcolor: step >= 1 ? 'primary.main' : 'grey.200',
                transition: 'background-color 0.3s',
              }}
            />
            <Box
              sx={{
                flex: 1,
                height: 3,
                borderRadius: 2,
                bgcolor: step >= 2 ? 'primary.main' : 'grey.200',
                transition: 'background-color 0.3s',
              }}
            />
          </Box>
          <Box display="flex" justifyContent="space-between" mb={3}>
            <Typography variant="caption" color={step >= 1 ? 'primary.main' : 'text.disabled'} fontWeight={600}>
              Email
            </Typography>
            <Typography variant="caption" color={step >= 2 ? 'primary.main' : 'text.disabled'} fontWeight={600}>
              Verify OTP
            </Typography>
          </Box>

          <Divider sx={{ mb: 3 }} />

          {step === 1 ? (
            <form onSubmit={handleRequestOtp}>
              <TextField
                fullWidth
                label="Admin Email"
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <EmailOutlinedIcon sx={{ color: 'text.disabled', fontSize: 20 }} />
                    </InputAdornment>
                  ),
                  sx: { borderRadius: '10px' },
                }}
                sx={{ mb: 3 }}
              />
              <Button
                fullWidth
                variant="contained"
                type="submit"
                disabled={isRequesting || !email}
                size="large"
                sx={{
                  borderRadius: '10px',
                  textTransform: 'none',
                  fontWeight: 600,
                  py: 1.5,
                  fontSize: '0.95rem',
                  boxShadow: '0 4px 16px rgba(25,118,210,0.3)',
                }}
              >
                {isRequesting ? (
                  <CircularProgress size={22} color="inherit" />
                ) : (
                  'Send OTP'
                )}
              </Button>
            </form>
          ) : (
            <form onSubmit={handleVerifyOtp}>
              <TextField
                fullWidth
                label="One-Time Password"
                required
                value={otp}
                onChange={(e) => setOtp(e.target.value)}
                placeholder="Enter the 6-digit OTP"
                inputProps={{ maxLength: 6, style: { letterSpacing: '0.3em', fontSize: '1.2rem' } }}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <LockOutlinedIcon sx={{ color: 'text.disabled', fontSize: 20 }} />
                    </InputAdornment>
                  ),
                  sx: { borderRadius: '10px' },
                }}
                sx={{ mb: 3 }}
              />
              <Button
                fullWidth
                variant="contained"
                type="submit"
                disabled={isVerifying || !otp}
                size="large"
                sx={{
                  borderRadius: '10px',
                  textTransform: 'none',
                  fontWeight: 600,
                  py: 1.5,
                  fontSize: '0.95rem',
                  boxShadow: '0 4px 16px rgba(25,118,210,0.3)',
                  mb: 2,
                }}
              >
                {isVerifying ? (
                  <CircularProgress size={22} color="inherit" />
                ) : (
                  'Verify & Sign In'
                )}
              </Button>
              <Button
                fullWidth
                variant="text"
                color="inherit"
                startIcon={<ArrowBackIcon />}
                onClick={() => { setStep(1); setOtp(''); }}
                sx={{
                  borderRadius: '10px',
                  textTransform: 'none',
                  fontWeight: 500,
                  color: 'text.secondary',
                }}
              >
                Back to email
              </Button>
            </form>
          )}
        </CardContent>
      </Card>
    </Box>
  );
};

export default Login;
