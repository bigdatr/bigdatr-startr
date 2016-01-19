import React from 'react';
import LogMonitor from 'redux-devtools-log-monitor';
import DockMonitor from 'redux-devtools-dock-monitor';
import {createDevTools} from 'redux-devtools';

module.exports = createDevTools(
	<DockMonitor toggleVisibilityKey='ctrl-h' changePositionKey='ctrl-q' defaultPosition="bottom">
		<LogMonitor theme='tomorrow' />
	</DockMonitor>
);

