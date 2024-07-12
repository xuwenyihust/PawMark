import React, { useEffect, useState } from 'react';
import SparkModel from '../../../models/SparkModel';
import NotebookModel from '../../../models/NotebookModel';
import { Box, Typography, Card, CardHeader, CardContent, List, ListItem, ListItemText } from '@mui/material';


function Runs({
  notebook,
  contentType
}) {
  const [sparkApps, setSparkApps] = useState([]);

  useEffect(() => {
    const fetchSparkApps = async () => {
      const data = await NotebookModel.getSparkApps(notebook.path);
      console.log('data:', data);
      setSparkApps(data);
    };
  
    fetchSparkApps();
  }, [contentType, notebook]);

  return (
    <Box sx={{
      marginTop: 5,
      marginRight: 5,
      marginLeft: 2,
    }}>
      <Card 
        sx={{ 
          display: 'flex',
          flexDirection: 'column',
        }}>
        <CardHeader 
          title={
            <Typography 
              variant="body1"
              style={{ marginLeft: 10 }}
              color="textSecondary">
              Associated Spark Applications
            </Typography>
          }
          sx={{
            backgroundColor: '#f5f5f5',
            borderBottom: 1,
            borderBottomColor: '#f5f5f5',
          }}/>
        <CardContent>
          {sparkApps ? (
            <List>
              {sparkApps.map((app, index) => (
                <ListItem key={index}>
                  <ListItemText primary={app.spark_app_id} />
                </ListItem>
              ))}
          </List>
          )
            : ('No Spark Applications associated with this notebook.')}
        </CardContent>
      </Card>
    </Box>
  );
}

export default Runs;
