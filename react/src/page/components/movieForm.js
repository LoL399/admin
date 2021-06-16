import React, { useState } from "react";
import PropTypes from "prop-types";
import { makeStyles } from "@material-ui/core/styles";
// core components
import GridItem from "components/Grid/GridItem.js";
import GridContainer from "components/Grid/GridContainer.js";
import Card from "components/Card/Card.js";
import CardHeader from "components/Card/CardHeader.js";
import CardBody from "components/Card/CardBody.js";
import CustomInput from "components/CustomInput/CustomInput";
import CardFooter from "components/Card/CardFooter";

import RegularButton from "components/CustomButtons/Button";
import { Button } from "@material-ui/core";
// import filmsService from "page/service/filmsService";
const styles = {


    moviePoster:{
  
      width: '200px',
      height: 'auto',
      margin: 'auto',
      display: 'block',
    },
  };
  
  const useStyles = makeStyles(styles);
export default function MovieForm(props){
    const classes = useStyles();
    const [film, setFilm] = useState(props.item)


    useState(()=>{
      console.log(props)
      setFilm(props.item)
      // if(props.item)
      // {
      //   filmsService.find({id:props.item || 1}).then((film)=>{
      //     const {data} = film;
      //     setFilm(data);
      //   })
      // }

    },[props.item])


    return (
        
        <Card>
        <CardHeader color="primary">
          <h4 className={classes.cardTitleWhite}>Simple Table</h4>
          <p className={classes.cardCategoryWhite}>
            Here is a subtitle for this table
          </p>
        </CardHeader>
        <CardBody>
        <GridContainer>
          <GridItem xs={12} sm={12} md={6}>
          <img src={film.info?.poster} className={classes.moviePoster} />
          <Button> Add + </Button>
          </GridItem>
          <GridItem xs={12} sm={12} md={6}>
          <CustomInput
                  labelText="Type"
                  id="company-disabled"
                  formControlProps={{
                    fullWidth: true,
                  }}
                />
                <CustomInput
                  labelText="Company"
                  id="company-disabled"
                  formControlProps={{
                    fullWidth: true,
                  }}
                />
          </GridItem>
          <GridItem xs={12} sm={12} md={6}>
          <CustomInput
                  labelText="Type"
                  id="company-disabled"
                  formControlProps={{
                    fullWidth: true,
                  }}
                />
                <CustomInput
                  labelText="Company"
                  id="company-disabled"
                  formControlProps={{
                    fullWidth: true,
                  }}
                />
          </GridItem>
          <GridItem xs={12} sm={12} md={6}>
          <CustomInput
                  labelText="Type"
                  id="company-disabled"
                  formControlProps={{
                    fullWidth: true,
                  }}
                />
                <CustomInput
                  labelText="Company"
                  id="company-disabled"
                  formControlProps={{
                    fullWidth: true,
                  }}
                />
          </GridItem>
        </GridContainer>
        </CardBody>
        <CardFooter>
        <RegularButton color="default" onClick={()=>{alert('ok')}}>Previous</RegularButton>
        <RegularButton color="primary">ABC</RegularButton>
        <RegularButton color="danger">Next</RegularButton>
        </CardFooter>
        </Card>
    )
}


MovieForm.propTypes = {
  item: PropTypes.object,
};
