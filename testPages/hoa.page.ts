import { Page, expect } from '@playwright/test';

export class HOApage {
  public page: Page;
  public nextButton;
  public yesButton;
  public noButton;
  public nameInput;
  public emailInput;
  public contactInput;
  public continueButton;
  public linkInput;
  public fileUploadInput;
  public optionalInput;
  public amen;
  public accessInput;
  public utilitie; 
  public rangeSlider;
  public yes;
  public no;
  public incrementButton;
  public feeOption;
  public slider;
  public breedInput;
  public yesOption;
  public noOption;
  public accessinput;

  constructor(public hoaPage: Page) {
    this.nextButton = this.hoaPage.locator('button:has-text("Next : HOA")');
    this.yesButton = this.hoaPage.locator("div[class*='border-2 w-[237px] max-w-[100%]']");
    this.noButton = this.hoaPage.locator('img[alt="hoa"]');
    this.nameInput = this.hoaPage.locator('input[name="name"]');
    this.emailInput = this.hoaPage.locator('input[name="email"]');
    this.contactInput = this.hoaPage.locator('input[name="contact"]');
    this.continueButton = this.hoaPage.getByRole('button', { name: 'Continue' });
    this.linkInput = this.hoaPage.getByPlaceholder('rentomatic.app/');
    this.fileUploadInput = this.hoaPage.locator('input[type="file"]');
    this.optionalInput = this.hoaPage.getByPlaceholder('Anything else write here ...');
    this.amen = this.hoaPage.locator("div[class*='border-2 w-[150px] max-w-[100%]']");
    this.accessInput = this.hoaPage.getByPlaceholder('Write here ...');
    this.utilitie = this.hoaPage.locator("div[class*='border-2 w-[237px] max-w-[100%]']")
    this.rangeSlider = this.hoaPage.locator('input[type="range"]');
    this.yes = this.hoaPage.locator('.border-\\[1px\\]').first(); 
    this.no = this.hoaPage.locator('.border-\\[1px\\]').nth(1);  
    this.incrementButton = this.hoaPage.locator('button span:has-text("+")');
    this.feeOption = this.hoaPage.locator('.w-\\[500px\\] > div:nth-child(3) > div'); 
    this.slider = this.hoaPage.locator('input[type="range"]'); 
    this.breedInput = this.hoaPage.locator('input[placeholder="Mention here ..."]');
    this.yesButton = this.hoaPage.locator('#root div:has-text("Yes")').nth(4);
    this.noButton = this.hoaPage.locator('#root div:has-text("No")').nth(4);
    this.accessinput = this.hoaPage.locator('input[placeholder="Mention here ..."]');
  }
  async clickNext() {
    await expect(this.nextButton).toBeEnabled();
    await this.nextButton.click();
  }
  async selectHOACompliance(option: 'yes' | 'no') {
    if (option === 'yes') {
      await this.yesButton.nth(0).click();
    } else if (option === 'no') {
      await this.noButton.nth(1).click();

    }
  }
  async clickContinue() {
    await expect(this.continueButton).toBeEnabled();
    await this.continueButton.click();
  }

  async fillHoaContractInformation(name, email, contactNumber) {
    await this.nameInput.fill(name);
    await this.emailInput.fill(email);
    await this.contactInput.fill(contactNumber);
    await this.clickContinue();
  }

  async fillRulesAndRegulations(link, filePath, optionalText) {
    if (link) {
      await this.linkInput.click();
      await this.linkInput.fill(link);
    } else if (filePath) {
      await this.fileUploadInput.setInputFiles(filePath);
    }

    if (optionalText) {
      await this.optionalInput.click();
      await this.optionalInput.fill(optionalText);
    }
    await this.continueButton.click()
  }

async selectAmenitiesAndContinue(amenities) {
    for (const amenity of amenities) {
      await this.amen.getByText(amenity).click();
    }
    await this.clickContinue();
}

async fillAccessInfoAndContinue(accessInfo) {
  await this.accessInput.click();
  await this.accessInput.fill(accessInfo);
  await this.continueButton.click();
}

async selectUtilitiesAndContinue(utilities) {
  for (const utility of utilities) {
      await this.utilitie.getByText(utility).click();
  }
  await this.continueButton.click();
}

async selectHOAAndContinue(isHOAIncluded = false, amount = 100) {
  if (isHOAIncluded) {
      await this.yes.click();  
      await this.rangeSlider.fill(amount.toString()); 
      await this.continueButton.click();  
  } else {
      await this.no.click();  
  }
}

async handleHOAPetPolicy(isFee: boolean) {
  await this.incrementButton.click();
  await this.incrementButton.click();

  if (isFee) {
      await this.feeOption.first().click();
      await this.slider.click(); 
      await this.breedInput.click();
      await this.breedInput.fill('no');  
  }
    await this.continueButton.click(); 

  }

  async handleGatedCommunity(isGated: boolean, accessInfo?: string) {
    if (isGated) {
        await this.yesButton.click();
        if (accessInfo) {
            await this.accessinput.click();
            await this.accessinput.fill(accessInfo);
        } else {
            throw new Error('Access info is mandatory for gated community.');
        }
        await this.continueButton.click();
    } else {
        await this.noButton.click();
    }
}

}











