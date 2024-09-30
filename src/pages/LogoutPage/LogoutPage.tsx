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
import {
  handleLoginSubmit,
  handleCheckToken,
} from '../../contexts/auth.context';
import LoadingSpinner from '../../components/LoadingSpinner';
import './LogoutPage.module.css';
import LoginNavbar from '../../components/Navbar/LoginNavbar';
import LoginFooter from '../../components/Footer/LoginFooter';
import { logout } from '../../services/auth.service';

const LogoutPage = () => {
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem('access_token');
    if (token) {
      handleCheckToken(token).finally(() => {
        setLoading(false);
      });
    } else {
      setLoading(false);
    }
  }, [navigate]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    logout();
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
            padding: 4,
            marginTop: 3,

            textAlign: 'center',
            backgroundColor: 'transparent',
            border: '1px solid',
            borderColor: 'border.muted',
            borderRadius: 6,
          }}
        >
          <Box as={'form'} onSubmit={handleSubmit}>
            <FormControl>
              <Heading
                as="h1"
                sx={{
                  fontSize: '24px',
                  fontWeight: 300,
                }}
              >
                Are you sure you want to sign out?
              </Heading>
              <Button
                type="submit"
                block
                sx={{
                  fontSize: '16px',
                  paddingY: '24px !important',
                  marginTop: 5,
                }}
              >
                Sign out
              </Button>
            </FormControl>
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

export default LogoutPage;
