import { Device } from "./helpers/Device";
import { Gestures }  from "./helpers/Gestures";
import { Wait } from "./helpers/Wait";

class User {
    public gestures: Gestures;
    public device: Device;
    public wait: Wait;

    constructor() {
        this.gestures = new Gestures();
        this.device = new Device();
        this.wait = new Wait();
    }

    async tap(element: WebdriverIO.Element) {
        await element.waitForDisplayed();
        await element.click();
    }

    async tapByCoordinates(xT: number, yT: number) {
        await driver.touchAction({
            action: 'tap',
            x: xT,
            y: yT
        });
    }

    async pressEnter(element: WebdriverIO.Element) {
        await element.pressKeyCode(66);
    }

    async hideKeyboard() {
        await driver.hideKeyboard();
    }

    async fillField(field: WebdriverIO.Element, text: string) {
        await field.waitForDisplayed();
        await field.addValue(text);
    }

    async selectFromDropdown(dropdown: WebdriverIO.Element, option: string) {
        await this.tap(dropdown);
        // await this.wait.untilLocatorisDisplayed(`//android.widget.ScrollView//android.widget.TextView[@text='${option}']`);

        const dropdownOption = await $(`//android.widget.ScrollView//android.widget.TextView[@text='${option}']`);
        await this.gestures.checkIfDisplayedWithSwipeUp(dropdownOption, 2);
        await dropdownOption.click();
        await this.wait.for(2);
    }
}

export default new User();
