import { Button, Container, Grid, Typography } from '@mui/material'
import React, { useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import ArrowForwardIcon from '@mui/icons-material/ArrowForward'
import { useInterestStyles } from '../../styles/styles'
import { getAllCategories, updateInterests } from '../../apis'
import { useHistory } from 'react-router-dom'
import { toast } from 'react-toastify'

const Interests = () => {
  const classes = useInterestStyles()
  const [categories, setCategories] = useState([])
  const [selected, setSelected] = useState([])

  const { user } = useSelector((state) => ({ ...state }))

  const dispatch = useDispatch()

  const history = useHistory()

  useEffect(() => {
    loadAllCategories()
  }, [])

  // useEffect(() => {
  //   if (user.interests !== null) {
  //     setSelected(user.interests)
  //   }
  // }, [user, categories])

  const loadAllCategories = async () => {
    const res = await getAllCategories()

    if (res) {
      setCategories(res.category)
    }
  }

  const handleSelected = (id) => {
    let items = [...selected]
    let category = id
    let foundInState = items.indexOf(category)
    if (foundInState === -1) {
      items.push(category)
    } else {
      items.splice(foundInState, 1)
    }

    setSelected(items)
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (selected.length < 5) {
      toast.error('Please select at least 5 categories')
    } else {
      const res = await updateInterests(selected, user.token)

      if (res) {
        if (typeof window !== 'undefined') {
          localStorage.setItem('tink_user', JSON.stringify(res))
        }

        dispatch({
          type: 'LOGGED_IN_USER',
          payload: {
            firstName: res.firstName,
            lastName: res.lastName,
            email: res.email,
            token: res.token,
            role: res.role,
            storeName: res.storeName,
            profilePicUrl: res.profilePicUrl,
            userId: res.userId,
            _id: res._id,
          },
        })
        toast.success('Your Interests has been set')
        history.push('/login')
        // roleBasedRedirect(res)
      }
    }
  }

  return (
    <Container>
      <Typography
        variant='h4'
        component='h4'
        className={classes.mainText}
      >{`Hello ${user.lastName}`}</Typography>
      <Typography variant='h6'>
        Please pick at least 5 interests to proceed...
      </Typography>

      <div className={classes.container}>
        <Grid container spacing={3}>
          {categories.map((category) => (
            <Grid item xs={2} key={category._id}>
              <Button
                className={classes.button}
                variant={
                  selected.includes(category._id) ? 'primary2' : 'plain2'
                }
                onClick={() => handleSelected(category._id)}
              >
                {category.name}
              </Button>
            </Grid>
          ))}
        </Grid>
        <div className={classes.submitButton} onClick={handleSubmit}>
          <Typography>Proceed</Typography>
          <ArrowForwardIcon />
        </div>
      </div>
    </Container>
  )
}

export default Interests
