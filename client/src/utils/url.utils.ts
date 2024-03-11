export const isValidHttpsUrl = (url: string): boolean => {
    const pattern = /^(https:\/\/)(([a-zA-Z0-9-]+\.)+[a-zA-Z]{2,})?(:\d+)?(\/\S*)?$/;
    return pattern.test(url);
  };

  export const isValidSlug = (slug: string): boolean => {
    const pattern = /^[a-zA-Z0-9-]+$/;
    return pattern.test(slug);
  }

  export const parseURLShortened = (url: string): string => {
    return url.replace(/(^\w+:|^)\/\//, '');
  }