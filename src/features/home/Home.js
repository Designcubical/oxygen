import React, { useState } from "react";
import AppBar from "@material-ui/core/AppBar";
import LocalHospital from "@material-ui/icons/LocalHospital";
import Paper from "@material-ui/core/Paper";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import { makeStyles } from "@material-ui/core/styles";
import CssBaseline from "@material-ui/core/CssBaseline";
import Typography from "@material-ui/core/Typography";
import Toolbar from "@material-ui/core/Toolbar";
import Container from "@material-ui/core/Container";
import OtwoForm from "../../components/OtwoForm";

const useStyles = makeStyles((theme) => ({
  icon: {
    marginRight: theme.spacing(2),
  },
  heroContent: {
    backgroundColor: theme.palette.background.paper,
    padding: theme.spacing(10, 0, 6),
  },
  formstart: {
    padding: theme.spacing(2, 0, 1),
  },
}));

const Home = () => {
  const classes = useStyles();
  const [result, setResult] = useState(0);

  const timeConvert = (n) => {
    const minutes = n % 60;
    const hours = (n - minutes) / 60;

    return `${hours}h ${minutes}min`;
  };

  const calculate = ({ expMinVol, fiO2 }) => {
    // 5kg 200bar = 1000l
    // O2 Consumption = (ExpMinVol + 3l/min) * (FiO2 - 20.9) / 79.1
    const vol = parseInt(expMinVol) + 3;
    const fi = parseInt(fiO2) - 20.9;

    return ((vol * fi) / 79.1).toFixed(2);
  };

  return (
    <>
      <CssBaseline />
      <AppBar position="fixed">
        <Toolbar>
          <LocalHospital className={classes.icon} />
          <Typography variant="h6" color="inherit" noWrap>
            Beräkna O2 åtgång
          </Typography>
        </Toolbar>
      </AppBar>
      <main>
        {/* Hero unit */}
        <div className={classes.heroContent}>
          <Container maxWidth="sm">
            <Paper elevation={3}>
              <Typography
                component="h1"
                variant="h2"
                align="center"
                color="textPrimary"
                gutterBottom
              >
                {result} l/min
              </Typography>
            </Paper>
            <TableContainer component={Paper}>
              <Table
                className={classes.table}
                size="small"
                aria-label="a dense table"
              >
                <TableHead>
                  <TableRow>
                    <TableCell>Flaska (200bar)</TableCell>
                    <TableCell align="right">beräknad tid</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  <TableRow key={1}>
                    <TableCell component="th" scope="row">
                      3kg
                    </TableCell>
                    <TableCell align="right">
                      {result > 0 ? timeConvert((600 / result).toFixed(0)) : ""}
                    </TableCell>
                  </TableRow>
                  <TableRow key={2}>
                    <TableCell component="th" scope="row">
                      5kg
                    </TableCell>
                    <TableCell align="right">
                      {result > 0
                        ? timeConvert((1000 / result).toFixed(0))
                        : ""}
                    </TableCell>
                  </TableRow>
                  <TableRow key={3}>
                    <TableCell component="th" scope="row">
                      10kg
                    </TableCell>
                    <TableCell align="right">
                      {result > 0
                        ? timeConvert((2000 / result).toFixed(0))
                        : ""}
                    </TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </TableContainer>
            <Typography variant="h6" gutterBottom className={classes.formstart}>
              Ange värden
            </Typography>
            <OtwoForm
              callback={(values) => setResult(calculate(values))}
              clear={() => setResult(0)}
            />
          </Container>
        </div>
      </main>
    </>
  );
};

export default Home;
