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
import { StopIcon, XIcon } from '@primer/octicons-react';
import {
  handleLoginSubmit,
  handleCheckToken,
  usePasswordValidation,
  // handleCreateAccountSubmit,
} from '../../utils/auth.util';
import LoadingSpinner from '../../components/LoadingSpinner';
import './SignUpPage.module.css';
import LoginNavbar from '../../components/Navbar/LoginNavbar';
import LoginFooter from '../../components/Footer/LoginFooter';

const SignUpPage = () => {
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  const [username, setUsername] = useState('');
  const {
    password,
    confirmPassword,
    setPassword,
    setConfirmPassword,
    isValid,
    validations,
  } = usePasswordValidation();

  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [age, setAge] = useState(0);
  const [gender, setGender] = useState('');

  const getValidationStyle = (validation: boolean) => ({
    color: validation ? 'success.fg' : 'danger.fg',
    fontWeight: validation ? '' : 'bold',
  });

  const getMutedStyle = (condition: boolean) =>
    condition ? { color: 'fg.muted', fontWeight: '' } : {};

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

  // useEffect(() => {
  //   setIsValid(
  //     !!username.trim() &&
  //       !!firstName.trim() &&
  //       !!lastName.trim() &&
  //       !!password.trim() &&
  //       !!confirmPassword.trim() &&
  //       password === confirmPassword
  //   );
  // }, [username, firstName, lastName, password, confirmPassword]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    // const result = await handleCreateAccountSubmit(
    //   username,
    //   password,
    //   firstName,
    //   lastName,
    //   age,
    //   gender
    // );
    navigate('/login');
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

          <Flash variant="danger">
            <Box
              sx={{
                display: 'flex',
                alignItems: 'baseline',
                paddingX: 2,
              }}
            >
              <Text
                sx={{
                  marginRight: 3,
                }}
              >
                <StopIcon />
              </Text>
              <Box
                sx={{
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'flex-start',
                  justifyContent: 'center',
                }}
              >
                <Text
                  sx={{
                    fontWeight: 'bold',
                  }}
                >
                  The following inputs have errors:
                </Text>
                <Box>
                  {/* Dynamically show all Input Titles, which the validation failed */}
                  <Text
                    sx={{
                      textDecoration: 'Underline',
                    }}
                  >
                    Last name
                  </Text>
                  ,{' '}
                  <Text
                    sx={{
                      textDecoration: 'Underline',
                    }}
                  >
                    ZIP code
                  </Text>
                  ,{' '}
                  <Text
                    sx={{
                      textDecoration: 'Underline',
                    }}
                  >
                    email address
                  </Text>
                </Box>
              </Box>
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
                onChange={(e) => {
                  setUsername(e.target.value);
                }}
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
                  onChange={(e) => {
                    setPassword(e.target.value);
                  }}
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
                  onChange={(e) => {
                    setConfirmPassword(e.target.value);
                  }}
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
                  type="password"
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
            <Text
              sx={{
                color: 'fg.muted',
                fontSize: '12px',
              }}
            >
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
              <Button type="submit" variant="primary" block disabled={!isValid}>
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
