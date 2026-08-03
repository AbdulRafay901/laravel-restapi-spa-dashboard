

let role = null;

function roles(){
    role = localStorage.getItem('role');
}

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

        const isLoggedIn = await TokenCheck()

        if(isLoggedIn){
            navigate('/index');
        }
        else{
            app.innerHTML = loginForm()
        }
    }

        if (path === "/register") {

            const isLoggedIn = await TokenCheck();

            if(isLoggedIn){
                navigate('/index');
            }
            else{
                app.innerHTML = registerForm()
            }
        }
        if (path === "/code") {

            const isLoggedIn = await TokenCheck();

             if(isLoggedIn){
                navigate('/index');
            }
            else{
                app.innerHTML = codePage()
            }
        }
        if(path === '/forgetPassword'){

            const isLoggedIn = await TokenCheck();

             if(isLoggedIn){
                navigate('/index');
            }
            else{
                app.innerHTML = forgetPassword()
            }
        }
        if(path.startsWith('/changePassword/')){

            const isLoggedIn = await TokenCheck();

            if(isLoggedIn){
                navigate('/index');
            }
            else{
                let split = path.split('/')[2];
                 if(split === ""){
                    console.log("Something Wrong")
                 }else{
                    app.innerHTML = changePassword();
                 }
            }

        
        }

        if (path === "/index") {

        const isLoggedIn = await TokenCheck();

        if (isLoggedIn) {

        app.innerHTML = index();
        await List();

    } else {

        app.innerHTML = loginForm();

    }

}

        if(path === '/addUser'){

            const isLoggedIn = await TokenCheck();

             if(isLoggedIn){
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

            const isLoggedIn = await TokenCheck();

            if(isLoggedIn){
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


