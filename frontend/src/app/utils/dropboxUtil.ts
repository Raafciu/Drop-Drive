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
    const prefix: string = '/drop-box';
    try {
      return url.includes(prefix) ? url.replace(prefix, '') : url;
    } catch (error) {
      console.log(error);
      return null;
    }
  }
};
