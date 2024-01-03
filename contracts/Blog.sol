// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.17;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721Enumerable.sol";

contract Blog is ERC721, ERC721URIStorage, ERC721Enumerable {

    // Optional mapping for tokenId with mode 
    // true: public, false: private
    mapping(uint256 => bool) private _modes;

    constructor(string memory name_, string memory symbol_) 
    ERC721(name_, symbol_) {}

    function ownedMint(string memory uri, bool mode) external
    {
        //Mint NFT
        uint256 tokenId = totalSupply();
        _safeMint(msg.sender, tokenId);
        _setTokenURI(tokenId, uri);
        _modes[tokenId] = mode;
    }

    function ownedChangeMode(uint256 index, bool mode) external
    {
        uint256 tokenId = tokenOfOwnerByIndex(msg.sender, index);
        _modes[tokenId] = mode;
    }

    // Visible token in _allTokens that _index >= index
    function visibleTokenURI(uint256 index) public view returns (string memory, uint256, bool)
    {  
        uint256 total = totalSupply();

        for (; index < total && index >= 0; index -= 1) 
        {
            uint256 tokenId = tokenByIndex(index);
            
            if (_modes[tokenId]) 
            {
                return (tokenURI(tokenId), index, _modes[tokenId]);
            }
        }

        return ("", index, true);
    }

    function ownedTotalSupply() public view returns (uint256) 
    {
        return ERC721.balanceOf(msg.sender);
    }

    // Owned token in _ownedTokens[msg.sender] that _index == index
    function ownedTokenURI(uint256 index) public view returns (string memory, bool)
    {  
        uint256 tokenId = tokenOfOwnerByIndex(msg.sender, index);

        return (tokenURI(tokenId), _modes[tokenId]);
    }

    // Override Functions
    // No burn
    function _burn(uint256 tokenId) internal override(ERC721, ERC721URIStorage)
    {
    }

    function tokenURI(uint256 tokenId) 
    public view override(ERC721, ERC721URIStorage) returns (string memory)
    {  
        require(_modes[tokenId] || msg.sender == ownerOf(tokenId), "no permission");

        return super.tokenURI(tokenId);
    }

    function supportsInterface(bytes4 interfaceId) 
    public view virtual override(ERC721, ERC721Enumerable) returns (bool) 
    {
        return super.supportsInterface(interfaceId);
    }

    function _beforeTokenTransfer(address from,address to,uint256 firstTokenId,uint256 batchSize) 
    internal virtual override(ERC721, ERC721Enumerable) 
    {
        super._beforeTokenTransfer(from, to, firstTokenId, batchSize);
    }

    function totalSupply() public view virtual override(ERC721Enumerable) 
    returns (uint256) 
    {
        return super.totalSupply();
    }
}
