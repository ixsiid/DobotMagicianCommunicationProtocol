import dobot from '../dobot.mjs';
import { setTimeout } from 'timers/promises';

(async () => {
	dobot.init('COM4');

	await setTimeout(500);
	dobot.GetDeviceSN();

	await setTimeout(500);
	dobot.GetPose();

	await setTimeout(500);
	dobot.GetDeviceVersion();

	await setTimeout(500);
	dobot.GetAlarms();

	await setTimeout(500);
	dobot.GetHomePosition();

	await setTimeout(500);
	dobot.ExecuteHomePosition();

	await setTimeout(2000);

	dobot.close();
})();
