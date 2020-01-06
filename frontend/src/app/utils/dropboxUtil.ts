export const PREFIX_AFTER_SIGNED = '#access_token=';
export const PREFIX: string = '/drop-box';

export const UrlMethods = {
  decodeWithoutParams(url) {
    try {
      let cleanUrl = decodeURIComponent(url).split('?')[0] || '';
      if (cleanUrl === '/') {
        cleanUrl = '';
      }
      return cleanUrl;
    } catch (error) {
      console.log(error);
      return null;
    }
  },

  removePrefixFromUrl(url: string) {
    console.log(url);
    try {
      if (url.includes(PREFIX) && !url.includes(PREFIX_AFTER_SIGNED)) {
        return url.replace(PREFIX, '');
      } else if (url.includes(PREFIX_AFTER_SIGNED)) {
        return '';
      } else {
        return url;
      }
    } catch (error) {
      console.log(error);
      return null;
    }
  }
};
