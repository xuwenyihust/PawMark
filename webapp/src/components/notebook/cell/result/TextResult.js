import { Typography } from '@mui/material';


function TextResult(output) {
  return (
    <Typography 
      variant="body1"
      component="div"
      sx={{
        color: 'black',
        width: '85%',
        fontFamily: 'Arial',
        fontSize: '14px',
        fontWeight: 'bold',
        textAlign: 'left',
        marginLeft: 10,
        marginRight: 1,
        marginTop: 0,
        marginBottom: 1,
        marginRight: 1,
      }}>
      <div dangerouslySetInnerHTML={{ __html: output.data['text/html'] }} />
    </Typography>
  );
}

export default TextResult;