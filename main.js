let toggleOn = false;



let contacts = [""]

/**
 * Called when submitting the new Contact Form
 * This method will pull data from the form
 * use the provided function to give the data an id
 * then add that data to the contacts list.
 * Then reset the form
 * *** hints:
 * *** push: resources/push.jpg
 */
function addContact(event) {

  // this is how to prevent the page from loading with default behavior
  event.preventDefault();

  // we can point or rather target the form submission using the passed event 

  let form = event.target;

  let newContact = {
    id: generateId(),
    name: form.name.value,
    phone: form.phone.value,
    emergencycontact: form.emergencycontact.checked

  }

  console.log("Adding " + form.name.value + " to the contact list");
  contacts.push(newContact);
  console.log("ListArray has been updated " + contacts);


  saveContacts();

  form.reset();

  console.log("Contact successfully added");
  /**
   * Converts the contacts array to a JSON string then
   * Saves the string to localstorage at the key contacts 
   */
}

function saveContacts() {
  window.localStorage.setItem("contacts", JSON.stringify(contacts));
  drawContacts();
}

/**
 * Attempts to retrieve the contacts string from localstorage
 * then parses the JSON string into an array. Finally sets
 * the contacts array to the retrieved array
 */
function loadContacts() {


  let contactData = JSON.parse(window.localStorage.getItem("contacts"))

  if (contactData) {
    contacts = contactData;
  } else {
    console.log("No data loaded")
  }


}


/**
 * This function targets the contacts-list on the 
 * DOM and adds a new div element for each of the
 * contacts in the contacts array
 */
function drawContacts() {
  console.log("attempting to load contacts");

  let contactListElement = document.getElementById("contact-list");
  let template = "";


  contacts.forEach(contact => {
    template += `

  <!-- TODO Remove these templates and draw them using JavaScript -->
  <div class="card mt-1 mb-1 ${contact.emergencycontact ? 'emergency-contact' : ''}">
    <h3 class="mt-1 mb-1">${contact.name}</h3>
    <div class="d-flex space-between">
      <p>
        <i class="fa fa-fw fa-phone"></i>
        <span>${contact.phone}</span>
      </p>
      <i onclick=removeContact('${contact.id}') class="action fa fa-trash text-danger"></i>

    </div>
  </div>

  
  `

  })

 contactListElement.innerHTML = template


}

/**
 * This function is called with a contact id
 * and will use the id to find and remove the 
 * contact by their id from the list of contacts
 * *** hints: 
 * *** findIndex: resources/findIndex.jpg
 * *** splice: resources/splice.jpg
 * @param {string} contactId 
 */
function removeContact(contactId) {
  console.log("attempting to remove contact");

  const index = contacts.findIndex(contact => contact.id === contactId )

contacts.splice(index, 1);


saveContacts();
}

/**
 * Toggles the visibility of the AddContact Form
 */
function toggleAddContactForm() {

  document.getElementById("new-contact-form").classList.toggle("hidden");


}


/**
 * Used to generate a random string id for mocked
 * database generated Id
 * @returns {string}
 */
function generateId() {
  return Math.floor(Math.random() * 10000000) + "-" + Math.floor(Math.random() * 10000000)
}


loadContacts()
drawContacts()




// Got unexpected white space when starting over ... maybe becuase there wasn't anything ot parse when empty?