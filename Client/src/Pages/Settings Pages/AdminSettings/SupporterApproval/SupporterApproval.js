import React, { useEffect, useState } from 'react';
import ApprovalCard from './ApprovalCard'
import {Typography} from '@material-ui/core'

const SupporterApproval = () => {

const [unapproved, setUnapproved] = useState([])
const [isLoaded, setLoaded] = useState(false)
const [noSupporters, setNoSupporters]=useState(false)

    useEffect(() => {
        fetch('https://7jdf878rej.execute-api.us-east-2.amazonaws.com/test/users/supporters/unapproved')
        .then(res => res.json())
        .then(json => {
            if(json.body){
                setNoSupporters(false)
                setUnapproved(json.body)
                setLoaded(true)
            }
            else{
                throw new Error()
            }

        })
        .catch(error => {
            setNoSupporters(true)
            setLoaded(true);
            console.log("No Supporters Found")
          });
    });

    function handleType(supporter){
        if(supporter.s_professional_staff){
            return "Professional Staff";
        }
        if(supporter.s_alumni){
            return "Alumni";
        }
        if(supporter.s_faculty){
            return "Faculty";
        }
        if(supporter.s_other){
            return "Other";
        }
        
    }

    if(!isLoaded){
        return <Typography>Loading...</Typography>
    }
    else if(noSupporters){
        return <Typography>There are currently no pending requests</Typography>
    }
    else{
        return(
            <main>
            {unapproved.map((supporter) => (
                <ApprovalCard
                id={supporter.s_supporter_id}
                name = {supporter.s_first_name + " " + supporter.s_last_name}
                office={supporter.s_office}
                supporterType={handleType(supporter)}
                employer={supporter.s_employer}
                email={supporter.s_email}
                title={supporter.s_title}
                team={supporter.s_team_name}
                />
            ))}
                
            
            </main>
         );
    }
   
    
}

export default SupporterApproval;