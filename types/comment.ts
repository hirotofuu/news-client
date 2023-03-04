export type Comment={
  id: string,
  comment: string,
  parent_id: string | null,
  user_id: string,
  article_id: string,
  day_time: string,
  user_name: string,
  avatar_image: string,
  article_title: string | null,
  child_number: number
  is_good: string[],
  good_number: number,
};