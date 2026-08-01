
function index(){
      return `
      <section>
          <div class="container">
                <div class="column1">
                      <div class="h1">
                            <h1>Manage Employees</h1>
                      </div>
                      <div class="buttons">
                            <button id="all"><i class="ri-user-minus-fill"></i> Delete</button>
                            <button type="button" id="addUser"><i class="ri-user-add-fill"></i> Add New Employee</button>
                      </div>
                </div>
                <div class="column2" id="column2">
                      <div class="details">
                             <div class="checkbox">
                                   <input type="checkbox">
                             </div>
                             <div class="Name">
                                   <p>Name</p>
                             </div>
                             <div class="Name">
                                   <p>Email</p>
                             </div>
                             <div class="Name">
                                   <p>Address</p>
                             </div>
                             <div class="Name">
                                   <p>Phone</p>
                             </div>
                             <div class="Name">
                                   <p>Actions</p>
                             </div>
                      </div>
                      <div id="users">
                           
                      </div>
                      
                </div>

                <div class="p-l">
                <div class="pagination">
                      <button class="arrow  previous"><</button>
                      <div id="numbers">
                            
                      </div>
                      <button class="arrow next">></button>
                </div>
                <button class="logout">Logout</button>
                </div>
                
          </div>
</section>`
}


// import {List, setpage, getpage} from './List.js';


document.addEventListener("click", (e) => {
      if(e.target.id === "addUser"){
            if(role === "user"){
                  roleError()
            }else{
                  navigate('/addUser');
            }
      }
})

document.addEventListener("click", async function(e){

      if(e.target.classList.contains("Delete")){

            if(role === "user"){

            roleError()
            }else{

          const id = e.target.getAttribute("id")

          try {

            await fetch("http://127.0.0.1:8002/sanctum/csrf-cookie", {
               credentials: 'include'
            });

           const csrfToken = getCookie('XSRF-TOKEN');
            
           const res = await fetch(`http://127.0.0.1:8002/api/students/${id}`,
            {
                  method: 'DELETE',
                  credentials: 'include',
                  headers: {'Content-Type': 'application/json', 'Accept': 'application/json',
                        "X-XSRF-TOKEN": csrfToken
                  },
                  

            })
            const data = await res.json()

            console.log(data);

            List()

            } catch (error) {
               console.log(error)
            }

            }

      }
})


document.addEventListener("click",  async function(e){
      if(e.target.classList.contains("Edit")){

            if(role === 'user'){

                  roleError()
                 
            }else{
            const id = e.target.getAttribute("id")      
                navigate(`/Edit/user=${id}`);
            }
            
      }
})


document.addEventListener("click", async function(e){

      if(e.target.id === "all"){
    
         const checkboxs = document.querySelectorAll("input[name='checkbox']:checked");

         const check = Array.from(checkboxs).map(checkbox => checkbox.value);

         console.log(check);

         try {

             await fetch("http://127.0.0.1:8002/sanctum/csrf-cookie", {
               credentials: 'include'
            });

           const csrfToken = getCookie('XSRF-TOKEN');

      
         const res = await fetch(`http://127.0.0.1:8002/api/students/Checkbox`,
            {
                  method: "delete",
                  credentials: 'include',
                  headers: {'Content-Type': 'application/json', 'Accept':'application/json',
                        "X-XSRF-TOKEN": csrfToken
                  },
                  body: JSON.stringify({check})
            })
         const response = await res.json()
         
         console.log(response);
         List()
         } catch (error) {
            console.log(error)
         }
         }
})

 document.addEventListener("click", async function(e){

    if(e.target.classList.contains("n")){
      let num = Number(e.target.getAttribute("page-number"));
      setpage(num);

      List();
    }

    else if(e.target.classList.contains("previous")){
      
           let currentPage = getpage();
      
            if(currentPage > 1){
                setpage(currentPage - 1);
            }

            List();
    }

    else if(e.target.classList.contains("next")){
          const data = await List();

          let currentPage = getpage()
          if(currentPage < data.last_page){
              setpage(currentPage + 1);
          }

          List();
    }



    })




    document.addEventListener("click", async function (e) {

    if (e.target.classList.contains("logout")) {

        try {

            const token = localStorage.getItem("token");

            const res = await fetch("http://127.0.0.1:8000/api/logout", {
                method: "POST",
                headers: {
                    "Accept": "application/json",
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${token}`
                }
            });

            const data = await res.json();

            if (res.ok) {

                localStorage.removeItem("token");

                navigate("/");

            } else {

                console.log(data);

            }

        } catch (error) {

            console.log(error);

        }

    }

});


    function roleError(){
       document.getElementById("error-edit").innerText = "Only Admin Access";
            errorBox.classList.add("error-js");

            setTimeout(() => {
                errorBox.classList.remove("error-js");
       }, 2000);
    }






