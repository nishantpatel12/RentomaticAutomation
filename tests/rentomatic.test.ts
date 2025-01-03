import { test, expect } from '@playwright/test';
import { LandlordPage } from '../testPages/landlord.page';
import { PropertyPage } from '../testPages/propertyDetails.page';
import { HOApage } from '../testPages/hoa.page';
import { PropertyAccessPage } from '../testPages/propertyAccess.page';

import { SchedulingPage } from '../testPages/scheduling.page';

// test.setTimeout(60000);

test('Landlord and Property Page Test', async ({ page }) => {
  const landlordPage = new LandlordPage(page);
  const propertyPage = new PropertyPage(page);
  const hoaPage = new HOApage(page);
  const propertyAccess = new PropertyAccessPage(page);
  const schedulingPage = new SchedulingPage(page);

  await page.goto('https://rentomaticui.vercel.app/');

  await landlordPage.fillLandlordDetails(
    'Nishant',
    'nishant@mail.com',
    '1234567890',
    'Lise',
    'Indore'
  );
  await landlordPage.validateLogoAndFields();

  await landlordPage.clickGetStarted();
  // await page.waitForTimeout(2000);ß
  await landlordPage.clickGetStarted();

  await propertyPage.selectPropertyType('Single Family');
  // / await propertyPage.selectPropertyType('Townhouse');
  // await propertyPage.selectPropertyType('Condo');
  // await propertyPage.selectCondoOption(5); 

  await propertyPage.selectYearBuilt('2000');
  // await expect(propertyPage.page.locator(propertyPage.yearBuiltDropdown)).toBeEnabled();
  // await expect(propertyPage.page.locator(propertyPage.continueButton)).toBeEnabled();
  await propertyPage.clickContinue();

  const size = '1234';
  await propertyPage.fillLotSizeAndSelectUnit(size, 'Acres');
  // await expect(propertyPage.page.locator(propertyPage.lotSizeInput)).toHaveValue(size);
  // await expect(propertyPage.page.locator(propertyPage.continueButton)).toBeEnabled();
  await propertyPage.clickContinue();

  await propertyPage.selectAvailableDateAndContinue('6');
  // await expect(propertyPage.page.locator(propertyPage.calendarButton)).toBeVisible();

  const rentAmount = 500;
  await propertyPage.setRentAmountAndContinue(rentAmount);
  // const rentSliderValue = await propertyPage.page.locator(propertyPage.rentAmountSlider).nth(0).inputValue();
  // expect(parseInt(rentSliderValue)).toBe(rentAmount);

  await propertyPage.setAreaMeasurementsAndContinue(7000, 6000, 1500);
  // await expect(propertyPage.page.locator(propertyPage.continueButton)).toBeEnabled();

  await propertyPage.clickIncrementButtons();
  // await expect(propertyPage.page.locator(propertyPage.continueButton)).toBeEnabled();
  await propertyPage.clickContinue();

  const backyardFencedUnfenced = 'unfenced';
  const backyardLandscapedNotLandscaped = 'landscaped';
  await propertyPage.selectFencedOrUnfenced(backyardFencedUnfenced);
  await propertyPage.selectLandscapedOrNotLandscaped(backyardLandscapedNotLandscaped);

  const selectedAmenity = 'washer/dryer';
  await propertyPage.selectAmenity(selectedAmenity);

  const selectedPetOption = 'pet friendly';
  await propertyPage.selectPetOption(selectedPetOption);

  await hoaPage.clickNext();
  await hoaPage.selectHOACompliance('yes');

  await hoaPage.fillHoaContractInformation('nishant', 'n@mail.com', '1234567890');

  const link = 'hihihihih';
  const filePath = null;
  const optionalText = 'hiii';
  await hoaPage.fillRulesAndRegulations(link, filePath, optionalText);
 
  const amenitiesToSelect = ['Hot Tub', 'Gym', 'WiFi', 'Play Area', 'Club House'];
  await hoaPage.selectAmenitiesAndContinue(amenitiesToSelect);
 
  await hoaPage.fillAccessInfoAndContinue('keys');

  await hoaPage.selectUtilitiesAndContinue(['Water','Trash Collection','Sewer','Landscaping Maintenance']);

  // await hoaPage.selectHOAAndContinue(true, 250);
  await hoaPage.selectHOAAndContinue(false);

  await hoaPage.handleHOAPetPolicy(true);
  // await hoaPage.handleHOAPetPolicy(false);

  await hoaPage.handleGatedCommunity(true, 'keys');
  // await hoaPage.handleGatedCommunity(false);

  await propertyAccess.clickNext();

  await propertyAccess.handlePropertyAccess(3, '13', 'hiii');

  await propertyAccess.handleMailbox(true, 4, '12345');
  // await propertyAccess.handleMailbox(false);

  await propertyAccess.handleGarageDetails(2, 2, '12345');

  await propertyAccess.handleAirFilterDetails(3, '20 X 25 X 1', 'Check monthly');

  await schedulingPage.clickNext();

  // await schedulingPage.handlePropertyReadiness(true,'');
  await schedulingPage.handlePropertyReadiness(false, '11');

  await schedulingPage.handlePropertyCleaning(true);
  // await schedulingPage.handlePropertyCleaning(false);

  // await schedulingPage.handlePersonalFurnitureRemoved(true,'');
  await schedulingPage.handlePersonalFurnitureRemoved(false, '11');

//   const photos = [
//     'path/to/photo1.jpg',
//     'path/to/photo2.jpg',
//     'path/to/photo3.jpg',
//     'path/to/photo4.jpg',
//     'path/to/photo5.jpg',
// ];
// await schedulingPage.AddPhotos(photos);

const googleDriveLink = 'hhhhhhhhhh';
await schedulingPage.AddPhotos(googleDriveLink);


await page.waitForTimeout(5000);


});
