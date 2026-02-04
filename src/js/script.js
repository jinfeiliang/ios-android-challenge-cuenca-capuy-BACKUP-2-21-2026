
let Debug_Mode = true;
function print(msg){
    if (Debug_Mode){
        console.log("-----------------------")
        console.log("Caller:");
        console.log(print.caller)
        console.log("Msg:")
        console.log(msg);
        console.log("-----------------------")
    }
}


const Contacts_Container_DOM = document.querySelector("#Contacts-Container");



async function Get_All_Contacts() {
    try {
        const response = await fetch("../src/data/api.json");
        if (!response.ok){
            throw new Error(`Reponse status: ${response.status}`);
        }

        const result = await response.json();
        //console.log(result);
        return result;
    } catch (error) {
        console.log(error.message);
    }
}


function Load_All_Contacts() {

    let Promise_Contacts = Get_All_Contacts();
    //console.log(Contacts_List);

    Promise_Contacts.then( (List) => {
       let Contacts = List.Contacts;

        Contacts.forEach( (Contact) => {
            
            let HTML = `<div class="Contact">${Contact.name.first}${Contact.name.last}</div>`;

            Contacts_Container_DOM.insertAdjacentHTML("beforeend", HTML);

        })

    })

}

Load_All_Contacts();