import '@primer/css/index.scss';
import React, { Suspense, useState } from 'react';
import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import './App.css';
import LoadingSpinner from './components/LoadingSpinner';
import { AuthProvider } from './contexts/auth.context';
import { GeneralProvider } from './contexts/general.context';
import { NoteProvider } from './contexts/note.context';
import { NoteCollectionProvider } from './contexts/noteCollection.context';
import { ValidationProvider } from './contexts/validation.context';

const HomePage = React.lazy(() => import('./pages/HomePage/HomePage'));
const LoginPage = React.lazy(() => import('./pages/LoginPage/LoginPage'));

const App: React.FC = () => {
  const [isConnected, setIsConnected] = useState<boolean | null>(null);

  return (
    <>
      <Suspense fallback={<LoadingSpinner />}>
        <AuthProvider>
          <ValidationProvider>
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
                  <Route path="/login" element={<LoginPage />} />
                  <Route path="*" element={<div>404</div>} />
                </Routes>{' '}
              </Router>
            </GeneralProvider>
          </ValidationProvider>
        </AuthProvider>
      </Suspense>
    </>
  );
};

export default App;
