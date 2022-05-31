import React, { useState, useEffect } from "react";
import Grid from "@mui/material/Grid";
import IconButton from "@mui/material/IconButton";
import OutlinedInput from "@mui/material/OutlinedInput";
import InputLabel from "@mui/material/InputLabel";
import InputAdornment from "@mui/material/InputAdornment";
import FormControl from "@mui/material/FormControl";
import CheckIcon from "@mui/icons-material/Check";
import DataList from "./DataList";

interface IDataLocalStorage {
  id: string;
  text: string;
  selectedElement: boolean;
}
type GetStorage = string | null;

const ToDo: React.FC = function () {
  const [value, setValue] = useState<string>("");
  const [data, setData] = useState<Array<IDataLocalStorage>>([]);
  const [selectedIdItem, setSelaectedIdItem] = useState<string | null>(null);
  const getStorage: GetStorage = localStorage.getItem("toDo");

  const addLocalStorage = () => {
    if (value !== "") {
      const storageValue: IDataLocalStorage = {
        id: Date.now().toString(),
        text: value,
        selectedElement: false,
      };

      if (getStorage) {
        const getToDo: Array<IDataLocalStorage> = data;

        if (selectedIdItem) {
          for (const key in getToDo) {
            if (selectedIdItem === getToDo[key].id) {
              getToDo[key].text = value;
              getToDo[key].selectedElement = false;
              setSelaectedIdItem(null);
            }
          }
          localStorage.setItem("toDo", JSON.stringify(getToDo));
        } else {
          getToDo.push(storageValue);
          localStorage.setItem("toDo", JSON.stringify(getToDo));
        }
      } else {
        localStorage.setItem("toDo", JSON.stringify([storageValue]));
      }
      setValue("");
    }
  };

  const editItem = () => {
    data.forEach((elem: IDataLocalStorage) => {
      if (elem.selectedElement) {
        setValue(elem.text);
        setSelaectedIdItem(elem.id);
      }
    });
  };

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setValue(event.target.value);
  };

  const handleClickCheckIcon = () => {
    addLocalStorage();
  };

  const handleKeyPress = (event: React.KeyboardEvent) => {
    if (event.key === "Enter") {
      addLocalStorage();
    }
  };

  useEffect(() => {
    getStorage ? setData(JSON.parse(getStorage)) : setData([]);
    editItem();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [getStorage]);

  return (
    <Grid container justifyContent="center" direction="column" spacing={3}>
      <Grid item>
        <Grid container justifyContent="center">
          <Grid item xs={8}>
            <FormControl sx={{ width: "100%" }} variant="outlined">
              <InputLabel>Создайте список</InputLabel>
              <OutlinedInput
                type="text"
                value={value}
                onChange={handleChange}
                onKeyPress={handleKeyPress}
                endAdornment={
                  <InputAdornment position="end">
                    <IconButton onClick={handleClickCheckIcon} edge="end">
                      <CheckIcon />
                    </IconButton>
                  </InputAdornment>
                }
                label="Создайте список"
              />
            </FormControl>
          </Grid>
        </Grid>
      </Grid>
      <Grid item>
        <DataList
          data={data}
          setData={setData}
          setValue={setValue}
          setSelaectedIdItem={setSelaectedIdItem}
        />
      </Grid>
    </Grid>
  );
};

export type { IDataLocalStorage };
export default ToDo;
