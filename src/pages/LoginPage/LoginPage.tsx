import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Box,
  Button,
  Flash,
  FormControl,
  Heading,
  IconButton,
  Link,
  PageLayout,
  Text,
  TextInput,
} from '@primer/react';
import { XIcon } from '@primer/octicons-react';
import { handleLoginSubmit, handleCheckToken } from '../../utils/auth.util';
import LoadingSpinner from '../../components/LoadingSpinner';
import './LoginPage.module.css';
import LoginNavbar from '../../components/Navbar/LoginNavbar';
import LoginFooter from '../../components/Footer/LoginFooter';

const LoginPage = () => {
  const [error, setError] = useState(false);
  const [isValid, setIsValid] = useState(false);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  useEffect(() => {
    const token = localStorage.getItem('access_token');
    if (token) {
      handleCheckToken(token).finally(() => {
        navigate('/');
        setLoading(false);
      });
    }
    setLoading(false);
  }, [navigate]);

  useEffect(() => {
    setIsValid(!!username.trim() && !!password.trim());
  }, [username, password]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const result = await handleLoginSubmit(username, password, navigate);
    setError(result.error);
  };

  if (loading) {
    return <LoadingSpinner />;
  }

  return (
    <PageLayout
      sx={{
        padding: 0,
        margin: 0,
      }}
    >
      <PageLayout.Header
        sx={{
          width: '100%',
          margin: 0,
          marginRight: 'auto',
          marginLeft: 'auto',
          paddingTop: 5,
          paddingBottom: 4,
          textAlign: 'center',
          position: 'relative',
        }}
      >
        <LoginNavbar />
      </PageLayout.Header>
      <PageLayout.Content>
        <Box
          sx={{
            width: '340px',
            margin: '0 auto',
            paddingX: 3,
          }}
          id="login"
        >
          <Box
            sx={{
              margin: 0,
              padding: 0,
              marginBottom: 16,
              color: 'fg.default',
              textAlign: 'center',
              textShadow: 'none',
              backgroundColor: 'transparent',
              border: 0,
              borderRadius: '6px 6px 0 0',
            }}
          >
            <Heading
              as="h1"
              sx={{
                fontSize: 24,
                fontWeight: 300,
                letterSpacing: '-0.5px',
              }}
            >
              Sign in to GitHub
            </Heading>
          </Box>

          <Flash variant="danger" hidden={!error}>
            <Box
              sx={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                paddingX: 2,
              }}
            >
              Incorrect username or password.
              <IconButton
                variant="invisible"
                aria-label="Close flash"
                icon={XIcon}
                onClick={() => setError(false)}
              />
            </Box>
          </Flash>

          <Box
            as={'form'}
            onSubmit={handleSubmit}
            sx={{
              marginTop: 3,
              padding: 16,
              fontSize: 14,
              backgroundColor: 'canvas.subtle',
              border: '1px solid',
              borderColor: 'border.muted',
              borderRadius: 6,
            }}
          >
            <FormControl
              required
              sx={{
                marginBottom: 4,
              }}
            >
              <FormControl.Label
                sx={{
                  marginBottom: 2,
                  fontWeight: '400',
                  textAlign: 'left',
                }}
              >
                Username or email address
              </FormControl.Label>
              <TextInput
                type="text"
                onChange={(e) => setUsername(e.target.value)}
                sx={{
                  marginTop: 1,
                  width: '100%',
                  paddingY: '5px',
                }}
              />
              {/* Show if validation of this field failed */}
              {!isValid && (
                <FormControl.Validation variant="error">
                  Is required
                </FormControl.Validation>
              )}
            </FormControl>
            <Box
              sx={{
                position: 'relative',
              }}
            >
              <FormControl
                required
                sx={{
                  marginBottom: 4,
                }}
              >
                <FormControl.Label
                  sx={{
                    marginBottom: 2,
                    fontWeight: '400',
                    textAlign: 'left',
                  }}
                >
                  Password
                </FormControl.Label>
                <TextInput
                  type="password"
                  onChange={(e) => setPassword(e.target.value)}
                  sx={{
                    marginTop: 1,
                    width: '100%',
                    paddingY: '5px',
                  }}
                />
                {/* Show if validation of this field failed */}
                {!isValid && (
                  <FormControl.Validation variant="error">
                    Is required
                  </FormControl.Validation>
                )}
              </FormControl>

              <FormControl required>
                <Button
                  type="submit"
                  variant="primary"
                  disabled={!isValid}
                  block
                >
                  Sign in
                </Button>
              </FormControl>

              <Link
                sx={{
                  textDecoration: 'none !important',
                  fontSize: '12px',
                  position: 'absolute',
                  top: 0,
                  right: 0,
                }}
                href="/password_reset"
              >
                Forgot password?
              </Link>
            </Box>
          </Box>

          <Text
            as="p"
            sx={{
              marginTop: 3,
              padding: 4,
              textAlign: 'center',
              border: '1px solid',
              borderColor: 'border.default',
              borderRadius: 6,
            }}
          >
            New to GitHub? <Link href="/signup">Create an account</Link>.
          </Text>
        </Box>
      </PageLayout.Content>
      <PageLayout.Footer
        sx={{
          maxWidth: 1012,
          marginRight: 'auto',
          marginLeft: 'auto',

          paddingX: [16, 40, 40, 16],
          paddingY: 6,
          marginTop: 6,
          fontSize: '12px',
        }}
      >
        <LoginFooter />
      </PageLayout.Footer>
    </PageLayout>
  );
};

export default LoginPage;
