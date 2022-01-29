import App from './app';
const { app } = new App();
app.listen(app.get('port'), () => {
    console.log(`Server is listening port ${app.get('port')}.`);
});
