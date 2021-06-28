import React, { useEffect, useRef, useState } from "react";
// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";
// core components
import GridItem from "components/Grid/GridItem.js";
import GridContainer from "components/Grid/GridContainer.js";
import Card from "components/Card/Card.js";
import CardHeader from "components/Card/CardHeader.js";
import CardBody from "components/Card/CardBody.js";
import './style/form.css'
import CardFooter from "components/Card/CardFooter";
import { Button } from "@material-ui/core";
import { Add } from "@material-ui/icons";
import Service from "./service/newsService";
import Table from "@material-ui/core/Table";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import Search from "@material-ui/icons/Search";
// core components
import tableStyles from "assets/jss/material-dashboard-react/components/tableStyle.js";
import RegularButton from "components/CustomButtons/Button";
import { Editor } from '@tinymce/tinymce-react';

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

export default function PersonsList() {
  const editorRef = useRef(null);
  const [listInfo, setInfo] = useState([])
  const [listTable, setList] = useState([])
  const [offset, setPage] = useState(0)
  const [choosen, setChoosen] = useState({})
  const [search, setSearch] = useState('');
  useEffect(async()=>{

      await getData(offset)

  },[offset])


  useEffect(()=>{
    console.log(search)

    if(search === '' )
    {
      console.log('empty')
      getData(0);
    }
    else
    {

      Service.find({filter: search}).then((list)=>{
        const {data} = list;
        console.log(data)
        setInfo(data);
       let items = [];
         for (let product of data)
         {
          items.push([product.id, product.date, product.content.match(/<h1>(.|\n)*?<\/h1>/g)])
         }
       setList(items);
   
      })
    }
  },[search])



  const getData = (offset) =>{
    Service.list({offset}).then((list)=>{
      const {data} = list;
      setInfo(data);
     let items = [];
       for (let news of data)
       {
         items.push([news.id, news.date, news.content.match(/<h1>(.|\n)*?<\/h1>/g)])
       }
     setList(items)
 
    })
  }

  const getMovie = (id) =>{
    console.log(id);
    let post = listInfo.filter(x=>x.id === id )[0];
    setChoosen(JSON.parse(JSON.stringify(post)));

  }

  const submitForm = () =>{
    console.log(editorRef.current.getContent())
  }

  const classes = useStyles();
  return (
    <GridContainer>
      <GridItem xs={12} sm={12} md={6}>
        <Card>
          <CardHeader color="primary">
            <h4 className={classes.cardTitleWhite}>Info table</h4>

            <input onChange={(e)=>setSearch(e.target.value)}/>
            <Button color="white" aria-label="edit" justIcon round>
          <Search />
        </Button>
        <RegularButton color="danger" onClick={()=>{setChoosen({})}}><Add/>  Add new </RegularButton>
          </CardHeader>
          <CardBody>

      <Table className={classes.table}>
        
          <TableHead className={classes["primary TableHeader"]}>
            <TableRow className={classes.tableHeadRow} >
              {["id", "date", "article's name"].map((prop, key) => {
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
          <Button color="primary" disabled={offset === 0} onClick={()=>setPage(offset - 5)}>Previous</Button>
          <Button color="primary" onClick={()=>setPage(offset + 5)}>Next</Button>
          </CardFooter>
        </Card>
      </GridItem>
      <GridItem  xs={12} sm={12} md={6}>
           
      <Card>
        <CardHeader color="primary">
          <h4 className={classes.cardTitleWhite}>Simple Table</h4>
          <p className={classes.cardCategoryWhite}>
            Here is a subtitle for this table
          </p>
        </CardHeader>
        <CardBody>
        <GridContainer>
          <GridItem xs={12} sm={12} md={12}>
              <Editor
                onInit={(evt, editor) => editorRef.current = editor}
                initialValue = {choosen.content || ''}
                init={{
                  height: 500,
                  menubar: false,
                  plugins: [
                    'advlist autolink lists link image charmap print preview anchor',
                    'searchreplace visualblocks code fullscreen',
                    'insertdatetime media table paste code help wordcount'
                  ],
                  toolbar: 'undo redo | formatselect | ' +
                  'bold italic backcolor | alignleft aligncenter ' +
                  'alignright alignjustify | bullist numlist outdent indent | ' +
                  'removeformat | help',
                  content_style: 'body { font-family:Helvetica,Arial,sans-serif; font-size:14px }'
                }}
              />
          
          </GridItem>
        </GridContainer>
        </CardBody>
        <CardFooter>
        <RegularButton color="primary">ABC</RegularButton>
        <RegularButton color="danger" onClick={()=>submitForm()}>Add</RegularButton>
        </CardFooter>
        </Card>

      </GridItem>
    </GridContainer>
  );
}
