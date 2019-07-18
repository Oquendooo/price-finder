const puppeteer = require('puppeteer');

(async () => {
  // Below we start our dynamic image creation script
  const url = 'https://shop.shoprite.com/store/bf05597/produce/fresh-fruit/apples';
  const browser = await puppeteer.launch({ headless: false, defaultViewport: null});
  const page = await browser.newPage();
  await page.goto(url);
  await page.waitFor('.product.productBox');
  const results = await page.$$eval('.product.productBox', items => {
    return items.map(item => {
      const properties = {};
      const titleElement = item.querySelector('.product__detailsLink');
      const priceElement = item.querySelector('.productPriceInfo');
      properties.title = titleElement.innerText;
      properties.price = priceElement.innerText
      return properties;
    })
  })
  console.log(results)
  // await browser.close();

})();