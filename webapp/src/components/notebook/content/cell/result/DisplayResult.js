import { Card } from '@mui/material';


function DisplayResult(output) {

  return (
<   div 
      variant="body1"
      component="div"
      sx={{
        color: 'black',
        width: '85%',
        fontFamily: 'Arial',
        fontSize: '14px',
        fontWeight: 'bold',
        textAlign: 'left',
        marginLeft: 0,
        marginRight: 1,
        marginTop: 0,
        marginBottom: 1,
        marginRight: 1,
      }}>
        <Card
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
          <img src={`data:image/png;base64,${output.data['image/png']}`} />
        </Card>
    </div>
  )
}

export default DisplayResult;