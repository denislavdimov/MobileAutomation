import User from "../User";
import * as config from '../../config/appsettings.json';

class LoginPage {

    public get emailInputField() {
        return $("//android.widget.EditText[@text='Email']");
    }

    public get pinInputField() {
        return $("//android.widget.EditText[@text='PIN']");
    } 
    
    public get registerDeviceButton() {
        return $("//android.widget.TextView[@text='REGISTER DEVICE']");
    } 
    
    public get dashboard()  {
        return $("//android.widget.TextView[@text='Dashboard']");
    }
    
    public get search()  {
        return $("//android.widget.TextView[@text='Search']");
    }

    public get chat()  {
        return $("//android.widget.TextView[@text='Chat']");
    }

    async loginToLvMe() {
        // await driver.launchApp();
        await User.fillField(await this.emailInputField, config.userEmail);
        await User.fillField(await this.pinInputField, config.userPin);
        await User.tap(await this.registerDeviceButton);
        await User.wait.untilElementIsDisplayed(await this.dashboard);

        await this.search.touchAction([
            'press',
            { action: 'moveTo', element: await this.dashboard },
            { action: 'moveTo', element: await this.chat },
            'release'
        ]);

        await User.wait.for(1);
    }
}

export default new LoginPage();