

function loginForm() {
    return `
    
    <section id="body">

        <div class="container addUser-container LoginUser-container">

            <div class="column1">
                <div class="h1">
                    <h1>Login</h1>
                </div>
            </div>

            <form id="login">

                <div class="column2">

                    <div class="input">
                        <label>Enter Your Email</label>
                        <input type="email" id="Email">
                    </div>

                    <div class="input">
                        <label>Enter Your Password</label>
                        <input type="password" id="Password">
                    </div>

                    <div class="button">
                        <button type="submit">Login</button>
                    </div>

                    <div class="forgetPassword">
                        <button type="button" onclick=navigate('/forgetPassword')>Forget Password?</button>
                    </div>

                    <div class="create">
                        <button 
                            type="button"
                            onclick="navigate('/register')"
                        >
                            Create Account
                        </button>
                    </div>

                </div>

            </form>

        </div>

    </section>
    
    `;
}

// import { navigate } from "../router";

/* ================================
   LOGIN EVENT HANDLER (SPA WAY)
================================ */
document.addEventListener("submit", async function(e) {

    if (e.target && e.target.id === "login") {

        e.preventDefault();

        let Email = document.querySelector("#Email").value;
        let Password = document.querySelector("#Password").value;

        let errorBox = document.querySelector(".error");
        let successBox = document.querySelector(".success");

        document.getElementById("error-edit").innerText = "";
        document.getElementById("register-success").innerText = "";

        function showError(msg) {
            document.getElementById("error-edit").innerText = msg;
            errorBox.classList.add("error-js");

            setTimeout(() => {
                errorBox.classList.remove("error-js");
            }, 2000);
        }

        // validation
        if (!Email || !Password) {
            return showError("All fields are required");
        }

        if (!Email.includes("@")) {
            return showError("Enter valid email");
        }

        try {

            const res = await api.post("/api/login", {
                Email,
                Password
            });

            if (res.data.status) {
                
                localStorage.setItem('token', res.data.token);
                localStorage.setItem('role', res.data.role);
                roles()
                
                navigate('/');
                
            }

        } catch (err) {

            showError(err.response?.data?.data || "Login failed");

        }
    }
});