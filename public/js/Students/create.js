
function addUser(){
    return `<section>
          <div class="container addUser-container">
                <div class="column1">
                      <div class="h1">
                            <h1>Add User</h1>
                      </div>
                </div>
                <form id="addUser">
                <div class="column2">
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
                              <button type="submit">Submit</button>
                        </div>
                </div>
                </form>
          </div>
          <div class="error">
                <p><i class="ri-error-warning-fill"></i> Form submission failed, Ensure all fields are correctly filled</p>
          </div>
          <div class="success">
                 <p><span id="Employee-Name"></span> Employee Added</p>
          </div>
</section>`
}

document.addEventListener("submit", async function(e) {

    if(e.target && e.target.id === "addUser"){
    
    e.preventDefault();

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

            const token = localStorage.getItem('token');
            
          const res = await fetch('http://127.0.0.1:8000/api/students',
             {
                method:"POST",
                headers: {'Content-Type': 'application/json', 'Accept': 'application/json',
                    Authorization: `Bearer ${token}`
                },
                body: JSON.stringify({Name, Email, Address, Phone})
             })
             const data = await res.json();

             if(data){
                let Name = document.querySelector("#Name").value = "";
                let Email = document.querySelector("#Email").value = "";
                let Address = document.querySelector("#Address").value = "";
                let Phone = document.querySelector("#Phone").value = "";

                document.getElementById("Employee-Name").innerHTML = data.Name;

                console.log(data);

                success.classList.add("success-js");

             setTimeout(() => {
                 success.classList.remove("success-js");
             }, 2000)

            //  List()

             navigate('/index');
                
             }

             } catch (error) {
                 console.log(error)
             }

             
    }

    }

})