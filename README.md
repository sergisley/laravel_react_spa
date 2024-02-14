# Laravel & React Base Project

This is a Laravel and React base project meant to be used as a starting codebase for your projects. This project uses
Vite, TailwindCSS, React, Laravel and several other composer packages such as `{composer_packages}`.

## Getting Started

Follow the steps below to start your project:

### Setup

1. Clone this repository to your local machine.

    ```bash
    git clone `repo-link`
    cd `project-directory`
    ```

2. Install composer dependencies:

    ```bash
    composer install
    ```
3. Install npm packages:

    ```bash
    npm install
    ```

4. Create a copy of your `.env` file:

    ```bash
    cp .env.example .env
    ```

5. Generate an encryption key for Laravel:

    ```bash
    php artisan key:generate
    ```

6. Develop the database:

    ```bash
    php artisan migrate
    ```

### .env Configuration

Below are some important `.env` configurations that you must be aware of. Do replace `{host}` and `{port}` with the
actual values that your application is using.

- `APP_URL`: Your application URL. E.g. `{host}:{port}`
- `DB_*`: Your database configurations.
- More configurations as per your project needs.

## Getting Started

### Development

For development, to start the laravel part of things run:

 ```bash
 php artisan serve
 ```

...or use your php prefered service/server/potato.

To run the js part just run

```bash
npm run dev
```

### Production

Use your prefered php service/server/portato for the php and make production files for the js with:

```bash
npm run build
```
