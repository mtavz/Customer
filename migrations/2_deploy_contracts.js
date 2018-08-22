var Customer = artifacts.require("./Customer.sol");

module.exports = function(deployer) {
  deployer.deploy(Customer, "0x3590656ce4c94bea778f2c41992ce7d6bb82bb59","0xbfd3432a530181d170b9d10b60d008ef9caf3c91");
};
