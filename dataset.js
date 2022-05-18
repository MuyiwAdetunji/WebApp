import * as React from 'react'
import { DataGrid } from '@mui/x-data-grid'
import { useDemoData } from '@mui/x-data-grid-generator'
import Popper from '@mui/material/Popper'
import Button from '@mui/material/Button'
import Fade from '@mui/material/Fade'
import Paper from '@mui/material/Paper'

export default function CellWithPopover() {
  const { data } = useDemoData({
    dataSet: 'Commodity',
    rowLength: 10,
    maxColumns: 6,
  })

  const popperRef = React.useRef()
  const [anchorEl, setAnchorEl] = React.useState(null)
  const [value, setValue] = React.useState('')

  const open = Boolean(anchorEl)

  const handlePopperOpen = (event) => {
    const id = event.currentTarget.dataset.id
    const row = data.rows.find((r) => r.id === id)
    setValue(row)
    setAnchorEl(event.currentTarget)
  }

  const handlePopperClose = (event) => {
    if (
      anchorEl == null ||
      popperRef.current.contains(event.nativeEvent.relatedTarget)
    ) {
      return
    }

    setAnchorEl(null)
  }

  return (
    <div style={{ height: 400, width: '75%' }}>
      <DataGrid
        {...data}
        componentsProps={{
          row: {
            onMouseEnter: handlePopperOpen,
            onMouseLeave: handlePopperClose,
          },
        }}
        sx={{
          // zIndex: 1000,
          // '& .MuiDataGrid-window': {
          //   zIndex: 1000,
          // },
          '& .MuiDataGrid-columnHeaders': {
            backgroundColor: 'orange',
            zIndex: 1000,
          },
          '& .MuiDataGrid-row': {
            zIndex: 10,
          },
          '& .MuiDataGrid-footerContainer': {
            backgroundColor: 'orange',
            zIndex: 1000,
          },
        }}
      />
      <Popper
        ref={popperRef}
        open={open}
        anchorEl={anchorEl}
        placement={'right'}
        // transition
        // disablePortal={true}
        onMouseLeave={() => setAnchorEl(null)}
      >
        {({ TransitionProps }) => (
          // <Fade {...TransitionProps} timeout={350}>
          <Paper
            sx={{
              transform: 'translateX(-140px)',
              zIndex: 100,
            }}
          >
            <Button onClick={() => console.log('edit: ', value.id)}>
              Edit
            </Button>
            <Button onClick={() => console.log('delete: ', value.id)}>
              Delete
            </Button>
          </Paper>
          // </Fade>
        )}
      </Popper>
    </div>
  )
}
