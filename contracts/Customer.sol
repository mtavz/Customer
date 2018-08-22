pragma solidity ^0.4.21;

contract Vehicles{
    function getOwnerVehicle(address, uint256) public view returns(string, string, bool){}
    function getOwnerVehicleLenght(address) public constant returns(uint) {}
    function getOwnerInfo(string, uint256 ) public view returns (address, string){}
}

contract BotManagement{
    
    function checkAccount(address) public view returns(bool){}
    
    function addCoin(address) public payable returns (bool){ }
    
    function getBalance(address) public view returns(int256){}
    
}

contract Customer{
    
    BotManagement botMgmtContract;
    Vehicles vehicleContract;
    constructor(address BotManagementContractAddress, address vehicleContractAddress) public{
        botMgmtContract = BotManagement(BotManagementContractAddress);
        vehicleContract = Vehicles(vehicleContractAddress);
    }
    
    function getVehicleLenght() public view returns (uint256){
        return vehicleContract.getOwnerVehicleLenght(msg.sender);
    }
    
    function getListVehicle(uint256 index) public view returns(string, string, bool){
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

}