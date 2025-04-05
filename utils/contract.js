import web3 from './web3';
import contractAbi from './contractABI.json';

const address = "0x12E0CE48ac71e196bCFACbeb3DAfB54ed5E51E3A";

const contract = new web3.eth.Contract(contractAbi, address);

export default contract;
