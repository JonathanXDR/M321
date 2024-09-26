import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { login, checkToken } from '../../services/auth.service';
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
import './LoginPage.module.css';
import LoadingSpinner from '../../components/LoadingSpinner';
import { handleLoginSubmit, handleCheckToken } from '../../utils/auth.util';

const LoginPage = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
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
              Sign in to GitHub
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
                Incorrect username or password.
                <IconButton
                  variant="invisible"
                  aria-label="Search"
                  icon={XIcon}
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
                Username or email address
              </FormControl.Label>
              <TextInput
                type="text"
                onChange={(e) => setUsername(e.target.value)}
                sx={{
                  marginTop: 1,
                  marginBottom: 4,
                  width: '100%',
                  paddingY: '5px',
                  fontSize: 14,
                  lineHeight: '20px',
                  color: 'fg.default',
                  verticalAlign: 'middle',
                  backgroundColor: 'canvas.default',
                  backgroundRepeat: 'no-repeat',
                  backgroundPosition: 'right 8px center',
                  border: '1px solid',
                  borderColor: 'border.default',
                  borderRadius: 6,
                  boxShadow: 'primer.shadow.inset',
                  transition: '80ms cubic-bezier(0.33, 1, 0.68, 1)',
                  transitionProperty:
                    'color,backgroundColor,boxShadow,borderColor',
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
                  Password
                </FormControl.Label>
                <TextInput
                  type="password"
                  onChange={(e) => setPassword(e.target.value)}
                  sx={{
                    marginTop: 1,
                    marginBottom: 4,
                    width: '100%',
                    paddingY: '5px',
                    fontSize: 14,
                    lineHeight: '20px',
                    color: 'fg.default',
                    verticalAlign: 'middle',
                    backgroundColor: 'canvas.default',
                    backgroundRepeat: 'no-repeat',
                    backgroundPosition: 'right 8px center',
                    border: '1px solid',
                    borderColor: 'border.default',
                    borderRadius: 6,
                    boxShadow: 'primer.shadow.inset',
                    transition: '80ms cubic-bezier(0.33, 1, 0.68, 1)',
                    transitionProperty:
                      'color,backgroundColor,boxShadow,borderColor',
                  }}
                />
              </FormControl>

              <FormControl>
                {/* <TextInput
                  type="submit"
                  name="commit"
                  value="Sign in"
                  className="btn btn-primary btn-block js-sign-in-button"
                /> */}
                <Button type="submit" variant="primary" sx={{ width: '100%' }}>
                  Sign in
                </Button>
              </FormControl>

              <Link
                // className="label-link position-absolute top-0 right-0"
                sx={{
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
            // className="login-callout mt-3"
            // padding: 16px 16px;
            // text-align: center;
            // border: 1px solid var(--color-border-default);
            // border-radius: 6px;

            sx={{
              marginTop: 3,
              padding: 4,
              textAlign: 'center',
              border: '1px solid',
              borderColor: 'border.default',
              borderRadius: 6,
            }}
          >
            New to GitHub?{' '}
            <Link href="/signup?source=login">Create an account</Link>.
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

export default LoginPage;
