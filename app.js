const puppeteer = require('puppeteer');

const CREDENTIALS = require('./credentials.js');

(async () => {
  const browser = await puppeteer.launch({headless: false});
  const page = await browser.newPage();

  await page.goto('https://www.instagram.com/accounts/login/');
  // await page.screenshot({path: 'example.png'});

  // const usernameInput = document.querySelector("input[name='username']");
  // const passwordInput = document.querySelector("input[name='password']");

  await page.waitForSelector("input[name='username']");

  // await page.focus("input[name='username']");
  await page.click("input[name='username']");

  await page.keyboard.type(CREDENTIALS.USERNAME);

  await page.click("input[name='password']");

  await page.keyboard.type(CREDENTIALS.PASSWORD);

  // await browser.close();
})();
