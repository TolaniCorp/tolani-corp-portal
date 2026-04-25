
// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

/**
 * @title TolaniToken (TOL)
 * @dev ERC20 Token for Tolani Corp and TolaniDAO ecosystem.
 */
contract TolaniToken is ERC20, Ownable {
    string private _tokenURI;

    constructor(uint256 initialSupply, string memory tokenURI_) ERC20("TolaniToken", "TOL") {
        _mint(msg.sender, initialSupply * (10 ** decimals()));
        _tokenURI = tokenURI_;
    }

    /**
     * @dev Returns the metadata URI of the token.
     */
    function tokenURI() public view returns (string memory) {
        return _tokenURI;
    }

    /**
     * @dev Update token metadata URI. Owner only.
     */
    function updateTokenURI(string memory newURI) external onlyOwner {
        _tokenURI = newURI;
    }
}
