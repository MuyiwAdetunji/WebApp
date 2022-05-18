import { Spinner } from 'react-bootstrap'
import { useDropzone } from 'react-dropzone'
import React, { useCallback, useState } from 'react'

import { uploadImage } from '../../apis'

const style = {
  border: '1px dashed #ced4d9',
  borderRadius: 5,
  color: '#6c757d',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  height: 142,
  // img {
  //   height: 140,
  // }
}

function ImageDropzone({ value, onChange }) {
  const [loading, setLoading] = useState(false)

  const onDrop = useCallback((acceptedFiles) => {
    console.log(acceptedFiles)

    setLoading(true)
    uploadImage(acceptedFiles[0])
      .then((json) => onChange(json.url))
      .finally(() => setLoading(false))
  }, [])

  const { getRootProps, getInputProps } = useDropzone({
    onDrop,
    multiple: false,
    accept: 'image/*',
  })

  return (
    <div {...getRootProps()}>
      <input {...getInputProps()} />
      {value ? (
        <img src={value} />
      ) : loading ? (
        <Spinner variant='standard' animation='border' role='staus' />
      ) : (
        <span>Drag & drop file here, or click to select file</span>
      )}
    </div>
  )
}

export default ImageDropzone
