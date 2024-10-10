import React, { useEffect, useState, useRef } from 'react';
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
import { useAuthContext } from '../../contexts/auth.context';
import './LoginPage.module.css';
import LoginNavbar from '../../components/Navbar/LoginNavbar';
import LoginFooter from '../../components/Footer/LoginFooter';
import { useValidationContext } from '../../contexts/validation.context';
import { useGeneralContext } from '../../contexts/general.context';
import LoadingSpinner from '../../components/LoadingSpinner';

const LoginPage: React.FC = () => {
  const { loading, setLoading } = useGeneralContext();
  const [isValid, setIsValid] = useState(true);
  const navigate = useNavigate();

  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const usernameInputRef = useRef<HTMLInputElement>(null);
  const passwordInputRef = useRef<HTMLInputElement>(null);

  const { handleCheckToken, handleLoginSubmit } = useAuthContext();
  const { handleFormSubmit, hasError } =
    useValidationContext().useInputValidation([
      usernameInputRef,
      passwordInputRef,
    ]);

  useEffect(() => {
    const token = localStorage.getItem('access_token');
    if (token) {
      handleCheckToken(token, navigate).finally(() => {
        setLoading(false);
      });
    } else {
      setLoading(false);
    }
  }, [navigate]);
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await handleFormSubmit(async () => {
      const result = await handleLoginSubmit(username, password, navigate);
      setIsValid(!result.error);
    });
  };

  const showError = (field: string) => {
    return hasError(field);
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

          <Flash variant="danger" hidden={isValid}>
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
                onClick={() => setIsValid(true)}
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
                ref={usernameInputRef}
                type="text"
                onChange={(e) => setUsername(e.target.value)}
                sx={{
                  marginTop: 1,
                  width: '100%',
                  paddingY: '5px',
                }}
              />
              {showError(username) && (
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
                  ref={passwordInputRef}
                  type="password"
                  onChange={(e) => setPassword(e.target.value)}
                  sx={{
                    marginTop: 1,
                    width: '100%',
                    paddingY: '5px',
                  }}
                />
                {showError(password) && (
                  <FormControl.Validation variant="error">
                    Is required
                  </FormControl.Validation>
                )}
              </FormControl>

              <FormControl>
                <FormControl.Label visuallyHidden>Sign in</FormControl.Label>
                {/* Show "Signing in... while loading */}
                <Button
                  type="submit"
                  variant="primary"
                  disabled={loading}
                  block
                >
                  {loading ? 'Signing in' : 'Sign in'}
                  {loading && <Text className="AnimatedEllipsis"></Text>}
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
