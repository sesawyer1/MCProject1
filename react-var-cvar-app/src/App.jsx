import React from 'react';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';

import {
  Container,
  Typography,
  Button,
  Box,
  TextField,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
} from '@mui/material';

export default function App() {
  const [tau, setTau] = React.useState(1);
  const [delta, setDelta] = React.useState(30);
  const [alpha, setAlpha] = React.useState(0.05);
  const [d, setD] = React.useState(5);
  const [startDate, setStartDate] = React.useState(null);
  const [endDate, setEndDate] = React.useState(null);
  const minDate = new Date('2006-01-02');
  const maxDate = new Date('2025-01-01');


  const handleSubmit = () => {
    // In the future: send to backend
    console.log({ tau, delta, alpha, d, startDate: startDate?.toISOString().split('T')[0],
      endDate: endDate?.toISOString().split('T')[0],
      selectedFunds,
    });
  };

  const deltaOptions = {
    Daily: 1,
    Weekly: 5,
    Monthly: 22,
    Quarterly: 66,
  };

  const [rollingLabel, setRollingLabel] = React.useState('Monthly');

  const fundList = ["B11293",
  "B00774",
  "B15709",
  "B13835",
  "B07347",
  "B90012",
  "B55333",
  "B88888",
  "B99999",];

  const [selectedFunds, setSelectedFunds] = React.useState([]);


  return (
    <Container maxWidth="sm" sx={{ mt: 6 }}>
      <Typography variant="h4" gutterBottom>
        VaR/CVaR Stress Test
      </Typography>
      <LocalizationProvider dateAdapter={AdapterDateFns}>
      <Box display="flex" flexDirection="column" gap={2}>
        <FormControl fullWidth>
          <InputLabel>Time Horizon (τ)</InputLabel>
          <Select value={tau} label="Time Horizon (τ)" onChange={(e) => setTau(e.target.value)}>
            <MenuItem value={1}>1 Year</MenuItem>
            <MenuItem value={3}>3 Years</MenuItem>
            <MenuItem value={5}>5 Years</MenuItem>
          </Select>
        </FormControl>

        <FormControl fullWidth>
          <InputLabel>Rolling Period</InputLabel>
          <Select
            value={rollingLabel}
            label="Rolling Period"
            onChange={(e) => {
              const label = e.target.value;
              setRollingLabel(label);
              setDelta(deltaOptions[label]);
            }}
          >
            {Object.keys(deltaOptions).map((label) => (
              <MenuItem key={label} value={label}>
                {label}
              </MenuItem>
            ))}
          </Select>
        </FormControl>


        <TextField
          label="Confidence Level (α)"
          type="number"
          inputProps={{ step: 0.01, min: 0, max: 1 }}
          value={alpha}
          onChange={(e) => setAlpha(Number(e.target.value))}
          fullWidth
        />

        <TextField
          label="Number of Funds (d)"
          type="number"
          value={d}
          onChange={(e) => setD(Number(e.target.value))}
          fullWidth
          inputProps={{min: 1, max: 50}}
        />

        <DatePicker
          label="Start Date"
          value={startDate}
          onChange={(newValue) => setStartDate(newValue)}
          minDate={minDate}
          maxDate={maxDate}
          slotProps={{ textField: { fullWidth: true } }}
        />

        <DatePicker
          label="End Date"
          value={endDate}
          onChange={(newValue) => setEndDate(newValue)}
          minDate={minDate}
          maxDate={maxDate}
          slotProps={{ textField: { fullWidth: true } }}
        />

        <FormControl fullWidth>
          <InputLabel>Selected Funds (optional)</InputLabel>
          <Select
            multiple
            value={selectedFunds}
            onChange={(e) => setSelectedFunds(e.target.value)}
            renderValue={(selected) => selected.join(", ")}
            MenuProps={{ PaperProps: { style: { maxHeight: 200 } } }}
          >
            {fundList.map((fund) => (
              <MenuItem key={fund} value={fund}>
                {fund}
              </MenuItem>
            ))}
          </Select>
        </FormControl>


        <Button variant="contained" color="primary" onClick={handleSubmit} 
        disabled={!startDate || !endDate || startDate > endDate || d < 1 || d > 20}>
          Calculate VaR / CVaR
        </Button>
      </Box>
      </LocalizationProvider>
      
    </Container>
  );
}
