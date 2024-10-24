import {
  Box,
  Button,
  FormControl,
  Heading,
  PageLayout,
  TextInput,
} from '@primer/react';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import LoginFooter from '../../components/LoginFooter';
import LoginNavbar from '../../components/Navbar/LoginNavbar';
import PasswordRequirementsText from '../../components/PasswordRequirementsText';
import { useAuthContext } from '../../contexts/auth.context';

const PasswordResetPage = () => {
  const navigate = useNavigate();
  const [username, setUsername] = useState('');

  const {
    password,
    setPassword,
    setConfirmPassword,
    isValid,
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
                block
                sx={{
                  marginTop: 1,
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
                block
                sx={{
                  marginTop: 1,
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
                  block
                  sx={{
                    marginTop: 1,
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
              <PasswordRequirementsText />
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
