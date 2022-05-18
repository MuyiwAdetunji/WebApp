import React from 'react'
import { useFeedPostStyles } from '../../styles/styles'
import UserCard from '../shared/UserCard'
import { MoreIcon } from '../../icons'
import HTMLEllipsis from 'react-lines-ellipsis/lib/html'
import { defaultPost } from '../../data'
import { Button, Typography } from '@mui/material'

const FeedPost = ({ post = defaultPost }) => {
  const classes = useFeedPostStyles()
  const [showCaption, setCaption] = React.useState(false)
  const { media, id, likes, user, caption, comments } = post
  return (
    <article className={classes.article}>
      <div className={classes.postHeader}>
        <UserCard />
        <MoreIcon className={classes.moreIcon} />
      </div>
      <div className={classes.postButtonsWrapper}>
        <div className={showCaption ? classes.expanded : classes.collasped}>
          {showCaption ? (
            <Typography
              variant='body2'
              component='span'
              dangerouslySetInnerHTML={{ __html: caption }}
            />
          ) : (
            <div className={classes.captionWrapper}>
              <HTMLEllipsis
                unsafeHTML={caption}
                className={classes.caption}
                maxLine='0'
                ellipsis='...'
                basedOn='letters'
              />
              <Button
                className={classes.moreButton}
                onClick={() => setCaption(true)}
              >
                more
              </Button>
            </div>
          )}
        </div>
      </div>
      <div>
        <img src={media} alt='post media' className={classes.image} />
      </div>
    </article>
  )
}

export default FeedPost
