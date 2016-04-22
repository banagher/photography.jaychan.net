'use strict';

function celebrityName(firstName) {
	var nameIntro = 'This celebrity is ';

	function lastName(theLastName) {
		return nameIntro + firstName + ' ' + theLastName;
	}

	return lastName;
}

var mjName = celebrityName('Jacky');

console.log(mjName('Chan'));

//---------------------------------------------------------------------//

/*function celebrityID() {
	var celebrityID = 999;

	return {
		getID: function() {
				return celebrityID;
		},
		setID: function(theNewID) {
				celebrityID = theNewID;
		}
	};
}

var mjID = celebrityID();
mjID.setID(555);*/
//console.log(mjID.getID());
