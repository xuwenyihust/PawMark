import { Typography, Card } from '@mui/material';


function TextResult(output) {
  return (
    <div 
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
        { output.data['text/html'] ? 
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
          <Typography 
            sx={{
              marginLeft: 2}}
            dangerouslySetInnerHTML={{ __html: output.data['text/html'] }} />
        </Card>
        :
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
              <pre>{output.data['text/plain']}</pre>
            </Typography>
          </Card>
        }
    </div>
  );
}

export default TextResult;