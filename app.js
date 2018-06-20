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

  await page.goto('https://www.instagram.com/accounts/login/');
  // await page.screenshot({path: 'example.png'});

  // const usernameInput = document.querySelector("input[name='username']");
  // const passwordInput = document.querySelector("input[name='password']");

  await page.waitForSelector("input[name='username']");

  // await page.waitFor(getRandomTimeout(1, 2));

  await page.click("input[name='username']");

  await page.keyboard.type(CREDENTIALS.USERNAME);

  // await page.waitFor(getRandomTimeout(1, 2));

  await page.click("input[name='password']");

  await page.keyboard.type(CREDENTIALS.PASSWORD);

  // await page.waitFor(getRandomTimeout(1, 2));

  const waitForLogInPromise = page.waitForNavigation();

  await page.keyboard.press('Enter');

  await waitForLogInPromise;

  // await browser.close();

  console.log('end logIn');
};

// async function navigateToUserPage() {
//   console.log('begin navigateToUserPage');

//   await page.goto(`https://www.instagram.com/${users[0]}/`);

//   console.log('end navigateToUserPage');
// };

async function navigateToUserPages() {
  console.log('begin navigateToUserPages');

  return users.map(async (user) => {
    console.log(`navigate to: ${user}`);

    await page.goto(`https://www.instagram.com/${user}/`);

    // let content = await page.evaluate(() => {
    //   let divs = [...document.querySelectorAll('a')];
    //   return divs.map((div) => div.textContent.trim());
    // });

    // console.log(content);

    // let links = await page.$$('a');

    // console.log(links);

    /*
    links.forEach(async (link) => {
      let propp = await link.getProperty('href');
      // console.log(propp);
      console.log(await propp.jsonValue());
    });
    */

    /*
    console.log(links.length);

    let finalLink = links.filter(async (link) => {
      let linkHref = await link.getProperty('href');
      let linkHrefValue = await linkHref.jsonValue();

      console.log(linkHrefValue.indexOf('following') > -1);

      return linkHrefValue.indexOf('following') > -1;
    });

    console.log(await finalLink.length);
    */

    // let finalLinkHref = await finalLink.getProperty('href');
    // let finalLinkHrefValue = await finalLinkHref.jsonValue();

    // console.log(finalLink);

    const followingLink = await page.$('a[href*="following"]');

    await followingLink.click();

    // let followingOverlayHeader = await page.waitForXPath('//div[contains(string(), "Following")]/following-sibling::div/child::ul/child::div');
    // let followingOverlayHeader = await page.waitForXPath('//div[contains(string(), "Following")]/following-sibling::div');

    // let jhd = await followingOverlayHeader.getProperty('classList');

    // console.log(await jhd.jsonValue());

    // await followingOverlayHeader.focus();

    // await followingOverlayHeader.press('PageDown');

    // await page.waitFor(getRandomTimeout(1, 2));

    let followingOverlayHeader = await page.waitForXPath('//div[contains(string(), "Following")]//button[contains(string(), "Follow")]');

    await page.keyboard.press('Tab');

    await page.keyboard.press('PageDown');

    await page.waitFor(getRandomTimeout(1, 2));

    await page.keyboard.press('PageDown');

    await page.waitFor(getRandomTimeout(1, 2));

    await page.keyboard.press('PageDown');

    await page.waitFor(getRandomTimeout(1, 2));

    await page.keyboard.press('PageDown');
  });

  console.log('end navigateToUserPages');
}

async function doMoreStuff() {
  console.log('begin doMoreStuff');
};

(async function() {
  browser = await puppeteer.launch({headless: false});
  page = await browser.newPage();

  console.log('1');

  await logIn();

  console.log('2');

  await navigateToUserPages();

  console.log('3');

  await doMoreStuff();
})();
