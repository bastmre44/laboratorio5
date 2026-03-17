
/** Control de UI states */
export function showLoading(){

    document.getElementById("loading").classList.remove("hidden");

}

export function hideLoading(){

    document.getElementById("loading").classList.add("hidden");

}

export function showError(){

    document.getElementById("error").classList.remove("hidden");

}

export function hideError(){

    document.getElementById("error").classList.add("hidden");

}

export function showEmpty(){

    document.getElementById("empty").classList.remove("hidden");

}

export function hideEmpty(){

    document.getElementById("empty").classList.add("hidden");

}