import i18n from "i18next";
import { initReactI18next } from "react-i18next";

import enUS from './en-US.json';
import zhTW from './zh-TW.json';

const resources = {
  'en-US': {
    translations: enUS,
  },
  'zh-TW': {
    translations: zhTW,
  },
};

i18n
  .use(initReactI18next) // passes i18n down to react-i18next
  .init({
    resources,
    lng: localStorage.getItem('language') || 'zh-TW', // 預設語言
    fallbackLng: 'zh-TW',     //如果當前切換的語言沒有對應的翻譯則使用這個語言，

    ns: ['translations'], // 要加載的名稱空間(string or array)
    defaultNS: 'translations', // 默認名稱空間，如果未傳遞給函數，則使用默認名稱空間 translation

    interpolation: {
      escapeValue: false, // 是否要讓字詞 escaped 來防止 xss 攻擊，這裡因為 React.js 已經做了，就設成 false即可
      // formatSeparator: ',', // used to separate format from interpolation value
    },

    react: {
      wait: true,
    },
  });

export default i18n;
