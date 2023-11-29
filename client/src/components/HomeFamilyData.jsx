import React from 'react';
import { Avatar, Card, CardActions, CardContent, CardHeader, CardMedia, Checkbox, IconButton, Typography } from '@mui/material';
import { Favorite, FavoriteBorder, MoreVert, Share } from '@mui/icons-material'
import Image from 'next/image';
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