import React, { Suspense, useEffect, useState } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import '@primer/css/index.scss';
import './App.css';
import LoadingSpinner from './components/LoadingSpinner';
import { checkConnection } from './services/http.service';
import BlankStateBackendError from './components/BlankState/BlankStateBackendError';
import { GeneralProvider } from './contexts/general.context';
import { AuthProvider } from './contexts/auth.context';
import { NoteProvider } from './contexts/note.context';
import { NoteCollectionProvider } from './contexts/noteCollection.context';

const HomePage = React.lazy(() => import('./pages/HomePage/HomePage'));
const SettingsPage = React.lazy(
  () => import('./pages/SettingsPage/SettingsPage')
);
const SignUpPage = React.lazy(() => import('./pages/SignUpPage/SignUpPage'));
const LoginPage = React.lazy(() => import('./pages/LoginPage/LoginPage'));
const LogoutPage = React.lazy(() => import('./pages/LogoutPage/LogoutPage'));
const PasswordResetPage = React.lazy(
  () => import('./pages/PasswordResetPage/PasswordResetPage')
);

const App: React.FC = () => {
  const [isConnected, setIsConnected] = useState<boolean | null>(null);

  useEffect(() => {
    const checkApi = async () => {
      const connectionStatus = await checkConnection();
      setIsConnected(connectionStatus);
    };

    checkApi();
  }, []);

  return (
    <>
      {isConnected === false ? (
        <BlankStateBackendError />
      ) : (
        <Suspense fallback={<LoadingSpinner />}>
          <AuthProvider>
            <GeneralProvider>
              <Router>
                <Routes>
                  <Route
                    path="/"
                    element={
                      <NoteProvider>
                        <NoteCollectionProvider>
                          <HomePage />
                        </NoteCollectionProvider>
                      </NoteProvider>
                    }
                  />
                  <Route path="/settings" element={<SettingsPage />} />
                  <Route path="/signup" element={<SignUpPage />} />
                  <Route path="/login" element={<LoginPage />} />
                  <Route path="/logout" element={<LogoutPage />} />
                  <Route
                    path="/password_reset"
                    element={<PasswordResetPage />}
                  />
                  <Route path="*" element={<div>404</div>} />
                </Routes>{' '}
              </Router>
            </GeneralProvider>
          </AuthProvider>
        </Suspense>
      )}
    </>
  );
};

export default App;
