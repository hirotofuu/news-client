export const textToLink = (text: string) => {
  const regexp_url = /(https?:\/\/[\w/:%#\$&\?\(\)~\.=\+\-]+)/g;
  let linkedText = text.replace(regexp_url, '<a href="$1" target="_blank" class="text-blue-500 hover:underline">$1</a>');

  return linkedText;
};