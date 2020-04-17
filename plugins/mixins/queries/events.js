import gql from 'graphql-tag'

export const FETCH_EVENTS = gql` query tagList {
  all_events {
    edges {
      node{
        id,
        title,
        description,
        link
      }
    }
  }
}`

export const POST_EVENT = gql`
  mutation (
    $title: String,
    $description: String,
    $link: String
  ) {
  crudEvent(
    event_data: {
      title:$title,
      description:$description,
      link:$link,
    }
  ) {
    event {
      title,
      description,
      link,
      id
    }
  }
}`
