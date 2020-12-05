import React, { useState, useEffect } from "react";
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import Box from '@material-ui/core/Box';
import Collapse from '@material-ui/core/Collapse';
import IconButton from '@material-ui/core/IconButton';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Typography from '@material-ui/core/Typography';
import Paper from '@material-ui/core/Paper';
import KeyboardArrowDownIcon from '@material-ui/icons/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@material-ui/icons/KeyboardArrowUp';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';

import {CSVLink, CSVDownload} from 'react-csv';

import { confirmAlert } from 'react-confirm-alert'; // Import
import 'react-confirm-alert/src/react-confirm-alert.css'; // Import css

import UserService from '../services/user.service';
//import { listenerCount } from "mysql2/typings/mysql/lib/Pool";

const useRowStyles = makeStyles({
  root: {
    '& > *': {
      borderBottom: 'unset',
    },
  },
});

function Row(props) {
  const { row } = props;
  const [open, setOpen] = React.useState(false);
  const classes = useRowStyles();
  const [dial, setDial] = React.useState(false);
  const [member_task, setMemtask] = React.useState([]);
  const [filesrc, setSrc] = React.useState("");
  const [URL, setUrl] = React.useState("");
  const [loaded, setLoaded] = useState(false);
  const [csvdata, setCsvdata] = useState([]);

  useEffect(() => {
    getfile();
  }, []);

  useEffect(() => {
    setLoaded(true);
    console.log(csvdata);
  }, [csvdata]);
  
  const handleClickOpen = (id) => {
    UserService.task_member(id)
    .then(rows => {
      setMemtask(rows.data);
    })
    setDial(true);
  };

  const handleClose = () => {
    setDial(false);
  };
  const getfile = () => {
    console.log("be");
    UserService.getfile(row)
    .then((response) =>{
        console.log(response);
        setSrc(response);
        setCsvdata(response.data);
      }
    )
    return filesrc;
  }

  const handleUrl = (e) =>{
    console.log('hi');
    setUrl('http://localhost:3001/src/api/getfile?task_name='+e);
  }
  return (
    <React.Fragment>
      <TableRow className={classes.root}>
        <TableCell>
          <IconButton aria-label="expand row" size="small" onClick={() => setOpen(!open)}>
            {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
          </IconButton>
        </TableCell>
        <TableCell component="th" scope="row">
          {row.Task_name}
        </TableCell>
        <TableCell align="right">
          {loaded && <CSVLink data={csvdata} filename={row.Task_name + ".csv"}>Download me</CSVLink>}
        </TableCell>
        <TableCell align="right">{row.Desc}</TableCell>
        <TableCell align="right">{row.Pass}</TableCell>
        <TableCell align="right">{row.Total}</TableCell>
      </TableRow>
      <TableRow>
        <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
          <Collapse in={open} timeout="auto" unmountOnExit>
            <Box margin={1}>
              <Typography variant="h6" gutterBottom component="div">
                Original
              </Typography>
              <Table size="small" aria-label="purchases">
                <TableHead>
                  <TableRow>
                    <TableCell>Type Name</TableCell>
                    <TableCell align="right">Pass</TableCell>
                    <TableCell align="right">Total</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {row.Sub.map((origin) => (
                    <TableRow key={origin.Type_name}>
                      <TableCell component="th" scope="row">
                        {origin.Type_name}
                      </TableCell>
                      <TableCell align="right">{origin.Pass}</TableCell>
                      <TableCell align="right">
                        {origin.Total}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </Box>
            <Box margin={1}>
              <Typography variant="h6" gutterBottom component="div">
                Member
              </Typography>
              <Table size="small" aria-label="purchases">
                <TableHead>
                  <TableRow>
                    <TableCell>Name</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {row.Member.map((member) => (
                    <TableRow key={member}>
                      <TableCell component="th" scope="row" onClick={() => handleClickOpen(member.Id)}>
                        {member.Name}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </Box>
          </Collapse>
        </TableCell>
      </TableRow>
      <Dialog
        open={dial}
        //TransitionComponent={Transition}
        keepMounted
        onClose={handleClose}
        aria-labelledby="alert-dialog-slide-title"
        aria-describedby="alert-dialog-slide-description"
      >
      <TableHead>
        <TableRow>
          <TableCell>Task Name</TableCell>
        </TableRow>
      </TableHead>
      <TableBody>
        {member_task.map((task) => (
          <TableRow key={task}>
            <TableCell component="th" scope="row">
              {task}
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Cancel
          </Button>
        </DialogActions>
      </Dialog>
    </React.Fragment>
    
  );
}

export default function CollapsibleTable() {
  const [rows, setRows] = useState();
  const [isLoading, setLoading] = useState(true);

  useEffect(() => {
    console.log("@@@@@@@@@@@@@@@@@@@@@@@@");
    // Update the document title using the browser API
    UserService.task_stat().then(
        (response) => {
            setRows(response.data)
            setLoading(false);
        }
    )
    .catch((err) => {
        console.log('error: ', err);
        setLoading(false);
    });
  }, []);
  
  return (
    <TableContainer component={Paper}>
      {isLoading && <div>
      <Table aria-label="collapsible table">
        <TableHead>
          <TableRow>
              <TableCell />
              <TableCell >Task Name</TableCell>
              <TableCell align="right">Download</TableCell>
              <TableCell align="right">Description</TableCell>
              <TableCell align="right">Pass&nbsp;</TableCell>
              <TableCell align="right">Total&nbsp;</TableCell>
          </TableRow>
        </TableHead>
      </Table>
        </div>}
        {!isLoading && <div>
        <Table aria-label="collapsible table">
            <TableHead>
            <TableRow>
                <TableCell />
                <TableCell >Task Name</TableCell>
                <TableCell align="right">Download</TableCell>
                <TableCell align="right">Description</TableCell>
                <TableCell align="right">Pass&nbsp;</TableCell>
                <TableCell align="right">Total&nbsp;</TableCell>
            </TableRow>
            </TableHead>
            <TableBody>
            {rows.map((row) => (
                <Row row={row}/>
            ))}
            </TableBody>
        </Table>
        </div>}
    </TableContainer>
  );
}
