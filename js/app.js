// IMPORTS
import { getPosts, searchPosts, createPost } from "./api.js";
import { renderPosts } from "./posts.js";
import { 
    showLoading, 
    hideLoading, 
    showError, 
    hideError, 
    showEmpty, 
    hideEmpty 
} from "./ui.js";


// INIT
document.addEventListener("DOMContentLoaded", () => {

    const searchBtn = document.getElementById("searchBtn");
    const searchInput = document.getElementById("searchInput");
    const form = document.getElementById("postForm");
    const retryBtn = document.getElementById("retryBtn");


    // LOAD POSTS
    async function loadPosts(){

        try{
            hideError();
            hideEmpty();
            showLoading();

            const apiPosts = await getPosts();
            const localPosts = JSON.parse(localStorage.getItem("posts")) || [];

            const posts = [...localPosts, ...apiPosts];

            hideLoading();

            if(posts.length === 0){
                showEmpty();
                return;
            }

            renderPosts(posts);

        }catch(error){
            hideLoading();
            showError();
        }
    }


    // SEARCH
    searchBtn.addEventListener("click", async () => {

        const query = searchInput.value.trim();

        if (query === "") {
            loadPosts();
            return;
        }

        try {
            hideError();
            hideEmpty();
            showLoading();

            const apiPosts = await searchPosts(query);
            const localPosts = JSON.parse(localStorage.getItem("posts")) || [];

            // filtrar también los locales
            const filteredLocal = localPosts.filter(post =>
                post.title.toLowerCase().includes(query.toLowerCase()) ||
                post.body.toLowerCase().includes(query.toLowerCase())
            );

            const posts = [...filteredLocal, ...apiPosts];

            hideLoading();

            if (posts.length === 0) {
                showEmpty();
                return;
            }

            renderPosts(posts);

        } catch (error) {
            hideLoading();
            showError();
        }
    });


    // CREATE POST
    form.addEventListener("submit", async (e) => {

        e.preventDefault();

        const title = document.getElementById("title").value;
        const body = document.getElementById("body").value;

        try {
            hideError();
            showLoading();

            await createPost(title, body);

            // guardar en localStorage
            let localPosts = JSON.parse(localStorage.getItem("posts")) || [];

            localPosts.unshift({
                title,
                body
            });

            localStorage.setItem("posts", JSON.stringify(localPosts));

            hideLoading();

            alert("Post created successfully");

            form.reset();

            loadPosts();

        } catch (error) {
            hideLoading();
            showError();
        }
    });


    // RETRY
    retryBtn.addEventListener("click", () => {
        hideError();
        showLoading();
        loadPosts();
    });


    // FIRST LOAD
    
    loadPosts();

});