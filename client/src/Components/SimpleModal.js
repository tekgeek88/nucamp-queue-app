import React from 'react';
import {makeStyles} from '@material-ui/core/styles';
import Modal from '@material-ui/core/Modal';
import Typography from "@material-ui/core/Typography";
import Grid from "@material-ui/core/Grid";
import CloseIcon from '@material-ui/icons/Close';

function getModalStyle() {
  const top = 50;
  const left = 50;

  return {
    top: `${top}%`,
    left: `${left}%`,
    transform: `translate(-${top}%, -${left}%)`,
  };

}

const useStyles = makeStyles(theme => ({
  paper: {
    position: 'absolute',
    width: '400px',
    height: '250px',
    backgroundColor: theme.palette.background.paper,
    border: '2px solid #000',
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
  },
}));

export default function SimpleModal(props) {
  const classes = useStyles();
  // getModalStyle is not a pure function, we roll the style only on the first render
  const [modalStyle] = React.useState(getModalStyle);
  const [open, setOpen] = React.useState(true);

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <Modal
      aria-labelledby="simple-modal-title"
      aria-describedby="simple-modal-description"
      open={open}
      onClose={handleClose}
      style={{verticalAlign: "center", horizontalAllign: "center"}}
      onEscapeKeyDown={() => setOpen(false)}

      {...props}
    >
      <div style={modalStyle} className={classes.paper}>
        <Grid container spacing={4} style={{marginTop: 1}}>
          <Grid container
                direction="column"
                justify="center"
                alignItems="flex-end"

          >

            <Grid item xs={12}>
              <CloseIcon onClick={handleClose}/>
            </Grid>

          </Grid>
          <Grid item xs={12}>
            <Typography variant="h4">{props.title}</Typography>
          </Grid>
          <Grid item xs={12}>
            <Typography variant="body2">
              {props.content}
            </Typography>
          </Grid>
          <Grid container justify="center" alignItems="center" spacing={2}>
            {props.actions}
          </Grid>
        </Grid>
      </div>
    </Modal>
  );
}