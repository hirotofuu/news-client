export type Article={
  id: string,
  title: string,
  content: string,
  source: string,
  day_time: string,
  view_number: number,
  user_id: string,
  user_name: string,
  category: string, 
  avatar_image: string,
  image_file: string | null,
  is_truth:string[] | null,
  is_fake:string[] | null,
  truth_number: number,
  fake_number: number,
};