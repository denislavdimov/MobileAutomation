import User from "../User";

class SiteVisit {

    public get siteVisit() {
        return $("//android.widget.TextView[@text='Site Visit']");
    }
    
    public get searhPartyField() {
        return $("//android.widget.EditText");
    }

    public get partyResult() {
        return $("//android.widget.TextView[@text='Samurai Jack']");
    }

    public get createVisitSection() {
        return $("//android.widget.TextView[@text='Create Visit']");
    }
    
    public get elevatorCheckbox() {
        return $("//android.widget.TextView[@text='Elevator']/../android.view.ViewGroup");
    }

    public get walkUpCheckbox() {
        return $("//android.widget.TextView[@text='Walk-Up']/../android.view.ViewGroup");
    }
    
    public get parkingCheckbox() {
        return $("//android.widget.TextView[@text='Parking']/../android.view.ViewGroup");
    }

    public get saveButton() {
        return $("//android.widget.TextView[@text='Save']");
    }

    public get createdSiteVisit() {
        return $("//android.widget.TextView[@text='Samurai Jack']//..//android.widget.TextView[@text='Test Address, Llanfairp 5004']");
    }
    
    async createSiteVisit() {
        await User.tap(await this.siteVisit);
        const filterLabel = await User.device.findAndroidElementByText("Filter:");
        await filterLabel.waitForDisplayed();

        await User.tapByCoordinates(540, 1820);

        await User.wait.untilElementIsDisplayed(await this.searhPartyField);
        await User.hideKeyboard();
        await User.fillField(await this.searhPartyField, "Samurai Jack");
        await User.pressEnter(await this.searhPartyField);
        await User.wait.untilElementIsDisplayed(await this.partyResult);
        await User.tap(await this.partyResult);
        await User.wait.untilElementIsDisplayed(await this.createVisitSection);

        const collateral = await User.device.findAndroidElementByText("Mobile Test Automation FAIL");
        await User.gestures.checkIfDisplayedWithSwipeUp(collateral, 1);
        await User.tap(collateral);
        await User.wait.untilElementWithTextIsDisplayed("Save");

        await User.gestures.checkIfDisplayedWithSwipeUp(await this.elevatorCheckbox, 1);
        await User.tap(await this.elevatorCheckbox);
        await User.tap(await this.walkUpCheckbox);
        await User.tap(await this.parkingCheckbox);

        const statusDropdown = await User.device.findAndroidElementByText("New");
        await User.gestures.checkIfDisplayedWithSwipeUp(statusDropdown, 2);
        await User.selectFromDropdown(statusDropdown, "Open");
        await User.wait.for(2);
        await User.tap(await this.saveButton);

        await User.wait.forToastMessage("Visit created");
        await User.tapByCoordinates(70, 150);
        await User.wait.untilElementWithTextIsDisplayed("Filter:");
        await User.wait.untilElementIsNotDisplayed(await this.createdSiteVisit);

        const filterDropdown = await $("//android.widget.TextView[@text='Filter:']//..//android.widget.TextView[@text='New']");
        await User.selectFromDropdown(filterDropdown, "Open");
        await User.wait.untilElementIsDisplayed(await this.createdSiteVisit);
        await User.tap(await this.createdSiteVisit);
        await User.wait.untilElementWithTextIsDisplayed("Save");
        await User.wait.untilElementWithTextIsDisplayed("Open");
    }
}

export default new SiteVisit();