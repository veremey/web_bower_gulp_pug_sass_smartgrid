# Шаблон для верстки

### Используемые технологии

* [Bower](https://bower.io/)
* [Gulp](http://gulpjs.com/)
* [Pug](https://pugjs.org)
* [Sass](http://sass-lang.com/)
* [Smart Grid](https://www.npmjs.com/package/smart-grid/)

### Установка

1. `npm i`
2. `bower i`

### Gulp задачи

1. `gulp` - Запускает задачу `serve`
2. `gulp serve` - Запускает сервер
3. `gulp smartgrid` - Генерирует сетку (Настройки сетки в файле `gulpfile.js`)
4. `gulp pug` - Компилирует pug-шаблоны в html
5. `gulp sass` - Компилирует sass-файлы в css
6. `gulp scripts` - Собирает прописанные в задаче js-файлы в один, сжимает его и сохраняет с названием `libs.min.js`
7. `gulp img` - Оптимизирует изображения для конечной версии верстки
8. `gulp clean` - Чистит папку `dist`
9. `gulp clear` - Очистка кеша (используется при оптимизации изображений)
10. `gulp build` - Сборка конечной версии верстки в папке `dist`
