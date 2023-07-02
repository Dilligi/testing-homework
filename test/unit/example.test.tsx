import React from 'react';

import { getByTestId, render, screen, waitFor } from '@testing-library/react';
import { Cart } from '../../src/client/pages/Cart';
import { Catalog } from '../../src/client/pages/Catalog'
import { CartApi, ExampleApi } from '../../src/client/api';
import { CartItem, CartState, CheckoutFormData, Product, ProductShortInfo } from '../../src/common/types';
import { ApplicationState, checkout, initStore } from '../../src/client/store';
import { Provider, useSelector } from 'react-redux';
import { BrowserRouter, MemoryRouter } from 'react-router-dom';
import { ProductDetails } from '../../src/client/components/ProductDetails';
import events from '@testing-library/user-event';
import configureStore from 'redux-mock-store';
import { Application } from '../../src/client/Application';
import { Form } from '../../src/client/components/Form';
import { createMemoryHistory } from 'history';

const basename = '/hw/store';

const data: ProductShortInfo[] = [
 { "id": 0, "name": "Practical Chips", "price": 862 },
 { "id": 1, "name": "Practical Soap", "price": 315 },
 { "id": 2, "name": "Gorgeous Ball", "price": 433 },
 { "id": 3, "name": "Generic Keyboard", "price": 151 }
]

const fullData: Product[] = [
    { "id": 0, "name": "Practical Chips", "price": 862, description: 'hi', material: 'm1', color: 'c1' },
    { "id": 1, "name": "Practical Soap", "price": 315, description: 'hello', material: 'm2', color: 'c2'  },
    { "id": 2, "name": "Gorgeous Ball", "price": 433, description: 'good morning', material: 'm3', color: 'c3'  },
    { "id": 3, "name": "Generic Keyboard", "price": 151, description: 'whats app', material: 'm4', color: 'c4'  }
]

describe('Общие требования', () => {
    it('В шапке отображаются ссылки на страницы магазина, а также ссылка на корзину', async () => {
        const basename = '/hw/store';
        const api = new ExampleApi(basename);
        const cart = new CartApi();
        const store = initStore(api, cart);
        const application = (
            <MemoryRouter initialEntries={["/hw/store"]} initialIndex={0}>
                <Provider store={store}>
                    <Application />
                </Provider>
            </MemoryRouter>
        );

        const { getByTestId, container } = render(application);

        const navLinks = container.querySelectorAll('.nav-link');
        const expectedHrefs = [
            '/catalog',
            '/delivery',
            '/contacts',
            '/cart'
        ];
        navLinks.forEach((link, index) => {
            expect(link.getAttribute('href')).toBe(expectedHrefs[index]);
        });
    });



    it('Название магазина в шапке должно быть ссылкой на главную страницу', async () => {
        const basename = '/hw/store';
        const api = new ExampleApi(basename);
        const cart = new CartApi();
        const store = initStore(api, cart);
        const application = (
            <MemoryRouter initialEntries={["/hw/store"]} initialIndex={0}>
                <Provider store={store}>
                    <Application />
                </Provider>
            </MemoryRouter>
        );

        const { container } = render(application);

        const nameStore = container.querySelector('.navbar-brand');

        expect(nameStore.textContent).toEqual("Example store");

        expect(nameStore.getAttribute('href')).toBe('/');


    });

})

describe('Cтраницы', () => {
    let api: ExampleApi;
    let cart: CartApi;
    let store: any;
    let spyOnApi: any;

    beforeEach(() => {
        cart = new CartApi();
        api = new ExampleApi(basename);
        api.getProducts = () => Promise.resolve({ data }) as any;
        api.getProductById = (id) => {
            return Promise.resolve(fullData.filter((x) => x.id === id)[0]) as any
        };
        store = initStore(api, cart);
    });

    it('В магазине должны быть страницы: главная', async () => {
        let application = (
            <MemoryRouter initialEntries={["/"]} initialIndex={0}>
                <Provider store={store}>
                    <Application />
                </Provider>
            </MemoryRouter>
        );
        let { container } = render(application);
        const main = container.querySelector(".Home");
        expect(main).not.toBeNull(); 
    });
    it('В магазине должны быть страницы: каталог', async () => {
        let application = (
            <MemoryRouter initialEntries={["/catalog"]} initialIndex={0}>
                <Provider store={store}>
                    <Application />
                </Provider>
            </MemoryRouter>
        );

        let { container } = render(application);
        const main = container.querySelector(".Catalog");
        expect(main).not.toBeNull(); 
    });
    it('В магазине должны быть страницы: условия доставки', async () => {
        let application = (
            <MemoryRouter initialEntries={["/delivery"]} initialIndex={0}>
                <Provider store={store}>
                    <Application />
                </Provider>
            </MemoryRouter>
        );

        let { container } = render(application);
        const main = container.querySelector(".Delivery");
        expect(main).not.toBeNull(); 
    });
    it('В магазине должны быть страницы: контакты', async () => {
        let application = (
            <MemoryRouter initialEntries={["/contacts"]} initialIndex={0}>
                <Provider store={store}>
                    <Application />
                </Provider>
            </MemoryRouter>
        );

        let { container } = render(application);
        const main = container.querySelector(".Contacts");
        expect(main).not.toBeNull(); 
    });
})

