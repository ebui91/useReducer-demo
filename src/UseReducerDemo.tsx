import React, { useState, useReducer } from "react";
import dayjs, { Dayjs } from "dayjs";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { Button, TextField } from "@material-ui/core";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";

const UseReducerDemo = () => {
  /* useState hell */
  // const [firstName, setFirstName] = useState<string>("");
  // const [lastName, setLastName] = useState<string>("");
  // const [date, setDate] = React.useState<Dayjs | null>(null);

  /* useReducer example */
  // useReducer(function(), initialState: {})

  const [form, updateForm] = useReducer(
    (prev, next) => {
      // Additional argument: a function for intercepting and modifying state updates
      // return { ...prev, ...next };
      // console.log("prev: ", prev);
      // console.log("next: ", next);

      const formUpdate = { ...prev, ...next };

      // Validation logic
      if (formUpdate.firstName.length > 10) {
        formUpdate.firstName = formUpdate.firstName.substring(0, 10);
      }

      if (dayjs(formUpdate.date).isValid()) {
        if (formUpdate.date.isAfter(dayjs())) {
          formUpdate.date = dayjs().format("MM/DD/YYYY");
        } else {
          formUpdate.date = formUpdate.date.format("MM/DD/YYYY");
        }
      } else {
        formUpdate.date = dayjs(null);
      }

      // Return the "safe" form object
      return formUpdate;
    },
    {
      firstName: "",
      lastName: "",
      date: dayjs(null)
    }
  );

  /* sx objects */
  const FormStyles = {
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-around",
    height: "20rem",
    width: "30rem",
    padding: "1rem",
    boxShadow: "0 4px 12px rgb(0 0 0 / 0.5)",
    borderRadius: "0.25rem"
  } as const;

  const ValueStyles = {
    marginTop: "3rem"
  } as const;

  const { firstName, lastName, date } = form;

  return (
    <>
      <div style={FormStyles}>
        <h1>useReducer vs useState</h1>

        <TextField
          placeholder="First Name"
          value={firstName}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
            // setFirstName(e.target.value)
            updateForm({ firstName: e.target.value })
          }
          variant="filled"
        />

        <TextField
          placeholder="Last Name"
          value={lastName}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
            // setLastName(e.target.value)
            updateForm({ lastName: e.target.value })
          }
          variant="filled"
        />

        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <DatePicker
            inputFormat="MM-DD-YYYY"
            label="Date of Birth"
            value={date}
            onChange={(newValue) => {
              // setDate(newValue);
              updateForm({ date: newValue });
            }}
            renderInput={(params) => (
              // @ts-ignore
              <TextField value={""} type="time" {...params} />
            )}
          />
        </LocalizationProvider>

        <Button
          variant="contained"
          color="primary"
          onClick={() => {
            // setFirstName("");
            // setLastName("");
            // setDate(dayjs(null));
            updateForm({ firstName: "", lastName: "", date: dayjs(null) });
          }}
        >
          CLEAR
        </Button>
      </div>

      <div style={ValueStyles}>
        <h2>Form Values: </h2>
        <p>{`First Name: ${firstName}`}</p>
        <p>{`Last Name: ${lastName}`}</p>
        <p>{`Date of Birth: ${date}`}</p>
      </div>
    </>
  );
};

export default UseReducerDemo;
