import React, { useState } from 'react'
import { Alert, AlertTitle, Button, ButtonGroup, Container, List, ListItem, ListItemText, Typography } from '@mui/material'
import { agent } from '../../routes'

export default function Error() {
  const [validationErrors, setValidationErrors] = useState<string[]>([]);

  const getValidationError = () => {
    agent.TestErrors.getValidationError()
      .then(() => console.log("should not see this"))
      .catch((error) => setValidationErrors(error))
  }

  return (
    <Container>
      <Typography gutterBottom variant="h2">Errors for testing purposes</Typography>
      <ButtonGroup fullWidth>
        <Button variant="contained" onClick={() => agent.TestErrors.get400Error().catch(error => console.error(error))}>Text 400 Error</Button>
        <Button variant="contained" onClick={() => agent.TestErrors.get401Error().catch(error => console.error(error))}>Text 401 Error</Button>
        <Button variant="contained" onClick={() => agent.TestErrors.get404Error().catch(error => console.error(error))}>Text 404 Error</Button>
        <Button variant="contained" onClick={() => agent.TestErrors.get500Error().catch(error => console.error(error))}>Text 500 Error</Button>
        <Button variant="contained" onClick={getValidationError}>Test Validation Error</Button>
      </ButtonGroup>
      {validationErrors.length !== 0 &&
        <Alert severity="error">
          <AlertTitle>Validation Errors</AlertTitle>
          <List>
            {validationErrors.map((error, i) => (
              <ListItem key={i}>
                <ListItemText>{error}</ListItemText>
              </ListItem>
            ))}
          </List>
        </Alert>
      }
    </Container>
  )
}
