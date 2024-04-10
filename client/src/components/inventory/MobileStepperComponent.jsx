import * as React from 'react';
import { useTheme } from '@mui/material/styles';
import MobileStepper from '@mui/material/MobileStepper';
import Button from '@mui/material/Button';
import KeyboardArrowLeft from '@mui/icons-material/KeyboardArrowLeft';
import KeyboardArrowRight from '@mui/icons-material/KeyboardArrowRight';

function CustomMobileStepper({ activeStep, maxSteps, handleNext, handleBack }) {
  const theme = useTheme();

  return (
    <MobileStepper
      steps={maxSteps}
      position="static"
      activeStep={activeStep}
      nextButton={
        <Button
          size="small"
          onClick={handleNext}
          disabled={activeStep === maxSteps - 1}
          style={{color:"black"}}
        >
          Next
          {theme.direction === 'rtl' ? (
            <KeyboardArrowLeft style={{color:"black"}}/>
          ) : (
            <KeyboardArrowRight style={{color:"black"}} />
          )}
        </Button>
      }
      backButton={
        <Button size="small" onClick={handleBack} disabled={activeStep === 0} style={{color:"black"}}>
          {theme.direction === 'rtl' ? (
            <KeyboardArrowRight style={{color:"black"}}/>
          ) : (
            <KeyboardArrowLeft style={{color:"black"}}/>
          )}
          Back
        </Button>
      }
    />
  );
}

export default CustomMobileStepper;
