function deleteAppointmentBlock(id, appointment_block_id, recurring_id) {
	console.log("Called delete appointment block with id: " + id + " and appointment_block_id: " + appointment_block_id);

	let formatted_delete_recurring = "true"
	let formatted_recurring_id = recurring_id;
	if(formatted_recurring_id === null) {
		console.log("recurring_id is null")
		formatted_recurring_id = "NULL";
		formatted_delete_recurring = "false";
		console.log(formatted_recurring_id);
	}

	console.log(
		JSON.stringify({
	        	supporter_id : id.toString(),
	  			appointment_block_id : appointment_block_id.toString(),
	  			recurring_id : formatted_recurring_id.toString(),
	  			delete_recurring: formatted_delete_recurring
	    	})
	)

	fetch(
	    "https://7jdf878rej.execute-api.us-east-2.amazonaws.com/test/users/supporters/"+id+"/blocks",
	    {
	      method: "DELETE",
	      headers: {
	        Accept: "application/json",
	        "Content-Type": "application/json"
	      },
	      body: JSON.stringify({
	        	supporter_id : id.toString(),
	  			appointment_block_id : appointment_block_id.toString(),
	  			recurring_id : formatted_recurring_id.toString(),
	  			delete_recurring: formatted_delete_recurring
	    	})
	    }
  )
  .then(response => {
    if (response.status >= 200 && response.status < 300) {
    	console.log("We are getting a good error response");
    	return response.json();
    } else {
    	console.log('Or we are throwing an error that is not being catched??')
      throw new Error("Server can't be reached!");
    }
  })
  .then(json => {
  	console.log('!@@#^%$&^%*^&%^&%$^%@#$#!@$#%$#^%$&^%*&^')
    // window.location.reload();
  })
  .catch(error => {
    console.log(error);
  });
}

export default deleteAppointmentBlock;