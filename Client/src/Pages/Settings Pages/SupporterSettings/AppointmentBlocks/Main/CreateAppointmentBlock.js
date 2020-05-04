function createAppointmentBlock(id, start_date, start_time, end_time, num_repeat, max_num_of_appts, isReccuring) {

	function convertTimeToMilitary(value) {
	    let hour=Math.floor(value/60);
	    let minute=value%60;
	    if(hour < 10) {
	    	hour = "0" + hour;
	    }
	    minute=(minute<10)?"0"+minute:minute
    return `${hour}:${minute}:00`;
	}

	function formatDateForLambda(year, month, day) {
		let formatted_date = year + "-";
		if(month < 10) {
			formatted_date += "0";
		}
		formatted_date += month + "-";
		if(day < 10) {
			formatted_date += "0";
		}
		formatted_date += day
		return formatted_date;
	}

	const start_year = start_date.getFullYear();
	const start_month = start_date.getMonth();
	const start_day = start_date.getDate();

	let end_date = new Date(start_year, start_month, start_day);
	end_date.setMinutes(end_date.getMinutes() + end_time);
	

	// Plus 1 because getMonth is 0 indexed
	let formatted_start_date = formatDateForLambda(start_year, start_month + 1, start_day) + " " + convertTimeToMilitary(start_time);
	let formatted_end_date = formatDateForLambda(end_date.getFullYear(), end_date.getMonth() + 1, end_date.getDate()) + " " + convertTimeToMilitary(end_time);

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