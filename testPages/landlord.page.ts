import { Page, expect } from '@playwright/test';

export class LandlordPage {
  private nameInput;
  private emailInput;
  private contactNumberInput;
  private companyNameInput;
  private companyAddressInput;
  private getStartedButton;
  private logo;

  constructor(private page: Page) {
    this.nameInput = this.page.locator('input[name="name"]');
    this.emailInput = this.page.locator('input[name="email"]');
    this.contactNumberInput = this.page.locator('input[name="contactNumber"]');
    this.companyNameInput = this.page.locator('input[name="companyName"]');
    this.companyAddressInput = this.page.locator('input[name="companyAddress"]');
    this.getStartedButton = this.page.locator('button:has-text("Let’s get started")');
    this.logo = this.page.locator('img[src="/assets/logo-Nf4_tBmP.png"]');
  }
  async fillLandlordDetails(name: string, email: string, contactNumber: string, companyName: string = '', companyAddress: string = '') {
    await this.nameInput.fill(name);
    await this.emailInput.fill(email);
    await this.contactNumberInput.fill(contactNumber);

    if (companyName) {
      await this.companyNameInput.fill(companyName);
    }
    if (companyAddress) {
      await this.companyAddressInput.fill(companyAddress);
    }
  }
  async clickGetStarted() {
    await this.getStartedButton.click();
  }
  async validateLogoAndFields() {
    await expect(this.logo).toBeVisible();

    const fields = [this.nameInput, this.emailInput, this.contactNumberInput];
    for (const field of fields) {
      await expect(field).toBeEnabled();
    }
  }
}
