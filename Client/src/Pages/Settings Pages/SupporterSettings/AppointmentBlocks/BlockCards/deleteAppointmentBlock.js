function deleteAppointmentBlock(id, appointment_block_id, recurring_id, delete_recurring) {

	let formatted_delete_recurring = delete_recurring.toString();
	let formatted_recurring_id = recurring_id;
	if(formatted_recurring_id === null) {
		formatted_recurring_id = "NULL";
		formatted_delete_recurring = "false";
	}

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
    	return response.json();
    } else {
      throw new Error("Server can't be reached!");
    }
  })
  .then(json => {
    window.location.reload();
  })
  .catch(error => {
    console.log(error);
  });
}

export default deleteAppointmentBlock;