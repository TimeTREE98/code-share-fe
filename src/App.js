import { useEffect, useState } from 'react';
import { ThemeProvider } from 'styled-components';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { io } from 'socket.io-client';
import { ring2 } from 'ldrs';
import Theme from './styles/Theme';
import GlobalStyle from './styles/GlobalStyle';
import Main from './pages/Main';
import LogIn from './pages/LogIn';
import RoomList from './pages/Room/RoomList';

function App() {
  ring2.register();
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
          <Route element={<RoomList />} path="/" />
          <Route element={<LogIn />} path="/login" />
          <Route element={<Main socket={socket} />} path="/room/:roomId" />
        </Routes>
      </BrowserRouter>
    </ThemeProvider>
  );
}

export default App;
