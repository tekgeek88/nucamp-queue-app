import React from "react";
import Container from "@material-ui/core/Container";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from '@material-ui/styles'
import Card from "@material-ui/core/Card";
import CardActionArea from "@material-ui/core/CardActionArea";
import CardMedia from "@material-ui/core/CardMedia";
import CardContent from "@material-ui/core/CardContent";
import CardActions from "@material-ui/core/CardActions";
import Button from "@material-ui/core/Button";

const useStyles = makeStyles(theme => ({
  root: {
    margin: theme.spacing(3),
    width: 345,
  },
  media: {
    height: 140,
  },
  title: {
    color: theme.palette.primary.main
  }
}));

export default () => {

  const classes = useStyles();

  return (
    <Container>
      <Typography>
        Hello from the Homepage!
      </Typography>
      <Card className={classes.root}>
        <CardActionArea>
          <CardMedia
            className={classes.media}
            image="https://images.unsplash.com/photo-1540573133985-87b6da6d54a9?ixlib=rb-1.2.1&auto=format&fit=crop&w=1955&q=80"
            title="Surprised monkey"
          />
          <CardContent>
            <Typography gutterBottom variant="h5" component="h2" className={classes.title}>
              OMG it's a Monkey!
            </Typography>
            <Typography variant="body2" color="textSecondary" component="p">
              Monkey is a common name that may refer to groups or species of mammal. The term is applied descriptively to groups of primates
            </Typography>
          </CardContent>
          <CardActions>
            <Button size="small" color="primary" href="https://unsplash.com/photos/Z05GiksmqYU">
              See it on Unsplash
            </Button>
          </CardActions>
        </CardActionArea>
      </Card>
    </Container>
  );
};