//@ts-check
import { SerialPort } from 'serialport';

/** @type {SerialPort?} */
let port;

const init = portname => {
	port?.close();

	port = new SerialPort({ path: portname, baudRate: 115200});

	port.on('data', chunk => {
		console.log(chunk.toString('hex'));
	});
};

const close = () => {
	port?.close();
	port = null;
};

const generatePacket = (id, param = [], rw = 0, queue = 0) => {
	const rq = (rw ? 2 : 0) + (queue ? 1 : 0);
	let check = id + rq;
	if (param instanceof Array) for(const p of param) check += p;
	const packet = Buffer.from([0xaa, 0xaa,
		2 + ((param && param.length) ? param.length : 0),
		id, rq,
		...param,
		(0x100 - check) & 0xff]);

	console.debug(packet);
	return packet;
};

const GetBaseInfo = id => {
	port?.write(generatePacket(id), 'hex', error => {
		console.error(error);
	});
};

const GetDeviceSN = () => GetBaseInfo(0);
const GetDeviceVersion = () => GetBaseInfo(2);

const GetPose = () => GetBaseInfo(10);

const GetAlarms = () => GetBaseInfo(20);

const ExecuteHomePosition = () => {
	port?.write(generatePacket(31, [0x00, 0x00, 0x00, 0x00], 1), 'hex', error => {
		console.error(error);
	});
};


const GetHomePosition = () => {
	port?.write(generatePacket(30), 'hex', error => {
		console.error(error);
	});
}

export default {
	init, close,
	GetDeviceSN, GetDeviceVersion,
	GetPose,
	GetAlarms,
	ExecuteHomePosition,
	GetHomePosition,
};
