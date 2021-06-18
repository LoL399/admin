import React, { useEffect, useState } from "react";
// @material-ui/core components
import $ from "jquery";
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
import Service from "./service/personService";
import Table from "@material-ui/core/Table";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import Search from "@material-ui/icons/Search";
// core components
import tableStyles from "assets/jss/material-dashboard-react/components/tableStyle.js";
import RegularButton from "components/CustomButtons/Button";
import serialize from "form-serialize";

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

  const [listInfo, setInfo] = useState([])
  const [listTable, setList] = useState([])
  const [offset, setPage] = useState(0)
  const [choosen, setChoosen] = useState({})
  const [search, setSearch] = useState('');
  const [images, setImages] = useState([]);

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
      Service.find({filter: search}).then((list)=>{
        const {data} = list;
        setInfo(data);
       let items = [];
         for (let product of data)
         {
           items.push([product.id, product.type, product.born_in])
         };
       setList(items);
   
      })
    }
  },[search])



  const getData = (offset) =>{
    Service.list({offset}).then((list)=>{
      const {data} = list;
      setInfo(data);
     let items = [];
       for (let person of data)
       {
         items.push([person.id, person.name, person.born_in])
       };
     setList(items)
 
    })
  }

  const getMovie = (id) =>{
    console.log(id)
    setChoosen(listInfo.filter(x=>x.id === id )[0])

  }

  const submitForm = () =>{
    var formData = $("#info")[0];
    var obj = serialize(formData, { hash: true });
    if(images.length > 0)
    {
      obj.photo = images
    }
    console.log(obj);
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
        <RegularButton color="danger"><Add/>  Add new </RegularButton>
          </CardHeader>
          <CardBody>

      <Table className={classes.table}>
        
          <TableHead className={classes["primary TableHeader"]}>
            <TableRow className={classes.tableHeadRow} >
              {["id", "name", "birth place"].map((prop, key) => {
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
          <Button color="primary" disabled={offset === 0} onClick={()=>setPage(offset - 20)}>Previous</Button>
          <Button color="primary" onClick={()=>setPage(offset + 20)}>Next</Button>
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
          <img src={choosen.images? choosen.images.split(',')[0] :  
          'https://upload.wikimedia.org/wikipedia/commons/thumb/a/ac/No_image_available.svg/480px-No_image_available.svg.png'
            } className={classes.moviePoster} />
          </GridItem>
          <GridItem xs={12} sm={12} md={12}>
          <form action="" id='info' className="contact-form">
          <GridContainer>
          <GridItem xs={6} sm={6} md={6}>

                  <label>
                  <input name="name" type="text" placeholder="Name" value={choosen.name || '' }/>
                  <span>Name</span>
                  </label>
                  </GridItem>
                  <GridItem xs={6} sm={6} md={6}>
                  <label>
                  <input name="text" placeholder="birthday" type="date" value = { choosen.birth}/>
                  <span>birth</span>
                  </label>
                  </GridItem>
                  <GridItem xs={6} sm={6} md={6}>
                  <label>
                  <input name="born_in" placeholder="Birth place" type="text" value = { choosen.born_in}/>
                  <span>Birth place</span>
                  </label>
                  </GridItem>
                  <GridItem xs={6} sm={6} md={6}>
                  <label>
                  <textarea name="summary" placeholder="Summary" type="text" value={choosen.summary }/>
                  <span>Birth place</span>
                  </label>
                  </GridItem>
                  <GridItem xs={6} sm={6} md={6}>
                  <label>
                  <input placeholder="Summary" type="file" multiple accept="image/*" onChange={(e)=>{setImages(e.target.value) }} />
                  <span>Images</span>
                  </label>
                  </GridItem>
          </GridContainer>
          </form>
          </GridItem>
        </GridContainer>
        </CardBody>
        <CardFooter>
        <RegularButton color="default" onClick={()=>{alert('ok')}}>Previous</RegularButton>
        <RegularButton color="primary">ABC</RegularButton>
        <RegularButton color="danger" onClick={()=>submitForm()}>Add</RegularButton>
        </CardFooter>
        </Card>

      </GridItem>
    </GridContainer>
  );
}
