import RegisterDevice from "../../core/RegisterDevice";
import LoginPage from "../../core/pages/LoginPage";
import SiteVisit from "../../core/pages/SiteVisit";

it('Create Site Visit', async () => {
    await RegisterDevice.registerDevice();
    await LoginPage.loginToLvMe();
    // await SiteVisit.createSiteVisit();
})