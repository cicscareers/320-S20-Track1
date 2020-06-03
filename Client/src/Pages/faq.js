import React, { useEffect, useState } from "react";
import {
  Typography,
  CircularProgress,
  Grid,
  TextField,
} from "@material-ui/core";
import FaqCard from "../components/faqCard";

const FaqSettings = () => {
  const [isLoaded, setLoaded] = useState(false);
  const [faqList, setFaqList] = useState([]);
  const [search, setSearch] = useState("");

  useEffect(() => {
    fetch(
      "https://7jdf878rej.execute-api.us-east-2.amazonaws.com/test/table/faq"
    )
      .then((res) => res.json())
      .then((json) => {
        setFaqList(json.faqs);
        setLoaded(true);
      });
  });

  if (!isLoaded) {
    return (
      <div align="center">
        <br></br>
        <Typography variant="h4">Loading...</Typography>
        <br></br>
        <CircularProgress />
      </div>
    );
  } else {
    return (
      <main>
        <Grid container>
          <Grid item xs={12}>
            <TextField
              variant="outlined"
              margin="normal"
              fullWidth
              label="Search for FAQ"
              onChange={(e) => setSearch(e.target.value.toLowerCase())}
            />
          </Grid>
        </Grid>
        {faqList
          .filter((faq) => {
            let searchable = faq.question.toLowerCase();
            return searchable.indexOf(search) !== -1;
          })
          .map((faq) => [
            <FaqCard
              question={faq.question}
              answer={faq.answer}
              id={faq.faq_id}
            />,
          ])}
      </main>
    );
  }
};

export default FaqSettings;
