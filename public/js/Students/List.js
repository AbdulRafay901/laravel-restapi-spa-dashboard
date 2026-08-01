let page = 1;

function setpage(p){
    page = p;
}

function getpage(){
    return page;
}

console.log(page)

async function List() {

    try {

        const token = localStorage.getItem('token');

        console.log(token)

        const res = await api.get(`/api/students?page=${page}`, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        });

        console.log(res.data);
        r(res.data);

        return res.data;

    } catch (error) {
        console.log(error.response);
    }

}



// DOMPurify Use for protect XSS prevention 
// DOMPurify isliye Use hota he agar database me se jo data araha he
// Iusme koi script hoti he example <script>('alert')</script> to
// DOMPurify sirf alert show karega ye isliye hota he takee Script run na ho
// isko kehte hen XSS prevention
    

function r(data){

        let users = document.getElementById("users");

        users.innerHTML = "";

        let html = "";

        data.data.forEach(d => {

            html += `
            <div class="details users">
                <div class="checkbox">
                    <input type="checkbox" name="checkbox" class="checkbox" value="${d.id}">
                </div>
                <div class="Name"><p>${DOMPurify.sanitize(d.Name)}</p></div>
                <div class="Name"><p>${DOMPurify.sanitize(d.Email)}</p></div>
                <div class="Name"><p>${DOMPurify.sanitize(d.Address)}</p></div>
                <div class="Name"><p>${DOMPurify.sanitize(d.Phone)}</p></div>
                <div class="Name action">
                    <i class="ri-pencil-fill Edit" id="${d.id}"></i>
                    <i class="ri-delete-bin-2-fill Delete" id="${d.id}"></i>
                </div>
            </div>
        `;
            
        });

        users.innerHTML = html;


        const numbers = document.getElementById("numbers");

        let n = 1;

        numbers.innerHTML = "";

        for(n = 1; n <= data.last_page; n++){
            numbers.innerHTML += `
                <button class="n" page-number="${n}">${n}</button>
            `;
        }

}













