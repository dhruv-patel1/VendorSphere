import React from "react";
import {connect} from "react-redux";
import Card from "@material-ui/core/Card";
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography'; 



const ItemCardList = ({items, handleOpen, openDelete}) =>{

    const handleClick = (id) =>{
        handleOpen(id);
    }

    const handleOtherClick = (id) =>{
        openDelete(id);
    }
    
    const itemList = items.map((item) =>
        <li key={item.id} className="li-cards">
            <Card className="card-comp" >
                <CardActionArea>
                    <CardMedia
                        component="img"
                        alt=""
                        height="140"
                        src={item.imgUrl}
                    />
                    <CardContent>
                            <Typography gutterBottom variant="h5" component="h2">
                            {item.itemName}
                            </Typography>
                            <Typography variant="body2" color="textSecondary" component="p">
                            {item.itemDescription}
                            </Typography>
                    </CardContent>
                </CardActionArea>

                <CardActions className="card-actions">
                    <Button size="small" onClick={() => handleClick(item.id)}>
                        Edit
                    </Button>
                    <Button size="small" onClick={() => handleOtherClick(item.id)}>
                        Delete
                    </Button>
                </CardActions>
            </Card>
        </li>
    );

    if(items.length === 0){
        return(
            <p>Add Items to Inventory</p>
        )
    }
    else{
        return(
            <div>
                <ul className="item-card-list">{itemList}</ul>
            </div>
        )
    }
    
};


const mapStateToProps = (state) =>({
    items: state.item
});

export default connect(mapStateToProps)(ItemCardList);