# Для портфолио

## Используемые скрипты

Запустив терминал в папке:

### `npm run dev`

Запускается режим разработки.\
Проект сбилдится в папку `dist`, после чего откроется [http://localhost:3000](http://localhost:3000) в браузере.

При изменении кода в папке `src` окно в браузере само перезагрузится.

### `npm run build`

Сборка проекта в папку `dist`.\

### `npm run prettier-check`

Запускается проверка prettier.\
Проверяет файлы в папке `src`.\
В результате будет указан список файлов, которые не соответствуют правилам.

### `npm run prettier-write`

Запускается записывающий prettier.\
Перезаписывает файлы в папке `src` при необходимости.\
В результате файлы будут изменены/перезаписаны по всем правилам и сохранены.

### `npm run eslint`

Запускается линтер.\
Проверяет скриптовые файлы в папке `src` по правилам из файла **.eslintrc**.
