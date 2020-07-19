import moment from 'moment';

var serverTimezone = 'America/New_York'

function createAppointmentBlock(id, start_date, start_time, end_time, num_repeat, max_num_of_appts, isReccuring) {
	let formatted_start_date = moment(start_date).startOf('day').minutes(start_time).tz(serverTimezone).format('YYYY-MM-DD HH:MM:SS');
	let formatted_end_date = moment(start_date).startOf('day').minutes(end_time).tz(serverTimezone).format('YYYY-MM-DD HH:MM:SS');
	
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
	  		start_date : formatted_start_date,
	  		end_date : formatted_end_date,
	  		max_num_of_appts : max_num_of_appts.toString(),
	  		isReccuring : isReccuring.toString(),
	  		recurring_num_weeks: num_repeat.toString()
    	})
    }
  )
  .then(response => {
	console.log(response.json());
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