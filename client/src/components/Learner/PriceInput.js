import {Input, Select} from 'antd';
import React, {useState} from 'react'
const PriceInput = ({ value = {}, onChange }) => {
  const [number, setNumber] = useState(0);
  const triggerChange = (changedValue) => {
    onChange?.({
      number,
      ...value,
      ...changedValue
    });
  };

  const onNumberChange = (e) => {
    const newNumber = parseInt(e.target.value || '0', 10);

    if (Number.isNaN(number)) {
      return;
    }

    if (!('number' in value)) {
      setNumber(newNumber);
    }

    triggerChange({
      number: newNumber
    });
  };

  return (
    <span>
      <Input
        type="text"
        value={value.number || number}
        onChange={onNumberChange}
        style={{
          width: 220
        }}
      />
    </span>
  );
};
export default PriceInput