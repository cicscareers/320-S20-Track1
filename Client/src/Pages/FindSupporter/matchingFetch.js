import React, { useEffect } from "react";

const FetchSups= () => {
    const [isLoaded, setLoaded] = React.useState(false);
    const [Supporters, setSupporters] = React.useState([])
    useEffect(() => {
        fetch('https://7jdf878rej.execute-api.us-east-2.amazonaws.com/test/users/supporters?start_date=2020-01-01%2000%3A00%3A00&end_date=2021-01-01%2000%3A00%3A00')
                .then(res => res.json())
                .then(json => {
                  if(json.body[0]!==undefined){
                    console.log(json)
                    setLoaded(true);
                    setSupporters(json.body)
                  }else{
                    throw new Error();
                  }
                })
                .catch(error => {
                  console.log("No Supporters Found")
                });
        }, [])
        return Supporters
}

export default FetchSups;