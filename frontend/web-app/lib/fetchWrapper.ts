import { getTokenWorkaround } from "@/app/actions/authActions"

const baseUrl = 'http://localhost:6001/'

const getheaders = async () => {
    const token = await getTokenWorkaround()
    const headers = { "Content-Type": "application/json" } as any

    if (token) {
        headers.Authorization = 'Bearer ' + token.access_token
    }

    return headers
}

const get = async (url: string) => {
    const requestOptions = {
        method: "GET",
        headers: await getheaders()
    }

    const response = await fetch(baseUrl + url, requestOptions)
    return await handleResponse(response)
}


const post = async (url: string, body: {}) => {
    const requestOptions = {
        method: "POST",
        headers: await getheaders(),
        body: JSON.stringify(body)
    }

    const response = await fetch(baseUrl + url, requestOptions)

    return await handleResponse(response)
}


const put = async (url: string, body: {}) => {
    const requestOptions = {
        method: "PUT",
        headers: await getheaders(),
        body: JSON.stringify(body)
    }

    const response = await fetch(baseUrl + url, requestOptions)

    return handleResponse(response)
}

const handleResponse = async (response: Response) => {
    const text = await response.text()
    const data = text && JSON.parse(text)

    if (response.ok) {
        return data || response.statusText
    } else {
        const error = {
            status: response.status,
            message: response.statusText
        }

        return { error };
    }
}


export const fetchWrapper = { get, post, put }