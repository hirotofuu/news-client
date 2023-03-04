export type User={
  id: string,
  secret_id: string,
  name: string,
  avatar_image: string,
  profile: string,
  truth_number: number,
  fake_number: number,
  following: string[] | null,
  following_number: number,
  follower_number: number,
};