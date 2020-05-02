
async function getUserAsync() 
{
  let response = await fetch("https://7jdf878rej.execute-api.us-east-2.amazonaws.com/prod/table/specialization-types");
  let data = await response.json()
  return data;
}

var specs = getUserAsync().then(data => console.log(data))


export default specs