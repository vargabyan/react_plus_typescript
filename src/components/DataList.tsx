import React from "react";
import Grid from "@mui/material/Grid";
import Checkbox from "@mui/material/Checkbox";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import { ListGrid } from "./DataListStyle";
import { IDataLocalStorage } from "./ToDo";

type DataListProps = {
  data: Array<IDataLocalStorage>;
  setData: React.Dispatch<React.SetStateAction<IDataLocalStorage[]>>;
  setValue: React.Dispatch<React.SetStateAction<string>>;
  setSelaectedIdItem: React.Dispatch<React.SetStateAction<string | null>>;
};

const DataList: React.FC<DataListProps> = ({
  data,
  setData,
  setValue,
  setSelaectedIdItem,
}) => {
  const handleDelet = () => {
    const filterData = data.filter((index) => index.selectedElement !== true);
    localStorage.setItem("toDo", JSON.stringify(filterData));
    setData(filterData);
    setValue("");
    setSelaectedIdItem(null);
  };

  const handleCheckbox = (id: string) => {
    const filterData = data.map((index: IDataLocalStorage) => {
      if (id === index.id) {
        index.selectedElement = !index.selectedElement;
      } else {
        index.selectedElement = false;
        setValue("");
      }
      return index;
    });
    localStorage.setItem("toDo", JSON.stringify(filterData));
    setData(filterData);
  };
  console.log(data)

  const list = data.map((index) => {
    return (
      <Grid item xs={8} key={`${index.id}`}>
        <ListGrid>
          <Grid container direction="row" justifyContent="space-between">
            <Grid item xs={10} sm={11}>
              <Grid
                container
                direction="row"
                justifyContent="space-between"
                onClick={() => handleCheckbox(index.id)}
              >
                <Grid item xs={2}>
                  <Checkbox
                    disabled={!index.selectedElement}
                    checked={index.selectedElement}
                  />
                </Grid>
                <Grid item xs={10} sx={{ textAlign: "center" }}>
                  <Typography variant="h6" >
                    {index.text}
                  </Typography>
                </Grid>
              </Grid>
            </Grid>
            <Grid item>
              <IconButton
                disabled={!index.selectedElement}
                onClick={handleDelet}
                sx={{
                  color: (!index.selectedElement) ? '' : '#f50057',
                }}
              >
                <DeleteOutlineIcon />
              </IconButton>
            </Grid>
          </Grid>
        </ListGrid>
      </Grid>
    );
  });
  const listReverse = list.reverse()

  return (
    <Grid container rowSpacing={3} justifyContent="center">
      {listReverse}
    </Grid>
  );
};

export default DataList;
