import gql from 'graphql-tag'

export const FETCH_EVENTS = gql` query tagList ($getid: ID, $title: String, $first: Int, $skip: Int) {
  all_events (getid: $getid, title: $title, first: $first, skip: $skip){
    edges {
      node{
        id,
        title,
        image,
        description,
        creation_date,
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
    $link: String,
    $data_url: String,
    $file_name: String
  ) {
  CreateUpdateEvent(
    event_data: {
      id: $id,
      title: $title,
      description: $description,
      link: $link,
      data_url: $data_url,
      file_name: $file_name
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
