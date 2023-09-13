import RegisterDevice from "../../core/RegisterDevice";
import Lead from "../../core/pages/Lead";
import LoginPage from "../../core/pages/LoginPage";

it('Create Site Visit', async () => {
    await RegisterDevice.registerDevice();
    await LoginPage.loginToLvMe();
    await Lead.createLead();
})