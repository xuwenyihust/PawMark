import { Typography, Card } from '@mui/material';
import Convert from 'ansi-to-html';


function ErrorResult(index, isFocused, output) {
  const convert = new Convert();

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
          border: isFocused ? 0.5 : 0.2,
          borderColor: 'red',
          backgroundColor: 'rgba(255, 0, 0, 0.1)',
      }}
    >
      <Typography 
        variant="body1" 
        component="div"
        style={{ 
          whiteSpace: 'pre-wrap',
          marginLeft: 10,
          marginRight: 10,
          }}>
        <div dangerouslySetInnerHTML={{ __html: convert.toHtml(output.traceback.join('\n')) }} />
      </Typography>
    </Card>
  );
}

export default ErrorResult;