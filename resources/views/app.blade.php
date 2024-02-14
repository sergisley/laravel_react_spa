<!DOCTYPE html>
<html lang="{{ app()->getLocale() }}" data-theme="nord">
<head>
    <meta charset="utf-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1">

    <title>
        {{ config('app.name') }}
    </title>

    @vitereactrefresh

    @vite(['resources/sass/app.scss', 'resources/js/app.js'])
</head>
<body>
<div id="app"></div>
</body>
</html>
