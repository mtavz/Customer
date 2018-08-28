pragma solidity ^0.4.21;

contract Vehicles{
    function getOwnerVehicle(address, uint256) public view returns(string, uint256, bool){}
    function getOwnerVehicleLenght(address) public constant returns(uint) {}
    function getOwnerInfo(string, uint256 ) public view returns (address, uint256){}
    function getFixedInfo(string ) view public returns (string, string, uint256, string, string) {}
    function getDynamicInfo(string) view public returns (address, uint256, string, string, int){}
}


contract DateTime{
    function getYear(uint256) constant returns (uint16) {}
    function getMonth(uint256) constant returns (uint16) {}
    function getDay(uint256) constant returns (uint16) {}
    function getHour(uint256) constant returns (uint16) {}
    function getMinute(uint256) constant returns (uint16) {}
    function getSecond(uint256) constant returns (uint16) {}
}

contract BotManagement{
    
    function checkAccount(address) public view returns(bool){}
    
    function addCoin(address) public payable returns (bool){ }
    
    function getBalance(address) public view returns(int256){}
    
    function getLogs(string , uint256 ) public view returns(string, address, uint256){ }
    
    function getLogsLength(string ) public view returns(uint256){ }
    
}

contract Customer{
    
    BotManagement botMgmtContract;
    DateTime dateTimeContract;
    
    Vehicles vehicleContract;
    constructor(address BotManagementContractAddress, address vehicleContractAddress) public{
        botMgmtContract = BotManagement(BotManagementContractAddress);
        vehicleContract = Vehicles(vehicleContractAddress);
        dateTimeContract = DateTime(address(0xe8660491d945560fecb719bdb96479bed17c577c));
    }
    
    function getDate(uint256 timestamp) public view returns(uint256, uint256, uint256, uint256, uint256, uint256){
        uint256 _year = dateTimeContract.getYear(timestamp);
        uint256 _month = dateTimeContract.getMonth(timestamp);
        uint256 _day = dateTimeContract.getDay(timestamp);
        uint256 _hour = dateTimeContract.getHour(timestamp);
        uint256 _minute = dateTimeContract.getMinute(timestamp);
        uint256 _second = dateTimeContract.getSecond(timestamp);
        return (_year, _month, _day, _hour, _minute, _second);
    }
    
    function getVehicleLenght() public view returns (uint256){
        return vehicleContract.getOwnerVehicleLenght(msg.sender);
    }
    
    function getListVehicle(uint256 index) public view returns(string, uint256, bool){
        return vehicleContract.getOwnerVehicle(msg.sender, index);
    } 
   
    function getBalance() public view returns(int256){
        return botMgmtContract.getBalance(msg.sender);
    }
    
    function checkAccount() public view returns (bool){
        return botMgmtContract.checkAccount(msg.sender);
    }
    function addCoin() public payable returns(bool){
         botMgmtContract.addCoin.value(msg.value)(msg.sender);
    }
    
    function getFixedInfo(string plate_id ) view public returns (string, string, uint256, string, string) {
        return vehicleContract.getFixedInfo(plate_id);
    }
    
     function getDynamicInfo(string plate_id) view public returns (address, uint256, string, string, int){
         return vehicleContract.getDynamicInfo(plate_id);
     }
    
    function getLogsLength(string _plate_id) public view returns (uint256){
        return botMgmtContract.getLogsLength(_plate_id);
    }
    
    function getLogs(string _plate_id, uint256 _index) public view returns(string, address, uint256){
        return botMgmtContract.getLogs(_plate_id, _index);
    }
}