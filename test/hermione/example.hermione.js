const { assert } = require('chai');
const BUG_ID = process.env.BUG_ID ? `?bug_id=${process.env.BUG_ID}` : "";

describe('Проверка навбара', async function () {
    it('check nav', async function () {
        const url = `http://localhost:3000/hw/store${BUG_ID}`;
        await this.browser.url(url);
        await this.browser.assertView('plain', '.navbar', {
            screenshotDelay: 10,
        });
    });
});

describe('Страницы главная, условия доставки, контакты должны иметь статическое содержимое', async function () {
    it('страница главная должна иметь статическое содержимое', async function () {
        const url = `http://localhost:3000/hw/store${BUG_ID}`;
        await this.browser.url(url);
        await this.browser.assertView('plain', 'body');

    });
    it('страница условия доставки должна иметь статическое содержимое', async function () {

        const url = `http://localhost:3000/hw/store/delivery${BUG_ID}`;
        await this.browser.url(url);
        await this.browser.assertView('plain', 'body');

    });
    it('страница контакты должна иметь статическое содержимое', async function () {
        const url = `http://localhost:3000/hw/store/contacts${BUG_ID}`;
        await this.browser.url(url);
        await this.browser.assertView('plain', 'body');
    });
});

describe('Вёрстка должна адаптироваться под ширину экрана', async function () {
    it('Верстка должна адаптироваться под ширину экрана 1400px на главной странице', async function () {
        this.browser.setWindowSize(1400, 1080)
        const url = `http://localhost:3000/hw/store${BUG_ID}`;
        await this.browser.url(url);
        await this.browser.assertView('plain', 'body', {
            screenshotDelay: 10,
        });
    });
    it('Верстка должна адаптироваться под ширину экрана 1200px на главной странице', async function () {
        this.browser.setWindowSize(1200, 1080)
        const url = `http://localhost:3000/hw/store${BUG_ID}`;
        await this.browser.url(url);
        await this.browser.assertView('plain', 'body', {
            screenshotDelay: 10,
        });
    });


it('Верстка должна адаптироваться под ширину экрана 1000px на главной странице', async function () {
    this.browser.setWindowSize(1000, 1080)
    const url = `http://localhost:3000/hw/store${BUG_ID}`;
    await this.browser.url(url);
    await this.browser.assertView('plain', 'body', {
        screenshotDelay: 10,
    });
});
it('Верстка должна адаптироваться под ширину экрана 765px на главной странице', async function () {
    this.browser.setWindowSize(765, 1080)
    const url = `http://localhost:3000/hw/store${BUG_ID}`;
    await this.browser.url(url);
    await this.browser.assertView('plain', 'body', {
        screenshotDelay: 10,
    });
});
it('Верстка должна адаптироваться под ширину экрана 570px на главной странице', async function () {
    this.browser.setWindowSize(570, 1080)
    const url = `http://localhost:3000/hw/store${BUG_ID}`;
    await this.browser.url(url);
    await this.browser.assertView('plain', 'body', {
        screenshotDelay: 10,
    });
});



it('Верстка должна адаптироваться под ширину экрана 1400px на странице delivery', async function () {
    this.browser.setWindowSize(1400, 1080)
    const url = `http://localhost:3000/hw/store/delivery${BUG_ID}`;
    await this.browser.url(url);
    await this.browser.assertView('plain', 'body', {
        screenshotDelay: 10,
    });
});
it('Верстка должна адаптироваться под ширину экрана 1200px на странице delivery', async function () {
    this.browser.setWindowSize(1200, 1080)
    const url = `http://localhost:3000/hw/store/delivery${BUG_ID}`;
    await this.browser.url(url);
    await this.browser.assertView('plain', 'body', {
        screenshotDelay: 10,
    });
});
it('Верстка должна адаптироваться под ширину экрана 1000px на странице delivery', async function () {
    this.browser.setWindowSize(1000, 1080)
    const url = `http://localhost:3000/hw/store/delivery${BUG_ID}`;
    await this.browser.url(url);
    await this.browser.assertView('plain', 'body', {
        screenshotDelay: 10,
    });
});
it('Верстка должна адаптироваться под ширину экрана 765px на странице delivery', async function () {
    this.browser.setWindowSize(765, 1080)
    const url = `http://localhost:3000/hw/store/delivery${BUG_ID}`;
    await this.browser.url(url);
    await this.browser.assertView('plain', 'body', {
        screenshotDelay: 10,
    });
});
it('Верстка должна адаптироваться под ширину экрана 570px на странице delivery', async function () {
    this.browser.setWindowSize(570, 1080)
    const url = `http://localhost:3000/hw/store/delivery${BUG_ID}`;
    await this.browser.url(url);
    await this.browser.assertView('plain', 'body', {
        screenshotDelay: 10,
    });
});


it('Верстка должна адаптироваться под ширину экрана 1400px на странице contacts', async function () {
    this.browser.setWindowSize(1400, 1080)
    const url = `http://localhost:3000/hw/store/contacts${BUG_ID}`;
    await this.browser.url(url);
    await this.browser.assertView('plain', 'body', {
        screenshotDelay: 10,
    });
});
it('Верстка должна адаптироваться под ширину экрана 1200px на странице contacts', async function () {
    this.browser.setWindowSize(1200, 1080)
    const url = `http://localhost:3000/hw/store/contacts${BUG_ID}`;
    await this.browser.url(url);
    await this.browser.assertView('plain', 'body', {
        screenshotDelay: 10,
    });
});
it('Верстка должна адаптироваться под ширину экрана 1000px на странице contacts', async function () {
    this.browser.setWindowSize(1000, 1080)
    const url = `http://localhost:3000/hw/store/contacts${BUG_ID}`;
    await this.browser.url(url);
    await this.browser.assertView('plain', 'body', {
        screenshotDelay: 10,
    });
});
it('Верстка должна адаптироваться под ширину экрана 765px на странице contacts', async function () {
    this.browser.setWindowSize(765, 1080)
    const url = `http://localhost:3000/hw/store/contacts${BUG_ID}`;
    await this.browser.url(url);
    await this.browser.assertView('plain', 'body', {
        screenshotDelay: 10,
    });
});
it('Верстка должна адаптироваться под ширину экрана 570px на странице contacts', async function () {
    this.browser.setWindowSize(570, 1080)
    const url = `http://localhost:3000/hw/store/contacts${BUG_ID}`;
    await this.browser.url(url);
    await this.browser.assertView('plain', 'body', {
        screenshotDelay: 10,
    });

});

});

