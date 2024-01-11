import React, { useState, useEffect } from 'react';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import LocalFlorist from '@mui/icons-material/LocalFlorist';
import BeachAccess from '@mui/icons-material/BeachAccess';
import EnergySavingsLeafRounded from '@mui/icons-material/EnergySavingsLeafRounded';
import AcUnit from '@mui/icons-material/AcUnit';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import ProductCard from './ProductCard';
import CustomTabPanel from './CustomTabPanel';
import ButtonAppBar from './ButtonAppBar';

const HomePage: React.FC = () => {
  const getSeason = (): number => {
    const currentMonth = new Date().getMonth();

    if (currentMonth >= 2 && currentMonth <= 4) {
      return 0; // Spring
    } else if (currentMonth >= 5 && currentMonth <= 7) {
      return 1; // Summer
    } else if (currentMonth >= 8 && currentMonth <= 10) {
      return 2; // Fall
    } else {
      return 3; // Winter
    }
  };
  const defaultValue : number = getSeason()
  const [value, setValue] = useState(defaultValue);
  const [produce, setProduce] = useState<any[]>([]);
  const seasons : string[] = ['Spring', 'Summer', 'Fall', 'Winter']

  useEffect(() => {
    fetch('https://localhost:7193/api/produce/')
      .then((res) => {
        return res.json();
      })
      .then((data) => {
        console.log(data);
        setProduce(data)
      })
   
  }, [])

  const handleChange = (_event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };

  return (
    <Box sx={{ width: '100%' }}>
      <ButtonAppBar/>
      <Tabs
        value={value}
        onChange={handleChange}
        aria-label="icon position tabs example"
        centered
      >
        <Tab icon={<LocalFlorist />} iconPosition="start" label="Spring" />
        <Tab icon={<BeachAccess />} iconPosition="start" label="Summer" />
        <Tab icon={<EnergySavingsLeafRounded />} iconPosition="start" label="Fall" />
        <Tab icon={<AcUnit />} iconPosition="start" label="Winter" />
      </Tabs>

      {seasons.map((season, index) => {
        return (
          <CustomTabPanel value={value} index={index}>
            <Grid container spacing={2}>
              {produce.map((product) => {
                if (product.season == season) {
                  return (
                    <Grid item key={product.id}>
                      <ProductCard name={product.name} description={product.description}/>
                    </Grid>
                  );
                }
              })}
            </Grid>
          </CustomTabPanel>
        )
      })}
    </Box>
    
  );
}

export default HomePage;