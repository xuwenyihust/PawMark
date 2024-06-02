import { Card, Typography } from '@mui/material';


function CodeResult(index, output) {
  return (
    <Card
      key={index}
      elevation={0}
      sx={{
        width: '85%',
        marginTop: 0,
        marginBottom: 1,
        marginLeft: 10,
        marginRight: 1,
        border: 0.1,
        borderColor: 'lightgrey',
        backgroundColor: 'rgba(0, 0, 0, 0.01)',
      }}>
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
          marginLeft: 1,
          marginRight: 1,
          marginTop: 1,
          marginBottom: 1,
          marginRight: 1,
        }}>
        {output.text}
      </Typography>
    </Card>
  );
}

export default CodeResult;