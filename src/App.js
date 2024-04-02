import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { ThemeProvider } from 'styled-components';
import Main from './pages/Main';
import Theme from './styles/Theme';
import GlobalStyle from './styles/GlobalStyle';

function App() {
  return (
    <ThemeProvider theme={Theme}>
      <GlobalStyle />
      <BrowserRouter>
        <Routes>
          <Route element={<Main />} />
        </Routes>
      </BrowserRouter>
    </ThemeProvider>
  );
}

export default App;
