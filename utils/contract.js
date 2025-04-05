import web3 from './web3';
import contractAbi from './contractABI.json';

const address = "0x4BC34D55078a2858F3Bd91B209Da46BA01AE9986";

const contract = new web3.eth.Contract(contractAbi, address);

export default contract;
