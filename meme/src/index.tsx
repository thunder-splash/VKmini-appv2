import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './app';
import bridge from "@vkontakte/vk-bridge";
import { connectLogger, createCtx } from '@reatom/framework';
import { reatomContext } from '@reatom/npm-react';

bridge.send('VKWebAppInit')
const ctx = createCtx()
connectLogger(ctx)

const root = ReactDOM.createRoot(
    document.getElementById('root') as HTMLElement
);

root.render(
    <React.StrictMode>
      <reatomContext.Provider value={ctx}>
        <App />
      </reatomContext.Provider>
    </React.StrictMode>
);