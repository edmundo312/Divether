const salir = document.querySelector("#salir");
const base_url = document.querySelector("#template_base_url").getAttribute("base_url");

const logout = async (e) => {
    try {
        const storage = window.localStorage;
        const response = await fetch(`${base_url}api/user/logout`, {
            method: "POST",
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8',
                'auth-token': storage.token
            }
        });
        const result = await response.text();
        storage.clear();
        window.location.href="/login";
    } catch (error) {
        console.log(error);
    }
}

salir.addEventListener("click", logout); 