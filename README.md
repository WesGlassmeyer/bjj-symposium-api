# BJJ Symposium Api

Simplify your search for Brazilian Jiu Jitsu instructional videos. If you find a video you like then add it to the Community Favorites Page.

This is the backend for `bjj-symposium.app`. A live version of the app can be found at https://bjj-symposium.vercel.app/

The front end client can be found at https://github.com/WesGlassmeyer/bjj-symposium

## Introduction

With so much BJJ available instructional videos on the web and social media sites, it's hard to separate the good from the exceptional. BJJ Symposium cuts through the BS and helps community members to narrow their search to vetted videos added by other members.

## Quick App Demo

![](gif/demo.gif)

## Technology

#### Back End

- Node and Express
  - RESTful Api
- Testing
  - Supertest
  - Mocha and Chai
- Database
  - Postgres
  - Knex.js

#### Production

Deployed via Heroku

## API Documentation

- Request Type: `POST`
- Path `https://hidden-bayou-12327.herokuapp.com/fav_items`
- Required Request Headers:  
  `{Content-Type: 'application/json'}`
- Required JSON Body:

```
{
  title: 'VideoTitleStringGoesHere',
  thumbnail: 'VideoThumbnailStringGoesHere',
  youtube_id: 'YoutubeVideoIdStringGoesHere',
  rating: IntegerValue1-5,
  tags: ['TagString', 'TagString']
}
```

- Response Body will be:

````{
  'id': Integer,
  'title': 'VideoTitleStringGoesHere',
  'thumbnail': 'VideoThumbnailStringGoesHere',
  'youtube_id': 'YouTubeVideoIdStringGoesHere',
}```


### GET Community Favorite Videos
- Request Type: `GET`
- Path `https://hidden-bayou-12327.herokuapp.com/fav_items`
- Required Request Headers:
````

{
Content-Type: 'application/json',
}

```

- Response Body will be an array of JSON Objects:
```

[{
"id":Integer,
"title":"VideoTitleString",
"rating":Integer,
"tags":['TagString', 'TagString'],
"youtube_id":"YouTubeVideoIdString",
"thumbnail":"VideoThumbnailString"
}]
