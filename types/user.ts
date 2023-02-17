export type User={
  id: number,
  name: string,
  api_token: string,
  truth_number: number,
  fake_number: number,
  following: number[] | null,
  following_number: number,
  follower_number: number,
};