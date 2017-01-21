requirejs.config({
    baseUrl: 'lib',
    paths: {
        app: '../src/app'
    }
});

requirejs(['app/main']);
