import { v4 as uuid } from 'uuid'

export const defaultUser = {
  id: uuid(),
  username: 'username',
  name: 'name',
  profile_image:
    'https://media.newyorker.com/photos/5c09b6cd52c7422cbbac087b/1:1/w_1375,h_1375,c_limit/Schulman-.jpg',
}

export function getDefaultUser() {
  return {
    id: uuid(),
    username: 'username',
    name: 'name',
    profile_image:
      'https://reedbarger.nyc3.digitaloceanspaces.com/reactbootcamp/avatar.png',
  }
}

export const defaultPost = {
  id: uuid(),
  likes: 10,
  caption: `<span class="">Do you know the 10 JavaScript concepts you need to learn React? 🤔⚛️👇<br>•<br>•<br>👉 Get the FREE cheatsheet to learn them now: bit.ly/10-js-tips 🔥</span>`,
  user: defaultUser,
  media:
    'https://reedbarger.nyc3.digitaloceanspaces.com/reactbootcamp/post.jpeg',
  comments: [],
  created_at: '2020-02-28T03:08:14.522421+00:00',
}

export function getDefaultPost() {
  return {
    id: uuid(),
    likes: 10,
    caption: `<span class="">Do you know the 10 JavaScript concepts you need to learn React? 🤔⚛️👇<br>•<br>•<br>👉 Get the FREE cheatsheet to learn them now: bit.ly/10-js-tips 🔥</span>`,
    user: defaultUser,
    media:
      'https://www.koimoi.com/wp-content/new-galleries/2020/05/kevin-hart-confesses-his-family-is-finding-him-annoying-during-lockdown-001.jpg',
    comments: [],
    created_at: '2020-02-28T03:08:14.522421+00:00',
  }
}

export const defaultNotifications = [
  {
    id: uuid(),
    type: 'follow',
    user: defaultUser,
    created_at: '2020-02-29T03:08:14.522421+00:00',
  },
  {
    id: uuid(),
    type: 'like',
    user: defaultUser,
    post: defaultPost,
    created_at: '2020-02-29T03:08:14.522421+00:00',
  },
]

export const tinkokoNews = [
  {
    id: 1,
    title: '2023: Katsina deputy gov resigns as Agric commissioner',
    content:
      '<p>The Katsina State Deputy Governor, Mannir Yakubu, has resigned his appointment as the Commissioner for Agriculture and Natural Resources.</p><p>His Chief Press Secretary, Ibrahim Kallah, confirmed the development in a statement in Katsina on Thursday.</p><p>Kallah said Mannir’s resignation was in accordance with section 84 (12) of the 2022 electoral act as amended.</p><p>He said, “Mannir made the declaration on Thursday, April 14, 2022, in his preparation to declare for governorship soon.”</p>',
  },
  {
    id: 2,
    title: 'EU nears deal on massive tech services regulation',
    content:
      '<p>The European Union could agree on Friday a new regulation imposing unprecedented curbs on online content, the second part of its massive project to regulate tech companies.</p><p>The Digital Services Act (DSA) aims to ensure tougher consequences for platforms and websites that violate a long list of banned content.</p><p>The text is the companion to the Digital Markets Act (DMA), which targeted anti-competitive practices among tech behemoths like Google and Facebook and was concluded in late March.</p><p>A European source told AFP that MEPs and EU countries were "very motivated" to get the new regulation agreed on Friday.”</p>',
  },
  {
    id: 3,
    title: 'Google claps back at Brave, DuckDuckGo over latest privacy debate',
    content:
      '<p>The European Union could agree on Friday a new regulation imposing unprecedented curbs on online content, the second part of its massive project to regulate tech companies.</p><p>The Digital Services Act (DSA) aims to ensure tougher consequences for platforms and websites that violate a long list of banned content.</p><p>The text is the companion to the Digital Markets Act (DMA), which targeted anti-competitive practices among tech behemoths like Google and Facebook and was concluded in late March.</p><p>A European source told AFP that MEPs and EU countries were "very motivated" to get the new regulation agreed on Friday.”</p>',
  },
  {
    id: 4,
    title:
      'MetaGods NFT Land Sale’s Resounding Success Attracts Traditional Investors',
    content:
      '<p>The European Union could agree on Friday a new regulation imposing unprecedented curbs on online content, the second part of its massive project to regulate tech companies.</p><p>The Digital Services Act (DSA) aims to ensure tougher consequences for platforms and websites that violate a long list of banned content.</p><p>The text is the companion to the Digital Markets Act (DMA), which targeted anti-competitive practices among tech behemoths like Google and Facebook and was concluded in late March.</p><p>A European source told AFP that MEPs and EU countries were "very motivated" to get the new regulation agreed on Friday.”</p>',
  },
]

export const defaultCurrentUser = {
  id: uuid(),
  username: 'me',
  name: 'myself',
  profile_image:
    'https://reedbarger.nyc3.digitaloceanspaces.com/reactbootcamp/avatar.png',
  website: 'https://reactbootcamp.com',
  email: 'me@gmail.com',
  bio: 'This is my bio',
  phone_number: '555-555-5555',
  posts: Array.from({ length: 10 }, () => getDefaultPost()),
  followers: [defaultUser],
  following: [defaultUser],
}
