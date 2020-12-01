'use strict';
const i18nKeys = {
    blue: 'blue',
    buddhas: 'buddhas',
    clear: 'clear',
    close: 'close',
    determineWinner: 'determineWinner',
    en: 'en',
    green: 'green',
    helmets: 'helmets',
    help: 'help',
    helpText: 'helpText',
    inputsEmpty: 'inputsEmpty',
    red: 'red',
    rice: 'rice',
    title: 'title',
    yellow: 'yellow',
};
const allTranslations = {
    en: {
        blue: 'Blue',
        buddhas: 'Buddhas',
        clear: 'Clear',
        close: 'Close',
        determineWinner: 'Determine Winner',
        green: 'Green',
        helmets: 'Helmets',
        help: 'Help',
        helpText: `Type amount of rice, helmets and buddhas tokens for each player and press "%${i18nKeys.determineWinner}%" button to see who won.`,
        inputsEmpty: 'Please, fill inputs first.',
        red: 'Red',
        rice: 'Rice',
        title: 'Samurai Winner Determiner',
        yellow: 'Yellow',
    },
    ru: {
        blue: 'Синий',
        buddhas: 'Будды',
        clear: 'Сбросить',
        close: 'Закрыть',
        determineWinner: 'Определить победителя',
        green: 'Зелёный',
        helmets: 'Калпаки',
        help: 'Помощь',
        helpText: `Заполните количество токенов риса, калпаков и будд каждого игрока и нажмите на кнопку "%${i18nKeys.determineWinner}%" чтобы узнать кто победил.`,
        inputsEmpty: 'Пожалуйста, заполните поля ввода.',
        red: 'Красный',
        rice: 'Рис',
        title: 'Определитель победителя игры Samurai',
        yellow: 'Жёлтый',
    }
}
const getOptions = () => {
    const options = location.search.replace('?', '').split('&').reduce((prev, curr) => {
        const value = curr.split('=', 2);
        if(value.length === 2){
            prev[value[0]] = value[1];
        }
        return prev;
    }, {});
    return options;
}
const options = getOptions();
const getLang = () => {
    return (options.lang || navigator.language || i18nKeys.en).split(/[\-\_]/)[0];
};                
const lang = getLang();
const compileTranslations = (translations) => {
    const getTranslationWithReplace = (code) => {
        const text = translations[code].replace(/%(.+?)%/g, (match, code) => {
            const text = getTranslationWithReplace(code);
            return text;
        });
        return text;
    }
    for (const key in translations) {
        if (translations.hasOwnProperty(key)) {
            const translation = getTranslationWithReplace(key);
            translations[key] = translation;
        }
    }
    return translations;
}
const translations = compileTranslations({
    ...allTranslations[i18nKeys.en],
    ...allTranslations[lang]
});
const getTranslation = (code) => {
    const text = translations[code];
    return text;
}