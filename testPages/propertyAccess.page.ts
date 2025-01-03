import { Page, expect } from '@playwright/test';

export class PropertyAccessPage {
  public page: Page;
  public nextButton;
  public incrementCounterButton;
  public dateSelector;
  public dateOption;
  public otherInput;
  public continueButton;
  public yesButton;
  public noButton;
  public mailboxInput;
  public CountIncrementButton;
  public garageOpenerIncrementButton;
  public garageCodeInput;
  public airFilterSizeInput;
  public otherDetailsInput;



  constructor(public PropertyAccessPage: Page) {
    this.nextButton = this.PropertyAccessPage.locator('button:has-text("Next : Property Access")');
    this.incrementCounterButton = this.PropertyAccessPage.getByRole('button', { name: '+' });
    this.dateSelector = this.PropertyAccessPage.locator('.border-\\[1px\\].flex.justify-between.items-center');
    this.otherInput = this.PropertyAccessPage.getByPlaceholder('Write here ...');
    this.continueButton = this.PropertyAccessPage.getByRole('button', { name: 'Continue' });
    this.yesButton = this.PropertyAccessPage.locator('#root div:has-text("Yes")').nth(4);
    this.noButton = this.PropertyAccessPage.locator('#root div:has-text("No")').nth(4);
    this.mailboxInput = this.PropertyAccessPage.getByPlaceholder('1234');
    this.CountIncrementButton = this.PropertyAccessPage.getByRole('button', { name: '+' }).first();
    this.garageOpenerIncrementButton = this.PropertyAccessPage.getByRole('button', { name: '+' }).nth(1);
    this.garageCodeInput = this.PropertyAccessPage.getByPlaceholder('1234');
    this.airFilterSizeInput = this.PropertyAccessPage.getByPlaceholder('L X W X H');
    this.otherDetailsInput = this.PropertyAccessPage.getByPlaceholder('Write here..');


  }

  async clickNext() {
    await expect(this.nextButton).toBeEnabled();
    await this.nextButton.click();
  }

  async handlePropertyAccess(keysCount, date, otherInfo) {
    for (let i = 0; i < keysCount - 3; i++) {
      await this.incrementCounterButton.click();
    }
    await this.dateSelector.click();
    await this.PropertyAccessPage.getByText(date).first().click();
    if (otherInfo) {
      await this.otherInput.click();
      await this.otherInput.fill(otherInfo);
    }
    await this.continueButton.click();
  }

  async handleMailbox(hasMailbox, numberOfKeys = 2, mailboxNumber = '') {
    if (hasMailbox) {
      await this.yesButton.click();
      for (let i = 0; i < numberOfKeys - 2; i++) {
        await this.incrementCounterButton.click();
      }
      if (mailboxNumber) {
        await this.mailboxInput.click();
        await this.mailboxInput.fill(mailboxNumber);
      }
      await this.continueButton.click();
    } else {
      await this.noButton.click();
    }
  }

  async handleGarageDetails(garageCount, garageOpeners, garageCode) {
    for (let i = 0; i < garageCount - 2; i++) {
      await this.CountIncrementButton.click();
    }
    for (let i = 0; i < garageOpeners - 2; i++) {
      await this.garageOpenerIncrementButton.click();
    }
    if (garageCode) {
      await this.garageCodeInput.click();
      await this.garageCodeInput.fill(garageCode);
    }
    await this.continueButton.click();
  }

  async handleAirFilterDetails(filterCount, filterSize, otherDetails) {
    for (let i = 0; i < filterCount - 2; i++) {
        await this.CountIncrementButton.click();
    }
    if (filterSize) {
        await this.airFilterSizeInput.click();
        await this.airFilterSizeInput.fill(filterSize);
    }
    if (otherDetails) {
        await this.otherDetailsInput.click();
        await this.otherDetailsInput.fill(otherDetails);
    }
    await this.continueButton.click();
}
}



