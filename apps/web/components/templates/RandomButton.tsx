import React, { useState } from 'react';
import { Button } from '../ui/button';
import { axiosCall } from '@/lib/api';

export default function RandomButton() {
  const [randText, setRandText] = useState('Random');

  const getRandText = async () => {
    const getRand = await axiosCall({
      method: 'get',
      id: 'rand',
    });
    setRandText(getRand);
  };

  return (
    <Button className="w-full" onClick={getRandText}>
      {randText}
    </Button>
  );
}
