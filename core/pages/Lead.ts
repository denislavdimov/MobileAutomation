import User from "../User";
import { faker } from '@faker-js/faker';

class Lead {

    public get lead() {
        return $("//android.widget.TextView[@text='Lead']");
    }
    
    public get plusButton() {
        return $("/hierarchy/android.widget.FrameLayout/android.widget.LinearLayout/android.widget.FrameLayout/android.widget.LinearLayout/android.widget.FrameLayout/android.widget.FrameLayout/android.view.ViewGroup/android.view.ViewGroup/android.view.ViewGroup/android.view.ViewGroup/android.widget.FrameLayout/android.view.ViewGroup/android.view.ViewGroup/android.view.ViewGroup/android.view.ViewGroup/android.view.ViewGroup/android.view.ViewGroup/android.view.ViewGroup/android.view.ViewGroup/android.view.ViewGroup/android.view.ViewGroup/android.widget.FrameLayout/android.view.ViewGroup/android.view.ViewGroup/android.widget.FrameLayout/androidx.viewpager.widget.ViewPager/androidx.recyclerview.widget.RecyclerView/android.widget.FrameLayout/android.view.ViewGroup/android.view.ViewGroup/android.view.ViewGroup/android.view.ViewGroup/android.widget.FrameLayout/android.view.ViewGroup/android.view.ViewGroup/android.view.ViewGroup/android.view.ViewGroup/android.view.ViewGroup/android.view.ViewGroup[2]/android.view.ViewGroup[2]/android.view.ViewGroup/android.view.ViewGroup");
    }

    public get searhPartyField() {
        return $("//android.widget.EditText");
    }

    public get partyResult() {
        return $("//android.widget.TextView[@text='Samurai Jack']");
    }
    
    public get opportunityTab() {
        return $("//android.widget.TextView[@text='Opportunity']");
    }

    public get collateralTab() {
        return $("//android.widget.TextView[@text='Collateral']");
    }

    public get engagementTab() {
        return $("//android.widget.TextView[@text='Engagement']");
    }

    public get stageDropdown() {
        return $("/hierarchy/android.widget.FrameLayout/android.widget.LinearLayout/android.widget.FrameLayout/android.widget.LinearLayout/android.widget.FrameLayout/android.widget.FrameLayout/android.view.ViewGroup/android.view.ViewGroup/android.view.ViewGroup/android.view.ViewGroup/android.widget.FrameLayout/android.view.ViewGroup/android.view.ViewGroup/android.view.ViewGroup/android.view.ViewGroup/android.view.ViewGroup/android.view.ViewGroup/android.view.ViewGroup/android.view.ViewGroup/android.view.ViewGroup/android.view.ViewGroup/android.widget.FrameLayout/android.view.ViewGroup/android.view.ViewGroup/android.widget.FrameLayout/androidx.viewpager.widget.ViewPager/androidx.recyclerview.widget.RecyclerView/android.widget.FrameLayout/android.view.ViewGroup/android.view.ViewGroup/android.view.ViewGroup/android.view.ViewGroup/android.widget.FrameLayout/android.view.ViewGroup/android.view.ViewGroup/android.view.ViewGroup/android.view.ViewGroup/android.view.ViewGroup/android.view.ViewGroup[2]/android.widget.FrameLayout/androidx.viewpager.widget.ViewPager/androidx.recyclerview.widget.RecyclerView/android.widget.FrameLayout/android.view.ViewGroup/android.view.ViewGroup/android.view.ViewGroup/android.widget.ScrollView/android.view.ViewGroup/android.view.ViewGroup[1]");
    }
    
    public get requestedLoanAmountField() {
        return $("//android.widget.TextView[@text='Requested Loan Amount']/..//android.widget.EditText[@text='$ ']");
    }

    public get saveButton() {
        return $("//android.widget.TextView[@text='Save']");
    }

    public get collateral() {
        return $("//android.widget.TextView[@text='123 don't delete']");
    }

    public get collateralDescription() {
        return $("//android.widget.TextView[@text='Requested Loan Amount']/..//android.widget.EditText[@text='123 don't delete']");
    }
    
    public get backButton() {
        return $("/hierarchy/android.widget.FrameLayout/android.widget.LinearLayout/android.widget.FrameLayout/android.widget.LinearLayout/android.widget.FrameLayout/android.widget.FrameLayout/android.view.ViewGroup/android.view.ViewGroup/android.view.ViewGroup/android.view.ViewGroup/android.widget.FrameLayout/android.view.ViewGroup/android.view.ViewGroup/android.view.ViewGroup/android.view.ViewGroup/android.view.ViewGroup/android.view.ViewGroup/android.view.ViewGroup/android.view.ViewGroup/android.view.ViewGroup/android.view.ViewGroup/android.widget.FrameLayout/android.view.ViewGroup/android.view.ViewGroup/android.widget.FrameLayout/androidx.viewpager.widget.ViewPager/androidx.recyclerview.widget.RecyclerView/android.widget.FrameLayout/android.view.ViewGroup/android.view.ViewGroup/android.view.ViewGroup/android.view.ViewGroup/android.widget.FrameLayout/android.view.ViewGroup/android.view.ViewGroup/android.view.ViewGroup/android.view.ViewGroup/android.view.ViewGroup/android.view.ViewGroup[1]/android.view.ViewGroup/android.view.ViewGroup[2]/android.view.ViewGroup[1]/android.view.ViewGroup");
    }
    
    public get createdLead() {
        return $("//android.widget.TextView[@text='Samurai Jack']//..//android.widget.TextView[@text='Approved']");
    }
    

    async createLead() {
        await User.tap(await this.lead);
        await User.tap(await this.plusButton);

        await User.wait.untilElementIsDisplayed(await this.searhPartyField);
        await User.hideKeyboard();
        await User.fillField(await this.searhPartyField, "Samurai Jack");
        await User.pressEnter(await this.searhPartyField);
        await User.tap(await this.partyResult);
        await User.wait.untilElementIsDisplayed(await this.saveButton);

        await User.tap(await this.opportunityTab);

        await User.selectFromDropdown(await this.stageDropdown, "Approved");
        await User.gestures.checkIfDisplayedWithSwipeUp(await this.requestedLoanAmountField, 1);
        await User.fillField(await this.requestedLoanAmountField, faker.number.bigInt().toString());

        await User.tap(await this.collateralTab);
        await User.tap(await this.collateral);
        await User.wait.untilElementIsDisplayed(await this.collateralDescription);
        await User.tap(await this.saveButton);

        await User.wait.forToastMessage("Lead created");
        await User.tap(await this.backButton);
        await User.wait.untilElementIsDisplayed(await this.createdLead);
    }
}

export default new Lead();