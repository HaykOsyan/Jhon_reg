Проект написан на Node.js как сервер, React.js клиетская часть, PostgreSQL как база данных 
1 Скачать обе папки (backend and frontend)
2 Создать БД в PostgreSQL (DB_NAME = john в нашем случае)
3 Настроить env файлы      backend  PORT = 8000
                                    DB_NAME = john
                                    DB_USER = postgres
                                    DB_PASSWORD = password 
                                    DB_HOST = localhost
                                    DB_PORT = 5432
                                    SECRET_KEY = random_secret_key
                           frontend REACT_APP_API_URL задать URL  (http://localhost:8000/ в нашем случае) 
4 в терминале перейти в папку backend и запустить команду npm install (для установки зависимостейи необходимых модулей)
5 в терминале перейти в папку frontend и запустить команду npm install
6 отдельно в папке backend запустить команду npm run test
7 отдельно в папке frontend запустить команду npm start
