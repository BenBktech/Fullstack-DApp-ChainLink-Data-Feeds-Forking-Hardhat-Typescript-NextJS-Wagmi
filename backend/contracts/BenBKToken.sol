//SPDX-License-Identifier: MIT
pragma solidity 0.8.24;

import "hardhat/console.sol";

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "./DataConsumerV3.sol";

contract BenBKToken is ERC20, Ownable, DataConsumerV3 {

    uint256 private constant PRICE_PER_TOKEN = 10; // in dollars

    constructor()
        ERC20("BenBK", "BBK")
        Ownable(msg.sender)
    {}    

    function mint(address _to, uint256 _amount) external payable {
        int256 ethInDollars = getChainlinkDataFeedLatestAnswer();
        require(ethInDollars > 0, "Invalid price feed value");

        // Convert int256 to uint256 for division
        uint256 ethInDollarsUint = uint256(ethInDollars / 1e8);

        uint256 expectedPriceInWei = (PRICE_PER_TOKEN * 1 ether * _amount) / ethInDollarsUint; // Convert to wei
        console.log("ethInDollars:", ethInDollarsUint);
        console.log("expectedPriceInWei:", expectedPriceInWei);
        console.log("value provided:", msg.value);
        
        require(msg.value >= expectedPriceInWei, "Not enough funds provided");
        _mint(_to, _amount);
    }
}