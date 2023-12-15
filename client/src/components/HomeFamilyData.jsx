import React from 'react';
import { Card, CardContent, Typography } from '@mui/material';
import Link from 'next/link';

const HomeFamilyData = ({data}) => {

  console.log("Data passed to HomeFamilyData component is: ", data);
  return (
    <Card sx={{margin: 2}}>      
      <CardContent>
        <Link href={`family_group/${data.Id}`}>
          <Typography>
            {data.familyName}
          </Typography>
        </Link>
      </CardContent>      
    </Card>
  )
}

export default HomeFamilyData