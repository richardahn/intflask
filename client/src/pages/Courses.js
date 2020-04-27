import React from 'react';
import {
  Container,
  Box,
  Typography,
  List,
  ListItem,
  ListItemText,
  Divider,
} from '@material-ui/core';

export default function Courses() {
  return (
    <Container>
      <Box pt={2}>
        <Typography variant="h6">My Courses</Typography>
        <List component="nav" aria-labelledby="nested-list-subheader">
          <ListItem button>
            <ListItemText
              disableTypography
              primary={
                <Typography variant="span" style={{ fontWeight: 'bold' }}>
                  Course 1
                </Typography>
              }
            />
          </ListItem>
          <ListItem button>
            <ListItemText
              disableTypography
              primary={
                <Typography variant="span" style={{ fontWeight: 'bold' }}>
                  Course 2
                </Typography>
              }
            />
          </ListItem>
          <ListItem button>
            <ListItemText
              disableTypography
              primary={
                <Typography variant="span" style={{ fontWeight: 'bold' }}>
                  Course 3
                </Typography>
              }
            />
          </ListItem>
        </List>
      </Box>
    </Container>
  );
}
