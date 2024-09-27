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
import { MarkGithubIcon, XIcon } from '@primer/octicons-react';
import { handleLoginSubmit, handleCheckToken } from '../../utils/auth.util';
import LoadingSpinner from '../../components/LoadingSpinner';
import './SignUpPage.module.css';

const SignUpPage = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

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
        <Link
          sx={{
            color: 'fg.default',
          }}
          href="https://github.com/"
        >
          <MarkGithubIcon size={48} />
        </Link>
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
              Create an account
            </Heading>
          </Box>

          <Box>
            <Flash variant="danger" hidden={!error}>
              <Box
                sx={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  paddingX: 2,
                }}
              >
                {/* either "Passwords don't match" or "Username {username} is not available" */}
                <IconButton
                  variant="invisible"
                  aria-label="Close flash"
                  icon={XIcon}
                  onClick={() => setError(false)}
                />
              </Box>
            </Flash>
          </Box>

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
            <FormControl>
              <FormControl.Label
                sx={{
                  marginBottom: 2,
                  fontWeight: '400',
                  textAlign: 'left',
                }}
              >
                Enter a username
              </FormControl.Label>
              <TextInput
                type="text"
                loading={true}
                validationStatus="error"
                onChange={(e) => setUsername(e.target.value)}
                placeholder="Enter username"
                sx={{
                  marginTop: 1,
                  marginBottom: 4,
                  width: '100%',
                  paddingY: '5px',
                }}
              />
            </FormControl>
            <FormControl>
              <FormControl.Label
                sx={{
                  marginBottom: 2,
                  fontWeight: '400',
                  textAlign: 'left',
                }}
              >
                Create a password
              </FormControl.Label>
              <TextInput
                type="text"
                validationStatus="error"
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter password"
                sx={{
                  marginTop: 1,
                  marginBottom: 4,
                  width: '100%',
                  paddingY: '5px',
                }}
              />
            </FormControl>
            <Box
              sx={{
                position: 'relative',
              }}
            >
              <FormControl>
                <FormControl.Label
                  sx={{
                    marginBottom: 2,
                    fontWeight: '400',
                    textAlign: 'left',
                  }}
                >
                  Confirm your password
                </FormControl.Label>
                <TextInput
                  type="password"
                  validationStatus="error"
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  placeholder="Confirm password"
                  sx={{
                    marginTop: 1,
                    marginBottom: 4,
                    width: '100%',
                    paddingY: '5px',
                  }}
                />
              </FormControl>

              <FormControl>
                <Button type="submit" variant="primary" sx={{ width: '100%' }}>
                  Reset password
                </Button>
              </FormControl>
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
            Already have an account? <Link href="/login">Sign in</Link>.
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
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'center',
          }}
        >
          <Box
            sx={{
              marginRight: 3,
            }}
          >
            <Link href="/site/terms">Terms</Link>
          </Box>
          <Box
            sx={{
              marginRight: 3,
            }}
          >
            <Link href="/site/privacy">Privacy</Link>
          </Box>
          <Box
            sx={{
              marginRight: 3,
            }}
          >
            <Link href="/security">Security</Link>
          </Box>
          <Box>
            <Link
              sx={{
                color: 'fg.muted',
                '&:hover': {
                  color: 'accent.fg',
                },
              }}
              href="https://github.com/contact"
            >
              Contact GitHub
            </Link>
          </Box>
        </Box>
      </PageLayout.Footer>
    </PageLayout>
  );
};

export default SignUpPage;
