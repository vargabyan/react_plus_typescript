import React from "react";
import Grid from "@mui/material/Grid";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import { useNavigate } from "react-router-dom";

const Info: React.FC = () => {
  const navigate = useNavigate();

  const handleToBack = () => {
    navigate("/to-do-list");
  };

  return (
    <Grid container justifyContent="center">
      <Grid item xs={8}>
        <Grid container direction="column" spacing={3}>
          <Grid item>
            <Typography variant="h3">Страница информации</Typography>
          </Grid>
          <Grid item>
            Lorem ipsum dolor, sit amet consectetur adipisicing elit. Similique
            iure omnis praesentium provident, eos sit dolor veritatis ab
            voluptas error ipsa pariatur dolore possimus aliquam quisquam.
            Omnis, at magni. Quis perspiciatis nemo porro repellendus nulla!
          </Grid>
          <Grid item>
            <Button variant="contained" onClick={handleToBack}>
              Обратно к главному страницу
            </Button>
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  );
};

export default Info;
