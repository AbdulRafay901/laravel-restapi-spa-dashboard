

function Edit(){
    return `
    <section>
          <div class="container addUser-container">
                <div class="column1">
                      <div class="h1">
                            <h1>Update</h1>
                      </div>
                </div>
                <form id="lolo">
                <div class="column2">
                        <input type="hidden" id="id">
                        <div class="input">
                              <label>Name <span style="color:red;">*</span></label>
                              <input type="text" id="Name">
                        </div>
                        <div class="input">
                              <label>Email <span style="color:red;">*</span></label>
                              <input type="email" id="Email">
                        </div>
                        <div class="input">
                              <label>Address <span style="color:red;">*</span></label>
                              <input type="text" id="Address">
                        </div>
                        <div class="input">
                              <label>Phone <span style="color:red;">*</span></label>
                              <input type="number" id="Phone">
                        </div>
                        <div class="button">
                              <button type="submit" id="submit">Submit</button>
                        </div>
                </div>
                </form>
          </div>
          <div class="error">
                <p><i class="ri-error-warning-fill"></i> Form submission failed, Ensure all fields are correctly filled</p>
          </div>
          <div class="success">
                 <p><span id="Employee-Name"></span> Employee Updated</p>
          </div>
</section>`
}


    const token = localStorage.getItem('token');


    async function Load() {

        const path = window.location.pathname;

        let id = path.split('/')[2].split('=')[1];

         
     try {
    
     const res = await fetch(`http://127.0.0.1:8000/api/students/${id}`,
        {
            method: "GET",
            headers: {'Content-Type': 'application/json', 'Accept': 'application/json', Authorization: `Bearer ${token}`},
        })

        const data = await res.json();

        console.log(data)

        document.querySelector("#Name").value = data.user.Name;
        document.querySelector("#Email").value = data.user.Email;
        document.querySelector("#Address").value = data.user.Address;
        document.querySelector("#Phone").value = data.user.Phone;
        document.querySelector("#id").value = data.user.id;


        document.querySelector("#lolo").addEventListener("submit", async (e) => {

        e.preventDefault()

    let id = document.querySelector("#id").value;
    let Name = document.querySelector("#Name").value;
    let Email = document.querySelector("#Email").value;
    let Address = document.querySelector("#Address").value; 
    let Phone = document.querySelector("#Phone").value;
    let error = document.querySelector(".error");
    let success = document.querySelector('.success');

    if(Name == "" || Email == "" || Address == "" || Phone == ""){
        error.classList.add("error-js");

        setTimeout(() => {
            error.classList.remove("error-js");
        },2000);
    }else{
        try {

                        
           const res = await fetch(`http://127.0.0.1:8000/api/students/${id}`,
            {
                method: "PUT",
                headers: {'Content-Type': 'application/json', 'Accept': 'application/json',
                    Authorization: `Bearer ${token}`
                },
                body: JSON.stringify({Name,Email,Address,Phone})
            })
            
        const data = await res.json()

        if(data){
        let Name = document.querySelector("#Name").value = "";
        let Email = document.querySelector("#Email").value = "";
        let Address = document.querySelector("#Address").value = "";
        let Phone = document.querySelector("#Phone").value = "";

        success.classList.add("success-js");

             setTimeout(() => {
                 success.classList.remove("success-js");
             }, 2000)


        navigate('/index');

        }

        } catch (error) {
            console.log(error);
        }
        

    }   
        })

     } catch (error) {
        console.log(error);
     }   
    }
    



    

        

 




