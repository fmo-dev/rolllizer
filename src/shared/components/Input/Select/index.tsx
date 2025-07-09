import { HTMLAttributes, useState } from "react";
import Picker, { PickerProps, PickerValue } from "react-mobile-picker";
import { SelectColumn, SelectOption } from "./types";

interface SelectProps<T extends PickerValue> extends PickerProps<T> {
  options: SelectColumn[] | SelectOption[]
}

export const Select = <T extends PickerValue>({
  value,
  onChange,
  label,
  options,
  open,
  ...props
}: SelectProps<T>) => {
  const renderOption = (option: SelectOption | SelectColumn) => {
    if ("options" in option) {
      return (
        <Picker.Column key={option.name} name={option.name}>
          {option.options.map((opt) => (
            <Picker.Item key={opt.value} value={opt.value}>
              {opt.label}
            </Picker.Item>
          ))}
        </Picker.Column>
      );
    }
    return (
      <Picker.Item key={option.value} value={option.value}>
        {option.label}
      </Picker.Item>
    );
  };


  if (!open) {
    return null;
  }
  return (
    <div className="select-component">
      <label>{label}</label>
      <Picker value={value} onChange={onChange}>
        {options.map(renderOption)}
      </Picker>
    </div>
  );
}
