export class Device {
    
    async findAndroidElementByText(text: string) {
        const selector = `android=new UiSelector().textContains("${text}")`;
        return await $(selector);
    }
}