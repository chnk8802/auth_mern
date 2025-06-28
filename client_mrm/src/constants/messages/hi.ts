// constants/messages/hi.ts

const hi = {
    AUTH: {
        LOGIN_SUCCESS: "सफलतापूर्वक लॉग इन किया गया!",
        LOGIN_FAILED: "अमान्य ईमेल या पासवर्ड।",
        LOGOUT_SUCCESS: "आप लॉग आउट हो चुके हैं।",
        SESSION_EXPIRED: "आपका सत्र समाप्त हो गया है। कृपया पुनः लॉगिन करें।",
    },

    VALIDATION: {
        REQUIRED_FIELD: "यह फ़ील्ड आवश्यक है।",
        INVALID_EMAIL: "कृपया एक मान्य ईमेल पता दर्ज करें।",
        PASSWORD_MIN_LENGTH: "पासवर्ड कम से कम 8 अक्षरों का होना चाहिए।",
        PASSWORDS_DO_NOT_MATCH: "पासवर्ड मेल नहीं खा रहे हैं।",
    },

    COMMON: {
        UNKNOWN_ERROR: "कुछ गलत हो गया। कृपया बाद में पुनः प्रयास करें।",
        NETWORK_ERROR: "नेटवर्क त्रुटि। अपने इंटरनेट कनेक्शन की जांच करें।",
        LOADING: "लोड हो रहा है...",
        SAVING: "सहेजा जा रहा है...",
    },
};

export default hi;
