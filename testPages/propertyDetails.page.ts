import { Page, expect } from '@playwright/test';

export class PropertyPage {
  public page: Page;
  public singleFamilyOption;
  public townHouseOption;
  public condoOption;
  public condoOption1;
  public condoOption2;
  public condoOption3;
  public condoOption4;
  public condoOption5;
  public yearBuiltDropdown;
  public yearOption;
  public continueButton;
  public lotSizeInput;
  public dropdownIcon;
  public unitOption;
  public calendarButton;
  public rentAmountSlider;
  public sliderSelector;
  public incrementButtons;
  public fencedOption;
  public unfencedOption;
  public landscapedOption;
  public notLandscapedOption;
  public washerDryerOption;
  public hookupOption;
  public petFriendlyOption;
  public noPetsOption;

  constructor(public propertyPage: Page) {
    this.singleFamilyOption = this.propertyPage.locator("img[alt='Single House']");
    this.townHouseOption = this.propertyPage.locator('img[alt="Townhouse"]');
    this.condoOption = this.propertyPage.locator('.h-\\[150px\\]:has-text("Condo")');
    this.condoOption1 = this.propertyPage.locator('div:has(h1:text("1"))');
    this.condoOption2 = this.propertyPage.locator('div:has(h1:text("2"))');
    this.condoOption3 = this.propertyPage.locator('div:has(h1:text("3"))');
    this.condoOption4 = this.propertyPage.locator('div:has(h1:text("4"))');
    this.condoOption5 = this.propertyPage.locator('div:has(h1:text("More"))');
    this.yearBuiltDropdown = this.propertyPage.locator('.css-nzh987');
    this.yearOption = this.propertyPage.locator('div[role="option"]');
    this.continueButton = this.propertyPage.locator('button:has(span:text("Continue"))');
    this.lotSizeInput = this.propertyPage.locator('input[placeholder="Eg. 0.1 Acre"]');
    this.dropdownIcon = this.propertyPage.locator('svg');
    this.unitOption = this.propertyPage.locator('div[role="option"]');
    this.calendarButton = this.propertyPage.locator('div.relative.dateInput');
    this.rentAmountSlider = this.propertyPage.locator('div.custom-slider-wraper input[type="range"].custom-slider');
    this.sliderSelector = this.propertyPage.locator('input[type="range"]');
    this.incrementButtons = this.propertyPage.locator('button:has-text("+")');
    this.fencedOption = this.propertyPage.locator('div.border-2 img.mb-2');
    this.unfencedOption = this.propertyPage.locator('img[alt="Unfenced"]');
    this.landscapedOption = this.propertyPage.locator('img[alt="Landscaped"]');
    this.notLandscapedOption = this.propertyPage.locator('img[alt="Not landscaped"]');
    this.washerDryerOption = this.propertyPage.locator('img[alt="Washer/Dryer"]');
    this.hookupOption = this.propertyPage.locator('img[alt="Hook"]');
    this.petFriendlyOption = this.propertyPage.locator('img[alt="pet"]');
    this.noPetsOption = this.propertyPage.locator('img[alt="no pets"]');
  }

  async selectPropertyType(propertyType: 'Single Family' | 'Townhouse' | 'Condo') {
    switch (propertyType) {
      case 'Single Family':
        await this.singleFamilyOption.click();
        break;
      case 'Townhouse':
        await this.townHouseOption.click();
        break;
      case 'Condo':
        await this.condoOption.click();
        await this.propertyPage.locator(this.condoOption).waitFor();
        break;
    }
  }

  async selectCondoOption(optionNumber: number) {
    const optionSelector = [
      this.condoOption1,
      this.condoOption2,
      this.condoOption3,
      this.condoOption4,
      this.condoOption5,
    ];
    if (optionNumber >= 1 && optionNumber <= 5) {
      await optionSelector[optionNumber - 1].click();
    } else {
      throw new Error('Invalid option number');
    }
  }

  async selectYearBuilt(year: string) {
    await this.yearBuiltDropdown.click();
    await this.yearOption.getByText(year).click();
  }

  async clickContinue() {
    await expect(this.continueButton).toBeEnabled();
    await this.continueButton.click();
  }

  async fillLotSizeAndSelectUnit(lotSize: any, unit: 'Acres' | 'Sqft') {
    await this.lotSizeInput.click();
    await this.lotSizeInput.fill(lotSize);
    await this.dropdownIcon.nth(1).click();
    await this.unitOption.getByText(unit).click();
  }

  async selectAvailableDateAndContinue(date: string) {
    await this.calendarButton.click();
    await this.propertyPage.getByText(date).first().click();
    await this.continueButton.click();
  }   

  async setRentAmountAndContinue(amount: number) {
    const slider = this.rentAmountSlider;
    const minValue = 500;
    const maxValue = 5000;
    const normalizedPosition = (amount - minValue) / (maxValue - minValue);
    await slider.evaluate((el: HTMLInputElement, position: number) => {
      el.value = (position * (5000 - 500) + 500).toString();
      el.dispatchEvent(new Event('input'));
    }, normalizedPosition);
    await this.continueButton.click();
  }

  async setAreaMeasurementsAndContinue(totalSqft: number, finishedSqft: number, unfinishedSqft: number) {
    await this.sliderSelector.nth(0).evaluate((slider, value) => {
      (slider as HTMLInputElement).value = value.toString();
      slider.dispatchEvent(new Event('input'));
    }, totalSqft);

    await this.sliderSelector.nth(1).evaluate((slider, value) => {
      (slider as HTMLInputElement).value = value.toString();
      slider.dispatchEvent(new Event('input'));
    }, finishedSqft);

    await this.sliderSelector.nth(2).evaluate((slider, value) => {
      (slider as HTMLInputElement).value = value.toString();
      slider.dispatchEvent(new Event('input'));
    }, unfinishedSqft);

    await this.continueButton.click();
  }

  async clickIncrementButtons() {
    for (let i = 0; i < 5; i++) {
      await this.incrementButtons.nth(i).click();
    }
  }

  async selectFencedOrUnfenced(option: 'fenced' | 'unfenced') {
    if (option === 'fenced') {
      await this.fencedOption.first().click();
    } else {
      await this.unfencedOption.first().click();
    }
  }

  async selectLandscapedOrNotLandscaped(option: 'landscaped' | 'not landscaped') {
    if (option === 'landscaped') {
      await this.landscapedOption.first().click();
    } else {
      await this.notLandscapedOption.first().click();
    }
  }

  async selectAmenity(option: 'washer/dryer' | 'hookup') {
    if (option === 'washer/dryer') {
      await this.washerDryerOption.click();
    } else {
      await this.hookupOption.click();
    }
  }

  async selectPetOption(option: 'pet friendly' | 'no pets') {
    if (option === 'pet friendly') {
      await this.petFriendlyOption.click();
      await this.propertyPage.waitForTimeout(5000);
    } else {
      await this.noPetsOption.click();
    }
  }
}















  // async validatePropertyPageFields() {
  //   const propertyOptions = [this.singleFamilyOption, this.townHouseOption, this.condoOption];
  //   for (const option of propertyOptions) {
  //     await expect(this.page.locator(option)).toBeVisibl
  // }}
