// Playwright-ийн тест бичихэд хэрэгтэй test болон expect функцүүдийг импортлох
import { test, expect } from '@playwright/test';

// Тест 1: зөв нэр, нууц үгээр амжилттай нэвтрэх
test('амжилттай нэвтрэх', async ({ page }) => {
  // Демо дэлгүүрийн нүүр хуудсыг нээх
  await page.goto('https://www.saucedemo.com');

  // Нэвтрэх нэр болон нууц үгийг бөглөх
  await page.getByPlaceholder('Username').fill('standard_user');
  await page.getByPlaceholder('Password').fill('secret_sauce');

  // "Login" товчийг дарах
  await page.getByRole('button', { name: 'Login' }).click();

  // Нэвтэрсний дараах хаяг /inventory.html болсныг шалгах
  await expect(page).toHaveURL(/inventory\.html/);

  // "Products" гарчиг харагдаж байгааг шалгах
  await expect(page.getByText('Products')).toBeVisible();
  await expect(page.locator('[data-test="title"]')).toHaveText('Products');

  // Гарах (logout) үйлдлээр тестээ зөв төгсгөх
  // Цэс дэх "Logout" нь link биш button role-той тул button гэж хайна
  await page.getByRole('button', { name: 'Open Menu' }).click();
  await page.getByRole('button', { name: 'Logout' }).click();
  await expect(page).toHaveURL('https://www.saucedemo.com/');
});

// Тест 2: буруу нууц үгээр нэвтрэхэд алдааны мессеж гарах ёстой (сөрөг тест)
test('амжилтгүй нэвтрэх', async ({ page }) => {
  await page.goto('https://www.saucedemo.com');

  // Зөв нэр, буруу нууц үг оруулах
  await page.getByPlaceholder('Username').fill('standard_user');
  await page.getByPlaceholder('Password').fill('buruu_nuuts_ug');
  await page.getByRole('button', { name: 'Login' }).click();

  // Алдааны мессеж харагдаж, зөв текст агуулж байгааг шалгах
  const error = page.locator('[data-test="error"]');
  await expect(error).toBeVisible();
  await expect(error).toContainText('Username and password do not match');

  // Нэвтрээгүй тул хаяг өөрчлөгдөөгүй хэвээр байх ёстой
  await expect(page).toHaveURL('https://www.saucedemo.com/');
});

// Тест 3: нэвтэрсний дараа бараа сагслах
test('бараа сагслах', async ({ page }) => {
  // Нэвтрэх
  await page.goto('https://www.saucedemo.com');
  await page.getByPlaceholder('Username').fill('standard_user');
  await page.getByPlaceholder('Password').fill('secret_sauce');
  await page.getByRole('button', { name: 'Login' }).click();

  // Нэг барааг сагсанд нэмэх
  await page.getByRole('button', { name: 'Add to cart' }).first().click();

  // Сагсны дугаар 1 болсныг шалгах
  await expect(page.locator('[data-test="shopping-cart-badge"]')).toHaveText('1');

  // Сагс руу орж, бараа байгааг шалгах
  await page.locator('[data-test="shopping-cart-link"]').click();
  await expect(page).toHaveURL(/cart\.html/);
  await expect(page.locator('[data-test="inventory-item"]')).toHaveCount(1);

  // Гарах (logout) үйлдлээр тестээ төгсгөх
  await page.getByRole('button', { name: 'Open Menu' }).click();
  await page.getByRole('button', { name: 'Logout' }).click();
  await expect(page).toHaveURL('https://www.saucedemo.com/');
});
