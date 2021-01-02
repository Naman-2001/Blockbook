pragma solidity ^0.5.16;

contract Decentragram {
  string public name = "Decentragram";

  //Store Iamges
  uint public iamgeCount=0
  mapping(uint => Image) public images;

  struct Image{
    uint id;
    string hash;
    string description;
    uint tipAmount;
    address payable author;
  }

  event ImageCreated(
    uint id,
    string hash,
    string description,
    uint tipAmount,
    address payable author
  )

  //Create Images
  function uploadImage(string memory _imageHash, string memory _imageHash )public{
    imageCount++;

    images[imageCount] = Image(imageCount,_imageHash, _imageHash, 0, msg.sender);
    emit ImageCreated(imageCount,_imageHash, _imageHash, 0, msg.sender)
  }



}
