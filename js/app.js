
/* Logica principal */
import {getPosts, searchPosts, createPost} from "./api.js";
import {renderPosts} from "./posts.js";
import {showLoading, hideLoading, showError, hideError, showEmpty, hideEmpty} from "./ui.js";

async function loadPosts(){

    try{

        hideError();
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

document.addEventListener("DOMContentLoaded", loadPosts);