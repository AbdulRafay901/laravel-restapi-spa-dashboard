
let role = localStorage.getItem('role');

let errorBox = document.querySelector(".error");

console.log(role)
        
    function navigate(path) {
        history.pushState({}, "", path);
        render(path);
    }

  async function render(path) {
        console.log("CURRENT PATH:", path);
        const app = document.getElementById("app");



    if (path === "/") {
        if(localStorage.getItem('token')){
            navigate('/index');
        }
        else{
            app.innerHTML = loginForm()
        }
    }

        if (path === "/register") {
            if(localStorage.getItem('loginToken') === 'true'){
                navigate('/index');
            }
            else{
                app.innerHTML = registerForm()
            }
        }
        if (path === "/code") {
             if(localStorage.getItem('loginToken') === 'true'){
                navigate('/index');
            }
            else{
                app.innerHTML = codePage()
            }
        }
        if(path === '/forgetPassword'){
             if(localStorage.getItem('loginToken') === 'true'){
                navigate('/index');
            }
            else{
                app.innerHTML = forgetPassword()
            }
        }
        if(path.startsWith('/changePassword/')){

            if(localStorage.getItem('loginToken') === 'true'){
                navigate('/index');
            }
            else{
                let split = path.split('/')[2];
                 if(split === ""){
                    console.log("kahli he")
                 }else{
                    app.innerHTML = changePassword();
                 }
            }

        
        }

        if(path === '/index'){

        if(localStorage.getItem('token')){
            app.innerHTML = index();
            await List()
        }else{
            app.innerHTML = loginForm()
        }

        }

        if(path === '/addUser'){
             if(localStorage.getItem('loginToken') === 'true'){
                if(role === 'user'){
                    navigate('/')
                     
                     roleError()
                }else{
                    app.innerHTML = addUser();
                }
                
            }
            else{
                app.innerHTML = loginForm()
            }
        }

        if(path.startsWith('/Edit')){

            if(localStorage.getItem('loginToken') === 'true'){
                user = path.split('/')[2];

                if(user === ""){
                    console.log("user NHI he")
                }
                else if(role === 'user'){
                    navigate('/')

                    roleError()
                }
                else{
                    app.innerHTML = Edit();
                    Load()   
                }
            }
            else{
               navigate('/')
            }
        }

    }