describe('Каталог', () => {
    let api: ExampleApi;
    let cart: CartApi;
    let store: any;
    let spyOnApi: any;

    beforeEach(() => {
        cart = new CartApi();
        api = new ExampleApi(basename);
        api.getProducts = () => Promise.resolve({ data }) as any;
        api.getProductById = (id) => {
            return Promise.resolve(fullData.filter((x) => x.id === id)[0]) as any
        };
        store = initStore(api, cart);
    });

   it('В каталоге должны отображаться товары, список которых приходит с сервера', async () => {
        let products = (await api.getProducts()).data
        let catalogComp = (
            <BrowserRouter>
                <Provider store={store}>
                    <Catalog />
                </Provider>
            </BrowserRouter>
        )

        let { getAllByTestId, getByText } = render(catalogComp);

        expect(getByText('LOADING')).toBeDefined()
        await waitFor(() => expect(getAllByTestId(/([0-9])/)).toBeDefined())
        products.forEach((x) => {
            expect(getAllByTestId(/([0-9])/).map((x) => x.getAttribute('data-testid'))).toContain(x.id.toString())
        })
   });

   it('Для каждого товара в каталоге отображается название, цена и ссылка на страницу с подробной информацией о товаре', async () => {
        let products = (await api.getProducts()).data
        let catalogComp = (
            <BrowserRouter>
                <Provider store={store}>
                    <Catalog />
                </Provider>
            </BrowserRouter>
        )

        let { getAllByTestId, getByText } = render(catalogComp);

        expect(getByText('LOADING')).toBeDefined()
        await waitFor(() => expect(getAllByTestId(/([0-9])/)).toBeDefined())
        products.forEach((x) => {
            expect(getAllByTestId(/([0-9])/).map((x) => {
                return {
                    id: Number(x.getAttribute('data-testid')),
                    name: x.querySelector('.card-title').textContent,
                    price: Number(x.querySelector('.card-text').textContent.substring(1,x.querySelector('.card-text').textContent.length))
                }
            })).toContainEqual(x)

            expect(getAllByTestId(/[0-9]/i).map((el) => el.querySelector('.card-link').getAttribute("href"))).toContain(`/catalog/${x.id}`);
        })
   });

   it('На странице с подробной информацией отображаются: название товара, его описание, цена, цвет, материал и кнопка * * "добавить в корзину"', async () => {
        let productsIds = (await api.getProducts()).data.map((x) => x.id)
        let productData: any = (await api.getProductById(Number(productsIds[0])))
        let productItem = (
            <BrowserRouter>
                <Provider store={store}>
                    <ProductDetails product={productData as any}/>
                </Provider>
            </BrowserRouter>
        )

        let { container } = render(productItem);

        expect(fullData).toContainEqual({
            id: Number(productData.id),
            name: container.querySelector('.ProductDetails-Name').textContent,
            description: container.querySelector('.ProductDetails-Description').textContent,
            price: Number(container.querySelector('.ProductDetails-Price').textContent.substring(1, container.querySelector('.ProductDetails-Price').textContent.length)),
            color: container.querySelector('.ProductDetails-Color').textContent,
            material: container.querySelector('.ProductDetails-Material').textContent,
        })
        expect(container.querySelector('.ProductDetails-AddToCart')).not.toBeNull()
   });

   it('Если товар уже добавлен в корзину, в каталоге и на странице товара должно отображаться сообщение об этом', async () => {
        let productsIds = (await api.getProducts()).data.map((x) => x.id)
        let productData: any = (await api.getProductById(Number(productsIds[0])))
        let productItem = (
            <BrowserRouter>

                <Provider store={store}>
                    <ProductDetails product={productData as any}/>
                </Provider>
            </BrowserRouter>
        )
        let catalogComp = (
            <BrowserRouter>
                <Provider store={store}>
                    <Catalog />
                </Provider>
            </BrowserRouter>
        )

        let { container } = render(productItem);
        await events.click(container.querySelector('.ProductDetails-AddToCart'))
        expect(container.querySelector('.CartBadge')).not.toBeNull()

        let catalogRender = render(catalogComp);
        expect(catalogRender.getByText('LOADING')).toBeDefined()
        await waitFor(() => expect(catalogRender.getAllByTestId(/([0-9])/)).toBeDefined())
        let productCard = catalogRender.container.querySelector(`[data-testid="${productData.id}"]`)
        expect(productCard.querySelector('.CartBadge').textContent).toContain('Item in cart')
   });

   it('Если товар уже добавлен в корзину, повторное нажатие кнопки "добавить в корзину" должно увеличивать его количество', async () => {
        let productsIds = (await api.getProducts()).data.map((x) => x.id)
        let productData: any = (await api.getProductById(Number(productsIds[0])))
        let productItem = (
            <BrowserRouter>
                <Provider store={store}>
                    <ProductDetails product={productData as any} />
                </Provider>
            </BrowserRouter>
        )

        let { container } = render(productItem);

        const btnAdd = container.querySelector(".ProductDetails-AddToCart");
        await events.click(btnAdd);
        
        const itemInfo: any = Object.entries(store.getState().cart).find((x: any) => x[1].name === productData.name)[1];
        expect(itemInfo.count).toBe(2);

    });
});

