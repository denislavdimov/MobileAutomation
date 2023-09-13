import axios, { AxiosResponse } from "axios";
import FormData  from "form-data";
import User from "./User";
import * as config from '../config/appsettings.json';

class RegisterDevice {
    private readonly loginFormData: FormData;
    private readonly enableMobileFormData: FormData;
    private cookie: string[];
    private deepLink: string;

    constructor() {
        this.loginFormData = new FormData();
        this.enableMobileFormData = new FormData();

        this.loginFormData.append("Bank", config.instance);
        this.loginFormData.append("UserName", config.userName);
        this.loginFormData.append("Password", config.password);

        this.enableMobileFormData.append("idUser", config.idUser);
    }

    private async generateDeepLink() {
        await axios({
            method: "post",
            url: `${config.loanVantageUrl}/Login/Log`,
            data: this.loginFormData
        }).then(async (response) => {
            await axios({
                method: "post",
                url: `${config.loanVantageUrl}/UserDevice/EnableMobile`,
                data: this.enableMobileFormData,
                headers: {
                  'Cookie': `${response.headers["set-cookie"]}`
                }
            })
            this.cookie = response.headers["set-cookie"];
        }).catch(async (response) => {
            console.log(response);
        });
    }

    private async getDeepLink() {
        await axios({
            method: "get",
            url: `${config.loanVantageUrl}/UserDevice/List?idUser=${config.idUser}`,
            headers: {
                'Cookie': `${this.cookie}`
            }
        }).then(async (resp) => {            
            //const obj = Object.values(resp.data)[0];

            const obj = resp.data.Result;
            const deepLinkResp = obj.find(i => i.RegistrationCompleteDate === null).RegistrationLink;
            this.deepLink = deepLinkResp;
        })
    }

    public async registerDevice() {
        await this.generateDeepLink();
        await this.getDeepLink();
        
        await driver.closeApp();
        await User.wait.for(1);

        await driver.execute(
            'mobile:deepLink',
            {
                url: `${this.deepLink}`,
                package: "com.profitstars.LoanVantage"
            }
        );

        const emailInputField = await $("//android.widget.EditText[@text='Email']");
        await User.wait.untilElementIsDisplayed(emailInputField);
    }
}

export default new RegisterDevice();