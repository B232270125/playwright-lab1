// Playwright-ийн тест бичихэд хэрэгтэй test болон expect функцүүдийг импортлох
import { test, expect } from '@playwright/test';

// Тест 1: зөв нэр, нууц үгээр амжилттай нэвтрэх
test('амжилттай нэвтрэх', async ({ page }) => {
  // Демо дэлгүүрийн нүүр хуудсыг нээх
  await page.goto('https://www.saucedemo.com');

  // Нэвтрэх нэрийн талбарыг placeholder-оор нь олж утгыг бөглөх
  await page.getByPlaceholder('Username').fill('standard_user');

  // Нууц үгийн талбарыг бөглөх
  await page.getByPlaceholder('Password').fill('secret_sauce');

  // "Login" товчийг role болон нэрээр нь олж дарах
  await page.getByRole('button', { name: 'Login' }).click();

  // Нэвтэрсний дараа "Products" гарчиг харагдаж байгааг шалгах
  await expect(page.getByText('Products')).toBeVisible();
});
