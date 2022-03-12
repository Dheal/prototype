import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import en from './../assets/locales/en/translation.json';
import id from './../assets/locales/id/translation.json';
import cn from './../assets/locales/cn/translation.json';
import my from './../assets/locales/my/translation.json';
const languages = ['EN', 'CN', 'MY', 'ID'];
const resources = {
    EN: {
      translation: en
    },
    ID:{
        translation: id
    },
    CN: {
        translation: cn
    },
    MY: {
        translation: my
    }
};
i18n
    .use(initReactI18next)
    .init({
        useSuspense: false,
        resources: resources,
        fallbackLng: "EN",
        detection: { order: ["path", "navigator"] },
        debug: true,
        whitelist: languages,
        interpolation: {
            escapeValue: false,
        },
    });

export default i18n;