import React, { useEffect, useState } from "react";
// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";
// core components
import GridItem from "components/Grid/GridItem.js";
import GridContainer from "components/Grid/GridContainer.js";

import Card from "components/Card/Card.js";
import CardHeader from "components/Card/CardHeader.js";
import CardBody from "components/Card/CardBody.js";

import CardFooter from "components/Card/CardFooter";
import { Button } from "@material-ui/core";
import MovieForm from "./components/movieForm";
import { Add } from "@material-ui/icons";
import filmsService from "./service/filmsService";
import Table from "@material-ui/core/Table";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import Search from "@material-ui/icons/Search";
// core components
import tableStyles from "assets/jss/material-dashboard-react/components/tableStyle.js";

const styles = {
  moviePoster:{

    width: '200px',
    height: 'auto',
    margin: 'auto',
    display: 'block',
  },


  cardCategoryWhite: {
    "&,& a,& a:hover,& a:focus": {
      color: "rgba(255,255,255,.62)",
      margin: "0",
      fontSize: "14px",
      marginTop: "0",
      marginBottom: "0",
    },
    "& a,& a:hover,& a:focus": {
      color: "#FFFFFF",
    },
  },
  seacrhArea: {
    color: "#FFFFFF",
  },

  cardTitleWhite: {
    color: "#FFFFFF",
    marginTop: "0px",
    minHeight: "auto",
    fontWeight: "300",
    fontFamily: "'Roboto', 'Helvetica', 'Arial', sans-serif",
    marginBottom: "3px",
    textDecoration: "none",
    "& small": {
      color: "#777",
      fontSize: "65%",
      fontWeight: "400",
      lineHeight: "1",
    },
  },
  ...tableStyles,
};

const useStyles = makeStyles(styles);

export default function MovieList() {

  const [listInfo, setInfo] = useState([])
  const [listTable, setList] = useState([])
  const [offset, setPage] = useState(0)
  const [choosen, setChoosen] = useState({})
  const [search, setSearch] = useState('');

  useEffect(async()=>{

      getData(offset)

  },[offset])


  useEffect(()=>{
    if(search === '' )
    {
      console.log('empty')
      setPage(0);
    }
    else
    {
      filmsService.find({filter: search}).then((list)=>{
        const {data} = list;
        setInfo(data);
       let items = [];
         for (let product of data)
         {
           let info = JSON.parse(product.info )
           items.push([product.id, product.type, info.name])
         };
       setList(items);
   
      })
    }
  },[search])



  const getData = (offset) =>{
    filmsService.list({offset}).then((list)=>{
      const {data} = list;
      setInfo(data);
     let items = [];
       for (let product of data)
       {
         let info = JSON.parse(product.info )
         items.push([product.id, product.type, info.name])
       };
     setList(items)
 
    })
  }

  const getMovie = (id) =>{
    console.log(id)
    setChoosen(listInfo.filter(x=>x.id === id )[0])
  }

  const classes = useStyles();
  return (
    <GridContainer>
      <GridItem xs={12} sm={12} md={6}>
        <Card>
          <CardHeader color="primary">
            <h4 className={classes.cardTitleWhite}>Simple Table</h4>
            <p className={classes.cardCategoryWhite}>
              Film table
            </p>
            <input onChange={(e)=>setSearch(e.target.value)}/>
            <Button color="white" aria-label="edit" justIcon round>
          <Search />
        </Button>
          </CardHeader>
          <CardBody>

      <Table className={classes.table}>
        
          <TableHead className={classes["primary TableHeader"]}>
            <TableRow className={classes.tableHeadRow} >
              {["id", "type", "name"].map((prop, key) => {
                return (
                  <TableCell
                    className={classes.tableCell + " " + classes.tableHeadCell}
                    key={key}
                  >
                    {prop}
                  </TableCell>
                );
              })}
            </TableRow>
          </TableHead>

        <TableBody>
          {listTable.map((prop, key) => {
            return (
              <TableRow key={key} className={classes.tableBodyRow}  onClick={()=>getMovie(prop[0])}>
                {prop.map((prop, key) => {
                  return (
                    <TableCell className={classes.tableCell} key={key}>
                      {prop}
                    </TableCell>
                  );
                })}
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
          </CardBody>
          <CardFooter>
          <Button color="primary" disabled={offset === 0} onClick={()=>setPage(offset - 1)}>Previous</Button>
          <Button color="secondary"><Add/>  Add new </Button>
          <Button color="primary" onClick={()=>setPage(offset + 20)}>Next</Button>
          </CardFooter>
        </Card>
      </GridItem>
      <GridItem  xs={12} sm={12} md={6}>
        <MovieForm item = {choosen}/>
      </GridItem>
    </GridContainer>
  );
}
