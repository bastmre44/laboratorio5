const BASE_URL = "https://dummyjson.com/posts";

export async function getPosts() {

    const response = await fetch(BASE_URL);
    const data = await response.json();

    return data.posts;
}

export async function searchPosts(query) {

    const response = await fetch(`${BASE_URL}/search?q=${query}`);
    const data = await response.json();

    return data.posts;
}

export async function createPost(title, body) {

    const response = await fetch(BASE_URL + "/add", {

        method: "POST",

        headers: {
            "Content-Type": "application/json"
        },

        body: JSON.stringify({
            title: title,
            body: body,
            userId: 1
        })

    });

    return await response.json();
}