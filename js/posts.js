
/*para renderizar los posts*/
export function renderPosts(posts){

    const container = document.getElementById("postsContainer");

    container.innerHTML = "";

    posts.forEach(post => {

        const card = document.createElement("div");

        card.className = "post";

        card.innerHTML = `
            <h3>${post.title}</h3>
            <p>${post.body}</p>
        `;

        container.appendChild(card);

    });

}