describe('Корзина', () => {
    let api: ExampleApi;
    let cart: CartApi;
    let store: any;
    let spyOnApi: any;

    beforeEach(() => {
        cart = new CartApi();
        api = new ExampleApi(basename);
        api.getProducts = () => Promise.resolve({ data }) as any;
        api.getProductById = (id) => {
            return Promise.resolve(fullData.filter((x) => x.id === id)[0]) as any
        };
        store = initStore(api, cart);
    });

    it('В шапке рядом со ссылкой на корзину должно отображаться количество не повторяющихся товаров в ней', async () => {
        const mockStore = configureStore<any>([]);
        const store = mockStore({
            cart: [
                {
                    name: "Gorgeous Shoes",
                    price: 836,
                    count: 1,
                },
                {
                    name: "Refined Mouse",
                    price: 815,
                    count: 2,
                },
                {
                    name: "Gorgeous Shoes",
                    price: 448,
                    count: 3,
                }
            ]
        });
        let application = (
            <MemoryRouter initialEntries={["/cart"]} initialIndex={0}>
                <Provider store={store}>
                    <Application />
                </Provider>
            </MemoryRouter>
        );
        let { container } = render(application);

        const linkToCart = container.querySelector('.nav-link[href*="/cart"]');
        const countInCart = parseInt(linkToCart.textContent.split('(')[1], 10);
        expect(countInCart).toBe(store.getState().cart.length);
    })

    it('В корзине должна отображаться таблица с добавленными в нее товарами', async () => {
        const mockStore = configureStore<any>([]);
        const store = mockStore({
            cart: [
                {
                    name: "Gorgeous Shoes",
                    price: 836,
                    count: 1,
                },
                {
                    name: "Refined Mouse",
                    price: 815,
                    count: 2,
                },
                {
                    name: "Gorgeous Shoes",
                    price: 448,
                    count: 3,
                }
            ]
        });
        let application = (
            <MemoryRouter initialEntries={["/cart"]} initialIndex={0}>
                <Provider store={store}>
                    <Application />
                </Provider>
            </MemoryRouter>
        );
        let { container } = render(application);

        expect(container.querySelector("tbody")).toBeDefined()
        const tbody = container.querySelector("tbody");
        expect(container.querySelector("tr")).toBeDefined()
        const rowsProduct = tbody.querySelectorAll("tr");
        rowsProduct.forEach(el => {
            const namesProduct = store.getState().cart.map((el: CartItem) => el.name);
            const nameProductRowInTable = el.querySelector(".Cart-Name").textContent;
            expect(namesProduct).toContain(nameProductRowInTable);
            
        })
    })

    it('Для каждого товара должны отображаться название, цена, количество , стоимость, а также должна отображаться общая сумма заказа', async () => {
        const mockStore = configureStore<any>([]);
        const store = mockStore({
            cart: [
                {
                    name: "Gorgeous Shoes",
                    price: 836,
                    count: 1,
                },
                {
                    name: "Refined Mouse",
                    price: 815,
                    count: 2,
                },
                {
                    name: "Gorgeous Shoes",
                    price: 448,
                    count: 3,
                }
            ]
        });
        
        let cartComp = (
            <BrowserRouter>
                <Provider store={store}>
                    <Cart />
                </Provider>
            </BrowserRouter>
        )

        let cartRender = render(cartComp);
        let cartItem = cartRender.container;

        expect(Array.from(cartItem.querySelectorAll('.Cart-Name')).map((x) => x.textContent)).not.toContain('')
        expect(Array.from(cartItem.querySelectorAll('.Cart-Price')).map((x) => x.textContent)).not.toContain('')
        expect(Array.from(cartItem.querySelectorAll('.Cart-Count')).map((x) => x.textContent)).not.toContain('')
        expect(Array.from(cartItem.querySelectorAll('.Cart-Total')).map((x) => x.textContent)).not.toContain('')
    });

    it('В корзине должна быть кнопка "очистить корзину", по нажатию на которую все товары должны удаляться', async () => {
        let productsIds = (await api.getProducts()).data.map((x) => x.id)
        let productData: any = (await api.getProductById(Number(productsIds[0])))
        let productItem = (
            <BrowserRouter>

                <Provider store={store}>
                    <ProductDetails product={productData as any}/>
                </Provider>
            </BrowserRouter>
        )
        let cartComp = (
            <BrowserRouter>
                <Provider store={store}>
                    <Cart />
                </Provider>
            </BrowserRouter>
        )

        let { container } = render(productItem);
        await events.click(container.querySelector('.ProductDetails-AddToCart'))

        let cartRender = render(cartComp);
        let cartClear = cartRender.container.querySelector('.Cart-Clear');
        await events.click(cartClear);

        expect(Object.keys(store.getState().cart).length === 0).toBeTruthy();
        expect(cartRender.container.querySelector('.Cart-Table')).toBeNull();
    });

    it('Если корзина пустая, должна отображаться ссылка на каталог товаров', async () => {
        let cartComp = (
            <BrowserRouter>
                <Provider store={store}>
                    <Cart />
                </Provider>
            </BrowserRouter>
        )

        let cartRender = render(cartComp);
        expect(Object.keys(store.getState().cart).length === 0).toBeTruthy();
        expect(cartRender.container.querySelector(`a[href*="/catalog"]`)).not.toBeNull();
    });

    it('Если заполненные в форме поля не проходят валидацию, то выдает оишбку, иначе пропускает дальше и возвращает сообщение с успехом', async () => {
        let formComp = (
            <BrowserRouter>
                <Provider store={store}>
                    <Form onSubmit={ () => null }/>
                </Provider>
            </BrowserRouter>
        )

        let cartRender = render(formComp);
        let nameInput: HTMLInputElement = cartRender.container.querySelector('.Form-Field_type_name')
        let phoneInput: HTMLInputElement = cartRender.container.querySelector('.Form-Field_type_phone')
        let addressInput: HTMLInputElement = cartRender.container.querySelector('.Form-Field_type_address')
        let submitBtn = cartRender.container.querySelector('.Form-Submit');

        await events.type(nameInput, ' ')
        await events.type(phoneInput, 'hi')
        await events.type(addressInput, ' ')
        await events.click(submitBtn)

        expect(nameInput.className.includes('is-invalid')).toBeTruthy()
        expect(phoneInput.className.includes('is-invalid')).toBeTruthy()
        expect(addressInput.className.includes('is-invalid')).toBeTruthy()

        nameInput.value = '';
        phoneInput.value = '';
        addressInput.value = '';

        await events.type(nameInput, 'Петр Петрович')
        await events.type(phoneInput, '1234567890')
        await events.type(addressInput, 'Москва')
        await events.click(submitBtn)

        expect(nameInput.className.includes('is-invalid')).not.toBeTruthy()
        expect(phoneInput.className.includes('is-invalid')).not.toBeTruthy()
        expect(addressInput.className.includes('is-invalid')).not.toBeTruthy()

        let successMessage = cartRender.container.querySelector('.Cart-SuccessMessage')
        expect(successMessage).not.toBeNull()
    });
});