describe('Проверка бургер меню', async function () {
    it(' на ширине меньше 576px навигационное меню должно скрываться за "гамбургер"', async function () {
        const puppeteer = await this.browser.getPuppeteer();
        const[page] = await puppeteer.pages();
        this.browser.setWindowSize(570, 1000)
        const url = `http://localhost:3000/hw/store${BUG_ID}`;
        await this.browser.url(url);
        await page.waitForSelector(".navbar", { timeout: 5000 });
        await this.browser.assertView('plain', '.navbar', {
            screenshotDelay: 10,
        });
    });
    it('После нажатия на кнопку меню, должен открыться "гамбургер" ', async function () {
        const puppeteer = await this.browser.getPuppeteer();
        const [page] = await puppeteer.pages();
        this.browser.setWindowSize(570, 1000)
        const url = `http://localhost:3000/hw/store${BUG_ID}`;
        await this.browser.url(url);
        await page.waitForSelector(".navbar-toggler", { timeout: 5000 });

        const elementToggler = await page.waitForSelector('.navbar-toggler');
        await elementToggler.click();
        await this.browser.assertView('plain', '.navbar', {
            screenshotDelay: 1000,
        });

    });
    it('при выборе элемента из меню "гамбургера", меню должно закрываться', async function () {
        const puppeteer = await this.browser.getPuppeteer();
        const [page] = await puppeteer.pages();
        this.browser.setWindowSize(570, 1000)
        const url = `http://localhost:3000/hw/store${BUG_ID}`;
        await this.browser.url(url);
        await page.waitForSelector(".navbar-toggler", { timeout: 5000 });

        const elementToggler = await page.waitForSelector('.navbar-toggler');
        await elementToggler.click();

        const elementLink = await page.waitForSelector('.nav-link');
        await elementLink.click();
        await this.browser.assertView('plain', '.navbar', {
            screenshotDelay: 10,
        });
    });
});

describe('Проверка страницы детальной информации', async function () {
    it('Статические элементы страницы должны быть неизменными', async function () {
        const puppeteer = await this.browser.getPuppeteer();
        const [page] = await puppeteer.pages();
        this.browser.setWindowSize(1920, 1080)
        const url = `http://localhost:3000/hw/store/catalog/0${BUG_ID}`;
        await this.browser.url(url);
        await this.browser.assertView('plain', '.ProductDetails-AddToCart', {
            screenshotDelay: 1000,
        });
    });
});

describe('Проверка страницы каталог', async function () {
    it('Проверка карточек на наличие данных', async function () {
        const puppeteer = await this.browser.getPuppeteer();
        const [page] = await puppeteer.pages();
        this.browser.setWindowSize(1920, 1080)
        const url = `http://localhost:3000/hw/store/catalog${BUG_ID}`;
        await this.browser.url(url);
        await this.browser.refresh();
        
        const productName = await this.browser.$('h5[data-testid="product-name"]').getText();
        const productPrice = await this.browser.$('p[data-testid="product-price"]').getText();
        const linkToDetails = await this.browser.$('a[data-testid="link-to-details"]').getText();

        await this.browser.assertView('plain', 'body', {
            screenshotDelay: 1000,
        });
    });
});
