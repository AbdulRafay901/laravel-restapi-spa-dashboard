

function codePage(){

    return `
    <section>
    <form id="otp-form">
         <div class="otp">
              <h1>Enter OTP</h1>
              <p>We have sent a verification code to <br> your Email</p>

         <div class="inputs">
              <input type="text" maxlength="1" class="opt-code">
              <input type="text" maxlength="1" class="opt-code">
              <input type="text" maxlength="1" class="opt-code">
              <input type="text" maxlength="1" class="opt-code">
              <input type="text" maxlength="1" class="opt-code">
              <input type="text" maxlength="1" class="opt-code">
         </div>

              <button type="submit" >Verify</button>
              <p>Didn't receive the code?</p>
              <button type="button" class="resendCode">Resend Code</button>

         </div>
    </form>
    </section>`
    
}

document.addEventListener("submit", async function(e){


    if(e.target && e.target.id === "otp-form"){

    e.preventDefault()

    let otp = '';

    let error = document.querySelector(".error");

    let inputs = document.querySelectorAll(".opt-code");

    let type = localStorage.getItem('otp-type');

    console.log(type)

    inputs.forEach(input => {
        otp += input.value

        input.classList.remove('input-js')
    })

    if(otp.length < 6){
        document.getElementById("error-edit").innerHTML = "Fill All Field";
        error.classList.add("error-js");

        setTimeout(() => {
               error.classList.remove("error-js");
        },3000)
    }

    else{

        try {

        const token = localStorage.getItem('token');
            
        const res = await api.post("/api/otpCheck",
            {
               headers: {'Content-Type': 'application/json',
                   Authorization: `Bearer ${token}`
               },
               otp,
               type
            })
        
            inputs.forEach(input => {
                input.value = "";
            })

            if(type == "forget-password"){

                navigate(`/changePassword/token=${res.data.data}`);
                
            }else{
                navigate('/')
            }


        } catch (e) {

            console.log(e.response)

            document.getElementById("error-edit").innerHTML = e.response.data;
            error.classList.add("error-js");

            inputs.forEach(input => {
               input.classList.add("input-js")
            })

            setTimeout(() => {
               error.classList.remove("error-js");
        },3000)
        }
     

    }

}

})



document.querySelector('.resendCode').addEventListener("click", async function(){

    let code = localStorage.getItem('code')

    console.log(code)
      
    try {

        const res = await api.post('/api/resendCode',{
            code
        })

        console.log(res)
        
    } catch (error) {
        console.log(error.response.data)
    }
})