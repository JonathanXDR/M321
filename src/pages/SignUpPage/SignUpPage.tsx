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
import './SignUpPage.module.css';
import LoginNavbar from '../../components/Navbar/LoginNavbar';
import LoginFooter from '../../components/Footer/LoginFooter';

const SignUpPage = () => {
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const [createAccountIsDisabled, setCreateAccountIsDisabled] = useState(true);

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
        <LoginNavbar />
      </PageLayout.Header>
      <PageLayout.Content>
        <Box
          sx={{
            width: '480px',
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
            <FormControl
              required
              sx={{
                width: '100%',
              }}
            >
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
            <Box
              sx={{
                width: '100%',
                display: 'flex',
                alignItems: 'center',
              }}
            >
              <FormControl
                required
                sx={{
                  width: '100%',
                  marginRight: 4,
                }}
              >
                <FormControl.Label
                  sx={{
                    marginBottom: 2,
                    marginRight: 2,
                    fontWeight: '400',
                    textAlign: 'left',
                  }}
                >
                  Enter your firstname
                </FormControl.Label>
                <TextInput
                  type="text"
                  validationStatus="error"
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Enter firstname"
                  sx={{
                    marginTop: 1,
                    marginBottom: 4,
                    width: '100%',
                    paddingY: '5px',
                  }}
                />
              </FormControl>
              <FormControl
                required
                sx={{
                  width: '100%',
                }}
              >
                <FormControl.Label
                  sx={{
                    marginBottom: 2,
                    fontWeight: '400',
                    textAlign: 'left',
                  }}
                >
                  Enter your lastname
                </FormControl.Label>
                <TextInput
                  type="text"
                  validationStatus="error"
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Enter lastname"
                  sx={{
                    marginTop: 1,
                    marginBottom: 4,
                    width: '100%',
                    paddingY: '5px',
                  }}
                />
              </FormControl>
            </Box>
            <Box
              sx={{
                width: '100%',
                display: 'flex',
                alignItems: 'center',
              }}
            >
              <FormControl
                sx={{
                  width: '100%',
                  marginRight: 4,
                }}
              >
                <FormControl.Label
                  sx={{
                    marginBottom: 2,
                    marginRight: 2,
                    fontWeight: '400',
                    textAlign: 'left',
                  }}
                >
                  Enter your age
                </FormControl.Label>
                <TextInput
                  type="text"
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Enter age"
                  sx={{
                    marginTop: 1,
                    marginBottom: 4,
                    width: '100%',
                    paddingY: '5px',
                  }}
                />
              </FormControl>
              <FormControl
                sx={{
                  width: '100%',
                }}
              >
                <FormControl.Label
                  sx={{
                    marginBottom: 2,
                    fontWeight: '400',
                    textAlign: 'left',
                  }}
                >
                  Enter your gender
                </FormControl.Label>
                <TextInput
                  type="text"
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Enter gender"
                  sx={{
                    marginTop: 1,
                    marginBottom: 4,
                    width: '100%',
                    paddingY: '5px',
                  }}
                />
              </FormControl>
            </Box>
            <Box
              sx={{
                width: '100%',
                display: 'flex',
                alignItems: 'center',
              }}
            >
              <FormControl
                required
                sx={{
                  width: '100%',
                  marginRight: 4,
                }}
              >
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
              <FormControl
                required
                sx={{
                  width: '100%',
                }}
              >
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
                  block
                  sx={{
                    marginTop: 1,
                    marginBottom: 4,
                    paddingY: '5px',
                  }}
                />
              </FormControl>
            </Box>
            <FormControl required>
              <Button
                type="submit"
                variant="primary"
                block
                disabled={createAccountIsDisabled}
              >
                Create account
              </Button>
            </FormControl>
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
        <LoginFooter />
      </PageLayout.Footer>
    </PageLayout>
  );
};

export default SignUpPage;
