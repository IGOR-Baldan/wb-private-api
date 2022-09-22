<p align="center"><h3>🍒 wb-private-api</h3></p>

![GitHub package.json version](https://img.shields.io/github/package-json/v/glmn/wb-private-api) ![GitHub last commit](https://img.shields.io/github/last-commit/glmn/wb-private-api) ![GitHub commit activity](https://img.shields.io/github/commit-activity/m/glmn/wb-private-api) ![GitHub Workflow Status](https://img.shields.io/github/workflow/status/glmn/wb-private-api/Node.js%20CI)

![npm](https://nodei.co/npm/wb-private-api.png)

NodeJS модуль. Работает через приватное API Wildberries
```bash
npm i wb-private-api
```

После установки рекомендую протестировать работоспособность
```bash
npm run test
```

![Screenshot_13](https://user-images.githubusercontent.com/1326151/173159882-beda437f-62f7-4e30-89d4-c2386ad5cd78.png)


Если все результаты положительные, значит библиотека полностью работоспособна и сервера WB отвечают верно. В случае, если каки-либо тесты отрицательные, прошу создать обращение https://github.com/glmn/wb-private-api/issues . Данный модуль развивается мною в одиночку (надеюсь, что пока что), буду обрабатывать обращения и вносить правки по возможности.

## Пример работы
```js
import { WBPrivateAPI, Constants } from 'wb-private-api'

const wbapi = new WBPrivateAPI(Constants.DESTINATIONS.MOSCOW)

(async () => {
  const KEYWORD = 'Менструальные чаши';
  const catalog = await wbapi.search(KEYWORD, 2);
  const ads = await wbapi.getSearchAds(KEYWORD);

  console.log(`
    Ключевое слово: ${KEYWORD}
    Найдено товаров: ${catalog.totalProducts}
    Всего страниц: ${catalog.pages}

    Всего рекламодателей: ${ads.adverts.length}
    Самый высокий CPM: ${ads.adverts[0].cpm} Рублей
  `)
})()
```

## `WBPrivateAPI` методы
`.search(keyword, pageCount)` - Поиск всех товаров по Ключевому слову `keyword`. `pageCount` отвечает за кол-во необходимых страниц для прохода. Если `pageCount = 0`, то будет взяты все страницы или `100`, если их больше. (Возвращает объект `WBCatalog`)

`.getSearchAds(keyword)` - Поиск рекламодателей (в разделе Поиск) по Ключевому слову

`.getCarouselAds(keyword)` - Поиск рекламодателей внутри карточке в каруселе "Рекламный блок"

`.keyHint(query)` - Возвращает список подсказок из поиска WB по фразе `query`

`.searchSimilarByNm(productId)` - Возвращает список похожих товаров (как в разделе "Похожие товары" внутри карточки на WB)

## `WBCatalog` методы
`.page(number)` - Возвращает массив товаров с заданной страницы (массив состоит из объектов `WBProduct`)

`.getPosition(productId)` - Возвращает номер позиции по заданному SKU. Если такого SKU в выдаче нет, то вернёт `-1`

## `WBProduct` методы
`.create(id)` - Статичный метод. Использовать в виде `WBProduct.create(id)`. Где `id` = `Артикул товара`. Метод асинхронный, поэтому перед вызовом используйте `await`. Вернет объект `WBProduct`

`.totalStocks` - Вернёт сумму остатков товара со всех складов (!) предварительно вызвать `.getStocks()`)

`.getStocks()` - Присвоет (и вернет) свойству `stocks`  массив с данными об остатках на складе

`.getPromo()` - Присвоет (и вернет) свойству `promo` объект с данными об участии в промо-акции

`.getFeedbacks()` - Присвоет (и вернет) свойству `feedbacks` массив со всеми отзывами `WBFeedback` о товаре

`.getQuestions()` - Присвоет (и вернет) свойству `questions` массив со всеми вопросами `WBQuestion` о товаре

## `WBFeedback` методы

`.getPhotos(size='min')` - Вернет ссылки на все фотографии в текущем отзыве. `size` по умолчанию = `min`. Заменить на `full` если необходим большой размер
