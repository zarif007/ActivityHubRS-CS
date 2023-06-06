import Cookie from 'js-cookie'

const getCookie = (cookieName: string) => {
    return Cookie.get(cookieName)
}

export default getCookie