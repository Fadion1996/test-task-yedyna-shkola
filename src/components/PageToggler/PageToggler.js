import { Tabs, Tab, Box } from '@mui/material';


const PageToggler = ({ value, handleChange }) => {

  return (
    <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
      <Tabs value={value} onChange={handleChange} aria-label="basic tabs">
        <Tab label="Main Page" value="1" />
        <Tab label="Details Page" value="2" />
      </Tabs>
    </Box>
  )
}

export default PageToggler