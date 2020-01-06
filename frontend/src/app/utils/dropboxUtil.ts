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
  }
};
