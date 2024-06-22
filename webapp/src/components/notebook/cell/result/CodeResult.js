import { Card, Typography } from '@mui/material';
import ReactMarkdown from 'react-markdown';
import gfm from 'remark-gfm';
import StringUtils from '../../../../utils/StringUtils';


function CodeResult(index, output) {
  const isTable = StringUtils.isJupyterTable(output.text);

  return (
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
          {
            isTable ? (
              <ReactMarkdown
                remarkPlugins={[gfm]} 
                children={StringUtils.convertJupyterTableToMarkdownTable(output.text)}
                components={{
                  table: ({node, ...props}) => <table style={{borderCollapse: 'collapse'}} {...props} />,
                  th: ({node, ...props}) => <th style={{border: '0.2px solid lightblue', padding: '3px'}} {...props} />,
                  td: ({node, ...props}) => <td style={{border: '0.2px solid lightblue', padding: '3px'}} {...props} />,
                }} />
            ) : (
              output.text
            )
          }
        </Typography>
    </Card>
  );
}

export default CodeResult;