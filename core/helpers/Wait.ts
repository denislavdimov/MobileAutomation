export class Wait {

    async untilElementIsDisplayed(element: WebdriverIO.Element) {
        await element.waitForDisplayed();
    }

    async untilLocatorisDisplayed(locator: string) {
        const element = await $(locator);
        await element.waitForDisplayed();
    }

    async untilElementWithTextIsDisplayed(text: string) {
        const selector = `android=new UiSelector().textContains("${text}")`;
        const element = await $(selector);
        await element.waitForDisplayed();
    }

    async untilElementIsNotDisplayed(element: WebdriverIO.Element) {
        await element.waitForDisplayed({reverse: true});
    }

    async untilElemenWithTextIsNotDisplayed(text: string) {
        const selector = `android=new UiSelector().textContains("${text}")`;
        const element = await $(selector);
        await element.waitForDisplayed({reverse: true});
    }

    async untilLocatorIsNotDisplayed(locator: string) {
        const element = await $(locator);
        await element.waitForDisplayed({reverse: true});
    }

    async for(seconds: number) {
        const sec = seconds * 1000;
        await driver.pause(sec);
    }

    async forToastMessage(text: string) {
        const selector = `//android.widget.Toast[@text='${text}']`;
        const toast = await $$(selector);

        if (toast.length > 0) {
            await this.untilLocatorIsNotDisplayed(selector);
        } else {
            await driver.pause(700);
            await this.untilLocatorIsNotDisplayed(selector);
        }
    }
}