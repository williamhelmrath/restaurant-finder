import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Stepper from "@material-ui/core/Stepper";
import Step from "@material-ui/core/Step";
import StepLabel from "@material-ui/core/StepLabel";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import Paper from "@material-ui/core/Paper";
import SearchForm from "./components/SearchForm";
import SelectForm from "./components/SelectForm";
import ReserveForm from "./components/ReserveForm";

const useStyles = makeStyles(theme => ({
  root: {
    width: "100%"
  },
  button: {
    marginRight: theme.spacing(1)
  },
  instructions: {
    marginTop: theme.spacing(1),
    marginBottom: theme.spacing(1)
  }
}));

function getSteps() {
  return ["Search", "Select restaurant", "Make a reservation"];
}

export default function App() {
  const classes = useStyles();
  const [activeStep, setActiveStep] = useState(0);
  const [searchTerm, setSearchTerm] = useState("");
  const steps = getSteps();

  const handleNext = () => setActiveStep(prevActiveStep => prevActiveStep + 1);

  const getStepContent = step => {
    switch (step) {
      case 0:
        return (
          <SearchForm
            handleNext={handleNext}
            setSearchTerm={setSearchTerm}
          ></SearchForm>
        );
      case 1:
        return <SelectForm searchTerm={searchTerm}></SelectForm>;
      case 2:
        return <ReserveForm></ReserveForm>;
      default:
        return "Unknown step";
    }
  };

  return (
    <div className={classes.root}>
      <Paper style={{ margin: "3vh" }}>
        <Stepper activeStep={activeStep}>
          {steps.map((label, index) => {
            const stepProps = {};
            const labelProps = {};

            return (
              <Step key={label} {...stepProps}>
                <StepLabel {...labelProps}>{label}</StepLabel>
              </Step>
            );
          })}
        </Stepper>
        <div>
          {activeStep === steps.length ? (
            <div>
              <Typography className={classes.instructions}>
                All steps completed - you&apos;re finished
              </Typography>
            </div>
          ) : (
            <div style={{ padding: "1vh" }}>
              {getStepContent(activeStep)}

              {/* <div>
                <Button
                  variant="contained"
                  color="primary"
                  onClick={handleNext}
                  className={classes.button}
                >
                  {activeStep === steps.length - 1 ? "Finish" : "Next"}
                </Button>
              </div> */}
            </div>
          )}
        </div>
      </Paper>
    </div>
  );
}
