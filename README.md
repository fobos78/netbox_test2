

Задача 2. JavaScript
Необходимо сверстать таблицу, данные для наполнения ее получить ajax-запросом по URL: https://frontend-test.netbox.ru/. Текстовые данные в файле представлены в формате Unicode и закодированы как \uXXXX

Таблица состоит из столбцов: id, name, age, phone, email.
Напротив каждой строки - две кнопки “Удалить”, “Редактировать”.
По нажатию “Удалить” происходит отправка события удаления на сервер (подробнее о структуре запросов ниже), при получении успешного ответа строка удаляется на клиенте.
По нажатию “Редактировать” строка таблицы становится редактируемой, кнопка меняется на “Сохранить”. При нажатии на “Сохранить” данные отправляются на сервер (ajax-запрос), при успешном ответе обновляются на клиенте, строка таблицы становится read-only, кнопка снова меняется на “Редактировать”.

Под таблицей нужно вывести счетчик текущего количества строк.


Вы можете использовать фреймворк - либо ReactJS, либо VueJS. 
Дополнительно (не обязательно, но желательно):
Сделать проверку формата введенных данных 
Сделать сортировку строк таблицы (по клику на заголовке столбца)
Сделать добавление новых строк (отдельной кнопкой, например)

В задании будет проверяться умение декомпозировать приложение на компоненты, работа с состоянием, использование реактивности и корректность работы на стыке функциональностей (например, редактирование и сортировка).
Формат запросов:
URL: https://frontend-test.netbox.ru/
Методы: GET / POST
Получение JSON для таблицы - запрос без параметров
Для удаления, редактирования, добавления - необходимо передать параметр method (с соответствующим значением) и необходимые поля.
Удаление строки: method=delete, требуемые поля: id
Редактирование строки: method=update, требуемые поля: id, name, age, phone, email
Добавление строки: method=add, требуемые поля: name, age, phone, email
В случае успеха сервер вернет JSON с успешным статусом и кодом ответа 200
В случае ошибки (неверного набора полей, ошибки в параметре method, etc.) - сервер вернет код ответа 501 (HTTP/1.1 501 Not Implemented)

NB: Сервер не сохраняет принимаемые данные, это просто тестовый пример. Не нужно после обновления данных или удаления строки перезапрашивать весь JSON (он не изменится). Вы должны обновлять их на клиенте.


Runs the app in the development mode.<br />
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.<br />
You will also see any lint errors in the console.

### `yarn test`

Launches the test runner in the interactive watch mode.<br />
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `yarn build`

Builds the app for production to the `build` folder.<br />
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.<br />
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `yarn eject`

**Note: this is a one-way operation. Once you `eject`, you can’t go back!**

If you aren’t satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you’re on your own.

You don’t have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn’t feel obligated to use this feature. However we understand that this tool wouldn’t be useful if you couldn’t customize it when you are ready for it.

## Learn More

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).

### Code Splitting

This section has moved here: https://facebook.github.io/create-react-app/docs/code-splitting

### Analyzing the Bundle Size

This section has moved here: https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size

### Making a Progressive Web App

This section has moved here: https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app

### Advanced Configuration

This section has moved here: https://facebook.github.io/create-react-app/docs/advanced-configuration

### Deployment

This section has moved here: https://facebook.github.io/create-react-app/docs/deployment

### `yarn build` fails to minify

This section has moved here: https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify
