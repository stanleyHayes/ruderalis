import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import {Provider} from "react-redux";
import store from "./redux/app/store";
import {BrowserRouter} from "react-router-dom";
import {SnackbarProvider} from "notistack";

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <React.StrictMode>
        <Provider store={store}>
            <BrowserRouter>
                <SnackbarProvider
                    autoHideDuration={2000}
                    anchorOrigin={{vertical: 'top', horizontal: 'left'}}
                    maxSnack={5}>
                    <App/>
                </SnackbarProvider>
            </BrowserRouter>
        </Provider>
    </React.StrictMode>
);
