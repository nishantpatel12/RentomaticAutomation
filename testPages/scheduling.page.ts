import { Page, expect } from '@playwright/test';

export class SchedulingPage {
  public page: Page;
  public nextButton;
  public readyTab;
  public notReadyTab;
  public dateSelector;
  public continueButton;
  public yesButton;
  public noButton;
  public linkInput;
  public uploadButton;
  public uploadFromDeviceLink;
  public fileInput;

  constructor(public schedulingPage: Page) {
    this.nextButton = this.schedulingPage.locator('button:has-text("Next : Scheduling")');
    this.readyTab = this.schedulingPage.locator('#root div:has-text("Ready")');
    this.notReadyTab = this.schedulingPage.locator('#root div:has-text("Not Ready")');
    this.dateSelector = this.schedulingPage.locator('.border-\\[1px\\]');
    this.continueButton = this.schedulingPage.getByRole('button', { name: 'Continue' });
    this.yesButton = this.schedulingPage.locator('#root div:has-text("Yes")').nth(4); 
    this.noButton = this.schedulingPage.locator('#root div:has-text("No")').nth(4);
    this.linkInput = this.schedulingPage.getByPlaceholder('google drive');
    this.uploadButton = this.schedulingPage.getByRole('button', { name: 'Upload' });
    this.uploadFromDeviceLink = this.schedulingPage.locator('p.text-[#3776DC].text-[14px].font-normal.mt-auto.underline.underline-offset-4'); // Locator for "Upload from your device"
    this.fileInput = this.schedulingPage.locator('input[type="file"]');
    

  }
  async clickNext() {
    await expect(this.nextButton).toBeEnabled();
    await this.nextButton.click();
  }

  async handlePropertyReadiness(isReady,date) {
    if (isReady) {
        await this.readyTab.nth(4).click();
    } else {
        await this.notReadyTab.nth(4).click();
        await this.dateSelector.click();
        await this.schedulingPage.getByText(date).first().click();
        await this.continueButton.click();
    }
}

async handlePropertyCleaning(isCleaned) {
  if (isCleaned) {
      await this.yesButton.click();
  } else {
      await this.noButton.click();
  }
}

async handlePersonalFurnitureRemoved(isRemoved,date) {
  if (isRemoved) {
      await this.yesButton.click();
  } else {
      await this.noButton.click();
      await this.dateSelector.click();
      await this.schedulingPage.getByText(date).first().click();
      await this.continueButton.click();

    }
}

async AddPhotos(input: string | string[]) {
  if (Array.isArray(input)) {
      if (input.length < 5 || input.length > 50) {
          throw new Error("You must upload between 5 and 50 photos.");
      }
      await this.uploadFromDeviceLink.click();
      await this.fileInput.waitFor({ state: 'visible' });
      await this.fileInput.setInputFiles(input);
      await this.uploadButton.click();

  } else {
      await this.linkInput.fill(input);
      await this.uploadButton.click();
  }

  
}
}

  

