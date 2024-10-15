import React, { useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Box,
  Button,
  FormControl,
  Heading,
  Link,
  PageLayout,
  Text,
  TextInput,
} from '@primer/react';
import { useAuthContext } from '../../contexts/auth.context';
import './SignUpPage.module.css';
import LoginNavbar from '../../components/Navbar/LoginNavbar';
import LoginFooter from '../../components/Footer/LoginFooter';
import ValidationFlash, {
  ValidationField,
} from '../../components/Flash/ValidationFlash';
import PasswordRequirementsText from '../../components/PasswordRequirementsText/PasswordRequirementsText';
import { useValidationContext } from '../../contexts/validation.context';
import { useGeneralContext } from '../../contexts/general.context';
import LoadingSpinner from '../../components/LoadingSpinner';

const SignUpPage = () => {
  const { loading, setLoading } = useGeneralContext();
  const setIsValid = useState(true);
  const navigate = useNavigate();

  const [username, setUsername] = useState('');
  const [passwordLocal, setPasswordLocal] = useState('');
  const [confirmPasswordLocal, setConfirmPasswordLocal] = useState('');

  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [age, setAge] = useState('');
  const [gender, setGender] = useState('');

  const { setPassword, setConfirmPassword, isValid } = useAuthContext();

  const usernameRef = useRef<HTMLInputElement>(null);
  const passwordRef = useRef<HTMLInputElement>(null);
  const confirmPasswordRef = useRef<HTMLInputElement>(null);
  const firstNameRef = useRef<HTMLInputElement>(null);
  const lastNameRef = useRef<HTMLInputElement>(null);
  const ageRef = useRef<HTMLInputElement>(null);
  const genderRef = useRef<HTMLInputElement>(null);

  const fields: ValidationField[] = [
    { key: 'username', title: 'Username', ref: usernameRef },
    { key: 'first-name', title: 'First name', ref: firstNameRef },
    { key: 'last-name', title: 'Last name', ref: lastNameRef },
    { key: 'age', title: 'Age', ref: ageRef },
    { key: 'gender', title: 'Gender', ref: genderRef },
    { key: 'password', title: 'Password', ref: passwordRef },
    {
      key: 'confirm-password',
      title: 'Confirm password',
      ref: confirmPasswordRef,
    },
  ];

  const { handleFormSubmit, hasError } =
    useValidationContext().useInputValidation([
      usernameRef,
      passwordRef,
      confirmPasswordRef,
      firstNameRef,
      lastNameRef,
      ageRef,
      genderRef,
    ]);

  useEffect(() => {
    setPassword(passwordLocal);
    setConfirmPassword(confirmPasswordLocal);
  }, [passwordLocal, confirmPasswordLocal]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await handleFormSubmit(async () => {
      navigate('/login');
    });
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

          <ValidationFlash fields={fields} />

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
                width: '100%',
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
                Enter a username
              </FormControl.Label>
              <TextInput
                ref={usernameRef}
                type="text"
                // loading={true}
                onChange={(e) => {
                  setUsername(e.target.value);
                }}
                placeholder="Enter username"
                sx={{
                  marginTop: 1,
                  width: '100%',
                  paddingY: '5px',
                }}
              />
              {hasError(username) && (
                <FormControl.Validation variant="error">
                  Is required
                </FormControl.Validation>
              )}
            </FormControl>
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
                  marginBottom: 4,
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
                  ref={firstNameRef}
                  type="text"
                  onChange={(e) => {
                    setFirstName(e.target.value);
                  }}
                  placeholder="Enter firstname"
                  sx={{
                    marginTop: 1,
                    width: '100%',
                    paddingY: '5px',
                  }}
                />
                {hasError(firstName) && (
                  <FormControl.Validation variant="error">
                    Is required
                  </FormControl.Validation>
                )}
              </FormControl>
              <FormControl
                sx={{
                  width: '100%',
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
                  Enter your lastname
                </FormControl.Label>
                <TextInput
                  ref={lastNameRef}
                  type="text"
                  onChange={(e) => {
                    setLastName(e.target.value);
                  }}
                  placeholder="Enter lastname"
                  sx={{
                    marginTop: 1,
                    width: '100%',
                    paddingY: '5px',
                  }}
                />
                {hasError(lastName) && (
                  <FormControl.Validation variant="error">
                    Is required
                  </FormControl.Validation>
                )}
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
                  marginBottom: 4,
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
                  ref={ageRef}
                  type="text"
                  onChange={(e) => {
                    setAge(e.target.value);
                  }}
                  placeholder="Enter age"
                  sx={{
                    marginTop: 1,
                    width: '100%',
                    paddingY: '5px',
                  }}
                />
                {hasError(age) && (
                  <FormControl.Validation variant="error">
                    Is required
                  </FormControl.Validation>
                )}
              </FormControl>
              <FormControl
                sx={{
                  width: '100%',
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
                  Enter your gender
                </FormControl.Label>
                <TextInput
                  ref={genderRef}
                  type="text"
                  onChange={(e) => {
                    setGender(e.target.value);
                  }}
                  placeholder="Enter gender"
                  sx={{
                    marginTop: 1,
                    width: '100%',
                    paddingY: '5px',
                  }}
                />
                {hasError(gender) && (
                  <FormControl.Validation variant="error">
                    Is required
                  </FormControl.Validation>
                )}
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
                  marginBottom: 4,
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
                  ref={passwordRef}
                  type="password"
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Enter password"
                  sx={{
                    marginTop: 1,
                    width: '100%',
                    paddingY: '5px',
                  }}
                />
                {/* Das Argument vom Typ "[string, Dispatch<SetStateAction<string>>]" kann dem Parameter vom Typ "string" nicht zugewiesen werden.ts(2345) const password: [string, React.Dispatch<React.SetStateAction<string>>] */}
                {hasError(passwordLocal) && (
                  <FormControl.Validation variant="error">
                    Is required
                  </FormControl.Validation>
                )}
              </FormControl>
              <FormControl
                sx={{
                  width: '100%',
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
                  Confirm your password
                </FormControl.Label>
                <TextInput
                  ref={confirmPasswordRef}
                  type="password"
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  placeholder="Confirm password"
                  block
                  sx={{
                    marginTop: 1,
                    paddingY: '5px',
                  }}
                />
                {/* Das Argument vom Typ "[string, Dispatch<SetStateAction<string>>]" kann dem Parameter vom Typ "string" nicht zugewiesen werden.ts(2345) const confirmPassword: [string, React.Dispatch<React.SetStateAction<string>>] */}
                {hasError(confirmPasswordLocal) && (
                  <FormControl.Validation variant="error">
                    Is required
                  </FormControl.Validation>
                )}
              </FormControl>
            </Box>
            <PasswordRequirementsText />
            <FormControl>
              <FormControl.Label visuallyHidden>
                Create account
              </FormControl.Label>

              <Button type="submit" variant="primary" disabled={loading} block>
                {loading ? 'Creating account' : 'Create account'}
                {loading && <Text className="AnimatedEllipsis"></Text>}
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
