import React from 'react'
import { makeStyles } from '@material-ui/core/styles';
import Modal from '@material-ui/core/Modal';
function getModalStyle() {
    const top = 50 ;
    const left = 50 ;
  
    return {
      top: `${top}%`,
      left: `${left}%`,
      transform: `translate(-${top}%, -${left}%)`,
    };
  }
  
const useStyles = makeStyles((theme) => ({
    paper: {
      position: 'absolute',
      width: 400,
      backgroundColor: theme.palette.background.paper,
      border: '2px solid #000',
      boxShadow: theme.shadows[5],
      padding: theme.spacing(2, 4, 3),
      maxHeight:"80vh",
      overflowY:"scroll",
    },
  }));
  
function MyModal({body,open,setOpen}) {
    const classes = useStyles();
    const [modalStyle] = React.useState(getModalStyle);

    const handleClose = () => {
        setOpen(false);
      };
    return (
        <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="simple-modal-title"
        aria-describedby="simple-modal-description"
      >
       <div style={modalStyle} className={classes.paper}>
            {body}
        </div>
      </Modal>
        
    )
}

export default MyModal
