import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { ThemeProvider } from 'styled-components';
import { useEffect, useState } from 'react';
import { io } from 'socket.io-client';
import Main from './pages/Main';
import LogIn from './pages/LogIn';
import Theme from './styles/Theme';
import GlobalStyle from './styles/GlobalStyle';

function App() {
  const [socket, setSocket] = useState(null);

  useEffect(() => {
    if (!socket) {
      setSocket(io(`${process.env.REACT_APP_BASE_URL}`, { withCredentials: true }));
    }

    if (socket) {
      socket.on('connect', () => {
        console.log('connected');
      });

      socket.on('disconnect', () => {
        console.log('disconnected');
      });

      return () => {
        socket.disconnect();
      };
    }
  }, [socket]);

  return (
    <ThemeProvider theme={Theme}>
      <GlobalStyle />
      <BrowserRouter>
        <Routes>
          <Route element={<Main socket={socket} />} path="/" />
          <Route element={<LogIn />} path="/login" />
        </Routes>
      </BrowserRouter>
    </ThemeProvider>
  );
}

export default App;
