/* manejo de estados loading, empty, error */

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


// ELEMENTOS DEL DOM
const searchBtn = document.getElementById("searchBtn");
const searchInput = document.getElementById("searchInput");
const form = document.getElementById("postForm");
const retryBtn = document.getElementById("retryBtn");



// CARGAR POSTS (HOME)

async function loadPosts(){

    try{

        hideError();
        hideEmpty();
        showLoading();

        const posts = await getPosts();

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

        const posts = await searchPosts(query);

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



// INIT

document.addEventListener("DOMContentLoaded", loadPosts);