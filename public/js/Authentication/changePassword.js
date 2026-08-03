
function changePassword(){
    return `
    <section>
          <div class="container addUser-container LoginUser-container">
                <div class="column1">
                      <div class="h1">
                            <h1>Change Password</h1>
                      </div>
                </div>
                <form id="changePassword">
                <div class="column2">
                        <div class="input">
                              <label>New Password <span style="color:red;">*</span></label>
                              <input type="password" id="Password">
                        </div>
                       <div class="input">
                              <label>Confirm Password <span style="color:red;">*</span></label>
                              <input type="password" id="ConfirmPassword">
                        </div>
                        
                        <div class="button">
                              <button type="submit">Submit</button>
                        </div>
                           
                </div>
                </form>
          </div>
          <div class="error">
                <p><i class="ri-error-warning-fill"></i> Form submission failed, <span id="error-edit"></span></p>
          </div>
          <div class="success">
                 <p id="register-success"><span id="Employee-Name"></span></p>
          </div>
</section>`
}



document.addEventListener("submit", async (e) => {

      const token = window.location.pathname.split('token=')[1];


    if(e.target && e.target.id === "changePassword"){

    e.preventDefault()


    let Password = document.querySelector("#Password").value;
    let ConfirmPassword = document.querySelector("#ConfirmPassword").value; 
    let error = document.querySelector(".error");
    let success = document.querySelector('.success');

    if(!validate([Password, ConfirmPassword])){
        error.classList.add("error-js");
        document.getElementById("error-edit").innerHTML = "Ensure all fields are correctly filled";

        setTimeout(() => {
             error.classList.remove("error-js");
        }, 3000)
    }
    if(Password !== ConfirmPassword){
        error.classList.add("error-js");
        document.getElementById("error-edit").innerHTML = "Confirm Not Match";

        setTimeout(() => {
             error.classList.remove("error-js");
        }, 3000)
    }
    else{

        try {

            const token = localStorage.getItem('token');

             const res = await api.post('/api/changePassword',{
                 headers: {'Content-Type': 'application/json',
                    Authorization: `Bearer ${token}`
                 },
                 token,
                 Password
             })

             Password = document.querySelector("#Password").value = "";
             ConfirmPassword = document.querySelector("#ConfirmPassword").value = ""; 

             document.getElementById("register-success").innerHTML = res.data.data;
             success.classList.add("success-js");

            setTimeout(() => {
                    success.classList.remove("success-js");
                    window.location.replace('/login')
            },3000)

        } catch (e) {

            console.log(e.response)
            error.classList.add("error-js");
            document.getElementById("error-edit").innerHTML = e.response.data.data;

        setTimeout(() => {
             error.classList.remove("error-js");
        }, 3000)
        }


    }

     }
   
})