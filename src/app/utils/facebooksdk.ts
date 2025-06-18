declare global {
  interface Window {
    FB: any;
    fbAsyncInit: () => void;
  }
}
export const loadFacebookSDK = () => {
  return new Promise<void>((resolve) => {
    // Nếu SDK đã tồn tại thì không cần load lại
    if (window.FB) return resolve();

    // Gán hàm khởi tạo cho Facebook SDK
    window.fbAsyncInit = function () {
      window.FB.init({
        appId: process.env.NEXT_PUBLIC_FACEBOOK_CLIENT_ID!,
        cookie: true,
        xfbml: true,
        version: 'v18.0',
      });
     window.FB.AppEvents.logPageView();   
    };

    const js = document.createElement('script');
    js.id = 'facebook-jssdk';
    js.src = "https://connect.facebook.net/en_US/sdk.js";
    document.body.appendChild(js);
  });
};