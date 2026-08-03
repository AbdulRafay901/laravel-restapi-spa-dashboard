function forgetPassword(){

    return `
    <section id="body">
          <div class="container addUser-container LoginUser-container">
                <div class="column1">
                      <div class="h1">
                            <h1>Forget Password</h1>
                      </div>
                </div>
                <form id="forgetPassword">
                <div class="column2">
                        <div class="input">
                              <label>Enter Your Email <span style="color:red;">*</span></label>
                              <input type="email" id="Email" required>
                        </div>
                      
                        <div class="button">
                              <button type="submit">submit</button>
                        </div>
                         
                </div>
                </form>
          </div>
          
</section>`
    
}



document.addEventListener('submit', async (e) => {

    if(e.target && e.target.id === "forgetPassword"){
    
     e.preventDefault()


     let Email = document.querySelector("#Email").value;
     let error = document.querySelector(".error");


     if(Email.value == ""){
         document.getElementById("error-edit").innerHTML = 'Email Required';

         error.classList.add("error-js");

         setTimeout(() => {
            error.classList.remove("error-js");
         },3000)
     }else{

        try {

            const token = localStorage.getItem('token');

            const res = await api.post('/api/forgetPassword',{
                headers: {'Content-Type': 'application/json',
                    Authorization: `Bearer ${token}`
                },
                Email
            })

            localStorage.setItem('otp-type', 'forget-password');

            navigate('/code')
            
        } catch (e) {
            
         document.getElementById("error-edit").innerHTML = e.response.data.data;

         error.classList.add("error-js");

         setTimeout(() => {
            error.classList.remove("error-js");
         },3000)
        }

     }

      }

     })
     
