import { useState, useEffect } from "react";
import "./styles.css";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";

export default function App() {
  const [listItem, setListItem] = useState("");
  const [array, setArray] = useState([]);

  useEffect(() => {
    const items = localStorage.getItem("todoListItems");
    if (items) {
      setArray(JSON.parse(items));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("todoListItems", JSON.stringify(array));
  }, [array]);

  const handleSubmit = () => {
    setArray([...array, listItem]);
    setListItem("");
  };

  const deleteItem = (index) => {
    const newArray = [...array];
    newArray.splice(index, 1);
    setArray(newArray);
  };

  return (
    <div className="App">
      <TextField
        value={listItem}
        onChange={(e) => setListItem(e.target.value)}
        id="outlined-basic"
        label="To-do"
        variant="outlined"
      />
      <Button onClick={handleSubmit} variant="contained">
        Submit
      </Button>

      <div>
        {array.map((item, index) => (
          <div style={{ width: "50%" }} key={index}>
            <Box
              component="span"
              sx={{
                display: "block",
                p: 1,
                m: 1,
                bgcolor: (theme) =>
                  theme.palette.mode === "dark" ? "#101010" : "#fff",
                color: (theme) =>
                  theme.palette.mode === "dark" ? "grey.300" : "grey.800",
                border: "1px solid",
                borderColor: (theme) =>
                  theme.palette.mode === "dark" ? "grey.800" : "grey.300",
                borderRadius: 2,
                fontSize: "0.875rem",
                fontWeight: "700"
              }}
            >
              {item}
            </Box>
            <Button onClick={() => deleteItem(index)} variant="contained">
              Delete
            </Button>
          </div>
        ))}
      </div>
    </div>
  );
}
