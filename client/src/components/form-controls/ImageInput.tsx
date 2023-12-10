import React, { ChangeEvent, useRef } from 'react';
import {
  CircularProgress,
  FormControl,
  IconButton,
  InputAdornment,
  InputLabel,
  OutlinedInput,
} from '@mui/material';
import {
  Delete as DeleteIcon,
  Upload as UploadIcon,
  OpenInNew as OpenInNewIcon,
} from '@mui/icons-material';
import { useDeleteImageMutation, useUploadImageMutation } from '../../store/api';

const uploadedImagePrefix = `${import.meta.env.VITE_APP_API_URL}/images/`;

interface ImageInputProps {
  disabled?: boolean;
  label?: string;
  value: string;
  onChange: (value: string) => void;
}

const ImageInput = ({
  disabled, label, value, onChange,
}: ImageInputProps) => {
  const inputRef = useRef<HTMLInputElement>(null);

  const [uploadImage, { isLoading: isUploading }] = useUploadImageMutation();
  const [deleteImage, { isLoading: isDeleting }] = useDeleteImageMutation();

  const handleFileChange = async (e: ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files) return;

    const formData = new FormData();
    formData.append('file', e.target.files[0]);
    const result = await uploadImage(formData);

    onChange(uploadedImagePrefix + (result as { data: { filename: string } }).data.filename);
  };

  const handleDelete = async () => {
    const filename = value.replace(uploadedImagePrefix, '');
    await deleteImage(filename);
    onChange('');
  };

  const isUploadedImage = value.startsWith(uploadedImagePrefix);

  return (
    <FormControl fullWidth>
      <InputLabel>Image URL</InputLabel>
      <OutlinedInput
        fullWidth
        label={label}
        disabled={isUploadedImage}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        endAdornment={(
          <>
            <input
              ref={inputRef}
              hidden
              type="file"
              onChange={handleFileChange}
            />

            {!isUploadedImage && (
              <InputAdornment position="end">
                <IconButton
                  title="Upload"
                  edge="end"
                  disabled={disabled}
                  onClick={() => inputRef.current?.click()}
                >
                  <UploadIcon />
                </IconButton>
              </InputAdornment>
            )}

            {isUploadedImage && (
              <InputAdornment position="end">
                <IconButton
                  title="Delete Uploaded Image"
                  edge="end"
                  disabled={disabled}
                  onClick={handleDelete}
                >
                  <DeleteIcon />
                </IconButton>
              </InputAdornment>
            )}

            {(isUploading || isDeleting) && (
              <InputAdornment position="end">
                <CircularProgress />
              </InputAdornment>
            )}

            <InputAdornment position="end">
              <IconButton
                title="Open in new tab"
                edge="end"
                disabled={disabled}
                onClick={() => window.open(value, '_blank')}
              >
                <OpenInNewIcon />
              </IconButton>
            </InputAdornment>
          </>
        )}
      />
    </FormControl>
  );
};

ImageInput.defaultProps = {
  disabled: false,
  label: 'Image URL',
};

export default ImageInput;
