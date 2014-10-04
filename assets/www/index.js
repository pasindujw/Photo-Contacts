function createContactsList() {
   var options = new ContactFindOptions();
   options.filter = "";
   options.multiple = true;
   var fields = [ "displayName", "name", "phoneNumbers" ];
   navigator.contacts.find(fields, onListSuccess, onListError, options);
}

function onListSuccess(contacts) {
   var mainHtml = '';
   for ( var i = 0; i < contacts.length; i++) {
  	 var html = '<div data-role="collapsible" data-inset="false">';
  	 html += '<h2>' + contacts[i].name.givenName + '</h2>';
  	 html += '<ul data-role="listview">'

  	 var contact = contacts[i];
  	 for ( var j = 0; j < contact.phoneNumbers.length; j++) {
  		 html += '<li>' + contact.phoneNumbers[j].type + ": "
  				 + contact.phoneNumbers[j].value + '</li>';
  	 }

  	 html += '</ul></div>';
  	 mainHtml += html;
   }
   $("#contactsList").html(mainHtml);
   $('[data-role=collapsible]').collapsible().trigger('create');
}

function onListError(contactError){
   alert('error!');
}
// saving a new contact with 2 numbers
function createContact(name, homePhone, mobilePhone, photo) {
   var contact = navigator.contacts.create();
   contact.displayName = name;
   contact.nickname = name;
  	var test ="https://media.licdn.com/mpr/mpr/wc_200_200/p/7/005/06f/215/03648e1.jpg";
   var contactName = new ContactName();
   contactName.givenName = name;
   contact.name = contactName;
   var pic=[];
  	pic[0] = new ContactField('photo',photo, false);
	contact.photos = pic;
   var phoneNumbers = [];
   phoneNumbers[0] = new ContactField('mobile', mobilePhone, true);
   phoneNumbers[1] = new ContactField('home', homePhone, false);
   contact.phoneNumbers = phoneNumbers;
   contact.save(onSaveSuccess, onSaveError);

}

function onSaveSuccess(contact) {
   alert("Success!");
   clearForm();
   createContactsList();
}

function onSaveError(contactError) {
   alert("Error = " + contactError.code);
}
