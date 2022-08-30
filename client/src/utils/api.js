export const createUser = (data) => {
    return fetch("/api/users", {
        method: "POST",
        body: JSON.stringify(data),
        headers: {"Content-Type": "application/json"}
    });
}

export const loginUser = (data) => {
    return fetch("/api/users/login", {
        method: "POST",
        body: JSON.stringify(data),
        headers: {"Content-Type": "application/json"}
    })
}