import gql from 'graphql-tag'

export const FETCH_EVENTS = gql` query tagList ($getid: ID, $title: String, $first: Int, $skip: Int) {
  all_events (getid: $getid, title: $title, first: $first, skip: $skip){
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

export const CREATE_UPDATE_EVENT = gql`
  mutation (
    $id: ID,
    $title: String,
    $description: String,
    $link: String
  ) {
  CreateUpdateEvent(
    event_data: {
      id: $id,
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

export const DELETE_EVENT = gql`
  mutation (
    $id: ID
  ) {
  CreateUpdateEvent(
    event_data: {
      id: $id
    }
  ) {
    event {
      id
    }
  }
}`
