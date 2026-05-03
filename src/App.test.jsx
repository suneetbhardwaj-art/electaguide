import { render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import App from './App';
import { AppProvider } from './context/AppContext';
import { ChatProvider } from './context/ChatContext';

test('renders Home page correctly', () => {
  render(
    <AppProvider>
      <ChatProvider>
        <App />
      </ChatProvider>
    </AppProvider>
  );
  
  const titleElements = screen.getAllByText(/ElectaGuide/i);
  expect(titleElements.length).toBeGreaterThan(0);
});
