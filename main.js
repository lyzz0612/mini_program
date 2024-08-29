import App from './App';
import { createSSRApp } from 'vue';
import Utils from './Utils';

export function createApp() {
    const app = createSSRApp(App);
	app.config.globalProperties.$Utils = Utils;
	app.config.globalProperties.$globals = {};
	
    return {
        app
    };
}
