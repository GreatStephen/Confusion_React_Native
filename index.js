/**
 * @format
 */

import {AppRegistry} from 'react-native';
import App from './App';
import {name as appName} from './app.json';
import { gestureHandlerRootHOC } from 'react-native-gesture-handler';

// This solves the side slide problem. Must import gesture handler manually
AppRegistry.registerComponent(appName, () => gestureHandlerRootHOC(App));
