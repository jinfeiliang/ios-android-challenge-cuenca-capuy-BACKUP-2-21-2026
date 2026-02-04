
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
const Contact_Selectors_DOM = document.querySelectorAll(".Contact_Selector");


const Default_Profile_IMG = "https://cdn-icons-png.flaticon.com/512/9187/9187604.png";

function Contact_Select(){

}

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
            let Profile_IMG =  Contact.Profile;
            console.log(Profile_IMG);
            if (Profile_IMG == "" || Profile_IMG == undefined){
                Profile_IMG = Default_Profile_IMG;
            }
            if (Contact.phone[0].number == undefined){
                return console.log("Error trying load an contact that does not have an number");
            }

            let HTML = `<button class="Contact Contact_Selector onClick="Contact_Select(${Contact.phone[0].number})" ">
            <img class="Contact_Profile_IMG" src="${Profile_IMG}">
            <h1 class="Contact_Profile_Name">${Contact.name.first} ${Contact.name.last}</h1>
            </button>`;

            Contacts_Container_DOM.insertAdjacentHTML("beforeend", HTML);
        })

    })

}

Load_All_Contacts();







