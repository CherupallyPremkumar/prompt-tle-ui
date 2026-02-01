export const getCookie = (name: string): string | null => {
    const value = `; ${document.cookie}`;
    const parts = value.split(`; ${name}=`);
    if (parts.length === 2) return parts.pop()?.split(';').shift() || null;
    return null;
};

export const setCookie = (
    name: string,
    value: string,
    options: {
        days?: number;
        secure?: boolean;
        sameSite?: 'Strict' | 'Lax' | 'None';
    } = {}
) => {
    const { days = 7, secure = window.location.protocol === 'https:', sameSite = 'Lax' } = options;
    const expires = new Date(Date.now() + days * 864e5).toUTCString();
    const secureFlag = secure ? '; Secure' : '';
    document.cookie = `${name}=${encodeURIComponent(value)}; expires=${expires}; path=/; SameSite=${sameSite}${secureFlag}`;
};

export const removeCookie = (name: string) => {
    document.cookie = `${name}=; removeCookie=; expires=Thu, 01 Jan 1970 00:00:00 GMT; path=/`;
};
