import moment from 'moment-timezone';

var serverTimezone = 'America/New_York'
var serverDateTimeFormat = 'YYYY-MM-DD HH:MM:SS'

function createAppointmentBlock(id, start_datetime, end_datetime, num_repeat, max_num_of_appts, isReccuring) {	
  console.log(start_datetime.format(serverDateTimeFormat) + " " + end_datetime.format(serverDateTimeFormat));
  
  fetch(
    "https://7jdf878rej.execute-api.us-east-2.amazonaws.com/test/users/supporters/"+id+"/blocks",
    {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        supporter_id : id.toString(),
	  		start_date : start_datetime.tz(serverTimezone).format(serverDateTimeFormat),
	  		end_date : end_datetime.tz(serverTimezone).format(serverDateTimeFormat),
	  		max_num_of_appts : max_num_of_appts.toString(),
	  		isReccuring : isReccuring.toString(),
	  		recurring_num_weeks: num_repeat.toString()
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

export default createAppointmentBlock;