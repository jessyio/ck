// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.13;

import "forge-std/Test.sol";

import "../src/enigma/WorkersImpl.sol";

contract ContractTest is Test {
    function setUp() public {}

    function testExample() public {
        WorkersImpl wi = new WorkersImpl();
        wi.verifyReportImpl(hex"01020304", hex"034853945832948523495832493581");
    }
}
