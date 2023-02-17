const puppeteer = require('puppeteer');
const logger = require('./util/logger');
const config = require('./config.json');

async function main() {    
      const browser = await puppeteer.launch({
        ignoreHTTPSErrors: true,
        headless: true,
        args: [
            `--window-size=1600,800`,
            "--window-position=000,000",
            "--disable-dev-shm-usage",
            '--no-sandbox',
            '--disable-setuid-sandbox',
            '--disable-dev-shm-usage',
            '--disable-accelerated-2d-canvas',
            '--no-first-run',
            '--no-zygote',
            '--single-process',
            '--disable-gpu',
            "--disable-web-security",
            "--disable-features=site-per-process",
        ],
    });
    
    const [page] = await browser.pages();

    await page.goto('https://dashboard.tawk.to/login', { timeout: 5000 });
    if (page.url() === 'https://dashboard.tawk.to/login') {
        const emailInput = await page.waitForXPath('//*[@id="email"]');
        await emailInput.type(config.email);
    
        const pwdInput = await page.waitForXPath('//*[@id="password"]');
        await pwdInput.type(config.password);
    
        const signInBtn = await page.waitForXPath('//*[@id="submit-login"]');
        await signInBtn.click();
        await page.waitForNavigation({ waitUntil: "domcontentloaded" });
    }

    logger.success('Logged in.');
    logger.log('Waiting for chat requests...')

    while (true) {
        try {
            await sleep(1);
            const newChatBtn = await page.waitForXPath('//*[@id="tawk-navigation-incoming"]/div[2]/div/div');
            await newChatBtn.click();
            logger.log('New chat detected.')

            await sleep(config.takeDelay);
            const joinBtn = await page.waitForXPath('/html/body/div[5]/div/div[2]/div[2]/div[1]/div/div[2]/div/div/div/div[1]/div[2]/div/div[2]/div/div[2]/div/div/button');
            await joinBtn.click();
            logger.success('Joined chat.')
        } catch {}
    }

}

async function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

main()