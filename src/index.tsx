import React from 'react';
import ReactDOM from 'react-dom/client';
//import App from './App';
import router from './routes/router';
import { RecoilRoot } from "recoil";
import { ThemeProvider } from "styled-components";
import { theme } from './theme';
import { GlobalStyle } from './styles/GlobalStyle';
import { Helmet, HelmetProvider } from 'react-helmet-async';
import { RouterProvider } from 'react-router-dom';
import { QueryClientProvider, QueryClient } from "react-query";

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

const client = new QueryClient();

root.render(
  <React.StrictMode>
    <HelmetProvider>
      <RecoilRoot>                   
        <Helmet>
          <link
            type="text/css"
            media="screen"
            rel="stylesheet"
            href="https://fonts.googleapis.com/css2?family=Noto+Sans+KR:wght@300&family=Source+Sans+Pro:wght@300&display=swap"
          />        
          <title>React nflix </title> 
        </Helmet>   
        <QueryClientProvider client={client}>
          <ThemeProvider theme={theme}>          
            <GlobalStyle />                      
            <RouterProvider router={router}/>
          </ThemeProvider>
        </QueryClientProvider>
      </RecoilRoot>
    </HelmetProvider>
  </React.StrictMode>
);

