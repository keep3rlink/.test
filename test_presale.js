// const PRESALE = artifacts.require("KP3RLPresale");
// const KP3RL = artifacts.require("KP3RLToken");
// const catchRevert = require("./exceptions.js").catchRevert;
// const BN = web3.utils.BN;

// contract("PRESALE", accounts => {
//     const admin = accounts[0];
//     const user = accounts[1];

//     it("Deposit 100 KP3RL in contract", async () =>{ 
//         const KP3RL = await KP3RL.deployed();
//         const presale = await PRESALE.deployed();

//         await KP3RL.approve(presale.address, "10000000000000000000000000000000");
//         await presale.managerDeposit("100000000000000000000");

//         const bal = await KP3RL.balanceOf(presale.address)
//         assert.equal(bal.toString(), "100000000000000000000", "contract balance is incorrect");

//         const remaining = await presale.remaining()
//         assert.equal(remaining.toString(), bal.toString(), "remaining balance should be total balance")
//     })

//     it("Attempt purchase before started", async () => {
//         const KP3RL = await KP3RL.deployed();
//         const presale = await PRESALE.deployed();
        
//         await catchRevert (presale.purchase({value: "1000000000000000000", from: user }));
//     })

//     it("Start presale", async () => {
//         const KP3RL = await KP3RL.deployed();
//         const presale = await PRESALE.deployed();

//         const price = "500000000000000000";
//         const tomorrow = "1604016000"; // update to tomorrows timestamp
//         const min = "1000";
        
//         // function start(uint256 _unlocksOn, uint256 _endsOn, uint256 _price, uint256 _minimumOrder)
//         await presale.start(tomorrow, tomorrow, price, min);

//         const started = await presale.started();
//         assert.ok(started, "presale should have been started");

//         const presalePrice = await presale.unitPrice();
//         const presaleEndsOn = await presale.endsOn();
//         const presaleMin = await presale.minimumOrder();

//         assert.equal(presalePrice.toString(), price, "price should be equal");
//         assert.equal(presaleEndsOn.toString(), tomorrow, "price should be equal");
//         assert.equal(presaleMin.toString(), min, "price should be equal");
//     })

//     it("Purchase via purchase method", async() => {
//         const KP3RL = await KP3RL.deployed();
//         const presale = await PRESALE.deployed();
        
//         const initialBal = await presale.balance(user);

//         const expectedPurchase = await presale.calculateAmountPurchased("1000000000000000000");
//         // console.log("estimated amount purchased:", expectedPurchase.toString());

//         await presale.purchase({value: "1000000000000000000", from: user });
//         const finalBal = await presale.balance(user);

//         assert.ok(finalBal.gt(initialBal), `balance should have increased. It was: ${finalBal.toString()}`);
//     })

//     it("Attempt withdraw before unlock", async() => {
//         const KP3RL = await KP3RL.deployed();
//         const presale = await PRESALE.deployed();

//         await catchRevert (presale.claim({from: user }));
//     })

//     it("Unlock and withdraw", async() => {
//         const KP3RL = await KP3RL.deployed();
//         const presale = await PRESALE.deployed();

//         await presale.managerForceUnlock();

//         const initialBal = await KP3RL.balanceOf(user);
//         const expectedBal = await presale.balance(user);

//         await presale.claim({from: user })
//         const finalBal = await KP3RL.balanceOf(user);

//         assert.ok(finalBal.gt(initialBal), `balance should have inceased. It was ${finalBal.toString()}`)
//         assert.equal(finalBal.toString(), expectedBal.toString(), `balances dont match`)
//     })

//     it("Manager withdraw", async() => {
//         const KP3RL = await KP3RL.deployed();
//         const presale = await PRESALE.deployed();

//         const totalRaised = await presale.weiRaised();
//         const share = totalRaised.mul(new BN("8")).div(new BN("10"));
//         // console.log("admin share", share.toString());
//         // console.log("wei raised", totalRaised.toString());

//         const initialBal = new BN(await web3.eth.getBalance(admin));
//         await presale.managerWithdraw(share);
//         const finalBal = new BN(await web3.eth.getBalance(admin));

//         assert.ok(finalBal.gt(initialBal), `balance should have inceased. It was ${finalBal.toString()}`)
//     })

//     it("Test purchaing different amounts", async() => {
//         const presale = await PRESALE.deployed();
        
//         const expectedPurchase1 = await presale.calculateAmountPurchased("1000000000000000000");
//         const expectedPurchase2 = await presale.calculateAmountPurchased("5000000000000000");
//         const expectedPurchase3 = await presale.calculateAmountPurchased("12000000000000000");

//         assert.ok(expectedPurchase1.toString() !== "0", "big amount");
//         assert.ok(expectedPurchase2.toString() !== "0", "small amount");
//         assert.ok(expectedPurchase3.toString() !== "0", "small amount");
//     })
// })