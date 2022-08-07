// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.13;

interface CKRegistry {
    function isCK(address owner) external returns (bool);
}

interface WorkersImpl {
    function verifyReportImpl(bytes memory _data, bytes memory _signature)
        external
        view
        returns (uint);
}

contract CK is CKRegistry {
    mapping(address => uint) blockNumberWhenVerified;

    WorkersImpl immutable workerContract;

    constructor(WorkersImpl _workerContract) {
        workerContract = _workerContract;
    }
    
    function whenCK(address _who) external view returns(uint blockNumber) {
        uint q = blockNumberWhenVerified[_who];
        if(q == 0){
            return type(uint256).max;
        }
        return q;
    }

    function isCK(address _who) external view returns (bool _isCK) {
        _isCK = blockNumberWhenVerified[_who] > 0;
    }

    function proveCK(address _who, bytes calldata data, bytes calldata sig) external {
        // TODO: Read the data and signature
        workerContract.verifyReportImpl(data, sig);
        blockNumberWhenVerified[_who] = block.number;
    }
}