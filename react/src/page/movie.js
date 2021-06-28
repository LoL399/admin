import React, { useEffect, useState } from "react";
// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";
import $ from "jquery";
// core components
import GridItem from "components/Grid/GridItem.js";
import GridContainer from "components/Grid/GridContainer.js";
import serialize from "form-serialize";
import Card from "components/Card/Card.js";
import CardHeader from "components/Card/CardHeader.js";
import CardBody from "components/Card/CardBody.js";
import RegularButton from "components/CustomButtons/Button";
import CardFooter from "components/Card/CardFooter";
import { Button } from "@material-ui/core";
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
  const [choosen, setChoosen] = useState({info: '{}'})
  const [search, setSearch] = useState('');
  const [images, setImages] = useState([]);
  const season = {id: 0 ,season_name: '', summary: '', starting:'', episodes: []}
  const cast = {personName: '', characterName: ''}
  const [crew, setCrew] = useState([]);
  // const episode = {id: 0, name: '', airDate: '', summary: ''}

  const [seasonList, setSeasons] = useState([]);

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
           let info = JSON.parse(product.info );
           items.push([product.id, product.type, info.name]);
         }
       setList(items);
   
      })
    }
  },[search])


  const submitForm = () =>{

    var seasons = [];

    for(let i = 1 ; i <= seasonList.length; i++)
    {
      var data = $(`#season${i}`)[0];
      seasons.push(serialize(data, { hash: true }))
    }
    var casts = [];
    for(let i = 1 ; i <= crew.length; i++)
    {
      var cast = $(`#crew${i}`)[0];
      casts.push(serialize(cast, { hash: true }))
    }
    var formData = $("#info")[0];
    var typeData= $('#type')[0];
    var info = serialize(formData, { hash: true });
    var type =  serialize(typeData, { hash: true });
    if(images.length > 0)
    {
      info.photo = images
    }
    console.log({type, info, seasons,casts});
  }

  const getData = (offset) =>{
    filmsService.list({offset}).then((list)=>{
      const {data} = list;
      setInfo(data);
     let items = [];
       for (let product of data)
       {
         let info = JSON.parse(product.info )
         items.push([product.id, product.type, info.name])
       }
     setList(items)
 
    })
  }

  const getMovie = (id) =>{
    console.log(id);
    let movie = listInfo.filter(x=>x.id === id )[0];
    setChoosen(JSON.parse(JSON.stringify(movie)));
    // console.log(movie.seasons.split(new RegExp("(?<=}),")))
    if(movie.seasons)
    {
      let seasons = movie.seasons.split(new RegExp("(?<=}),"));
      let list = []
      for (let season of seasons){
        list.push(JSON.parse(season));
      } 
      setSeasons(list);
      
    }
    if(movie.crew)
    {
      let crews = movie.crew.split(new RegExp("(?<=}),"));
      let list = []
      for (let cast of crews){
        list.push(JSON.parse(cast));
      } 
      setCrew(list);

    }
    
  }




  const changeInput = (field, value,info,idx) => {
    let form =  JSON.parse(JSON.stringify(choosen));
    switch (info) {
      case 1:
        {
          let item = JSON.parse(form.info);
          item[field] = value.toString();
    
          let string = JSON.stringify(item);
          form.info = string;
          break;
        }
      case 2: 
      {
        let sl = JSON.parse(JSON.stringify(seasonList))
        sl[idx][field] = value
        setSeasons(sl);
        break;
      }
      case 3: 
      {
        let sl = JSON.parse(JSON.stringify(crew))
        sl[idx][field] = value
        setCrew(sl);
        break;
      }
      default:
        {
          form[field] = value.toString();
          break;
        }
    }
    setChoosen(form);
  }

  const removeItem = (idx) => {
    let itemList = JSON.parse(JSON.stringify(seasonList))
    itemList.splice(idx,1)
    setSeasons(itemList)
  }

  const removeCast = (idx) => {
    let itemList = JSON.parse(JSON.stringify(seasonList))
    itemList.splice(idx,1)
    setSeasons(itemList)
  }



  const classes = useStyles();
  return (
    <GridContainer>
      <GridItem xs={12} sm={12} md={6}>
        <Card>
          <CardHeader color="primary">
            <h4 className={classes.cardTitleWhite}>Films&apos; table info</h4>
            <input onChange={(e)=>setSearch(e.target.value)}/>
            <Button color="white" aria-label="edit" justIcon round>
          <Search />
        </Button>
        <RegularButton color="danger" onClick={()=>{setChoosen({info: '{}'}), setSeasons([])}}><Add/>  Add new </RegularButton>
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
          <Button color="primary" disabled={offset === 0} onClick={()=>setPage(offset - 20)}>Previous</Button>
          <Button color="primary" onClick={()=>setPage(offset + 20)}>Next</Button>
          </CardFooter>
        </Card>
      </GridItem>
      <GridItem  xs={12} sm={12} md={6}>


      <Card>
        <CardHeader color="primary">
          <h4 className={classes.cardTitleWhite}>Film&apos;s info</h4>
          
          <RegularButton color="danger" onClick={()=>submitForm()}>{choosen.name ? 'Edit' : 'Add'}</RegularButton>
        </CardHeader>
        <CardBody>
        <GridContainer>
          <GridItem xs={12} sm={12} md={12}>
          <img src={ choosen.info && JSON.parse(choosen.info).poster ? JSON.parse(choosen.info).poster :  
          'https://upload.wikimedia.org/wikipedia/commons/thumb/a/ac/No_image_available.svg/480px-No_image_available.svg.png'
            } className={classes.moviePoster} />
          </GridItem>
          <GridItem xs={12} sm={12} md={12}>
          <h4>Film&apos;s info</h4>   
          <GridContainer>
          <form action="" id='type' className="contact-form">
          <GridItem xs={12} sm={6} md={6}>
          <label>
          <input name="type" type="text" placeholder="Type of films" value={choosen.type || '' } onChange={(e)=>changeInput('type', e.target.value)}/>
          <span>Film type</span>
          </label>
          </GridItem>
          </form>
          </GridContainer>

          <form action="" id='info' className="contact-form">
          <GridContainer>
          <GridItem xs={12} sm={6} md={6}>

                  <label>
                  <input name="name" type="text" placeholder="Name" value={JSON.parse(choosen.info).name || '' } onChange={(e)=>changeInput('name', e.target.value,1)}/>
                  <span>Name</span>
                  </label>
                  </GridItem>
                  <GridItem xs={12} sm={6} md={6}>
                  <label>
                  <input name="originalLanguage" placeholder="originalLanguage" type="text" value = {JSON.parse(choosen.info).originalLanguage || '' } onChange={(e)=>changeInput('originalLanguage', e.target.value,1)}/>
                  <span>originalLanguage:</span>
                  </label>
                  </GridItem>
                  <GridItem xs={12} sm={6} md={6}>
                  <label>
                  <input name="streamingDate" placeholder="streamingDate" type="text" value = {JSON.parse(choosen.info).streamingDate || '' } onChange={(e)=>changeInput('streamingDate', e.target.value,1)}/>
                  <span>streamingDate:</span>
                  </label>
                  </GridItem>
                  <GridItem xs={12} sm={6} md={6}>
                  <label>
                  <input name="productions" placeholder="productions" type="text" value = {JSON.parse(choosen.info).productions || '' } onChange={(e)=>changeInput('productions', e.target.value,1)}/>
                  <span>productions</span>
                  </label>
                  </GridItem>
                  <GridItem xs={12} sm={6} md={6}>
                  <label>
                  <input name="soundMixs" placeholder="soundMixs" type="text" value = {JSON.parse(choosen.info).soundMixs || '' } onChange={(e)=>changeInput('soundMixs', e.target.value,1)}/>
                  <span>soundMixs</span>
                  </label>
                  </GridItem>
                  <GridItem xs={12} sm={6} md={6}>
                  <label>
                  <input name="aspectRatio" placeholder="aspectRatio" type="text" value = {JSON.parse(choosen.info).aspectRatio || '' } onChange={(e)=>changeInput('aspectRatio', e.target.value,1)}/>
                  <span>aspectRatio</span>
                  </label>
                  </GridItem>

                  <GridItem xs={12} sm={6} md={6}>
                  <label>
                  <input placeholder="network" name='network' type="text"  value = {JSON.parse(choosen.info).network || '' } onChange={(e)=>changeInput('network', e.target.value,1)}/>
                  <span>network</span>
                  </label>
                  </GridItem>
                  <GridItem xs={12} sm={6} md={6}>
                  <label>
                  <input placeholder="starting" name='starting' type="text"  value = {JSON.parse(choosen.info).starting || '' } onChange={(e)=>changeInput('starting', e.target.value,1)}/>
                  <span>starting</span>
                  </label>
                  </GridItem>
                  <GridItem xs={12} sm={6} md={6}>
                  <label>
                  <input placeholder="Summary" type="file" multiple accept="image/*" onChange={(e)=>{setImages(e.target.value) }}/>
                  <span>Images</span>
                  </label>
                  </GridItem>

                  <GridItem xs={12} sm={12} md={12}>
                  <label>
                  <textarea name="summary" placeholder="Summary" type="text" value={JSON.parse(choosen.info).summary || ''} onChange={(e)=>changeInput('summary', e.target.value,1)}/>
                  <span>Summary</span>
                  </label>
                  </GridItem>
          </GridContainer>
          </form>

         {
           choosen.type?.toString().toLowerCase() === 'tv' ?
          <GridContainer>

          <GridItem xs={12} sm={12} md={12} >
            <div className='overflow-container'>
            <h4>Season&apos;s info (optional)</h4>   
            {
                seasonList.map((el, idx)=>{
                  return (
                    <form action="" id={`season${idx + 1}`} className="contact-form" key={idx}>
                      <div>
                       <span> Season number: {idx + 1} <span className='remove' onClick={()=>removeItem(idx)}> X Remove</span> </span> 

                      </div>

                    <GridContainer >
                      <GridItem xs={4} sm={4} md={4}>
                      <label>
                      <input placeholder="seasons name" name='season_name' type="text"  value = {el.season_name || '' } onChange={(e)=>changeInput('season_name', e.target.value,2,idx)}  />
                      <span>starting</span>
                      </label>
                      </GridItem>
                      <GridItem xs={4} sm={4} md={4}>
                      <label>
                      <input placeholder="summary" name='summary' type="text"  value = {el.summary || '' } onChange={(e)=>changeInput('summary', e.target.value,2,idx)} />
                      <span>Summary</span>
                      </label>
                      </GridItem>
                      <GridItem xs={4} sm={4} md={4}>
                      <label>
                      <input placeholder="starting" name='starting' type="text"  value = {el.starting || '' } onChange={(e)=>changeInput('starting', e.target.value,2,idx)} />
                      <span>Starting</span>
                      </label>
                      </GridItem>

                    </GridContainer>
                  </form>
                  )

                })
            }
            </div>

            <button onClick={()=>{
              let list = JSON.parse(JSON.stringify(seasonList))
              list.push(season);
              setSeasons(list);
            }}> New Seasons</button>

          </GridItem>
          </GridContainer> : null
         }



          <h4>Casts n Directive</h4>   
          <form action="" id='crew' className="contact-form">
          <GridContainer>
          <GridItem xs={12} sm={12} md={12}>

          {/* list */}
          <div className='overflow-container'>
          {
                crew.map((el, idx)=>{
                  return (
                    <form action="" id={`crew${idx + 1}`} className="contact-form" key={idx}>
                      <div>
                        <span className='remove' onClick={()=>removeCast(idx)}> X Remove</span>

                      </div>

                    <GridContainer >
                      <GridItem xs={6} sm={6} md={6}>
                      <label>
                      <input placeholder="Person Name" name='personName' type="text"  value = {el.personName || '' } onChange={(e)=>changeInput('personName', e.target.value,3,idx)}  />
                      <span>Person Name</span>
                      </label>
                      </GridItem>
                      <GridItem xs={6} sm={6} md={6}>
                      <label>
                      <input placeholder="Character Name" name='characterName' type="text"  value = {el.characterName || '' } onChange={(e)=>changeInput('characterName', e.target.value,3,idx)} />
                      <span>Character Name</span>
                      </label>
                      </GridItem>
                    </GridContainer>
                  </form>
                  )

                })
            }

          </div>


          </GridItem>
          </GridContainer>
          </form>
          <button onClick={()=>{
              let list = JSON.parse(JSON.stringify(crew))
              list.push(cast);
              setCrew(list);
            }}> New Casts</button>
          </GridItem>
        </GridContainer>
        </CardBody>

        </Card>

      </GridItem>
    </GridContainer>
  );
}
