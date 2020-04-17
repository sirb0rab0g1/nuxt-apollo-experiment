import gql from 'graphql-tag'

export const FETCH_EVENTS = gql` query tagList {
  all_events {
    pageInfo {
        startCursor
        endCursor
        hasNextPage
        hasPreviousPage
    },
    edges {
      cursor,
      node{
        id,
        title
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
    crud_event(
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
