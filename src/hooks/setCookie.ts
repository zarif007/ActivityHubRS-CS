import Cookie from 'js-cookie'

const setCookie = (cookieName: string, cookieValue: string) => {
    Cookie.set(cookieName, cookieValue, {
        expires: 7, //7 Days
    })
}

export default setCookie