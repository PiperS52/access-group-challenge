import * as React from 'react';
import ToggleButton from '@mui/material/ToggleButton';
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup';

export default function ColorToggleButton({setTurnOffFeatures}: {setTurnOffFeatures: React.Dispatch<React.SetStateAction<boolean>>}): React.JSX.Element {
    const [alignment, setAlignment] = React.useState('on');
  
    const handleChange = (
      event: React.MouseEvent<HTMLElement>,
      newAlignment: string,
    ) => {
        setAlignment(newAlignment);
    };

  
    return (
      <ToggleButtonGroup
        color="primary"
        value={alignment}
        exclusive
        onChange={handleChange}
        aria-label="Platform"
      >
        <ToggleButton onChange={() => setTurnOffFeatures(false)} value="on">On</ToggleButton>
        <ToggleButton onChange={() => setTurnOffFeatures(true)}value="off">Off</ToggleButton>
      </ToggleButtonGroup>
    );
  }