import React from 'react';
import PropTypes from 'prop-types';
import { Box, TextField } from '@material-ui/core';
import { Controller } from 'react-hook-form';

TextareaField.propTypes = {
  name: PropTypes.string.isRequired,
  form: PropTypes.object.isRequired,

  label: PropTypes.string,
  disabled: PropTypes.bool,
  defaultValue: PropTypes.string,
};

TextareaField.defaultProps = {
  label: '',
  disabled: false,
  defaultValue: "",
};

function TextareaField(props) {
  const { name, label, form, disabled, defaultValue } = props;
  const { errors } = form;
  const errorMessage = errors[name]?.message;
  const hasError = !!errorMessage;

  return (
    <Box mt={1} mb={2}>
      <Controller
        name={name}
        control={form.control}
        defaultValue={defaultValue}
        render={({ value, onChange, onBlur }) => (
          <TextField
            fullWidth
            multiline
            rows={3}
            type="text"
            name={name}
            value={value}
            onChange={onChange}
            onBlur={onBlur}
            label={label}
            disabled={disabled}
            variant="outlined"
            error={hasError}
            helperText={errorMessage}
          />
        )}
      />
    </Box>
  );
}

export default TextareaField;