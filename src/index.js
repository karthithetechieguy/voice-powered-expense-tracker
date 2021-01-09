import React from 'react';
import ReactDom from 'react-dom'; 
import { Provider } from './context/context';

import App from './app';
import {SpeechProvider} from '@speechly/react-client';
import './index.css';

ReactDom.render(
<SpeechProvider appId="4c9181b1-79ea-42d5-aa51-9dc048b85080" language="en-US">
    <Provider>
        <App/>
    </Provider>
</SpeechProvider>,document.getElementById('root'));