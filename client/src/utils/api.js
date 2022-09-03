export const getMe = (token) => {
    return fetch("/api/users/me", {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
            authorization: `Bearer ${token}`,
        },
    });
};

export const createUser = (data) => {
    return fetch("/api/users", {
        method: "POST",
        body: JSON.stringify(data),
        headers: {"Content-Type": "application/json"}
    });
};

export const loginUser = (data) => {
    return fetch("/api/users/login", {
        method: "POST",
        body: JSON.stringify(data),
        headers: {"Content-Type": "application/json"}
    });
};

export const saveState = (data) => {
    return fetch("/api/users/save", {
        method: "POST",
        body: JSON.stringify(data),
        headers: {"Content-Type": "application/json"}
    });
};