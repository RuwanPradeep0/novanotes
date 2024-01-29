
import { makeStyles } from '@material-ui/core/styles';

export default makeStyles((theme) => ({
  root: {
    '& .MuiTextField-root': {
      margin: theme.spacing(1),
    },
  },
  paper: {
    padding: theme.spacing(2),
  },
  form: {
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'center',
  },
  fileInput: {
    width: '97%',
    margin: '10px 0',
  },
  buttonSubmit: {
    marginBottom: 10,
    backgroundColor:'#172554',

    '&:hover': {
      backgroundColor: '#1e3a8a',
      boxShadow: 'none',
    }
  },

  buttonClear: {
    backgroundColor:'#334155',
    '&:hover':{
      backgroundColor:'#ef4444',
    }
  }

  
}));