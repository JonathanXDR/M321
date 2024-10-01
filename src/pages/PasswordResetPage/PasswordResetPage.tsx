import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Box,
  Button,
  Flash,
  FormControl,
  Heading,
  Text,
  Link,
  PageLayout,
  TextInput,
} from '@primer/react';
import { StopIcon } from '@primer/octicons-react';
import { useAuthContext } from '../../contexts/auth.context';
import LoginNavbar from '../../components/Navbar/LoginNavbar';
import LoginFooter from '../../components/Footer/LoginFooter';
import ValidationFlash from '../../components/Flash/ValidationFlash';

const PasswordResetPage = () => {
  const navigate = useNavigate();
  const [username, setUsername] = useState('');

  const {
    handleCheckToken,
    password,
    confirmPassword,
    setPassword,
    setConfirmPassword,
    isValid,
    validations,
    handleLoginSubmit,
  } = useAuthContext();

  const getValidationStyle = (validation: boolean) => ({
    color: validation ? 'success.fg' : 'danger.fg',
    fontWeight: validation ? '' : 'bold',
  });

  const getMutedStyle = (condition: boolean) =>
    condition ? { color: 'fg.muted', fontWeight: '' } : {};

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const result = await handleLoginSubmit(username, password, navigate);
    navigate('/login');
  };

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
              Reset your password
            </Heading>
          </Box>

          {/* <ValidationFlash /> */}

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
                Enter your username
              </FormControl.Label>
              <TextInput
                type="text"
                loading={true}
                onChange={(e) => setUsername(e.target.value)}
                placeholder="Enter username"
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
                Enter your new password
              </FormControl.Label>
              <TextInput
                type="password"
                onChange={(e) => {
                  setPassword(e.target.value);
                }}
                placeholder="Enter password"
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
                  Confirm your new password
                </FormControl.Label>
                <TextInput
                  type="password"
                  onChange={(e) => {
                    setConfirmPassword(e.target.value);
                  }}
                  placeholder="Confirm password"
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
              <Text
                sx={{
                  color: 'fg.muted',
                  fontSize: '12px',
                }}
              >
                {/* Password description */}
                <Text as="p">
                  Make sure it's{' '}
                  <Text
                    sx={{
                      ...getValidationStyle(validations.minLength),
                      ...getMutedStyle(validations.minLengthWithRequirements),
                    }}
                  >
                    at least 15 characters
                  </Text>{' '}
                  OR{' '}
                  <Text
                    sx={{
                      ...getValidationStyle(
                        validations.minLengthWithRequirements
                      ),
                      ...getMutedStyle(validations.minLength),
                    }}
                  >
                    at least 8 characters
                  </Text>{' '}
                  <Text
                    sx={{
                      ...getValidationStyle(validations.hasNumber),
                      ...getMutedStyle(validations.minLength),
                    }}
                  >
                    including a number
                  </Text>{' '}
                  <Text
                    sx={{
                      ...getValidationStyle(validations.hasLowercase),
                      ...getMutedStyle(validations.minLength),
                    }}
                  >
                    and a lowercase letter
                  </Text>
                  .{' '}
                  <Link href="https://docs.github.com/articles/creating-a-strong-password">
                    Learn more
                  </Link>
                  .
                </Text>
              </Text>
              <FormControl required>
                <Button
                  type="submit"
                  variant="primary"
                  disabled={!isValid}
                  block
                >
                  Reset password
                </Button>
              </FormControl>
            </Box>
          </Box>
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

export default PasswordResetPage;
