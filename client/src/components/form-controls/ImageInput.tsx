import { ChangeEvent, useRef } from 'react';
import { Button } from '@mui/material';
import { useCreateImageMutation, useUpdateImageMutation } from '../../store/api';
import { readAndCompressImageFile } from '../../helpers/image.helper';

interface ImageInputProps {
  value?: string;
  onChange: (value: string) => void;
}

const ImageInput = ({
  value, onChange,
}: ImageInputProps) => {
  const inputRef = useRef<HTMLInputElement>(null);

  const [createImage] = useCreateImageMutation();
  const [updateImage] = useUpdateImageMutation();

  const handleFileChange = async (e: ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files) return;

    const blob = await readAndCompressImageFile(e.target.files[0]);
    if (value) {
      await updateImage({ id: value, blob });
    } else {
      const result = await createImage({ blob });
      if (!result.data) return;
      console.log(result.data)
      onChange(result.data.id);
    }
  };

  return (
      <Button fullWidth sx={{ height: "100%" }} onClick={() => inputRef.current?.click()}>
        <input
          ref={inputRef}
          hidden
          type="file"
          onChange={handleFileChange}
        />
        {value ? "Change Image" : "No Image"}
      </Button>
  );
};

export default ImageInput;
