import React from "react";
import { useFormik } from "formik";
import * as yup from "yup";
import Button from "@material-ui/core/Button";
import Grid from "@material-ui/core/Grid";
import Slider from "@material-ui/core/Slider";
import Typography from "@material-ui/core/Typography";

const validationSchema = yup.object({
  expMinVol: yup
    .number("Ange expMinVol")
    .required("ExpMinVol är obligatoriskt"),
  fiO2: yup.number("Ange fiO2").required("FiO2 är obligatoriskt"),
});

const OtwoForm = ({ callback, clear }) => {
  const formik = useFormik({
    initialValues: {
      expMinVol: 0,
      fiO2: 22,
    },
    validationSchema: validationSchema,
    onSubmit: (values) => {
      callback({ ...values });
    },
  });

  const marks = [
    {
      value: 0,
      label: "0%",
    },
    {
      value: 25,
      label: "25%",
    },
    {
      value: 50,
      label: "50%",
    },
    {
      value: 75,
      label: "75%",
    },
    {
      value: 100,
      label: "100%",
    },
  ];

  const marks2 = [
    {
      value: 0,
      label: "0",
    },
    {
      value: 5,
      label: "5",
    },
    {
      value: 10,
      label: "10",
    },
    {
      value: 30,
      label: "30",
    },
  ];

  return (
    <form onSubmit={formik.handleSubmit}>
      <Grid container spacing={3}>
        <Grid item xs={12} md={12}>
          <Typography id="continuous-slider" gutterBottom>
            ExpMinVol
          </Typography>
          <Slider
            defaultValue={21}
            getAriaValueText={(value) => {
              return `${value} liter`;
            }}
            aria-labelledby="discrete-slider-always"
            onChange={(e, value) => formik.setFieldValue("expMinVol", value)}
            step={0.1}
            min={0}
            max={30}
            marks={marks2}
            valueLabelDisplay="auto"
          />
        </Grid>
        <Grid item xs={12} md={12}>
          <Typography id="continuous-slider" gutterBottom>
            FiO2
          </Typography>
          <Slider
            defaultValue={21}
            getAriaValueText={(value) => {
              return `${value}%`;
            }}
            aria-labelledby="discrete-slider-always"
            onChange={(e, value) => formik.setFieldValue("fiO2", value)}
            step={1}
            marks={marks}
            valueLabelDisplay="auto"
          />
        </Grid>
        <Grid item xs={12} md={12}>
          <Button color="primary" variant="contained" fullWidth type="submit">
            Beräkna
          </Button>
        </Grid>
      </Grid>
    </form>
  );
};

export default OtwoForm;
