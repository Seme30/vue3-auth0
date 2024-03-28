import { gql } from 'graphql-tag';

export const GET_STUDENTS = gql`
query {
  students {
    id
    firstName
    lastName
  }
}`;

export const GET_LESSONS = gql`
query {
    lessons {
      id
      name
      startDate
      endDate
      students{
        id
        firstName
        lastName
      }
    }
  }
`;