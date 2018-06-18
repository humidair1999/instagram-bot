const puppeteer = require('puppeteer');

const CREDENTIALS = require('./credentials.js');

let browser = null;
let page = null;

const users = ['elzaburkart'];

function getRandomTimeout(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);

  let randomNumber = Math.floor(Math.random() * (max - min + 1)) + min;

  return randomNumber * 1000;
}

async function logIn() {
  console.log('begin logIn');

  browser = await puppeteer.launch({headless: false});
  page = await browser.newPage();

  await page.goto('https://www.instagram.com/accounts/login/');
  // await page.screenshot({path: 'example.png'});

  // const usernameInput = document.querySelector("input[name='username']");
  // const passwordInput = document.querySelector("input[name='password']");

  await page.waitForSelector("input[name='username']");

  await page.waitFor(getRandomTimeout(1, 2));

  await page.click("input[name='username']");

  await page.keyboard.type(CREDENTIALS.USERNAME);

  await page.waitFor(getRandomTimeout(1, 2));

  await page.click("input[name='password']");

  await page.keyboard.type(CREDENTIALS.PASSWORD);

  await page.waitFor(getRandomTimeout(1, 2));

  const waitForLogInPromise = page.waitForNavigation();

  await page.keyboard.press('Enter');

  await waitForLogInPromise;

  // await browser.close();

  console.log('end logIn');
};

async function navigateToUserPage() {
  console.log('begin navigateToUserPage');

  await page.goto(`https://www.instagram.com/${users[0]}/`);

  console.log('end navigateToUserPage');
};

async function navigateToUserPages() {
  console.log('begin navigateToUserPages');

  return users.map(async (user) => {
    console.log(`navigate to: ${user}`);

    await page.goto(`https://www.instagram.com/${user}/`);
  });

  console.log('end navigateToUserPages');
}

(async function() {
  console.log('1');

  await logIn();

  console.log('2');

  await navigateToUserPages();
})();
