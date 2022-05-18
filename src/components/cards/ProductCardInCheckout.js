import React from 'react'
// import ModalImage from 'react-modal-image'
// import noPhoto from '../../images/no-photo.png'
import { useDispatch } from 'react-redux'
import { toast } from 'react-toastify'
import CloseOutlinedIcon from '@mui/icons-material/CloseOutlined'
import TableBody from '@mui/material/TableBody'
import TableCell from '@mui/material/TableCell'
import TableRow from '@mui/material/TableRow'
import { FormControl, Select } from '@mui/material'
import { MenuItem } from 'rc-menu'

const ProductCardInCheckout = ({ p }) => {
  let dispatch = useDispatch()

  const handleQuantityChange = (e) => {
    let count = e.target.value < 1 ? 1 : e.target.value

    if (count > p.quantity) {
      toast.error(`Max available quantity: ${p.quantity}`)
      return
    }

    let cart = []

    if (typeof window !== 'undefined') {
      if (localStorage.getItem('tink_cart')) {
        cart = JSON.parse(localStorage.getItem('tink_cart'))
      }

      cart.map((product, i) => {
        if (product._id === p._id) {
          cart[i].count = count
        }
      })

      localStorage.setItem('tink_cart', JSON.stringify(cart))
      dispatch({
        type: 'ADD_TO_CART',
        payload: cart,
      })
    }
  }

  const handleRemove = () => {
    // console.log(p._id, "to remove");
    let cart = []

    if (typeof window !== 'undefined') {
      if (localStorage.getItem('tink_cart')) {
        cart = JSON.parse(localStorage.getItem('tink_cart'))
      }
      // [1,2,3,4,5]
      cart.map((product, i) => {
        if (product._id === p._id) {
          cart.splice(i, 1)
        }
      })

      localStorage.setItem('tink_cart', JSON.stringify(cart))
      dispatch({
        type: 'ADD_TO_CART',
        payload: cart,
      })
    }
  }

  return (
    <TableBody>
      <TableRow sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
        <TableCell>
          <div style={{ width: '100px', height: 'auto' }}>
            {p.images.length
              ? // <ModalImage small={p.images[0].url} large={p.images[0].url} />
                ''
              : // <ModalImage small={noPhoto} large={noPhoto} />
                ''}
          </div>
        </TableCell>
        <TableCell>{p.productName}</TableCell>
        <TableCell>{`${p.weight} ${p.metrics}`}</TableCell>
        <TableCell>
          {'\u20A6'}
          {p.price?.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
        </TableCell>

        <TableCell className='text-center'>
          {/* <input
            type='number'
            className='form-control'
            value={p.count}
            onChange={handleQuantityChange}
          /> */}

          <select
            labelId='demo-simple-select-label'
            id='demo-simple-select'
            value={p.count}
            onChange={handleQuantityChange}
          >
            {[...Array(p.quantity).keys()].map((x) => (
              <option key={x + 1} value={x + 1}>
                {x + 1}
              </option>
            ))}
          </select>
        </TableCell>

        <TableCell className='text-center'>
          <CloseOutlinedIcon onClick={handleRemove} sx={{ color: '#f00' }} />
        </TableCell>
      </TableRow>
    </TableBody>
  )
}

export default ProductCardInCheckout
